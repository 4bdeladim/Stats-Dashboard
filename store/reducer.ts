import { combineSlices } from '@reduxjs/toolkit';
import { dashboardApi } from './services/revenue';
import filter from './slices/filter';


const rootReducer = combineSlices(dashboardApi, filter)

export default rootReducer;