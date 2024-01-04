"use client";

import { useGetDurationRevenueQuery, useGetMonthRevenueQuery, useGetTodayRevenueQuery, useGetWeekRevenueQuery } from "@/store/services/revenue";
import { CardContent, CardHeader, CardTitle } from "./ui/card";

import Card from "@/components/Card"
import { useSelector } from "react-redux";
import { StoreType } from "@/types";


export function CardsContainer() {
		const date = useSelector((state:StoreType) => state.filters.dateRange)
		const { isFetching:isTodayRevenueLoading, data:todayRevenue } = useGetTodayRevenueQuery();
		const { isFetching:isWeekRevenueLoading, data:weekRevenue } = useGetWeekRevenueQuery();
		const { isFetching:isMonthRevenueLoading, data:monthRevenue } = useGetMonthRevenueQuery();
		const { isFetching:isDurationRevenueLoading, data:durationRevenue} = useGetDurationRevenueQuery({startDate: date.from?.toISOString(), endDate: date.to?.toISOString()});

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card loading={isTodayRevenueLoading}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Today&apos;s Revenue
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${todayRevenue?.sum}</div>
                    <p className="text-xs text-muted-foreground">
                        {todayRevenue?.difference}% from last day
                    </p>
                </CardContent>
            </Card>
						<Card loading={isWeekRevenueLoading}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        This Week&apos;s Revenue
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${weekRevenue?.sum}</div>
                    <p className="text-xs text-muted-foreground">
                        {weekRevenue?.difference}% from last week
                    </p>
                </CardContent>
            </Card>
						<Card loading={isMonthRevenueLoading}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        This Month&apos;s Revenue
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${monthRevenue?.sum}</div>
                    <p className="text-xs text-muted-foreground">
                        {monthRevenue?.difference}% from last month
                    </p>
                </CardContent>
            </Card>
						<Card loading={isDurationRevenueLoading}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        This Duration&apos;s Revenue
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${durationRevenue?.sum}</div>
                    <p className="text-xs text-muted-foreground">
                        {durationRevenue?.difference}% from last year
                    </p>
                </CardContent>
            </Card>
						
            
        </div>
    );
}
