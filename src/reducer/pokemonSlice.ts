import { createSlice } from "@reduxjs/toolkit"

interface PokemonState{
    pokemonAppear: {
        name: string,
        id: number,
        sprites: string
    }
    ballIsClicked: boolean
}

const initialState:PokemonState = {
    pokemonAppear:{
        name: "",
        id: 0,
        sprites: ""
    },
    ballIsClicked: false
}

const pokemonSlice =createSlice({
    name: "pokemon",
    initialState,
    reducers:{
        setPokemonAppear: (state, action) =>{
            state.pokemonAppear = action.payload
        },
        setBallIsClicked: (state, action) => {
            state.ballIsClicked = action.payload
        }
    }
})

export default pokemonSlice.reducer
export const {setPokemonAppear, setBallIsClicked} = pokemonSlice.actions 