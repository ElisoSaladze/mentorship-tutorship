import { createRequest } from './create-request'

export const request = <Path extends string>(url: Path) => {
  return {
    get: createRequest('GET', url),
    post: createRequest('POST', url),
    put: createRequest('PUT', url),
    patch: createRequest('PATCH', url),
    delete: createRequest('DELETE', url),
  }
}
