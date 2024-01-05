import { ChartApiResponse } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatRevenueApiResponseToChart(data: ChartApiResponse[]): { labels: string[], datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number, fill: boolean }[] } {
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