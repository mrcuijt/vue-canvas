import { api, path } from '../../../api/axios'

var wsLoad = function (url, success, fail) {
  var basePath = path()
  api.get(basePath + url, {})
    .then(success)
    .catch(fail)
}

export { wsLoad }