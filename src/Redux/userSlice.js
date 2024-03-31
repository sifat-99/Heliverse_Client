
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        teamUser: [],
        totalUsers: [],
        error: null,
    },
    reducers: {
        addUserToTeam: (state, action) => {
            const data = action.payload;
            state.teamUser.push(data);
        }
        
    }
});

export const { addUserToTeam} = userSlice.actions;

export const selectSelectedUsers = (state) => state.user;

export default userSlice.reducer;
