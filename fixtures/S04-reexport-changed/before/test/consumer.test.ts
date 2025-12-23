import { useIt } from "../src/app/consumer";

test("useIt", () => {
  expect(useIt()).toBeDefined();
});
