import { Card } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";


export default function ChartContainer({
  children,
	loading,
	title
}: {
  children: React.ReactNode,
	loading: boolean,
	title: string
}){
	return (
		<div>
			<Card className="rounded-b-none p-4">
				<h3 className="tracking-tight text-sm font-medium">{title}</h3>
			</Card> 
			<Card className="w-full h-96 p-8 rounded-t-none">
			{ 
				loading ? (
					<div className="flex flex-col justify-around h-full w-full">
						<Skeleton className="h-[40px] w-full rounded-md" />
						<Skeleton className="h-[40px] w-full rounded-md" />
						<Skeleton className="h-[40px] w-full rounded-md" />
						<Skeleton className="h-[40px] w-full rounded-md" />
						<Skeleton className="h-[40px] w-full rounded-md" />
						<Skeleton className="h-[40px] w-full rounded-md" />
					</div>
				) : (
					children
				)
			}
		</Card>
		</div>
		
	)
}