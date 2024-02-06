import axios from 'axios'
import { v4 as uuid } from 'uuid';

/// A buffer for logs.
export default class LogBuffer {
  /// `LogBuffer` constructor.
  constructor() {
    this.logs = []
  }
  /// Enqueue a log into the log buffer.
  enqueueLog(log) {
    this.logs.push(log)
  }
  /// Upload the contents of the log buffer to the server.
  async uploadLogs() {
    // Create the request.
    let request = {
      "id": uuid(),
      "content": this.logs,
      "clientPlatform": "web",
      "date": new Date().toUTCString(),
    };
    // Submit a POST request to `/logs` endpoint.
    await axios.post('/logs', request)
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
  clearLogs() {
    this.logs.clear();
  }
}