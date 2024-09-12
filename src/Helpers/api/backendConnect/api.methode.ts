import { getItem } from "../../../StorageService/localStorage"


var token = getItem("auth")?.token
export const get = async (url: string, options: any = {}) => {
  try {
    options.headers={
      ... options.headers,
      'Authorization': 'Bearer ' + token

    }
    const response = await fetch(url, options)
    if (!response.ok) {
      return {
        isSuccess: false,
      }
    }
    return await response.json()
  } catch (error) {
    return { isSuccess: false, error }
  }
}

export const post = async (url: string, data: any, options: any = {}) => {
  try {
    options.method = 'POST'
    options.body = JSON.stringify(data)
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      const error = await response.json()
      return {
        ...error,
        isSuccess: false,
      }
    }
    return await response.json()
  } catch (error: any) {
    return { isSuccess: false, error }
  }
}
export const postWithFile = async (
  url: string,
  data: any,
  options: any = {}
) => {
  try {
    options.method = 'POST'
    options.body = data
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Authorization': 'Bearer ' + token

      // 'Content-Type': 'multipart/form-data',
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      const error = await response.json()
      return {
        ...error,
        isSuccess: false,
      }
    }
    return await response.json()
  } catch (error: any) {
    return { isSuccess: false, error }
  }
}
export const remove = async (url: string, options: any = {}) => {
  try {
    options.method = 'DELETE'

    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token

    }
    const response = await fetch(url, options)
    if (!response.ok) {
      const error = await response.json()
      return {
        ...error,
        isSuccess: false,
      }
    }
    return await response.json()
  } catch (error) {
    return { isSuccess: false, error }
  }
}
export const put = async (url: string, data: any, options: any = {}) => {
  try {
    options.method = 'PUT'
    options.body = data
    options.headers = {
      ...options.headers,
      Accept: 'application/json',
      'Authorization': 'Bearer ' + token

      // 'Content-Type': 'application/json',
    }
    const response = await fetch(url, options)
    if (response.status !== 203) {
      const error = await response.json()
      return {
        ...error,
        isSuccess: false,
      }
    }
    // return await response.json()
  } catch (error: any) {
    return { isSuccess: false, error: error.message }
  }
}
