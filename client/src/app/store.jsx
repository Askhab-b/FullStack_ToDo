import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../features/todosSlice'

export const store = configureStore({
    reducer: todosReducer,
})