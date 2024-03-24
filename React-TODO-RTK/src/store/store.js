import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../slices/todo/todoSlice";

export const store = configureStore({
    reducer: reducers
})
