import React from 'react'

type Props = {}

const index = (props: Props) => {
  return (
    <nav>
    <div className="flex items-center justify-between flex-wrap bg-teal-500 pr-2">
      <div className="flex space-x-4">
        <div>
          <a href="#" className="flex items-center py-3 px-3 text-gray-900">
            <div className="h-6 w-6 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>
            </div>

            <span className=" text-white font-bold">SOCKETS4U</span>
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href=""
            className="py-2 px-3 rounded hover:bg-teal-400 hover:text-white"
          >
            LOBBY
          </a>
          <a
            href=""
            className="py-2 px-3 rounded hover:bg-teal-400 hover:text-white"
          >
            ACCOUNT
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href=""
          className="py-2 px-3 rounded hover:bg-teal-400 hover:text-white"
        >
          LOGIN
        </a>
        <a
          href=""
          className="py-2 px-3 bg-teal-600 rounded text-white font-bold m-3 hover:bg-teal-900 transition duration-300"
        >
          SIGNUP
        </a>
      </div>
    </div>
  </nav>
  )
}

export default index