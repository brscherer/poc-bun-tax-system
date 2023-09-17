import { expect, test } from "bun:test";
import { getCurrentDateFormatted } from "../../src/utils/selectors";

test("should return current date formatted as YYYY-MM-DD", () => {
  const currDate = new Date();
  const currYear = currDate.getFullYear();
  const currMonth =
    currDate.getMonth() < 9
      ? `0${currDate.getMonth() + 1}`
      : currDate.getMonth() + 1;
  const currDay = currDate.getDate();

  expect(getCurrentDateFormatted()).toBe(`${currYear}-${currMonth}-${currDay}`);
});
