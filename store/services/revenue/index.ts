import { Duration, RevenueResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek, subDays, subMonths, subWeeks } from 'date-fns';

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/dashboard",
  }),
  endpoints: (builder) => ({
    getTodayRevenue: builder.query<RevenueResponse, void>({
      query: () => {
        const todayStartDate = startOfDay(new Date());
        const todayEndDate = endOfDay(new Date());
        const yesterdayStartDate = startOfDay(subDays(new Date(), 1));
        const yesterdayEndDate = startOfDay(new Date());
        return `/revenue?startDate=${todayStartDate.toISOString()}&endDate=${todayEndDate.toISOString()}&compareStartDate=${yesterdayStartDate.toISOString()}&compareEndDate=${yesterdayEndDate.toISOString()}`;
      },
    }),
		getWeekRevenue: builder.query<RevenueResponse, void>({
			query: () => {
				const currentWeekStartDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        const currentWeekEndDate = endOfWeek(new Date(), { weekStartsOn: 1 });
        const prevWeekStartDate = startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
        const prevWeekEndDate = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
        return `/revenue?startDate=${currentWeekStartDate.toISOString()}&endDate=${currentWeekEndDate.toISOString()}&compareStartDate=${prevWeekStartDate.toISOString()}&compareEndDate=${prevWeekEndDate.toISOString()}`;
			}
		}),
		getMonthRevenue: builder.query<RevenueResponse, void>({
			query: () => {
				const currentMonthStartDate = startOfMonth(new Date());
        const currentMonthEndDate = endOfMonth(new Date());
        const prevMonthStartDate = startOfMonth(subMonths(new Date(), 1));
        const prevMonthEndDate = endOfMonth(subMonths(new Date(), 1));
        return `/revenue?startDate=${currentMonthStartDate.toISOString()}&endDate=${currentMonthEndDate.toISOString()}&compareStartDate=${prevMonthStartDate.toISOString()}&compareEndDate=${prevMonthEndDate.toISOString()}`;
			}
		}),
		getDurationRevenue: builder.query<RevenueResponse, Duration>({
			query: (duration: Duration) => {
				const { startDate, endDate } = duration;
				const start = startDate ? new Date(startDate) : new Date();
				const end = endDate ? new Date(endDate) : new Date();
				const lastYearStartDate = new Date(start);
				lastYearStartDate.setFullYear(lastYearStartDate.getFullYear() - 1);
				const lastYearEndDate = new Date(end);
				lastYearEndDate.setFullYear(lastYearEndDate.getFullYear() - 1);
		
				return `/revenue?startDate=${start.toISOString()}&endDate=${end.toISOString()}&compareStartDate=${lastYearStartDate.toISOString()}&compareEndDate=${lastYearEndDate.toISOString()}`;
			}
		})
  }),
});

export const {useGetTodayRevenueQuery, useGetWeekRevenueQuery, useGetMonthRevenueQuery, useGetDurationRevenueQuery} = dashboardApi;
