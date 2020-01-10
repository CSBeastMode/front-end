import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import RoomContext from '../Contexts/roomContext'
import UuidContext from '../Contexts/uuidContext'

import { 
    Main,
    Bridge,
    Container
} from "./styles";

import Terminal from '../Terminal' 
import Map from '../Map'
import Chat from '../Chat'

const Game = () => {
    const [title, setTitle] = useState('')
    const [uuid, setUuid] = useState('')
    return (
        <Main>
            <RoomContext.Provider value={{title, setTitle}} >
                <UuidContext.Provider value ={{uuid, setUuid}} >
                    <Grid container spacing={0} >
                        <Grid item xs={12} s={12} >
                            <Bridge id='bridge' updateTitle={setTitle} title={title} />
                            <Chat />
                        </Grid>
                        <Grid item xs={6} s={6} >
                            <Terminal id='term' updateTitle={setTitle} title={title} />
                        </Grid>
                        <Grid item xs={6} s={6} >
                            <Map id='map' updateTitle={setTitle} title={title} />
                        </Grid>
                    </Grid>
                </UuidContext.Provider>
            </RoomContext.Provider>
        </Main>
    )
}

export default Game