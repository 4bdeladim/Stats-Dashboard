import { prisma } from "@/lib/prisma";
import { leadAvailableStatuses } from "@/lib/utils";
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

    const leadCountsInDuration = await prisma.lead.groupBy({
      by: ['createdAt', 'statusId'],
      _count: true,
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    const leadCountsMap = new Map<string, number>();
    leadCountsInDuration.forEach((entry) => {
      const date = new Date(entry.createdAt).getDate();
      const statusId = entry.statusId;
      const key = `${date}-${statusId}`;
      leadCountsMap.set(key, entry._count || 0);
    });

    const result = dateArray.map((date) => {
      const formattedDate = date.toISOString().split('T')[0];
      const statusCounts = leadAvailableStatuses.map((status) => ({
        status: status.statusName,
        count: leadCountsMap.get(`${date.getDate()}-${status.statusId}`) || 0,
      }));
      return { date: formattedDate, statusCounts };
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Server Error", status: 500 });
  }
}
