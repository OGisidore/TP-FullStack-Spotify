import { db } from './espero.db'

export const addData = async (entityName: string, data: any) => {
  try {
    await db.addData(entityName, data)
    return {
      status: 200,
      message: ' added successfully',
    }
  } catch (error: any) {
    return {
      status: 500,
      message: 'Error when adding data' + error.message,
    }
  }
}

export const updateData = async (entityName: string, data: any) => {
  try {
    await db.updateData(entityName, data)
    return {
      status: 200,
      message: ' update successfully',
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error when updating data',
    }
  }
}

export const getData = async (entityName: string, id: string) => {
  try {
    const data = await db.getData(entityName, id)
    if (!data) {
      return {
        status: 404,
        message: 'not found',
      }
    }

    return {
      status: 200,
      data: data,
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error when getting data',
    }
  }
}

export const getAllData = async (entityName: string) => {
  try {
    const datas = await db.getAllData(entityName)
    if (!datas) {
      return {
        status: 404,
        message: 'any data',
      }
    }

    return {
      status: 200,
      datas: datas,
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error when getting data',
    }
  }
}
// Retrieve data from a table by primary key
// db.getData('table1', 1)
// .then((result) => console.log(result))
// .catch((error) => console.error(error))

// Retrieve all data from a table
// db.getAllData('table1')
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error))

// Search for data in a table by index
// db.search('table1', 'index1', 'someValue')
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error))

// Delete data from a table by primary key

export const deleteData = async (entityName: string, id: string) => {
  try {
    const data = await db.deleteData(entityName, id)
    if (!data) {
      return {
        status: 404,
        message: ' id not found',
      }
    }

    return {
      status: 200,
      message: 'data delete succesfully',
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Error when deliting data',
    }
  }
}
