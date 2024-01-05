"use client"
import { Bar } from "react-chartjs-2";
import ChartContainer from "../ChartContainer";
import { useGetDaysLeadsStatusesInDurationQuery } from "@/store/services";
import { useSelector } from "react-redux";
import { StoreType } from "@/types";
import { formatLeadsStatusesApiResponseToChart } from "@/lib/utils";
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const options = {
  responsive: true,
  maintainAspectRatio: false,
	stacked: true,
	elements: {
		line: {
			tension: 0.4
		}
	},
  title: {
    display: false,
  },
};
export default function LeadsStatuses(){
	const date = useSelector((state:StoreType) => state.filters.dateRange);
	const { isFetching, data } = useGetDaysLeadsStatusesInDurationQuery({startDate: date.from?.toISOString(), endDate: date.to?.toISOString()});
	return (
		<ChartContainer title="Statuses of leads : " loading={isFetching}>
			{
				data ? (
					<Bar data={formatLeadsStatusesApiResponseToChart(data)} options={options} />
				) : null
			}
		</ChartContainer>
	)
}