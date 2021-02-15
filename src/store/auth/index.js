import axios from 'axios'
import { URL } from '../../helper/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null,
    detailUser: []
  }
}

const getters = {
  isLogin (state) {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  },
  getDetailUser (state) {
    return state.detailUser
  }
}

const mutations = {
  SET_DETAIL (state, payload) {
    state.detailUser = payload
  }
}

const actions = {
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}/api/users/register`, payload)
        .then((result) => {
          resolve(result.data.message)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}/api/users/login`, payload).then((response) => {
        resolve(response.data.message)
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('datauser', JSON.stringify(response.data.data))

      // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(err)
      })
    })
  },
  logout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('datauser')
      localStorage.removeItem('detail')
      resolve('Logout success')
    })
  },
  getDetailUser (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/api/users/getdetail/${payload}`).then((result) => {
        context.commit('SET_DETAIL', result.data.data[0])
        resolve(result.data.data[0])
        localStorage.setItem('detail', JSON.stringify(result.data.data[0]))
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  updateProfile (context, payload) {
    return new Promise((resolve, reject) => {
      axios.patch(`${URL}/api/users/edit/${payload.id}`, {
        fullname: payload.fullname,
        phone: payload.phone,
        bio: payload.bio,
        username: payload.username
      }).then((result) => {
        resolve(result.data.message)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  updateImage (context, payload) {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('image', payload.image)
      axios.patch(`${URL}/api/users/edit/${payload.id}`, fd).then((response) => {
        resolve(response.data.message)
        console.log(response.data.message)
      }).catch((err) => {
        reject(err)
        console.log(err.response)
      })
    })
  }
}

export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
}
