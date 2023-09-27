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
  
        // dispatch(setUser(postData.email));
        // dispatch(clearUserInput());
        // localStorage.setItem("user", postData.email);
        // navigate("/home");

        return postData;
      } catch (error:any) {
        // setSignupError(error.message);
        throw error;
      }
})

interface userState {
    email: string|null,
    error: string | null,
    isLoading: boolean,
    isCatching: boolean
}

const initialState: userState = {
    email: null,
    error: null,
    isLoading: false,
    isCatching: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setEmail:(state, action)=>{
            state.email = action.payload
        },
        setIsCatching:(state, action)=>{
          state.isCatching = action.payload
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
            state.isLoading = false;
            localStorage.setItem("user", action.payload[0].email);
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
            state.isLoading = false;
            localStorage.setItem("user", action.payload.email);
            console.log(action.payload);
            
        })
        builder.addCase(userSignup.rejected, (state, action)=>{
            state.error = action.error.message!;
            state.isLoading = false;
        })
    }

    }
)

export default userSlice.reducer;
export {userLogin, userSignup}
export const {setEmail, setIsCatching} = userSlice.actions;