import React, { useContext } from 'react'
import Terminal from 'terminal-in-react'
import axios from 'axios'           
import { Container } from "./styles";

import RoomContext from '../Contexts/roomContext'

const url = `https://lambda-beastmode.herokuapp.com`

const Term = props => {
    const {title, setTitle} = useContext(RoomContext)

    // function to calculate correct response based on player availability
    const playerAmount = (data) => {
        const numPlayers = data.players.length
        if (numPlayers > 0) {
            if (numPlayers === 1) {
                console.log(`You see a person: ${data.players[0]}`)
            } else {
                console.log(`You see ${numPlayers}: ${data.players.reduce((player, players) => `${player}, ${players}`)}`)
            }
        } else {
            console.log("You see no one.")
        }
    } 
    
    const command = {
        initialize: () => {
            try {
                const token = localStorage.getItem("token")
                axios.get(
                    `${url}/api/adv/init/`,
                    { headers: { Authorization: `Token ${token}`} }
                ).then((res) => {
                    const room = res.data;
                    console.log(`WELCOME TO SPACE ${room.name}`)
                    console.log(`You are currently located at: ${room.x_coord}, ${room.y_coord} - ${room.title}`)
                    console.log(`You see: ${room.description}`)
                    playerAmount(room)
                    localStorage.setItem("room", room)
                    setTitle(room.title)
                })
            } catch (err) {
                console.log(err.stack)
            }
        },
        move: (args) => {
            const direction = args[1]
            if (!["n", "e", "s", "w"].includes(direction)) {
                console.log("You must choose one of 4 directions: n s e w")
            }
            try {
                const token = localStorage.getItem("token")
                axios.post(
                    `${url}/api/adv/move/`,
                    {"direction": `${direction}`},
                    { headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json"
                    }}
                ).then((res) => {
                    const room = res.data
                    if (!room.error_msg) {
                        console.log(`You are currently located at: ${room.x_coord}, ${room.y_coord} - ${room.title}`)
                        console.log(`You see: ${room.description}`)
                        playerAmount(room)
                        localStorage.setItem("room", room)
                        localStorage.setItem('title', room.title)
                        localStorage.setItem('description', room.description)
                        setTitle(room.title)
                    } else {
                        console.log(`You are unable to go that way.`)
                        console.log(`You are currently located at: ${room.x_coord}, ${room.y_coord} - ${room.title}`)
                        console.log(`You see: ${room.description}`)
                        playerAmount(room)
                    }
                }).catch(() => {
                    console.log(`You are unable to go that way.`)
                })
            } catch (err) {
                console.log(err.stack)
            }
        },
        say: (args) => {
            try {
                const token = localStorage.getItem("token")
                if (args.length === 1) {
                    console.log(`Words do not come out.`)
                } else {
                    // remove first argument (which is the command itself)
                    args.shift()
                    axios.post(
                        `${url}/api/adv/say/`,
                        {"message": `${args.join(' ')}`},
                        { headers: { Authorization: `Token ${token}`} }
                    ).then(() => {
                        console.log(`You speak to the room.`)
                    })
                }
            } catch (err) {
                console.log(err.stack)
            }
        },
        shout: (args) => {
            try {
                const token = localStorage.getItem("token")
                if (args.length === 1) {
                    console.log(`Words do not come out.`)
                } else {
                    // remove first argument (which is the command itself)
                    args.shift()
                    axios.post(
                        `${url}/api/adv/shout/`,
                        {"message": `${args.join(' ')}`},
                        { headers: { Authorization: `Token ${token}`} }
                    ).then(() => {
                        console.log(`You yell at the top of your lungs.`)
                    })
                }
            } catch (err) {
                console.log(err.stack)
            }
        },
        whisper: (args) => {
            try {
                const token = localStorage.getItem("token")
                if (args.length === 1 || args.length === 2) {
                    console.log(`Words do not come out.`)
                } else {
                    // remove first argument (which is the command itself)
                    args.shift()
                    const toPlayer = args[0]
                    // remove first again (which is now username)
                    args.shift()
                    axios.post(
                        `${url}/api/adv/whisper/`,
                        {
                            "message": `${args.join(' ')}`,
                            "to": `${toPlayer}`
                        },
                        { headers: { Authorization: `Token ${token}`} }
                    ).then(() => {
                        console.log(`Your whisper is carried by the wind.`)
                    }).catch(() => {
                        console.log(`No one hears you.`)
                    })
                }
            } catch (err) {
                console.log(err.stack)
            }
        },
    }

    return (
        <Container id="term" >
            <Terminal
            color='green'
            backgroundColor='black'
            barColor='black'
            style={{ 
                fontWeight: "bold", 
                fontSize: "1em",
                width:"49vw"
            }}
            watchConsoleLogging
            allowTabs={false}
            commands={{
                initialize: () => {
                    command.initialize()
                    setTitle(localStorage.getItem('title'))
                    console.log(title)
                },
                move: (args) => {
                    command.move(args)
                    setTitle(localStorage.getItem('title'))
                    console.log(title)
                },
                say: (args) => {
                    command.say(args)
                },
                shout: (args) => {
                    command.shout(args)
                },
                whisper: (args) => {
                    command.whisper(args)
                },
            }}
            descriptions={{
                initialize: 'starts the game',
                move: 'change rooms | move <n, s, e, w>',
                say: 'chat with other players in the room | say <message>',
                shout: 'broadcast to all players | shout <message>',
                whisper: 'whisper to a single player | whisper <username> <message>'
            }}
            msg='Welcome to the Adventure.. Type help to see the command pallette'
            />
        </Container>
    )
}
  
export default Term