import React, { createContext, useReducer } from 'react'

type MessageType = {
  id: string
  message: string
  user: string
  timestamp: string
}

type UserType = {
  id: string
  name: string
  avatar: string
}

type InitialStateType = {
  messages: MessageType[]
  user: UserType
}

const initialState = {
  messages: [],
  user: {
    id: '234235445436',
    name: 'John Doe',
    avatar: ''
  }
}

const streamReducer = (state: InitialStateType, action: any) => {
  console.log(state)
  switch (action.type) {
    //add message only if message id is not already in state
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...(state.messages || []), action.payload]
      }
    default:
      return state
  }
}

interface StreamProps {
  children: React.ReactNode //👈 children prop typr
}

const StreamProvider = ({ children }: StreamProps) => {
  const [state, dispatch] = useReducer(streamReducer, initialState)
  return (
    <StreamContext.Provider value={{ state, dispatch }}>
      {children}
    </StreamContext.Provider>
  )
}

const StreamContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })
export { StreamContext, StreamProvider }
