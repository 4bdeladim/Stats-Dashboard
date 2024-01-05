import { ChartApiResponse } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatApiResponseToChart(data: ChartApiResponse[]): { labels: string[], datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number, fill: boolean }[] } {
  const labels: string[] = [];
  const datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number, fill: boolean }[] = [{
    label: 'Revenue',
    data: [],
    backgroundColor: '#18181b',
    borderColor: '#18181b',
    borderWidth: 2,
    fill: false,
  }];

  data.forEach((entry) => {
    labels.push(entry.date);
    datasets[0].data.push(entry.revenue);
  });

  return { labels, datasets };
}
