import { FiltersType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DateRange } from "react-day-picker";

const initialState = {
	dateRange: {
    from: new Date(2023, 11, 2),
    to: new Date(2024, 0, 20)
  }
} as FiltersType

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		changeDate(state, action: PayloadAction<DateRange>){
				state.dateRange = action.payload
		}
	}
})

export const { changeDate } = filtersSlice.actions
export default filtersSlice