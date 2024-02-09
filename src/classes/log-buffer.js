import axios from 'axios'
import { v4 as uuid } from 'uuid';

import store from '../store/index.js';

/// A buffer for logs.
export default class LogBuffer {
  /// `LogBuffer` constructor.
  constructor() {
    this.logs = [];
  }
  /// Enqueue a log into the log buffer.
  enqueue(log) {
    this.logs.push(log);
  }
  /// Upload the contents of the log buffer to the server.
  async upload() {
    // Concat the logs into the request content.
    let content = this.logs.join("\n");
    // Get the date. `Date`'s `toIsoString` method includes milliseconds. These must be removed to follow the logging requirements.
    let date = new Date().toISOString().slice(0, -5) + 'Z';
    // Create the request.
    let request = {
      "id": uuid(),
      "content": content,
      "clientPlatform": "web",
      "date": date,
    };
    // Submit a POST request to `/logs` endpoint.
    let endpoint = store.state.baseURL + '/logs';
    await axios.post(endpoint, request)
      .then(function (response) {
        console.log(response);
        // Clear the log buffer.
        this.clear();
      })
      .catch(function (error) {
        console.error(error);
      })
  }
  /// Clear the log buffer.
  clear() {
    this.logs.clear();
  }
}