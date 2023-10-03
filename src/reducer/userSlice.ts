import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const userLogin= createAsyncThunk("user/userLogin", async ({username, password}:{username:string, password:string}) => {
    try {
        const response = await fetch(
          `http://localhost:3000/user?username=${username}`
        );
        const data = await response.json();
  
        if (data.length === 0) {
          throw Error("Username not found!");
        }
  
        if (data[0].password !== password) {
          throw Error("Wrong Password!");
        }
        return data;
      } catch (error:any) {
        throw error
      }
})

interface SignupType{
    username:string, email:string, password:string, repeatPassword:string
}

const userSignup = createAsyncThunk("user/userSignup", async({username, email, password, repeatPassword}:SignupType)=>{
    try {
        // setSignupError(null);
  
        const usernameRes = await fetch(
          `http://localhost:3000/user?username=${username}`
        );
        const usernameData = await usernameRes.json();
  
        const emailRes = await fetch(`http://localhost:3000/user?email=${email}`);
        const emailData = await emailRes.json();
  
        if (usernameData.length > 0) {
          throw Error("Username already exist!");
        }
  
        if (emailData.length > 0) {
          throw Error("Email already exist!");
        }
  
        if (password !== repeatPassword) {
          throw Error("Password not same");
        }
  
        const postRes = await fetch("http://localhost:3000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            pokemonCatched: 0,
          }),
        });
  
        const postData = await postRes.json();

        return postData;
      } catch (error:any) {
        // setSignupError(error.message);
        throw error;
      }
})

const fetchPokemon = createAsyncThunk("user/fetchPokemon",async (username:string) => {
  const data = await fetch(`http://localhost:3000/pokemonSaved?user=${username}`);
  const response = await data.json()
  return response
})

const deletePokemon = createAsyncThunk("user/deletePokemon", async (id:number) => {
  fetch(`http://localhost:3000/pokemonSaved/${id}`, {
    method: "DELETE",
  });
  return id;
});

const fetchUser = createAsyncThunk("user/fetchUser",async (username:string) => {
  const data = await fetch(`http://localhost:3000/user?username=${username}`);
  const response = await data.json()
  return response
})

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
        resetUser: (state)=>{
          state.email= null
          state.username= null
          state.error= null
          state.isLoading= false
          state.pokemon= []
          state.pokeCatched= 0
        }
    },
    extraReducers:(builder)=>{
        // Login
        builder.addCase(userLogin.pending, (state)=>{
            state.error = null;
            state.isLoading = true;
        })
        builder.addCase(userLogin.fulfilled, (state, action)=>{
            state.email = action.payload[0].email;
            state.username = action.payload[0].username;
            state.pokeCatched = action.payload[0].pokemonCatched;
            state.isLoading = false;
            chrome.storage.local.set({
              email: action.payload[0].email,
              username: action.payload[0].username
            })
        })
        builder.addCase(userLogin.rejected, (state, action)=>{
            state.error = action.error.message!;
            state.isLoading = false;
        })

        // Signup
        builder.addCase(userSignup.pending, (state)=>{
            state.error = null;
            state.isLoading = true;
        })

        builder.addCase(userSignup.fulfilled, (state, action)=>{
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.isLoading = false;
            chrome.storage.local.set({
              email: action.payload.email,
              username: action.payload.username
            })
        })

        builder.addCase(userSignup.rejected, (state, action)=>{
            state.error = action.error.message!;
            state.isLoading = false;
        })

        // FetchPokemon
        builder.addCase(fetchPokemon.fulfilled, (state, action) => {
          state.pokemon = action.payload;
        })

        builder.addCase(deletePokemon.fulfilled, (state, action) => {
          state.pokemon = state.pokemon.filter((val) => {
            return val.id !== action.payload;
          });
        });

        // FetchUser data
        builder.addCase(fetchUser.fulfilled, (state, action) => {
          state.email = action.payload[0].email;
          state.username = action.payload[0].username;
          state.pokeCatched = action.payload[0].pokemonCatched;
        });
    }

    }
)

export default userSlice.reducer;
export {userLogin, userSignup, fetchPokemon, deletePokemon, fetchUser}
export const {setEmail, setUsername, resetUser} = userSlice.actions;