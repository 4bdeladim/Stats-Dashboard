import { DateRange } from "react-day-picker";

export type methodType = "GET" | "POST";
export type RevenueResponse = {
	sum: number,
	difference: number
}
export interface RevenuesData {
	today: RevenueResponse,
	yesterday: RevenueResponse,
	month: RevenueResponse,
	duration: RevenueResponse
}
export type RevenueType = "today" | "yesterday" | "this-month" | "duration" ;

export interface Duration {
	startDate?: string,
	endDate?:string
}


export interface FiltersType {
	dateRange: DateRange
}

export interface StoreType {
	filters: {
		dateRange: DateRange
	}
}


export interface ChartApiResponse {
	date: string,
	totalRevenue: number,
	subscriptionCount: number,
	oneTimeCount: number
}