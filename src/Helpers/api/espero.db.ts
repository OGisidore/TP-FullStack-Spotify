import { EsperoDB } from 'esperodb'

// Example database structure
const dataStructure: any = [
  {
    posts: [{ indexes: [{ _id: { unique: true } }], primaryKey: '_id' }],
  },
 
]
const dbVersion: number = 2

// Create an instance of the local database
export const db = new EsperoDB('postify', dataStructure, dbVersion)
