import { v4 as uuid } from 'uuid';

// Used for logging.
export default class Log {
  constructor(content) {
    this.uuid = uuid();
    this.content = content;
    this.date = new Date().toUTCString();
  }
}