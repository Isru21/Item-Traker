// import { FaTimes } from "react-icons/fa";
import styled from "styled-components/macro";
import { FaTimes } from "react-icons/fa";
import HoverModel from "./HoverModel";
import React, { useState } from "react";

//mui
import { Button, Container, Grid, Typography } from "@mui/material";

//mui
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { useEffect } from "react";


//let the one who added be named///////
const Item = ({ item, handleDeletecheck }) => {
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

  // console.log(item)
  // const timeSplited = item.createdAt.split("T");
  // const timeDisplayedDay = timeSplited[0];

  // const MOreInfo=()=>{
  //   window.location.href = "/moreInfo";
  // }

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // // const UpdateItem = () => {

  // // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
  // console.log(closeModal, 'closemodule')

  // const handleCloseButtonClick = (e) => {
  //   e.stopPropagation(); // Prevent event from propagating to Task
  //   closeModal();
  // }

  //   const storedToken = localStorage.getItem("token");
  // console.log(userRoleCheck)
  // let roleString ="";

  // if (storedToken) {
  //   const tokenObject = JSON.parse(storedToken);

  //   roleString = tokenObject.role;
  // }
  // const userRoleCheck = roleString;
  console.log(item, 'item')
  return (
    // <Task onClick={() => updatesong(song._id, song.text, song.artist)}>
    <Grid onDoubleClick={(e) => setIsModalOpen(true)}>
      <Task>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {/* <DialogTitle>Apartment Image</DialogTitle> */}
          <DialogActions style={{ width: "100%", height: "100%" }}>
            <HoverModel item={item} />
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
          <Typography variant="h6">{item.itemName} </Typography>
          <Typography variant="subtitle2">
            (DoubleClick to view more){" "}
          </Typography>
          {userRoleCheck === "admin" && ( <HoverIcon onClick={() => handleDeletecheck(item._id)} />)}
         
        </Container>
      </Task>
    </Grid>
  );
};

export default Item;

const Task = styled.div`
  // background: #e1e2e7;
  //color:white;
  // margin: 5px 50px 5px 50px;
  padding: 7px 0px;
  // cursor: pointer;
  // border-radius: 0.375rem;
  // user-select: none;

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
