const apiPath = '/api/v1'
export const SERVER = 'http://localhost:3000'

export default {
  dishesPath: () => [apiPath, 'dishes'].join('/'),
  authPath: () => [apiPath, 'auth', 'login'].join('/'),
  registerPath: () => [apiPath, 'auth', 'register'].join('/'),
  deletePath: () => [apiPath, 'auth', 'delete-account'].join('/')
}
