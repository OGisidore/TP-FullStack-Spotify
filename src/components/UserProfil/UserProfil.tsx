import { useFormik } from 'formik'
import { Camera } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import { signup, verifyUser } from '../../Helpers/api/backendConnect/api'
import { validateRegisterForm } from '../../Helpers/utiles/utils'
import { Button } from '../Ui/Button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../Ui/Sheet'
import './UserProfil.css'

interface UserProfilProps {}

const UserProfil: FC<UserProfilProps> = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [emailError, setEmailError] = useState<string>('') // État pour gérer l'erreur d'email
  const [formError, setFomError] = useState<string>('')

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const validate = (values: any) => validateRegisterForm(values)

  // validateRegisterForm
  const formik = useFormik({
    initialValues: {
      firstname: 'isidore2',
      lastname: 'dev',
      username: 'isidore',
      password: '123654',
      email: 'i@gmail.com',
      confirmPassword: '123654',
    },
    validate,
    onSubmit: async (user) => {
      console.log('yes')

      const result = await signup(user)
      if (result.status === 201) {
        setFomError('')
      } else {
        setFomError(result.message)
      }

      // alert(JSON.stringify(result, null, 2));
    },
  })
  const checkEmailExists = async (email: string) => {
    try {
      const response = await verifyUser('users', { email })
      return response.exist
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error)
      return false
    }
  }

  // Gérer la modification du champ email avec vérification asynchrone
  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    formik.handleChange(e)
    if (value) {
      const emailExists = await checkEmailExists(value)
      if (emailExists) {
        setEmailError(`email allready exist please `)
      } else {
        setEmailError('')
      }
    }
  }
  return (
    <div className="UserProfil">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="user"
            />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll">
          <SheetHeader className="">
            <SheetTitle>Edit profile</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center">
            <div className="w-20 relative">
              <img
                className="h-20 w-20 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="user"
              />
              <div className="absolute right-[-1%] bottom-[-1%]">
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => console.log(e.target.files)}
                  />
                  <button
                    type="button"
                    onClick={handleClick}
                    className="flex items-center justify-center w-9 h-9 bg-card rounded-full cursor-pointer hover:bg-accent/5"
                  >
                    <Camera className="w-5 h-5 cursor-pointer text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 py-4">
            <form
              className="border shadow-lg rounded-md p-5 w-full"
              onSubmit={formik.handleSubmit}
            >
              <p className="error"> {formError}</p>
              <div className="username mt-4 grid w-full grid-cols-4 items-center gap-4 ">
                <label
                  htmlFor=""
                  className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {' '}
                  username
                </label>
                <input
                  className="input col-span-3 "
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="error">{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="username mt-4 grid w-full grid-cols-4 items-center gap-4 ">
                <label
                  htmlFor=""
                  className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {' '}
                  Firstname
                </label>
                <input
                  className="input col-span-3 "
                  type="text"
                  placeholder="firstname"
                  name="firstname"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="error">{formik.errors.firstname}</div>
                ) : null}
              </div>
              <div className="lastname mt-4 grid w-full grid-cols-4 items-center gap-4 ">
                <label
                  htmlFor=""
                  className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {' '}
                  Lastname
                </label>
                <input
                  className="input col-span-3 "
                  type="text"
                  placeholder="Lastname"
                  name="lastname"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="error">{formik.errors.lastname}</div>
                ) : null}
              </div>
              <div className="lastname mt-4 grid w-full grid-cols-4 items-center gap-4 ">
                <label
                  htmlFor=""
                  className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {' '}
                  email
                </label>
                <input
                  className="input col-span-3 "
                  type="email"
                  placeholder="Lastname"
                  name="email"
                  onChange={handleEmailChange}
                  value={formik.values.email}
                />
                {emailError ? (
                  <div className="error text-destructive font-bold">
                    {emailError}
                  </div>
                ) : formik.touched.email && formik.errors.email ? (
                  <div className="error  text-destructive font-bold">
                    {formik.errors.email}
                  </div>
                ) : null}
                {/* {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null} */}
              </div>
              <div className="password mt-4 grid w-full  grid-cols-4 items-center gap-4 -center ">
                <label
                  htmlFor=""
                  className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Passsword
                </label>
                <input
                  className="input col-span-3 "
                  placeholder="password"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="ConfirmPasswor mt-4 grid w-full grid-cols-4 items-center gap-4 ">
                <label
                  htmlFor=""
                  className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Confirm password
                </label>
                <input
                  className="input col-span-3 "
                  placeholder="password confirm"
                  type="password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <div className="bt mt-4 w-full">
                <Button type="submit" className="w-full font-bold text-2xl">
                  Create{' '}
                </Button>
              </div>
            </form>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor=""
                className='"text-sm font-medium text-right leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {' '}
                Email
              </label>
              <input id="name" className=" input col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor=""
                className='"text-sm font-medium text-right leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {' '}
                Email
              </label>
              <input id="name" className=" input col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default UserProfil
