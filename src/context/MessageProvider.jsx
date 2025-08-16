
import React, { createContext, useContext, useState } from 'react'

const MessageContext = createContext()

function MessageProvider({ children }) {
    const [message, setMessage] = useState({})
    const updateMessage = (newMessage) => {
        console.log('message has updated')
        if (newMessage) {
            localStorage.setItem("message", JSON.stringify(newMessage));
            setMessage(newMessage);
        } else {
            localStorage.removeItem("message");
            setMessage(null);
        }
    };
    const setToast = (text, status='default',  time=1000) =>{
        updateMessage({text,status})
        setTimeout(() => {
           updateMessage(null) 
        }, time);
    }
    return (
        <MessageContext.Provider value={{message, updateMessage, setToast}}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider

export function useMessage() {
  return useContext(MessageContext);
}