export function serverSideValidationError(res){
  if(res.result){
      return ""
  }else{
      let ErrorMessage = "Server-side Validation Error\n"
      
      Object.keys(res.errors || []).forEach( function(value){
          ErrorMessage += "  " + value + " : " + this[value][0] +"\n"
      },res.errors)

      return ErrorMessage
  }
}

function withErrorMessage(result){
  console.log(result)
  if (!result.result){
      console.log("Server-side Validation Error")
      console.log(serverSideValidationError(result))
  }

  return Object.assign({}, result, {
    errorMessage: serverSideValidationError(result)
  })
}

function rest(URL, request) {
  const ret = fetch(URL, request)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.status);
      }
      return res.json()
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

export function get(path) {
  return rest(process.env.NEXT_PUBLIC_API_URL + path, {
    mode: 'cors',
    headers: {
      //'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    }
  })
}

export function post(path, body) {
  console.log("POST", JSON.stringify(body))
  return rest(process.env.NEXT_PUBLIC_API_URL + path, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY
    },
    body: JSON.stringify(body),
    mode: 'cors'
  })
}

export function put(path, body) {
  console.log("PUT", JSON.stringify(body))
  return rest(process.env.NEXT_PUBLIC_API_URL + path, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY
    },
    body: JSON.stringify(body),
    mode: 'cors'
  })
}

export function del(path, body) {
  return rest(process.env.NEXT_PUBLIC_API_URL + path, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY
    },
    body: JSON.stringify(body),
    mode: 'cors'
  })
}