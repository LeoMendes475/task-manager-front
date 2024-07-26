import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // Substitua pela URL do seu backend
  })

  axiosInstance.interceptors.request.use(async config => {
    // const csrfToken = localStorage.getItem('csrf_token')
    // console.log('here')
    // const csrfToken = await axiosInstance.get('/sanctum/csrf-cookie')
    // console.log('csrfToken: ', csrfToken)
    // if (csrfToken) {
    //   config.headers['X-CSRF-TOKEN'] = csrfToken
    // }
    return config
  })

  nuxtApp.provide('axios', axiosInstance)
})