import useCounter from "./useCounter";

function Counter() {
  const { count, increment, decrement, reset } = useCounter(1);
  return (
    <>
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}

export default Counter;
