//convert a string from camelCase to snake_case

let str = "oneCompilerPlatform";

const toSnakeCase = str.replace(/([A-Z])/g, "_$1").toLowerCase();

console.log(toSnakeCase);
// Expected output: one_compiler_platform