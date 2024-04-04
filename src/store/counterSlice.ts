// has all related to counter- actions, reducers, state
// 1. define state

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}
const initialState: CounterState = {
  value: 0,
};
// this does most things (removes so much boilerplate code
// for us) just using createSlice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  // dont know how this is being understood by ts
  // whats a writable draft?
  reducers: {
    // immutability?
    // 'action' can also be passed as param, by rn its not needed
    increment: (state) => {
      // createSlice does lot of things for us, so it automatically
      // understands this mutation code and follows immutability
      // makes a copy, updates it, returns new state
      // THIS IS NOT MUTATING CODE AS CREATESLICE IS BEING USED HERE
      state.value += 1;
    },
    decrement: (state) => {
      // same as above
      state.value -= 1;
    },
    // action can be defined in any way we want, instead of <number>
    // we can pass an inteface/object like <value:number>
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  // builder is tool to add cases to these reducers
  // as we have different states in async like pending, done, reject etc
  extraReducers: (builder) =>
    builder
      .addCase(incrementAsync.pending, () => {
        console.log("incrementAsync pending");
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        }
      ),
});

// called actions here, but originally they are passed as reducers in above slice
const { increment, decrement, incrementByValue } = counterSlice.actions;

// exports
export const incrementAsync = createAsyncThunk(
  // names have to be given by us in async functions
  "incrementAsyncMock",
  async (value: number) => {
    // mock 1 sec
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return value;
  }
);
export { increment, decrement, incrementByValue };

// export reducer
export default counterSlice.reducer;

// point to note: names are also automatically given to reducers (sync actions not for async) by reduxtoolkit
// generally names are given as :
// name of slice /reducer name
// as example in this case (can check from dev tools) :
//  counter/increment, counter/decrement, counter/incrementByValue and so on
// BUT : names have to be given by us in ASYNC functions

// in async actions:
// define actions first(createAsyncThunk) then reducers which in reverse in normal function

// actions go in bottom in async actions called extraReducers
