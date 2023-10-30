import { checkLength } from "./contact.js";

describe("checkLength", () => {
  it("should return true if the input length is equal to or greater than the specified length", () => {
    const result = checkLength("abcdef", 3);
    expect(result).toBe(true);
  });

  it("should return false if the input length is less than the specified length", () => {
    const result = checkLength("abc", 5);
    expect(result).toBe(false);
  });

  it("should return true if the input length is equal to the specified length", () => {
    const result = checkLength("12345", 5);
    expect(result).toBe(true);
  });

  it("should return true if the input length is greater than the specified length", () => {
    const result = checkLength("xyz", 1);
    expect(result).toBe(true);
  });

  it("should handle whitespace and trim the input before checking the length", () => {
    const result = checkLength("   abc  ", 3);
    expect(result).toBe(true);
  });
});
