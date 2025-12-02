import { useState, useContext, createContext } from "react";

const ThemeContext = createContext();
// ----------------------
// App Component
// ----------------------
export default function App() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <Home />
    </ThemeContext.Provider>
  );
}

// ----------------------
// Home Component
// ----------------------
function Home() {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: dark ? "#111" : "#fff",
        color: dark ? "#fff" : "#000",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1>{dark ? "Dark Mode" : "Light Mode"}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
