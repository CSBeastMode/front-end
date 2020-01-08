import styled from 'styled-components'
import bridge from '../Images/humanbridge.png'

export const Main = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: space-evenly;
    height: 95vh:
    width: 95vw;


`
export const Container = styled.section`
    
`

export const Bridge = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid white;
    background-image: url(${bridge});
    background-color: #D4C7DC; /* Used if the image is unavailable */
    height: 500px; /* You must set a specified height */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
`

//FROM MAIN
// display: grid;
//     grid-template-rows: repeat(20, 5vw)
//     grid-template-columns: repeat(20, 5vw)
    

//     @media(min-width: 500px){
//         div{
//             grid-row: 0 / span 20
//             grid-column: 0 / span 20
//         }
//     }
    

//FROM CONTAINER
// display: grid
//     grid-template-rows: 20% 20% 20% 20% 20%
//     grid-template-columns: 20% 20% 20% 20% 20%
//     width: 100vw;
//     height: 95vh;
//     margin-top: 5px;
//     padding: 0px;

//     #bridge {
//         grid-column: 1 / span 2;
//         grid-row: 1 / span 2;
//     }

//     #term {
//         width: 100vw;
//         grid-columm: 1 / span 2;
//         grid-row: 4 / span 2;
//     }
//     #map{
//         grid-row: 4;
//     }