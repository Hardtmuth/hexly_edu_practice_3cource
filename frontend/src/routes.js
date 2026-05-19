const apiPath = '/api/v1'
export const SERVER = 'http://localhost:3000'

export default {
  dishesPath: () => [apiPath, 'dishes'].join('/'),
}
