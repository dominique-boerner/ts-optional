/**
 * Class representing a NoSuchElementException.
 * @extends Error
 */
export class NoSuchElementException extends Error{
  constructor(message?: string){
    super(message);
    this.name = "NoSuchElementException";
  }
}