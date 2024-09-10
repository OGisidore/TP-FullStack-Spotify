import React, { FC, useState } from 'react'
import './FormModal.css'
import { Button } from '../Ui/Button'
import { X } from 'lucide-react'
import { Category } from '../../Models/Category'
import { Post } from '../../Models/Post'
import { useFormik } from 'formik'
import { generateID, validatePostForm } from '../../Helpers/utiles/utils'
import {
  addDataWithFile,
  updateData,
} from '../../Helpers/api/backendConnect/api'
import { useDispatch } from 'react-redux'
import { ADD_TO_STORAGE } from '../../reducer/Action/action.types'
// import { Button } from '../Ui/Button'

interface FormModalProps {
  closeModal: () => void
  current_?: Post
}

const FormModal: FC<FormModalProps> = ({ closeModal, current_ }) => {
  const validate = (values: any) => validatePostForm(values)
  const [fileImage, setFileImage] = useState<File>()
  const dispatch = useDispatch()

  const addDatas = async (value: Post) => {
    value.image = fileImage
    console.log(fileImage instanceof File)
    const formData = new FormData()
    if (value.image) {
      formData.append('image', value.image)
    }
    delete value.image
    formData.append('post', JSON.stringify(value))
    try {
      if (current_) {
        await updateData('posts', current_._id, formData)
        closeModal()
      } else {
        await addDataWithFile('posts', formData)
        closeModal()
      }
      dispatch({
        type: ADD_TO_STORAGE,
        key: 'posts',
        unique: false,
        payload: value,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const categories: Category[] = [
    {
      _id: 'cat001',
      name: 'Technologie',
      description:
        'Articles sur les dernières innovations technologiques et les tendances du secteur.',
    },
    {
      _id: 'cat002',
      name: 'Développement Web',
      description:
        'Tout ce qui concerne le développement web, des bases aux techniques avancées.',
    },
    {
      _id: 'cat003',
      name: 'Design',
      description:
        'Ressources et conseils pour le design UI/UX et la conception graphique.',
    },
    {
      _id: 'cat004',
      name: 'Marketing Digital',
      description:
        'Stratégies, astuces et études de cas pour améliorer votre présence en ligne.',
    },
    {
      _id: 'cat005',
      name: 'Sécurité Informatique',
      description:
        'Protégez vos systèmes et données avec les dernières pratiques de cybersécurité.',
    },
  ]
  const formik = useFormik({
    initialValues: current_
      ? current_
      : {
          _id: generateID(),
          title: '',
          content: '',
          category: '',
        },
    validate,
    onSubmit: async (data: Post) => {
      addDatas(data)
      formik.resetForm()
    },
  })

  return (
    <div className="absolute top-0 left-0 bg-background z-10 w-full flex items-center justify-center">
      <div className="content w-full p-4">
        <div className="header flex justify-between items-center p-2">
          <h2 className="font-bold text-2xl">Create a post</h2>
          <Button variant="destructive" onClick={closeModal}>
            {' '}
            <X />{' '}
          </Button>
        </div>
        <div className="body">
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            className="border shadow-lg rounded-md p-5 w-full"
          >
            <div className="username mt-4 grid w-full  items-center gap-3">
              <label
                htmlFor=""
                className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {' '}
                Title
              </label>
              <input
                className="input"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="title"
                name="title"
                id=""
              />
              {formik.errors.title ? (
                <div className="text-destructive font-bold">
                  {formik.errors.title}
                </div>
              ) : null}
            </div>
            <div className="category mt-4 grid w-full  items-center gap-3">
              <label
                htmlFor=""
                className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {' '}
                Category
              </label>
              <select
                name="category"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.category}
                placeholder="Select Category"
                id=""
              >
                {categories.map((category: Category) => {
                  return (
                    <option
                      key={category._id}
                      className="p-4 text-xl"
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  )
                })}
                <option value=""></option>
              </select>
              {formik.errors.category ? (
                <div className="text-destructive font-bold">
                  {formik.errors.category}
                </div>
              ) : null}
            </div>
            <div className="content mt-4 grid w-full  items-center gap-3">
              <label
                htmlFor=""
                className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {' '}
                Content
              </label>
              <textarea
                name="content"
                onChange={formik.handleChange}
                value={formik.values.content}
                id="content"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              ></textarea>
              {formik.errors.content ? (
                <div className="text-destructive font-bold">
                  {formik.errors.content}
                </div>
              ) : null}
            </div>

            <div className="image mt-4 grid w-full  items-center gap-1.5">
              <label
                htmlFor=""
                className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                image
              </label>
              <input
                className="input"
                placeholder="image"
                onChange={(e) => setFileImage(e.target.files?.[0])}
                type="file"
                name="image"
                id=""
              />
              {/* {formik.errors.image ? < div>{formik.errors.image}</> : null} */}
            </div>
            <div className="bt mt-4 w-full flex justify-end gap-3">
              <Button
                onClick={closeModal}
                variant="destructive"
                className=" font-bold text-2xl"
              >
                Cancel{' '}
              </Button>
              <Button type="submit" className=" font-bold text-2xl">
                Add post{' '}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormModal
