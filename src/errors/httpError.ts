export class HttpException extends Error {
  code: number;
  name: string = "HttpException";
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
  
  toString() {
    return this.message;
  }
}