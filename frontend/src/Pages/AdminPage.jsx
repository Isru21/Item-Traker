import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Users from '../UserComponents/Users'
import styled from 'styled-components/macro';

const AdminPage = () => {

  // useEffect(()=>{const storedToken = localStorage.getItem("token");
  //   let tokenString = "";
  //   let roleString ="";

  //   if (storedToken) {
  //     const tokenObject = JSON.parse(storedToken);
  //     tokenString = tokenObject.token;
  //     roleString = tokenObject.role;
  //   }
  //   const bearerToken = tokenString;
  //   const userRoleCheck = roleString;

  //   if(userRoleCheck!=="Admin"){
  //     window.location.href = "/";
  //     return;
  //   }},[])
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken)
    let tokenString = "";
    let roleString ="";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
      roleString = tokenObject.role;
     
    }

    const bearerToken = tokenString;
    const userRoleCheck = roleString;

    if(userRoleCheck==="user"){
      window.location.href = "/";
      return;
    }
   

    fetch("http://localhost:5000/api/users/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response.json().then((data) => {
          console.log(data)
          setUser(data);
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const [users, setUser] = useState([]);




  return (
    <WholeBody>
    <Body>
      <Links to={`/mainpage`}><Card>Item Page {/*<CardImage/>*/}</Card></Links>
      
      <Links to={`/Register`}><CardB> register page</CardB></Links>
      <Links to={`/AddItems`}><CardC> Add Items</CardC></Links>

  
    </Body> 
    <UserSubBody>
    <AllUsers users={users}/>
    </UserSubBody>
    </WholeBody>
  )
}

export default AdminPage
const WholeBody= styled.div`

`
const UserSubBody= styled.div`
margin: 0vh 1.5vw;
`
const Body = styled.div`
// display
// margin: 100px 20px;
display: flex;
justify-content: space-evenly; 
align-items: center;
height:70vh;


`
const Card = styled.div`
  width: 190px;
  height: 254px;
  background-color: rgba(92,188,99, 95%);
  //background-image:url('https://images.unsplash.com/photo-1580440282860-8555b1ae102c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN0b3JlJTIwaXRlbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60');
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
              rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
              rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
//  width: 100%;
//     height: 100%;
//  object-fit: cover;
  display: flex;
  justify-content: center; 
  align-items: center;
  
 
`;

// const CardImage = styled.img`
// background-image:url('https://images.unsplash.com/photo-1580440282860-8555b1ae102c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN0b3JlJTIwaXRlbXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60');

// width: 100%;
// height: 100%;
// object-fit: cover;
// `

const CardB = styled.div`
  width: 190px;
  height: 254px;
  background-color: rgba(92,188,99, 95%);
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
              rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
              rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  display: flex;
  justify-content: center; 
  align-items: center;
`;
const CardC = styled.div`
  width: 190px;
  height: 254px;
  background-color: rgba(92,188,99, 95%);
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
              rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
              rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  display: flex;
  justify-content: center; 
  align-items: center;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: black;
`
const AllUsers = styled(Users)`

`