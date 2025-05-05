import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated']
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'total']
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    cart: persistReducer(cartPersistConfig, cartReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
export default store;