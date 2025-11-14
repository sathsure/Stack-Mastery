const getUserData = () => {
  return { id: 1, name: "Alice", role: "admin" };
};

// type UserDataType = { id: number; name: string; role: string; }
type UserDataType = ReturnType<typeof getUserData>;

const currentUser: UserDataType = {
  id: 2,
  name: "Bob",
  role: "user",
};
