interface UserDetails {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
}

// type PublicUserDetails = { id: number; username: string; email: string; }
type PublicUserDetails = Omit<UserDetails, 'passwordHash'>;

const publicData: PublicUserDetails = {
  id: 1,
  username: 'johndoe',
  email: 'john@example.com',
};