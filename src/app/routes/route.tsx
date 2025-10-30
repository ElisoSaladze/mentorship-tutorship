import NotFound from '~/pages/not-found'
import { useRoutes } from 'react-router-dom'

import { routes } from './routes'

/**
 * Component for rendering  routes.
 *
 * @returns JSX element representing the  routes.
 */
export const Routes = () => {
  return useRoutes([
    ...routes,
    {
      path: '*',
      element: <NotFound />,
    },
  ])
}
