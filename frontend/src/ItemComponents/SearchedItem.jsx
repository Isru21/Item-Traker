import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import HoverModelForSearched from "./HoverModelForSearched";
import React, { useState } from "react";
import { useEffect } from "react";
//mui
import { Container, Typography } from "@mui/material";
//mui
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

const SearchedItem = ({ searchedItem, handleDeletecheck }) => {
  // const timeSplited = searchedItem.createdAt.split("T");
  // const timeDisplayedDay = timeSplited[0];

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

  return (
    <Task onDoubleClick={(e) => setIsModalOpen(true)}>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
          m: -1,
          display: "flex",
          justifyContent: "space-between",
        }}
        maxWidth="xl"
      >
        <Typography variant="h6">{searchedItem.itemName}</Typography>
        <Typography variant="subtitle2">(DoubleClick to view more) </Typography>

        {userRoleCheck === "admin" && (
          <HoverIcon onClick={() => handleDeletecheck(searchedItem._id)} />
        )}
      </Container>
    </Task>
  );
};

export default SearchedItem;
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


