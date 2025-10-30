import { ComponentType } from 'react'

/**
 * A function to retry loading a chunk to avoid load error for out-of-date code.
 *
 * @param componentImport A function that imports a component asynchronously.
 * @returns A promise resolving to the imported component.
 */
export const importWithRetry = <C extends { default: ComponentType<unknown> }>(
  componentImport: () => Promise<C>,
): Promise<C> => {
  return new Promise((resolve, reject) => {
    componentImport()
      .then(component => {
        resolve(component)
      })
      .catch(error => {
        reject(error)
      })
  })
}
