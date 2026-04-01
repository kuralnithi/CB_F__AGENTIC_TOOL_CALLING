import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  theme: 'dark' | 'light';
  isAuthModalOpen: boolean;
}

const initialState: UiState = {
  theme: 'dark',
  isAuthModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
  },
});

export const { toggleTheme, openAuthModal, closeAuthModal } = uiSlice.actions;
export default uiSlice.reducer;
