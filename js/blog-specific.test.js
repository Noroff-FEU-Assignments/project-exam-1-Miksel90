// Import the singleBlogPost function
import { singleBlogPost } from "./blog-specific";

// Mock the fetch function
global.fetch = jest.fn();

describe("singleBlogPost", () => {
  it("should fetch and return a single blog post", async () => {
    // Mock the response data
    const mockPost = { title: "Test Post", content: "This is a test post" };
    const mockResponse = {
      json: jest.fn().mockResolvedValue(mockPost),
    };
    fetch.mockResolvedValue(mockResponse);

    // Call the singleBlogPost function
    const post = await singleBlogPost();

    // Assertions
    expect(fetch).toHaveBeenCalledWith(fullPostURL); // Ensure fetch was called with the correct URL
    expect(mockResponse.json).toHaveBeenCalled(); // Ensure json() method was called on the response
    expect(post).toEqual(mockPost); // Ensure the function returns the expected post
  });
});
