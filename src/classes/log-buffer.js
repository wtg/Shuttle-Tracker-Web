/// A buffer for logs.
export default class LogBuffer {
  constructor() {
    this.logs = []
  }
  pushLog(log) {
    this.logs.push(log)
  }
  async uploadLogs() {
    // Create the request.
    let request = {
      "id": uuid(),
      "content": state.logBuffer,
      "clientPlatform": "web",
      "date": new Date().toUTCString(),
    };
    // Submit a POST request to `/logs` endpoint.
    await axios.post('/logs', request)
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.error(error);
      })
  }
}