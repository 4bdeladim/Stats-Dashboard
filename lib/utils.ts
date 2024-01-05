import { LeadStatusType, LeadsChartApiResponse, LeadsStatusesChartApiResponse, RevenueChartApiResponse } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const leadAvailableStatuses: LeadStatusType[] = [
  { statusName: 'New', statusId: 2 },
  { statusName: 'Contacted', statusId: 3 },
  { statusName: 'Qualified', statusId: 4 },
  { statusName: 'Closed', statusId: 5 },
  { statusName: 'Lost', statusId: 6 },
];

export function formatRevenueApiResponseToChart(data: RevenueChartApiResponse[]): { labels: string[], datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number, fill: boolean }[] } {
  const labels: string[] = [];
  const datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number, fill: boolean }[] = [{
    label: 'Total Revenue',
    data: [],
    backgroundColor: '#18181b',
    borderColor: '#18181b',
    borderWidth: 2,
    fill: false,
  },
  {
    label: 'Subscription Count',
    data: [],
    backgroundColor: "#e21e49",
    borderColor: "#e21e49",
    borderWidth: 2,
    fill: false,
  },
  {
    label: 'One-Time Count',
    data: [],
    backgroundColor: "#18a34a",
    borderColor: "#18a34a",
    borderWidth: 2,
    fill: false,
  }];

  data.forEach((entry) => {
    labels.push(entry.date.toString());
    datasets[0].data.push(entry.totalRevenue);
    datasets[1].data.push(entry.subscriptionCount);
    datasets[2].data.push(entry.oneTimeCount);
  });

  return { labels, datasets };
}


export function formatLeadsApiResponseToChart(data: LeadsChartApiResponse[]): { labels: string[], datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number, fill: boolean }[] } {
  const labels: string[] = [];
  const datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number, fill: boolean }[] = [{
    label: 'Lead Count',
    data: [],
    backgroundColor: '#18181b',
    borderColor: '#18181b',
    borderWidth: 2,
    fill: false,
  }];

  data.forEach((entry) => {
    labels.push(entry.date);
    datasets[0].data.push(entry.leadCount);
  });

  return { labels, datasets };
}

export function formatLeadsStatusesApiResponseToChart(data: LeadsStatusesChartApiResponse[]): { labels: string[], datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number, fill: boolean }[] } {
  const labels: string[] = [];
  const datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number, fill: boolean }[] = [];

  leadAvailableStatuses.forEach((status) => {
    const dataset = {
      label: status.statusName,
      data: [],
      backgroundColor: '#18181b',
      borderColor: '#18181b',
      borderWidth: 1,
      fill: true,
    };
    datasets.push(dataset);
  });

  data.forEach((entry) => {
    labels.push(entry.date);
    entry.statusCounts.forEach((statusCount, index) => {
      datasets[index].data.push(statusCount.count);
    });
  });

  return { labels, datasets };
}
