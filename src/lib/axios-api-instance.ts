import axios, { type AxiosInstance } from 'axios'

export default function createAxiosApiInstance (apiEndpoint: URL, log: (message: string) => void): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: apiEndpoint.toString(),
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })

  axiosInstance.interceptors.request.use((config) => {
    log(`Request to ${config?.baseURL}${config?.url}`)
    return config
  })

  axiosInstance.interceptors.response.use((response) => {
    log(`Response from ${response.config?.baseURL}${response.config?.url}: ${response?.status}`)
    log(JSON.stringify(response.data))
    return response
  })

  return axiosInstance
}
