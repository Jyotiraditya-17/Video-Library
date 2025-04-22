import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "../slicers/video-slicer";

export default configureStore({
    reducer : videoSlice
})