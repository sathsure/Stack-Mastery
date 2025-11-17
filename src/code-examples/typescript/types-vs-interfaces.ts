// Declaration Merging (Interface only)
interface Config {
  apiUrl: string;
}

interface Config {
  timeout: number;
}

const appConfig: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

// This would cause an error with type aliases:
// type MyType = { a: string };
// type MyType = { b: number }; // Error: Duplicate identifier 'MyType'.
