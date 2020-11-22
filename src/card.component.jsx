import React from 'react'
import styled from 'styled-components'

const CardDiv = styled.div`
background-color: aliceblue;
border: 1px solid blueviolet;
border-radius: 10px;
text-align: center;
height: auto;
margin:  50px auto 0px auto;
color: #3e9959;
padding: 30px;
`;


const Card = (props) => (
    <CardDiv>
        {props.children}
    </CardDiv>
)


export default Card