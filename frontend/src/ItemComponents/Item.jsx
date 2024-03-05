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
    // console.log(storedToken);

    let roleString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);

      roleString = tokenObject.role;
    }

    SetuserRoleCheck(roleString);
  }, []);

 
  // console.log(item, "item");
  return (
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
            //backgroundColor: "#E1E2E7",
            m: -1,
            display: "flex",
            justifyContent: "space-between",
            // justifyContent: "space-between",
          }}
          maxWidth="xl"
        >
          <Typography variant="h6">{item.itemName} </Typography>
          <Typography variant="subtitle2">(DoubleClick for more) </Typography>
          {userRoleCheck === "admin" && (
            <HoverIcon onClick={() => handleDeletecheck(item._id)} />
          )}
        </Container>
      </Task>
    </Grid>
  );
};

export default Item;

const Task = styled.div`
  color: white;
  padding: 7px 0px;
`;

const HoverIcon = styled(FaTimes)`
  cursor: pointer;
  color: #aaa;
  &:hover,
  &:focus {
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
`;