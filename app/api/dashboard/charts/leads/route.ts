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
    const leadCountInDuration = await prisma.lead.groupBy({
      by: ["createdAt"],
      _count: true,
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });
    const leadCountMap = new Map<number, number>();
    leadCountInDuration.forEach((entry) => {
      const date = new Date(entry.createdAt).getDate();
      leadCountMap.set(date, entry._count || 0);
    });
    const result = dateArray.map((date) => ({
      date: date.getDate(),
      leadCount: leadCountMap.get(date.getDate()) || 0,
    }));
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error", status: 500 });
  }
}
