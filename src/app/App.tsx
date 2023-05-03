import React, { useContext, useEffect, useRef } from 'react'
import socketClient from 'socket.io-client'
import './app.css'
import { StreamContext } from '@src/app/ChatStream/StreamContext'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import Navigation from '@src/app/Navigation'
import { sendNotification } from '@src/lib/notifications'

const socket = socketClient('http://localhost:3003', {
  withCredentials: false
})

const App = () => {
  const { handleSubmit, register } = useForm<FormValues>()
  const { state, dispatch } = useContext(StreamContext)
  const chatboxRef = useRef(null)

  type FormValues = {
    message: string
  }

  socket.on('connect', () => {
    console.log(socket.id)
  })

  useEffect(() => {
    if (chatboxRef.current) {
      console.log(chatboxRef.current)
      // chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    socket.on('message response', (data) => {
      const exists = state.messages.some((message) => message.id === data.id)

      if (!exists) {
        dispatch({
          type: 'ADD_MESSAGE',
          payload: data
        })
        sendNotification(
          'New message',
          data.message,
          'https://img.icons8.com/external-flat-icons-inmotus-design/256/external-connection-connection-flat-icons-inmotus-design-6.png',
          'new-message'
        )
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
        className="mb-auto h-10 flex-1 scr overflow-y-auto bg-teal-950"
        ref={chatboxRef}
      >
        {state.messages.length === 0 && (
          <div className="py-32 text-center">
            <h1 className="text-4xl font-bold text-sky-200">SOCKETS4U</h1>
            <p className="text-2xl font-bold  text-sky-100">
              A simple chat app
            </p>
          </div>
        )}
        {state.messages.map((message, index) => (
          <div key={index} className="flex bg-sky-200/50 m-2 p-2 rounded-md">
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
