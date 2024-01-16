import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Optional} from "./optional-value.ts";
import {NoSuchElementException} from "./no-such-element.exception.ts";

describe("Optional", () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

  beforeEach(() => {
    consoleSpy.mockReset();
  });

  describe("get", () => {
    it("should return the value of the optional", () => {
      const value = Optional.of("test");
      expect(value.get()).toBe("test");
    })

    it("should throw, if the value is null", () => {
      const value = Optional.of(null);
      expect(() => value.get()).toThrowError(NoSuchElementException)
    })

    it("should throw, if the value is undefined", () => {
      const value = Optional.of(undefined);
      expect(() => value.get()).toThrowError(NoSuchElementException)
    })
  })

  describe("orElse", () => {
    it("should return the else value of the optional", () => {
      const value = Optional.of<string>(null as any).orElse("else value");
      expect(value.get()).toBe("else value");
    })
  })

  describe("ifPresent", () => {
    it("should call a function, if the value is present", () => {
      const colorList = Optional.of(['blue', 'green']);

      colorList.ifPresent((value) => {
        value.forEach((color) => console.log(color));
      })

      expect(consoleSpy).toHaveBeenNthCalledWith(1, 'blue');
      expect(consoleSpy).toHaveBeenNthCalledWith(2, 'green');
    })

    it("should not call a function, if the value is not present", () => {
      const colorList = Optional.of(null as any);

      colorList.ifPresent((value) => {
        value.forEach((color: any) => console.log(color));
      })

      expect(consoleSpy).not.toHaveBeenCalled();
    })
  })

  describe("isPresent", () => {
    it("should return true if the value of the optional is present", () => {
      const value = Optional.of("test");
      expect(value.isPresent()).toBeTruthy();
    })
  })

  describe("isEmpty", () => {
    it("should return true if the value of the optional is null", () => {
      const value = Optional.of(null);
      expect(value.isEmpty()).toBeTruthy();
    })

    it("should return true if the value of the optional is undefined", () => {
      const value = Optional.of(undefined);
      expect(value.isEmpty()).toBeTruthy();
    })
  })

  describe("isPresentAnd", () => {
    it("should return true, if value is a string", () => {
      const value = Optional.of("a string");

      function isStringValue(value: any): value is string {
        return typeof value === "string";
      }

      const isString = value.isPresentAnd(isStringValue);

      expect(isString).toBeTruthy();
    })

    it("should return true, if value is a number", () => {
      const value = Optional.of(2);

      function isNumberValue(value: any): value is number {
        return typeof value === "number";
      }

      const isNumber = value.isPresentAnd(isNumberValue);

      expect(isNumber).toBeTruthy();
    })

    it("should return false, if value is not a boolean", () => {
      const value = Optional.of(true);

      function isStringValue(value: any): value is boolean {
        return typeof value === "string";
      }

      const isString = value.isPresentAnd(isStringValue);

      expect(isString).toBeFalsy();
    })

    it("should return true, if value is greater than 5", () => {
      const value = Optional.of(6);

      const isGreaterThanFive = value.isPresentAnd((value) => value > 5);

      expect(isGreaterThanFive).toBeTruthy();
    })
  })
})