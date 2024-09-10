import React, { FC, useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { Button } from '../Ui/Button'

interface HeaderProps {}
const Header: FC<HeaderProps> = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  useEffect(() => {
    setIsAuth(true)
  }, [])
  return (
    <div className="Header w-full border-b shadow-sm sticky top-0 ">
      <section>
        <nav className="">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Button variant="default">
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={'/'}>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      Postify
                    </h1>
                  </Link>
                </div>
                <div className="hidden  items-center sm:ml-6 sm:flex">
                  <div className="flex items-center space-x-4">
                    <Link
                      to={'/posts'}
                      className="rounded-md border-border shadow-md  px-3 py-2 text-2xl   text-foreground"
                    >
                      Posts
                    </Link>
                    {isAuth && (
                      <Link
                        to={'/admin'}
                        className="rounded-md border-border shadow-md  px-3 py-2 text-2xl   text-foreground"
                      >
                        Admin
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center gap-8 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isAuth ? (
                  <div className="relative ml-3">
                    <div>
                      <Button variant="ghost">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="user"
                        />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button variant="default">
                      <Link to={'/login'} className="font-bold">
                        {' '}
                        Login
                      </Link>
                    </Button>

                    <Button variant="secondary">
                      <Link to={'/signup'} className="font-bold">
                        Singn-up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="#"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                aria-current="page"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Team
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Projects
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Calendar
              </a>
            </div>
          </div> */}
        </nav>
      </section>
    </div>
  )
}

export default Header
