import { RequestType } from './create-request'

export const createRequestBody = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any> | undefined,
  type: RequestType,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (!body) return

  if (type === 'json') return JSON.stringify(body)

  // For file uploads, create FormData
  const formData = new FormData()

  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        for (const item of value) {
          if (item instanceof File) {
            formData.append(key, item)
          } else {
            formData.append(key, item)
          }
        }
      } else if (value instanceof File) {
        formData.append(key, value)
      } else if (typeof value === 'object') {
        // For nested objects (like the data field), stringify as JSON blob
        formData.append(key, new Blob([JSON.stringify(value)], { type: 'application/json' }))
      } else {
        formData.append(key, String(value))
      }
    }
  }

  return formData
}
