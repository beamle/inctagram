import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authApi } from '@/shared/api'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isAdminLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, state => {
      state.isLoggedIn = true
    })
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
      state.isLoggedIn = false
    })
    builder.addMatcher(authApi.endpoints.me.matchFulfilled, state => {
      state.isLoggedIn = true
    })
    builder.addMatcher(authApi.endpoints.loginViaGoogle.matchFulfilled, state => {
      state.isLoggedIn = true
    })
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions
