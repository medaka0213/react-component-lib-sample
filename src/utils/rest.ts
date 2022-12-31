function rest(URL: string, request: any) {
  const ret = fetch(URL, request)
    .then((res: any) => {
      if (!res.ok) {
        throw Error(res.status);
      }
      return res.json();
    })
    .then((payload) => {
      return { payload };
    })
    .catch((error) => {
      console.error(error);
      return { error };
    });
  return ret;
}

export function get(path: string) {
  return rest(process.env.NEXT_PUBLIC_API_URL + path, {
    mode: 'cors',
    headers: {
      //'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    },
  });
}

export function post(path: string, body: any) {
  console.log('POST', JSON.stringify(body));
  return rest(process.env.NEXT_PUBLIC_API_URL + path, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify(body),
    mode: 'cors',
  });
}

export function put(path: string, body: any) {
  console.log('PUT', JSON.stringify(body));
  return rest(process.env.NEXT_PUBLIC_API_URL + path, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify(body),
    mode: 'cors',
  });
}

export function del(path: string, body: any) {
  return rest(process.env.NEXT_PUBLIC_API_URL + path, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify(body),
    mode: 'cors',
  });
}
