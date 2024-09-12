export const generateID = () => {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16)
  return (
    timestamp +
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16)
      })
      .toLowerCase()
  )
}

export const validatePostForm = (values: any) => {
  const errors: any = {}
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length > 25) {
    errors.name = 'Must be 25 characters or less'
  }

  if (!values.content) {
    errors.content = 'Required'
  }
  if (!values.category) {
    errors.category = 'Required'
  }
  // if (!values.image) {
  //   errors.image = 'Required'
  // }

  return errors
}

export const convertFiletoLink = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target?.result as string)
    }
    reader.onerror = () => {
      reject(new Error('Error reading the file'))
    }
    reader.readAsDataURL(file)
  })
}

// export const convertFiletoBlob = (file: File): Promise<Blob> => {
//   return new Promise((resolve, reject) => {
//     var reader = new FileReader()
//     reader.onload = (event) => {
//       if (event.target?.result instanceof ArrayBuffer) {
//         const blob = new Blob([event.target.result], { type: file.type })
//         resolve(blob)
//       } else {
//         reject(new Error('error converting file to blob'))
//       }
//     }
//     reader.onerror = () => {
//       reject(new Error('Error reading the file'))
//     }
//     reader.readAsArrayBuffer(file)
//   })
// }
export const convertFileToBlob = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const result = event.target?.result
      if (result instanceof ArrayBuffer) {
        const blob = new Blob([result], { type: file.type })
        resolve(blob)
      } else {
        reject(
          new Error(
            'FileReader did not return an ArrayBuffer. Failed to convert file to Blob.'
          )
        )
      }
    }

    reader.onerror = () => {
      reject(new Error('An error occurred while reading the file.'))
    }

    reader.readAsArrayBuffer(file)
  })
}

export const convertBlobtoUrl = (blob: Blob): string => {
  return URL.createObjectURL(blob)
}

export const linkToBlob = async (url: string): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        reject(`la requete a echoue avec le statut ${response.status}`)
      }

      const buffer = await response.arrayBuffer()
      const blob = new Blob([buffer])
      resolve(blob)
    } catch (error) {
      reject('erreur lors de la conversion du lien en blob :' + error)
    }
  })
}

export const validateRegisterForm = (values: any) => {
  const errors: any = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.firstname) {
    errors.firstname = 'Required'
  } else if (values.firstname.length > 15) {
    errors.firstname = 'Must be 15 characters or less'
  }
  if (!values.lastname) {
    errors.lastname = 'Required'
  } else if (values.lastname.length > 15) {
    errors.lastname = 'Must be 15 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  } else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password not match'
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  } else if (values.confirmPassword.length > 20) {
    errors.confirmPassword = 'Must be 20 characters or less'
  }

  return errors
}

export const validateLoginForm = (values: any) => {
  const errors: any = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  } else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less'
  }
  return errors
}
export const validatePassword = (values: any) => {
  const errors: any = {}
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  } else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password not match'
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  } else if (values.confirmPassword.length > 20) {
    errors.confirmPassword = 'Must be 20 characters or less'
  }
}
