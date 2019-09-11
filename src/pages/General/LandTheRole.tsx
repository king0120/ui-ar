import React from 'react';
import styled from 'styled-components';

const LandRoleStyle = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Sawarabi+Gothic&display=swap');
  background: #44a08d; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #44a08d, #093637); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #44a08d, #093637);
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  
  p {
    color: white;
    font-family: 'Sawarabi Gothic', sans-serif;
    font-size: 7rem;
    letter-spacing: 4px;
    margin: 0;
    line-height: 6.5rem;
    &#land{

    }
    &#the {
      -webkit-text-stroke: 2px white;
      color: transparent;
      font-size: 9rem
    }
  }
`

const LandTheRole = () => {
    return (
        <LandRoleStyle className={'land-the-role'}>
            <p id={'land'}>LAND</p>
            <p id={'the'}>THE</p>
            <p id={'role'}>ROLE</p>
        </LandRoleStyle>
    );
};

export default LandTheRole;
