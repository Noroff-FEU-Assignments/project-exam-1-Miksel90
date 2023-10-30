const { getLatestPost } = require("./js/test/blogs.test,js"); // Replace with your actual file name

describe("getLatestPost", () => {
  it("should fetch and return an array of posts", async () => {
    const posts = await getLatestPost();
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThan(0);
  });

  // Add more test cases as needed
});
