import { combineSlices } from '@reduxjs/toolkit';
import { dashboardApi } from './services';
import filter from './slices/filter';


const rootReducer = combineSlices(dashboardApi, filter)

export default rootReducer;