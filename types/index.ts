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


export interface RevenueChartApiResponse {
	date: string,
	totalRevenue: number,
	subscriptionCount: number,
	oneTimeCount: number
}

export interface LeadsChartApiResponse {
	date: string,
	leadCount: number
}

export interface LeadStatusType {
	statusName: string,
	statusId: number
}


export interface LeadsStatusesChartApiResponse {
  date: string;
  statusCounts: {
    status: string;
    count: number;
  }[];
}
