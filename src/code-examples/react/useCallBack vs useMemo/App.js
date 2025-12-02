import { useCallback, useMemo, useState } from "react";
import List from "./List";

export default function App() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  /** useCallback:
   *  Returns the memoized **function itself**.
   *  The function is recreated only when `number` changes.
   */
  const getItems = useCallback(() => {
    return [number, number + 1, number + 2];
  }, [number]);

  /** useMemo:
   *   Returns the **value produced by the function**, not the function.
   *   The array is recomputed only when `number` changes.
   */
  // const getItems = useMemo(() => {
  //   return [number, number + 1, number + 2];
  // }, [number]);

  const theme = {
    backgroundColor: dark ? "#333" : "#FFF",
    color: dark ? "#FFF" : "#333",
  };

  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Toggle Theme
      </button>
      <List getItems={getItems} />
    </div>
  );
}
