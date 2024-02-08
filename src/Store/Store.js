import { configureStore } from "@reduxjs/toolkit";
/** Reducers Import */
import DrawerReducer from "../Reducers/DrawerReducer";

export default configureStore({
	reducer: {
		Drawer: DrawerReducer,
	},
});
