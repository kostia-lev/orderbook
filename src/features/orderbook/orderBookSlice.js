import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  precision: 'precise',
  orderBook: [],
};

export const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    setPrecision: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.precision = action.payload;
    },
    initOrderBook: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.orderBook = action.payload[action.payload.length - 1];
    },
    updateBook: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const index = state.orderBook.findIndex((stateBook) => {
        const statePrice = stateBook[0];
        return action.payload[0] ===
          statePrice && (action.payload[2] > 0 ? stateBook[2] > 0 : stateBook[2] < 0);
      });
      if (index < 0) {
        state.orderBook.push(action.payload);
        return;
      }

      if (action.payload[1] > 0) {
        state.orderBook[index] = action.payload;
      }

      state.orderBook.splice(index, 1);

    }
  },
});

export const { incrementByAmount, initOrderBook, updateBook, setPrecision } = orderBookSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrderBook = (state) => state.orderBook.orderBook;
export const selectBuyOrderBook = (state) => state.orderBook.orderBook.filter(book => book[2] > 0);
export const selectSellOrderBook = (state) => state.orderBook.orderBook.filter(book => book[2] < 0);
export const selectPrecision = (state) => state.orderBook.precision;


export default orderBookSlice.reducer;
