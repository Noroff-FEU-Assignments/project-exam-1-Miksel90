import { getLatestPost } from "./blogs.js";

describe("getLatestPost", () => {
  it("should fetch and return an array of posts", async () => {
    const posts = await getLatestPost();
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThan(0);
  });
});
