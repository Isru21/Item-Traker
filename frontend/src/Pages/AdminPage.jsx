import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Users from "../UserComponents/Users";
// import Item from '../ItemComponents/Item';
import styled from "styled-components";
//mui
import { Button, Grid, Paper, Typography } from "@mui/material";

const AdminPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [Idset, setIdset] = useState('')



  const setId = (_id)=>{
    setIdset(_id)
    setShowConfirmation(!showConfirmation);
    
  }

  const deleteuser = () =>{
    console.log(Idset,'id check')
    const storedToken = localStorage.getItem("token");
    let tokenString = "";
    let userRoleString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
      userRoleString = tokenObject.role;
    }

    const bearerToken = tokenString;
    const userRole = userRoleString;

    if (userRole === "user") {
      alert("not outerised only allowed for admins");
    }

    fetch(`http://localhost:5000/api/users/${Idset}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setUser((prevSongs) => prevSongs.filter((user) => user._id !== Idset));

        console.log("user deleted successfully!");
        // setrefrashe(_id);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
      setShowConfirmation(false)
  }


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    let tokenString = "";
    let roleString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
      roleString = tokenObject.role;
    }

    const bearerToken = tokenString;
    const userRoleCheck = roleString;

    if (userRoleCheck === "user") {
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
          // console.log(data);
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
      <UserSubBody>
        <Users users={users} setId={setId} />
        {showConfirmation && (
        <Paper
          elevation={21} // Add elevation for a shadow effect
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 95%)",
            borderRadius:2,
            padding: 2,
            zIndex: 9999,
          }}
        >
          <Typography variant="h6" sx={{ mb:1 , mt:1, color: "red" }}>
            This employee will be delete...proceed?
          </Typography>
          <Grid container justifyContent="center" alignItems="center"sx={{mb:1}}>
            <Button
             // variant="contained"
              sx={{
                mr: 2,
                color: "#CC645E",
                "&:hover": {
                  backgroundColor: "#CC645E",
                  color:'white'
                },
              }}
              onClick={deleteuser}
            >
              Yes
            </Button>
            <Button
             
              // variant="outlined"
              sx={{
                outlineColor:'#78B777',
              color: "#78B777",
                "&:hover": {
                  backgroundColor: "#78B777",
                  color:'white'
                },
              }}
              onClick={() => setShowConfirmation(false)}
            >
              No
            </Button>
          </Grid>
        </Paper>
      )}
      </UserSubBody>
    </WholeBody>
  );
};

export default AdminPage;
const WholeBody = styled.div``;
const UserSubBody = styled.div`
  margin: 0vh 1.5vw;
`;


