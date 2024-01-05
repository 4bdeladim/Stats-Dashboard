import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { setupListeners } from "@reduxjs/toolkit/query"
import { dashboardApi } from './services';



export const store = configureStore({
  reducer: rootReducer, 
	devTools: process.env.NODE_ENV !== "production",
	
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(dashboardApi.middleware)
});

setupListeners(store.dispatch);