import React, { useState, useEffect } from "react";

export function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      );
      const newData = await res.json();
      if (!newData) return;

      // 👇 append new items instead of replacing
      setData((prev) => [...prev, ...newData]);
      setLoading(false);
    }

    loadData();
  }, [page]); // 👈 depend only on page

  const loadItems = (e) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;

    // when we are near the bottom
    if (!loading && scrollHeight - scrollTop <= clientHeight + 50) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div
      className="App"
      onScroll={loadItems}
      style={{
        height: "400px", // 👈 make it scrollable
        overflowY: "auto",
        border: "1px solid white",
      }}
    >
      <ul>
        {data.map(({ id, title }) => (
          <li key={id}>
            <span>{id}</span>
            <p>{title}</p>
          </li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}
    </div>
  );
}
