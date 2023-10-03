import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice"
import pokemonReducer from "./reducer/pokemonSlice"

const store = configureStore({
    reducer:{
        user: userReducer,
        pokemon: pokemonReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;