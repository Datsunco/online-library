import { IUser } from "@/models/User";
import { createSlice, PayloadAction} from "@reduxjs/toolkit"


export interface UserState {
    users: IUser[];
    loading: boolean;
    error: null | string;
    count: number;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    count: 0
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment(state, action: PayloadAction<number>){
            state.count += action.payload
        }
    }
})

export default userReducer.reducer
