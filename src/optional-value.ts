import {NoSuchElementException} from "./no-such-element.exception.ts";

/**
 * Represents an optional value that may or may not be present.
 *
 * You can call this class directly, or use "Optional.of()".
 *
 * @example
 * // direct call
 * const optionalNumber = new OptionalValue<number>(5);
 * console.log(optionalNumber.get()); // Prints: 5
 *
 * @example
 * // isPresent-call
 * const optionalNumber = new OptionalValue<number>(null);
 * console.log(optionalNumber.isPresent()); // Prints: false
 *
 * @example
 * // orElse-call
 * const optionalNumber = Optional.of(null).orElse(5);
 * console.log(optionalNumber.get()); // Prints: 5
 */
export class Optional<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
    return this;
  }

  /**
   * Creates an optional value.
   * This can be used to explicitly define nullable or undefined values.
   *
   * @example
   * // create a basic optional
   * const httpResponse = await fetch("my.api.com");
   * const value = await httpResponse.json();
   * Optional.of(value);
   *
   * // return an alternative value, if given value is null
   * const httpResponse = await fetch("my.api.com/users");
   * const value = await httpResponse.json();
   * var users = Optional.of(value).orElse([]);
   */
  static of<T>(value: T): Optional<T> {
    return new Optional(value);
  }

  /**
   * Return the value, if not null.
   */
  public get(): T {
    if (!this.isPresent()) {
      throw new NoSuchElementException();
    }
    return this._value;
  }

  /**
   * Return an alternative value, if given value is null.
   *
   * @example
   * const httpResponse = await fetch("my.api.com/users");
   * const value = await httpResponse.json();
   * var users = Optional.of(value).orElse([]);
   *
   * @param value the alternative value
   */
  public orElse(value: T): Optional<T> {
    if (this.isEmpty()) {
      this._value = value;
    }
    return this;
  }

  /**
   * Executes the provided function if the value is present.
   *
   * @param {Function} func - The function to be executed if the value is present.
   *                       It takes a single parameter, which is the value of type T.
   *
   * @return {void}
   */
  public ifPresent(func: (value: T) => void): void {
    if (this.isPresent()) {
      func(this._value);
    }
  }

  /**
   * Returns, if the value is null or undefined.
   *
   * @return {boolean} Returns true if the instance is empty, false otherwise.
   */
  public isEmpty(): boolean {
    return !this.isPresent();
  }

  /**
   * Returns, if the value is present (not null or undefined).
   *
   * @returns {boolean} - Returns true if the value is not null or undefined, otherwise returns false.
   */
  public isPresent(): boolean {
    return this._value !== null && this._value !== undefined;
  }

  /**
   * Checks if the value is present and satisfies the given predicate.
   *
   * @example
   * // Using isPresentAnd with a predicate:
   * const optionalNumber = new OptionalValue<number>(5);
   * console.log(optionalNumber.isPresentAnd(value => value > 0));  // Prints: true
   *
   * @example
   * // Type checking with isPresentAnd:
   * const value = Optional.of(2);
   *
   * function isNumberValue(value: any): value is number {
   *    return typeof value === "number";
   * }
   *
   * console.log(value.isPresentAnd(isNumberValue)); // Prints: true
   *
   * @param {Function} predicate - The predicate function that takes a value of type T and returns a boolean value.
   * @return {boolean} - Returns true if the value is present and satisfies the predicate; otherwise, false.
   */
  public isPresentAnd(predicate: (value: T) => boolean): boolean {
    return this.isPresent() && predicate(this._value);
  }

  /**
   * Executes the given async function if the value is not null.
   *
   * @param {Function} func - The asynchronous function to execute.
   * @returns {Promise} A promise that resolves once the function execution is complete.
   */
  async ifPresentAsync(func: (value: T) => Promise<void>): Promise<void> {
    if (this.isPresent()) {
      await func(this._value);
    }
  }
}