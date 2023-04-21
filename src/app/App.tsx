import React, { useContext, useEffect, useRef } from 'react'
import socketClient from 'socket.io-client'
import './app.css'
import { StreamContext } from '@src/app/ChatStream/StreamContext'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import Navigation from '@src/app/Navigation'

const socket = socketClient('http://localhost:3000', {
  withCredentials: false
})

const App = () => {
  const { handleSubmit, register } = useForm<FormValues>()
  const { state, dispatch } = useContext(StreamContext)
  const chatboxRef = useRef(null)
  Notification.requestPermission()

  type FormValues = {
    message: string
  }

  socket.on('connect', () => {
    console.log(socket.id)
  })

  useEffect(() => {
    socket.on('message response', (data) => {
      let exists = false
      if (state.messages) {
        exists = state.messages.some((message) => message.id === data.id)
      }

      if (!exists) {
        dispatch({
          type: 'ADD_MESSAGE',
          payload: data
        })
      }
    })
    return () => {
      socket.off('message response')
    }
  }, [socket, state])

  const onSubmit = handleSubmit((data) => {
    const timestamp = Date.now()
    const date = new Date(timestamp)

    const id = uuidv4()
    const time = date.toLocaleString()

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { ...data, timestamp: time, id: id }
    })

    socket.emit('message', {
      ...data,
      id: id,
      timestamp: time
    })
  })

  return (
    <div className="flex flex-col h-screen justify-between">
      <Navigation />
      <main
        className="mb-auto h-10 flex-1 scr overflow-y-auto"
        ref={chatboxRef}
      >
        {state.messages && state.messages.length === 0 && (
          <div className="py-32 text-center">
            <h1 className="text-4xl font-bold">SOCKETS4U</h1>
            <p className="text-2xl font-bold">A simple chat app</p>
          </div>
        )}
        {state.messages && state.messages.map((message, index) => (
          <div key={index} className="flex border-b-2">
            <div className="p-2">{state.user.name}:</div>
            <div className="flex-1 p-2">{message.message}</div>
            <div className="p-2">{message.timestamp}</div>
          </div>
        ))}
      </main>

      <div>
        <form
          onSubmit={onSubmit}
          className="flex justify-between bg-teal-600 p-2"
        >
          <textarea
            {...register('message')}
            rows={2}
            className="h-26 border-teal-600 rounded-md flex-1 mr-2 p-2"
          ></textarea>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-4 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
