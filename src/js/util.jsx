

export function fetch_with_json(url, body, request_type='POST') {
  return fetch(url, {
    credentials: 'same-origin',
    method: request_type,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

