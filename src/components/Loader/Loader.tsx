import { FC } from 'react'
import './Loader.css'

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => (
  <div
    className="inline-block h-52 w-full animate-[spinner-grow_0.5s_linear_infinite]  bg-gray-300 align-[-0.125em]   motion-reduce:animate-[spinner-grow_0.5s_linear_infinite]"
    role="status"
  >
    {/* <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
      Loading...
    </span> */}
  </div>
)

export default Loader
