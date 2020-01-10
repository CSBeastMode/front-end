import React, { useContext, useState, useEffect } from 'react'
import Pusher from 'pusher-js'

import UuidContext from '../Contexts/uuidContext'

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const Chat = () => {
  const [pusher] = useState(
      new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      forceTLS: true
    })
  )
  const [channel, setChannel] = useState(pusher.subscribe(`waiting-room`))
  const [messages, setMessages] = useState([])
  const [pusherMsg, setPusherMsg] = useState('')
  const { uuid } = useContext(UuidContext)

  // set the correct channel once uuid exists in context
  useEffect(() => {
    if (uuid) {
      setChannel(pusher.subscribe(`p-channel-${uuid}`))
    }
  }, [uuid])
  
  // message will be saved when certain events called
  channel.bind('movement', data => {
    setPusherMsg(data.message)
  })
  channel.bind('say', data => {
    setPusherMsg(data.message)
  })
  channel.bind('shout', data => {
    setPusherMsg(data.message)
  })
  channel.bind('whisper', data => {
    setPusherMsg(data.message)
  })
  channel.bind('error', data => {
    setPusherMsg(data.message)
  })

  // update array of messages each time to populate chat
  useEffect(() => {
    if (pusherMsg !== '') {
      setMessages(messages => [...messages, pusherMsg])
    }
  }, [pusherMsg])

  if (!uuid) return <div>initialize first</div>
  return (
    <div style={{height:'500px', width:'500px', backgroundColor:'pink', display:'flex', flexDirection:'column'}}>
      {messages.map(msg => (
        <p>{msg}</p>
      ))}
    </div>
  )
}

export default Chat