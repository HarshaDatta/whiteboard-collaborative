import { configureStore } from "@reduxjs/toolkit";
import whiteboardSliceReducer from "../whiteboard/whiteboardSlice";
import cursorSliceReducer from "../cursorOverlay/cursorSlice";

export const store = configureStore({
  reducer: {
    whiteboard: whiteboardSliceReducer,
    cursor: cursorSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["whiteboard/setElements"],
        ignoredPaths: ["whiteboard.elements"],
      },
    }),
});
