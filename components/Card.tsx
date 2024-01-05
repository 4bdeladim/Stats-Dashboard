import { Card } from "./ui/card";
import { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

interface CardWithLoadingProps {
  loading: boolean;
  children: ReactNode;
}

export default function CardWithLoading({ loading, children }: CardWithLoadingProps) {
  return (
    <Card className={loading ? "flex flex-col justify-center items-center gap-2 py-2" : undefined}>
      {loading ? (
				<>
					<Skeleton className="h-[20px] w-11/12 rounded-md" />
					<Skeleton className="h-[20px] w-11/12 rounded-md" />
					<Skeleton className="h-[20px] w-11/12 rounded-md" />
					<Skeleton className="h-[20px] w-11/12 rounded-md" />
				</>
			) : 
			children
			}
    </Card>
  );
}
