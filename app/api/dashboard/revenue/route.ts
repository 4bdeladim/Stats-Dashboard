import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let startDate = req.nextUrl.searchParams.get("startDate");
    let endDate = req.nextUrl.searchParams.get("endDate");
    let compareStartDate = req.nextUrl.searchParams.get("compareStartDate");
    let compareEndDate = req.nextUrl.searchParams.get("compareEndDate");

    if (!startDate || !endDate || !compareEndDate || !compareStartDate) {
      return NextResponse.json({ error: "startDate, endDate, compareStartDate, and compareEndDate are required parameters", status: 400 });
    }

    const revenueInDuration = await prisma.payment.aggregate({
      _sum: {
        amount: true
      },
      where: {
        paid: true,
        paymentDate: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        }
      }
    });

    const revenueComparedDuration = await prisma.payment.aggregate({
      _sum: {
        amount: true
      },
      where: {
        paid: true,
        paymentDate: {
          gte: new Date(compareStartDate),
          lte: new Date(compareEndDate),
        }
      }
    });
    const sum = revenueInDuration._sum.amount || 0;
    const prevDurationSum = revenueComparedDuration._sum.amount || 0;
    const difference = prevDurationSum === 0 ? sum.toFixed(2) : (((sum - prevDurationSum) / prevDurationSum) * 100).toFixed(2);
    return NextResponse.json({ sum, difference });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error", status: 500 });
  }
}
