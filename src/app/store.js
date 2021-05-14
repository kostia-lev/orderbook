import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import orderBookReducer from '../features/orderbook/orderBookSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    orderBook: orderBookReducer,
  },
});
