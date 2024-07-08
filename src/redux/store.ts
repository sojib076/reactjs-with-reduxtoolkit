import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import { baseApi } from './api/baseApi'; 
import userReducer from './features/userSlice'; 


const persistConfig = {
  key: 'root', 
  storage, 
};


const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, 
    user: persistedReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [ 
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PURGE',
        ],
      },
    }).concat(baseApi.middleware),
});

// Export the store and persistor
export default store;
export const persistor = persistStore(store);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
