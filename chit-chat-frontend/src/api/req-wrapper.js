import axios from 'axios'
import handler from './res-handler'
import {API_BASE_URL} from '../constants/index'

const URI_PREPENDER = '/api/v1'
const wrap = (url) => `${API_BASE_URL}${URI_PREPENDER}${url}`
const appendAuth = (config) => {

  const token = localStorage.getItem("accessToken");
  if (!token) {
    return Promise.reject("No access token set.");
  }
    config = {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      }
    }
    return config
}

export default {
  get (url, success, fail = err => err.response.data.message, config) {
    axios.get(wrap(url), appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  },
  post (url, body, success, fail = err => err.response.data.message, config) {
    axios.post(wrap(url), body, appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  },
  put (url, body, success, fail = err => err.response.data.message, config) {
    axios.put(wrap(url), body, appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  },
  upload (url, body, progress, success, fail, config) {
    var formData = new FormData()
    if (body.constructor === Object) {
      for (let key in body) {
        formData.append(key, body[key])
      }
    } else if (body.constructor === Array) {
      body.forEach(b => formData.append(b[0], b[1]))
    } else {
      console.error('unkown type')
    }
    axios.post(wrap(url), formData, {
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': '*/*'
      },
      onUploadProgress: e => { progress(e.loaded) }
    })
      .then(handler.handle(success))
      .catch(fail)
  },
  delete (url, success, fail = err => err.response.data.message, config) {
    axios.delete(wrap(url), appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  }
}
