import { User } from '../../../Models/User'
import { setItem } from '../../../StorageService/localStorage'
import { get, post, postWithFile, put, remove } from './api.methode'

export const apiUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return ' http://localhost:8080/api/'
  } else {
    return
  }
}

const apiBase = apiUrl()

export const getData = async (entityName: string) => {
  const url = apiBase + entityName
  const datas = await get(url)
  return datas
}
export const getUser = async (entityName: string, id: string) => {
  const url = apiBase + entityName + '/' + id
  const datas = await get(url)
  return datas
}
export const requestResetPassword = async (
  entityName: string,
  data: any,
  code?: string
) => {
  let param
  if (code) {
    param = code
  } else {
    param = ''
  }
  const url = apiBase + entityName + '/request-reset-password' + param
  const datas = await post(url, data)
  return datas
}
export const verifyUser = async (entityName: string, data: any) => {
  console.log(data)

  const url = apiBase + entityName + '/verify-email'
  const datas = await post(url, data)
  return datas
}
export const verifyResetCode = async (entityName: string, data: any) => {
  console.log(data)

  const url = apiBase + entityName + '/verify-reset-code'
  const datas = await post(url, data)
  console.log(datas)

  return datas
}
export const resetPassword = async (entityName: string, data: any) => {
  const url = apiBase + entityName + '/reset-password'
  const datas = await post(url, data)
  return datas
}

export const getLatestData = async (entityName: string) => {
  const url = apiBase + entityName + '/latest'
  const datas = await get(url)
  return datas
}

export const getDatasById = async (entityName: string, id: string) => {
  const url = apiBase + entityName + '/' + id
  console.log(url)

  const datas = await get(url)
  return datas
}
export const getDatasByUserId = async (entityName: string, userId: string) => {
  const url = apiBase + entityName + '/byuser/' + userId
  console.log(url)

  const datas = await get(url)
  return datas
}

export const signup = async (user: User) => {
  const url = apiBase + 'auth/register'
  const datas = await post(url, user)
  return datas
}
export const updateUserinfo = async (
  entityName: string,
  id: string,
  data: any
) => {
  const url = apiBase + entityName + '/' + id
  const datas = await put(url, data)
  return datas
}

export const addData = async (entityName: string, data: any) => {
  const url = apiBase + entityName
  console.log(data)

  const datas = await post(url, data)
  return datas
}
export const addDataWithFile = async (entityName: string, data: any) => {
  const url = apiBase + entityName
  console.log(data)

  const datas = await postWithFile(url, data)
  return datas
}
export const updateData = async (entityName: string, id: string, data: any) => {
  const url = apiBase + entityName + '/' + id
  const datas = await put(url, data)
  return datas
}
export const deleteData = async (entityName: string, id: string) => {
  const url = apiBase + entityName + '/' + id
  const datas = await remove(url)
  return datas
}

export const signin = async (user: User) => {
  const url = apiBase + 'auth/login'
  const datas = await post(url, user)
  if (datas.isSuccess) {
    //auth success
    setItem('auth', { token: datas.token, userId: datas.userId }, datas.expire)
    console.log(datas)
  }
  return datas
}
