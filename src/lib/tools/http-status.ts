export interface HttpStatus {
  code: number;
  text: string;
  description: string;
  category: string;
}

export const HTTP_STATUS_CODES: HttpStatus[] = [
  { code: 100, text: "Continue", description: "The server has received the request headers and the client should proceed to send the request body.", category: "Informational" },
  { code: 101, text: "Switching Protocols", description: "The server is switching protocols as requested by the client.", category: "Informational" },
  { code: 200, text: "OK", description: "The request was successful.", category: "Success" },
  { code: 201, text: "Created", description: "The request was successful and a new resource was created.", category: "Success" },
  { code: 202, text: "Accepted", description: "The request has been accepted for processing.", category: "Success" },
  { code: 204, text: "No Content", description: "The request was successful but there is no content to send.", category: "Success" },
  { code: 301, text: "Moved Permanently", description: "The resource has been permanently moved to a new URL.", category: "Redirection" },
  { code: 302, text: "Found", description: "The resource temporarily resides under a different URL.", category: "Redirection" },
  { code: 304, text: "Not Modified", description: "The resource has not been modified since the last request.", category: "Redirection" },
  { code: 400, text: "Bad Request", description: "The server could not understand the request due to invalid syntax.", category: "Client Error" },
  { code: 401, text: "Unauthorized", description: "Authentication is required to access the resource.", category: "Client Error" },
  { code: 403, text: "Forbidden", description: "The server understood the request but refuses to authorize it.", category: "Client Error" },
  { code: 404, text: "Not Found", description: "The requested resource could not be found.", category: "Client Error" },
  { code: 405, text: "Method Not Allowed", description: "The request HTTP method is not allowed for the resource.", category: "Client Error" },
  { code: 408, text: "Request Timeout", description: "The server timed out waiting for the request.", category: "Client Error" },
  { code: 409, text: "Conflict", description: "The request conflicts with the current state of the resource.", category: "Client Error" },
  { code: 410, text: "Gone", description: "The resource has been permanently removed.", category: "Client Error" },
  { code: 422, text: "Unprocessable Entity", description: "The request was well-formed but semantically erroneous.", category: "Client Error" },
  { code: 429, text: "Too Many Requests", description: "The client has sent too many requests in a given time.", category: "Client Error" },
  { code: 500, text: "Internal Server Error", description: "The server encountered an unexpected condition.", category: "Server Error" },
  { code: 501, text: "Not Implemented", description: "The server does not support the functionality required.", category: "Server Error" },
  { code: 502, text: "Bad Gateway", description: "The server received an invalid response from the upstream server.", category: "Server Error" },
  { code: 503, text: "Service Unavailable", description: "The server is currently unable to handle the request.", category: "Server Error" },
  { code: 504, text: "Gateway Timeout", description: "The upstream server failed to respond in time.", category: "Server Error" },
];

export function searchHttpStatus(query: string): HttpStatus[] {
  const lower = query.toLowerCase();
  return HTTP_STATUS_CODES.filter(
    (s) =>
      s.code.toString().includes(lower) ||
      s.text.toLowerCase().includes(lower) ||
      s.category.toLowerCase().includes(lower)
  );
}
