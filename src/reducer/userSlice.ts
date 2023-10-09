import { createSlice } from "@reduxjs/toolkit"
interface userState {
    email: string|null,
    username: string|null,
    error: string | null,
    isLoading: boolean,
    pokeCatched: number,
    pokemon: {
      front_default: string,
      id: number,
      name:string
      nickname:string
      pokemonId:number
      time:string
      user:string
    }[]
}

const initialState: userState = {
    email: null,
    username: null,
    error: null,
    isLoading: false,
    pokemon: [],
    pokeCatched: 0
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setEmail:(state, action)=>{
            state.email = action.payload
        },
        setUsername:(state, action)=>{
            state.username = action.payload
        },
        setError:(state, action) => {
          state.error = action.payload
        },
        setIsLoading:(state, action) => {
          state.isLoading = action.payload
        },
        setPokemon:(state, action) =>{
          state.pokemon = action.payload
        },
        setPokeCatched: (state, action) => {
          state.pokeCatched = action.payload
        },
        updatePokemon:(state, action) =>{
          state.pokemon = state.pokemon.filter((val) => {
            return val.id !== action.payload;
          });
        },
        resetUser: (state)=>{
          state.email= null
          state.username= null
          state.error= null
          state.isLoading= false
          state.pokemon= []
          state.pokeCatched= 0
        }
    },
    }
)

export default userSlice.reducer;
export const {setEmail, setUsername, resetUser, setError, setIsLoading, updatePokemon, setPokemon, setPokeCatched} = userSlice.actions;