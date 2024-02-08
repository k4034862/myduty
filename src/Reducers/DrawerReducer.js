import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  appBarLTitle: "Home",
  appBarMTitle: "",
  mobileMenuToggle: false,
};

const DrawerSlice = createSlice({
  name: "Drawer",
  initialState,
  reducers: {
    setAppBarLTitle(state, action) {
      state.appBarLTitle = action.payload;
    },
    setAppBarMTitle(state, action) {
      state.appBarMTitle = action.payload;
    },
    openMobileMenuToggle(state, action) {
      state.mobileMenuToggle = true;
    },
    closeMobileMenuToggle(state, action) {
      state.mobileMenuToggle = false;
    },
  },
});

export default DrawerSlice.reducer;
export const DrawerActions = DrawerSlice.actions;
