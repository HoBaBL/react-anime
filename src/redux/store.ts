import { configureStore } from '@reduxjs/toolkit'
import anime from './slice/anime'

export const store = configureStore({
    reducer: { anime },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch