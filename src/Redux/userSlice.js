
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
        },
        removeUserFromTeam: (state, action) => {
            const data = action.payload;
            state.teamUser = state.teamUser.filter((user) => user._id !== data._id);
        }
        
    }
});

export const { addUserToTeam, removeUserFromTeam} = userSlice.actions;

export const selectSelectedUsers = (state) => state.user;

export default userSlice.reducer;
