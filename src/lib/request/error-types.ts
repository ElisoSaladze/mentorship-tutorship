type RequestErrorTypes = 'client' | 'server' | 'decode_error' | 'network'

export type RequestError = TypeError & {
  type: RequestErrorTypes
  errors?: Record<string, string>
  url?: string
}

export const requestError = (error: RequestError): RequestError => {
  return error
}
