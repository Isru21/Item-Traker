import styled from "styled-components"
import { FaTimes } from 'react-icons/fa';
import HoverModelForSearched from './HoverModelForSearched'
import React, { useState } from 'react';
import { useEffect } from "react";
//mui
import { Button, Container, Typography } from "@mui/material";

//mui
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const SearchedItem = ({searchedItem, handleDeletecheck}) => {
    // const timeSplited = searchedItem.createdAt.split("T");
    // const timeDisplayedDay = timeSplited[0];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [userRoleCheck, SetuserRoleCheck] = useState("");
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      console.log(storedToken);
  
      let roleString = "";
  
      if (storedToken) {
        const tokenObject = JSON.parse(storedToken);
  
        roleString = tokenObject.role;
      }
  
      SetuserRoleCheck(roleString);
    }, []);
  
  return (

//     <Task onDoubleClick={openModal}>
//     <HoverModelForSearched isOpen={isModalOpen} closeModal={closeModal} searchedItem={searchedItem} /> 
// <Itemname>
//   {searchedItem.itemName}
//   <HoverIcon onClick={() => deleteItem(searchedItem._id)}/>
//   {/* <HoverIcon onClick={() => deletesong(song._id)} /> */}
// </Itemname>
// {/* <Provider>provider: {searchedItem.provider}</Provider> */}
// {/* <Provider>Bought prise: {searchedItem.price}birr</Provider>
// <Provider>provides pises: {searchedItem.amount}pises</Provider>
// <Provider>registered at: {timeDisplayedDay}</Provider> */}

// </Task>


    <Task onDoubleClick={(e) => setIsModalOpen(true)}>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* <DialogTitle>Apartment Image</DialogTitle> */}
        <DialogActions style={{ width: "100%", height: "100%" }}>
          <HoverModelForSearched
            searchedItem={searchedItem}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </DialogActions>
      </Dialog>

      <Container
        sx={{
          //f0f0f0
          // backgroundColor: "#E1E2E7",
          m: -1,
          display: "flex",
          justifyContent: "space-between",
          // justifyContent: "space-between",
        }}
        maxWidth="xl"
      >
        <Typography variant="h6">{searchedItem.itemName}</Typography>
        <Typography variant="subtitle2">(DoubleClick to view more) </Typography>

       {userRoleCheck === "admin"&&(<HoverIcon onClick={() => handleDeletecheck(searchedItem._id)} />)} 
      </Container>
    </Task>
  )
}

export default SearchedItem
const Task = styled.div`
// background:  rgba(247,247,221);

// margin: 5px 50px 5px 50px;
padding: 7px 0px;
//   cursor: pointer;
//   border-radius: 0.375rem;
//   user-select: none;

  // background: rgba(167, 139, 250, 1);
  // margin: 5px;
  // padding: 10px 20px;
  // cursor: pointer;
  // border-radius: 0.375rem;
`;

const HoverIcon = styled(FaTimes)`
  cursor: pointer;
  // color: rgba(197, 62, 62, 0.821);
  // &:hover {
  //   color: red;
  // }
  color: #aaa;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
// const Itemname = styled(FaTimes)`
//   display: flex;
//   align-items: center;
//   justify-content:center;
//   margin: 1px 76px;
//   cursor: pointer;
  
//   &:hover {
//     color: rgba(197, 62, 62, 0.821);
//   }
// `;
// const Provider = styled.p``;
const Itemname = styled.h3`
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
`;

// 