import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

const initialState: UserState = {
  email: '',
  id: 0,
  name: '',
  phone: '',
  username: '',
  website: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
