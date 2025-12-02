import React, { Suspense, lazy } from "react";

const Profile = lazy(() => import("./Profile.jsx"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile />
    </Suspense>
  );
}
