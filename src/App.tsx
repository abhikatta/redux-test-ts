import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByValue,
} from "./store/counterSlice";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
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
        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
