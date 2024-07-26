export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const response = await nuxtApp.$axios.get('/sanctum/csrf-cookie')
    console.log('response: ', response);
    const csrfToken = response.data.csrf_token

    if (csrfToken) {
      localStorage.setItem('csrf_token', csrfToken)
    }
  } catch (error) {
    console.error('Erro ao obter o token CSRF:', error)
  }
})