"use client"
import { Line, Bar } from "react-chartjs-2";
import ChartContainer from "../ChartContainer";
import { useGetDaysRevenueInDurationQuery } from "@/store/services/revenue";
import { useSelector } from "react-redux";
import { StoreType } from "@/types";
import { formatApiResponseToChart } from "@/lib/utils";
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const options = {
  responsive: true,
  maintainAspectRatio: false,
	elements: {
		line: {
			tension: 0.4
		}
	},
  title: {
    display: false,
  },
};
export default function Revenue(){
	const date = useSelector((state:StoreType) => state.filters.dateRange);
	const { isFetching, data } = useGetDaysRevenueInDurationQuery({startDate: date.from?.toISOString(), endDate: date.to?.toISOString()});
	return (
		<ChartContainer title="Total revenue each day : " loading={isFetching}>
			{
				data ? (
					<Line data={formatApiResponseToChart(data)} options={options} />
				) : null
			}
		</ChartContainer>
	)
}