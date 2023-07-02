import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

// Membuat slice untuk user
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    // Mengubah isFetching menjadi true saat login dimulai
    loginStart: (state) => {
      state.isFetching = true;
    },
    // Mengupdate state setelah login berhasil
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    // Mengubah state saat login gagal
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Menghapus data persisten saat logout
    logout: () => {
      storage.removeItem('persist:root')
    },
  },
});

// Mengexport action creators dari slice
export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

// Mengexport reducer dari slice
export default userSlice.reducer;
