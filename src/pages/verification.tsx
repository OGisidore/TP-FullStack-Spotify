import React, { Fragment, useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { Button } from '../components/Ui/Button'
import { verifyResetCode } from '../Helpers/api/backendConnect/api'
import { getItem } from '../StorageService/localStorage'

export const Verification: React.FC = () => {
  const [searchParams] = useSearchParams()
  const withcode = searchParams.get('Code')
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [shoulRedirect, setShouldRedirect] = useState<boolean>(false)

  const email = getItem('email')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target
    if (/[0-9]/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      console.log(newOtp.join('').length)

      setOtp(newOtp)

      // Move to the next input field if not the last
      if (index < 5) {
        setActiveIndex(index + 1)
      }
    }
  }

  console.log(withcode)
  const VerifyCode = async () => {
    const code = Number(otp.join('')).toString()

    console.log({ code, email })

    try {
      const response = await verifyResetCode('users', { code, email })
      if (response.ok) {
        setShouldRedirect(true)
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  useEffect(() => {}, [])
  if (shoulRedirect) {
    return <Navigate to="/reset-password" />
  }
  return (
    <Fragment>
      <section className="w-full md:w-[50rem] mt-10">
        {withcode ? (
          <>
            <div className="title">
              Request for password Reset By enter your Email and choose the
              reset method you want{' '}
            </div>
            <div className="content text-card-foreground bg-card border-b p-4 shadow-lg">
              <div className="flex items-center gap-2">
                {/* First 3 OTP slots */}
                {otp.slice(0, 3).map((char, index) => (
                  <div
                    key={index}
                    className={`relative flex h-10 w-10 items-center justify-center border rounded-md 
            ${
              activeIndex === index ? 'ring-2 ring-blue-500' : 'border-gray-300'
            }`}
                  >
                    <input
                      type="text"
                      maxLength={1}
                      className={`text-center w-full h-full bg-transparent outline-none
              ${activeIndex === index ? 'caret-blink' : ''}`}
                      value={char}
                      onChange={(e) => handleInputChange(e, index)}
                      autoFocus={index === activeIndex}
                    />
                  </div>
                ))}

                {/* Separator (dot) */}
                <div className="text-2xl font-bold">•</div>

                {/* Last 3 OTP slots */}
                {otp.slice(3).map((char, index) => (
                  <div
                    key={index + 3}
                    className={`relative flex h-10 w-10 items-center justify-center border rounded-md 
            ${
              activeIndex === index + 3
                ? 'ring-2 ring-blue-500'
                : 'border-gray-300'
            }`}
                  >
                    <input
                      type="text"
                      maxLength={1}
                      className={`text-center w-full h-full bg-transparent outline-none
              ${activeIndex === index + 3 ? 'caret-blink' : ''}`}
                      value={char}
                      onChange={(e) => handleInputChange(e, index + 3)}
                      autoFocus={index + 3 === activeIndex}
                    />
                  </div>
                ))}
              </div>
              <div className="buttons mt-8 flex gap-4">
                <Button
                  className=""
                  onClick={VerifyCode}
                  disabled={otp.join('').length !== 6}
                >
                  send me a Code{' '}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="content text-card-foreground bg-card border-b p-4 shadow-lg">
            Check your mail a reset link have been sent to you
          </div>
        )}
      </section>
    </Fragment>
  )
}
