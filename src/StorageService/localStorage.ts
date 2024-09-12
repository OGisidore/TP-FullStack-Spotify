export const setItem = (key: string, value: any, ttl?: number) => {
  if (window.localStorage) {
    if (ttl) {
      const now = new Date()
      const item = {
        value: value,
        expiry: now.getTime() + ttl, // ttl est le temps en millisecondes
      }
      window.localStorage.setItem(key, JSON.stringify(item))
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }
}

export const getItem = (key: string) => {
  try {
    const itemStr: any = window.localStorage.getItem(key)
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (item.expiry) {
      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
      }
      return item.value
    }
    return item

    // Sinon, on retourne la valeur stockée
  } catch (error) {
    return null
  }
}

export const removeItem = (key: string) => {
  if (window?.localStorage) {
    window.localStorage.removeItem(key)
  }
}

export const clearLocalStorage = () => {
  if (window.localStorage) {
    window.localStorage.clear()
  }
}
