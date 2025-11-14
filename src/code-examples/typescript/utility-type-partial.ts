interface User {
  id: number;
  name: string;
  email: string;
}

// type PartialUser = { id?: number; name?: string; email?: string; }
type PartialUser = Partial<User>;

const updateProfile = (fields: PartialUser) => {
  // function that can accept an object with any subset of User properties
};

updateProfile({ name: 'Jane Doe' }); // Valid