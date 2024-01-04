import { Metadata } from "next"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { LogoutButton } from "@/components/logout"
import { CardsContainer } from "@/components/cards-container"
import { DateRange } from "react-day-picker"
import React from "react"
import { addDays } from "date-fns"



export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
  return (
    <>

      <div className="flex-col flex">
				<div className="border-b">
          <div className="flex h-16 items-center px-4 justify-end">
						<LogoutButton />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 flex-wrap">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
            </div>
          </div>
          <CardsContainer />
        </div>
      </div>
    </>
  )
}