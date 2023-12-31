"use client"
import { Line } from "react-chartjs-2";
import ChartContainer from "../ChartContainer";
import { useGetDaysRevenueInDurationQuery } from "@/store/services";
import { useSelector } from "react-redux";
import { StoreType } from "@/types";
import { formatRevenueApiResponseToChart } from "@/lib/utils";
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
					<Line data={formatRevenueApiResponseToChart(data)} options={options} />
				) : null
			}
		</ChartContainer>
	)
}