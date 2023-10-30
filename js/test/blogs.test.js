const { getLatestPost } = require("../test/blogs.test.js");

describe("getLatestPost", () => {
  it("should fetch and return an array of posts", async () => {
    const posts = await getLatestPost();
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThan(0);
  });

  // Add more test cases as needed
});
