import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import emailReducer from "../redux/features/email/emailSlice";
import filterReducer from "../redux/features/auth/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    filter: filterReducer,
  },
});



// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../redux/features/auth/authSlice";
// import emailReducer from "../redux/features/email/emailSlice";
// import filterReducer from "../redux/features/auth/filterSlice";

// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// // Redux Persist Configuration
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user"], // Persist only the 'user' slice
// };

// // Create a persisted reducer
// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer,
//     email: emailReducer,
//     filter: filterReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           "persist/PERSIST",
//           "persist/REHYDRATE",
//           "persist/REGISTER",
//           "persist/FLUSH",
//           "persist/PAUSE",
//           "persist/PURGE",
//         ], // Ignore redux-persist actions
//       },
//     }),
// });

// export const persistor = persistStore(store);
// export default store;
