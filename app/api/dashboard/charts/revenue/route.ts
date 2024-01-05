import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let startDate = req.nextUrl.searchParams.get("startDate");
    let endDate = req.nextUrl.searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Start date and End Date are required parameters", status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateArray: Date[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const revenueInDuration = await prisma.payment.groupBy({
			by: ['paymentDate', 'type'],
			_count: true,
			_sum: {
				amount: true
			},
			where: {
				paid: true,
				paymentDate: {
					gte: start,
					lte: end,
				},
			},
		});
		const revenueMap = new Map<number, number>();
    revenueInDuration.forEach((entry) => {
      const date = new Date(entry.paymentDate).getDate();
      revenueMap.set(date, entry._sum.amount || 0);
    });
		const result = dateArray.map((date) => {
			const subscriptions = revenueInDuration.find((e) => e.type === 'Subscription' && new Date(e.paymentDate).getDate() === date.getDate());
			const oneTime = revenueInDuration.find((e) => e.type === 'One-time' && new Date(e.paymentDate).getDate() === date.getDate());
		
			return {
				date: date.getDate(),
				totalRevenue: revenueMap.get(date.getDate()) || 0,
				subscriptionCount: subscriptions ? subscriptions._count || 0 : 0,
				oneTimeCount: oneTime ? oneTime._count || 0 : 0,
			};
		});

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error", status: 500 });
  }
}
