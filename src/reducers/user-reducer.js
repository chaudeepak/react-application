import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLoggedInUser = createAsyncThunk(
    "user/getLoggedInUser", 
    async(data, thunkAPI) => {
        let token = localStorage.getItem("token") ?? null;
        if(token) {
            try{
                let response = await axios.post(
                    'https://reqres.in/api/login', data,
                    {
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    }
                )
                localStorage.setItem('token', response.data.token);
                console.log("123")
            } catch(exception){
                console.log(exception)
            }
            // console.log(token);
            console.log("user here")
            return response.data.token
        } else {
            throw "Token not set"
        }
    }
)

const UserSlicer = createSlice({
    name: "user", 
    initialState: {
        loggedInUser: null
    },
    reducers: {
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload
            // console.log(state);
            console.log(action);
        },
        logoutUser: (state, action) => {
            state.loggedInUser = null;
            localStorage.removeItem('token');
        },
        extraReducers: (builder) => {
            builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.loggedInUser = action.payload
            })
            builder.addCase(getLoggedInUser.rejected, (state, action) => {
                state.loggedInUser = null;
                localStorage.removeItem('token');
                console.log(state)
            })
        }
    }
})

export const { setLoggedInUser, logoutUser } = UserSlicer.actions;
export default UserSlicer.reducer;