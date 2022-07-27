function request(
  methods: reqType = 'POST',
  url: string,
  data: Record<string, any>,
  headers: Record<string, string> = {},
) {
  return new Promise<Record<string, any>>((resolve, reject) => {
    const req = new XMLHttpRequest()

    req.open(methods, url)

    for (const key in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, key))
        req.setRequestHeader(key, headers[key])
    }

    req.responseType = 'json'

    req.send(JSON.stringify(data))

    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE && req.status === 200)
        resolve(req.response)
    }

    req.onerror = () => {
      reject(new Error('** An error occurred during the transaction'))
    }
  })
}

export type reqType = 'POST' | 'GET' | 'PUT' | 'DELETE'

export default request
