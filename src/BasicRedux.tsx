import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByValue,
} from "./store/counter/counterSlice";
import { clearInput, setInput } from "./store/input/inputSlice";

function BasicRedux() {
  const count = useSelector((state: RootState) => state.counter.value);
  const input = useSelector((state: RootState) => state.input.value);
  // app dispatch is needed when working with async functions
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div>
        <button onClick={() => dispatch(increment())}>incre</button>
        <button onClick={() => dispatch(incrementAsync(10))}>
          incre async
        </button>
        <button onClick={() => dispatch(decrement())}>decre</button>
        <button onClick={() => dispatch(incrementByValue(2))}>
          incre by 2
        </button>
        <p>Counter: {count}</p>
      </div>
      <div>
        <input
          placeholder="enter a value"
          value={input}
          onChange={(e) => dispatch(setInput(e.target.value))}></input>
        <button
          onClick={() => {
            dispatch(clearInput());
          }}>
          clear input
        </button>
      </div>

      <p>{input ? input : "Enter an input above"}</p>
    </>
  );
}

export default BasicRedux;
