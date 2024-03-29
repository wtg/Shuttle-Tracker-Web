import axios from 'axios'
import { v4 as uuid } from 'uuid';

import store from '../store/index.js';

/// A buffer for logs.
export default class LogBuffer {
  /// `LogBuffer` constructor.
  constructor() {
    this.logs = [];
    this.uploads = [];
  }
  /// Enqueue a log into the log buffer.
  enqueue(log) {
    this.logs.push(log);
  }
  /// Upload the contents of the log buffer to the server.
  async upload() {
    // Check if there is anything to log.
    if (this.logs.length <= 0) {
      return;
    }
    // Concat the logs into the request content.
    let content = this.logs.join("\n");
    // Get the date. 
    let date = new Date();
    // `Date`'s `toIsoString` method includes milliseconds, which must be removed.
    let requestDate = date.toISOString().slice(0, -5) + 'Z';
    // Create the request.
    let request = {
      "id": uuid(),
      "content": content,
      "clientPlatform": "web",
      "date": requestDate,
    };
    // Submit a POST request to `/logs` endpoint.
    let endpoint = store.state.baseURL + '/logs';
    try {
      const response = await axios.post(endpoint, request);
      // Save the upload UUID.
      this.uploads.push({
        uuid: response.data,
        date: date,
        content: content,
      });
      // Clear the log buffer.
      this.logs = [];
    } catch {
      // Upload to server failed, set status.
      this.$store.commit("setServerStatus", { api: false });
    }
  }
}