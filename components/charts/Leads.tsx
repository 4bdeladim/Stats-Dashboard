"use client"
import { Line } from "react-chartjs-2";
import ChartContainer from "../ChartContainer";
import { useGetDaysLeadsInDurationQuery } from "@/store/services";
import { useSelector } from "react-redux";
import { StoreType } from "@/types";
import { formatLeadsApiResponseToChart } from "@/lib/utils";
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
export default function Leads(){
	const date = useSelector((state:StoreType) => state.filters.dateRange);
	const { isFetching, data } = useGetDaysLeadsInDurationQuery({startDate: date.from?.toISOString(), endDate: date.to?.toISOString()});
	return (
		<ChartContainer title="Total leads each day : " loading={isFetching}>
			{
				data ? (
					<Line data={formatLeadsApiResponseToChart(data)} options={options} />
				) : null
			}
		</ChartContainer>
	)
}