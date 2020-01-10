import React, {
    useState, 
    useEffect, 
    useContext
} from 'react'
// import { Map } from "./styles"

import RoomContext from '../Contexts/roomContext'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  card: {
    maxWidth: '48vw'
  },
  media: {
    height: 250,
  },
});

export default function MediaCard(props) {
    const classes = useStyles();
    // const [room, setRoom] = useState({})
    // const [title, setTitle] = useState('')

    // useEffect(() => {
    //     // setRoom(localStorage.getItem('room'))
    //     // console.log(room)
    //     return () => {
    //         setTitle(localStorage.getItem('title'))
    //     }
    // })

    const {setRoom, title} = useContext(RoomContext)

    const renderRoom = (rmName) => {
        switch (rmName) {
            case 'Engine Room':
                return "/Images/purple-engine-room.jpg" 
            case 'Defense Center':
                return "/Images/defenseRoom.jpg" 
            case 'Command Center':
                return "/Images/commandCenter.jpg" 
            case 'Captain Quarters':
                return "/Images/captainsQuarters.jpg" 
            case 'Bridge':
                return "/Images/bridge.jpg" 
            case 'Hallway':
                return "/Images/hallway.jpg" 
            case 'Bathroom':
                return "/Images/bathroom.jpg" 
            case 'Crew Cabin':
                return "/Images/crewQuarters.jpg" 
            case 'Mess Hall':
                return "/Images/messHall.jpg" 
            case 'Weapons Room':
                return "/Images/weapons.jpg" 
            case 'Recreation Center':
                return "/Images/recRoom.jpg" 
            case 'Medical Bay':
                return "/Images/medBay.jpg" 
            default:
            
        }
    }

    // const title = localStorage.getItem('title')
    const image = renderRoom(title)
    return (
        <Card className={classes.card}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={image}
            // image='front-end/src/Images/purple-engine-room.jpg'
            // image="/static/images/cards/contemplative-reptile.jpg"
            // title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {/* {localStorage.getItem('title')} */}
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {localStorage.getItem('description')}
            </Typography>
            </CardContent>
        </CardActionArea>
        {/* <CardActions>
            <Button size="small" color="primary">
            Share
            </Button>
            <Button size="small" color="primary">
            Learn More
            </Button>
        </CardActions> */}
        </Card>
    );
}
