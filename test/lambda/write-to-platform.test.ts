import input from "../../inputs/writeToPlatformInput.json";
import { handler } from "../../src/lambda/write-to-platform";

test("Write To Platform Function Handler", async () => {
  const res = await handler(input);
  expect(res).toEqual({
    Case: "001",
    Message: "Case 001: opened...",
  });
});
