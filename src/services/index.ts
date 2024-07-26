import { useNuxtApp } from '#app'

export async function apiRequest(method, url, body = null) {
  const { $axios } = useNuxtApp()

  try {
    // Obtém o CSRF Token
    const csrfResponse = await $axios.get('/sanctum/csrf-cookie')
    const csrfToken = csrfResponse.data.csrf_token

    // Configura os headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      }
    }

    // Se o corpo da requisição estiver presente, adiciona-o ao config
    if (body) {
      config.data = body
    }

    // Faz a requisição usando o método HTTP passado
    const response = await $axios({
      method: method,
      url: url,
      ...config
    })

    return response.data
  } catch (error) {
    console.error("Error: ", error)
    throw error // Re-throw the error to handle it in the calling function
  }
}
