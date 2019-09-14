import React, {FC, useState, useEffect} from 'react';
import {Button, Card, Container, Header} from 'semantic-ui-react';
import breakdancer from '../../static/breakdancer.mp4';
import styled from 'styled-components'
import LandTheRole from "./LandTheRole";
import LogInPage from "../Auth/LogInPage";
import {Link} from "react-router-dom";

{/*<link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i" rel="stylesheet" type="text/css" />*/}
{/*<link rel="stylesheet" href="css/bootstrap.css" type="text/css" />*/}
{/*    <link rel="stylesheet" href="style.css" type="text/css" />*/}
{/*    <link rel="stylesheet" href="css/dark.css" type="text/css" />*/}
{/*    <link rel="stylesheet" href="css/font-icons.css" type="text/css" />*/}
{/*    <link rel="stylesheet" href="css/animate.css" type="text/css" />*/}
{/*    <link rel="stylesheet" href="css/magnific-popup.css" type="text/css" />*/}

{/*    <link rel="stylesheet" href="css/responsive.css" type="text/css" />*/}
{/*    <meta name="viewport" content="width=device-width, initial-scale=1" />*/}


const HomePageStyle = styled(Container)`
  position: relative;
  
  #copy {
    position: absolute;
    margin-top: 105px;
    width: 100%;
    border-radius: 0;
    padding: 20px 50px;
    h1{
      font-weight: 700;
      font-size: 3rem;
      margin: 5px 0;
    }
  }
`


const LandingImageGrid = styled.div<{ opacity: number }>`
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  img {
    width:100%;
    height: 100%;
  }
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 8.3vh);
  grid-gap: 10px;
  
  .landing-grid {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    transition: all 1s;
    opacity: ${props => props.opacity};
    animation: fade-in 1s;
  }
  #dancer-in-street {
    grid-column: 1 / 6;
    grid-row: 1 / 9;
  }
  .placeholder{
      &.first {
        grid-column: 6 / 11;
        grid-row: 1 / 4;
      } 
      &.second {
        grid-column: 7 / 12;
        grid-row: 8 / span 3;
        #myVideo {
          height: auto;
          width:100%;
        }
      }
      &.third {
        grid-column: 11 / 13;
        grid-row: 1 / 4;
      }
      &.fourth {
        grid-column: 1 / 7;
        grid-row: 9 / 13;
      }
  }
  .land-the-role {
    grid-column: 6 / 10;
    grid-row: 4 / 8;
  }
  .cta {
    grid-column: 10 / 13;
    grid-row: 4 / 8;
  }
  
`
const HomePage: FC<any> = ({history}) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (opacity <= 1) {
            setTimeout(async () => {
                await setOpacity(opacity + .1)
            }, 1)
        }
    }, [opacity])


    return (
        <HomePageStyle>
            <LandingImageGrid opacity={opacity}>
                <div id={'dancer-in-street'} className={'landing-grid'}>
                    <img
                         src="https://www.creativeboom.com/uploads/articles/f5/f5176a3b520616b11725297e25305c910987dd88_1100.jpg"
                         alt=""/>
                </div>
                <div className="landing-grid placeholder first">
                    <img
                        src="https://www.liveabout.com/thmb/Z0h5FVbjvC7CAp5PgFj1TaOa95c=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-156410654-58acb63b5f9b58a3c97c60d3.jpg"
                        alt=""/>
                </div>
                <div className="landing-grid placeholder second">
                    <video autoPlay muted loop id="myVideo">
                        <source src={breakdancer} type="video/mp4"/>
                    </video>
                </div>
                <div className="landing-grid placeholder third">

                </div>
                <div className="landing-grid placeholder fourth">
                    <img src="https://miro.medium.com/max/12288/1*wRItayaN4_so8ITSnDymqA.jpeg" alt=""/>
                </div>
                <div className="landing-grid cta">
                    <LogInPage />
                    <p style={{marginTop: 10}}>
                        New to us? <Link to={'/register'}>Sign Up Here</Link>
                    </p>
                </div>
                <LandTheRole/>
            </LandingImageGrid>
            <Card id={'copy'}>


                <Button.Group>
                    <Button primary onClick={() => history.push('/profile')}>Go To Profile</Button>
                    <Button secondary onClick={() => history.push('/organization')}>Go To Casting</Button>
                </Button.Group>
                <Header as='h2'>Header</Header>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                    quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                    arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                    Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                    dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                    Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                    Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
                    viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                    Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                    quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                    arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                    Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                    dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                    Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                    Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
                    viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                    Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                </p>
            </Card>
        </HomePageStyle>
    );
};

export default HomePage;
