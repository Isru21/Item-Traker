// import { FaTimes } from "react-icons/fa";
import styled from "styled-components/macro";
import { FaTimes } from "react-icons/fa";
import HoverModel from "./HoverModel";
import React, { useState } from "react";

//let the one who added be named///////
const Item = ({ item, deleteItem  }) => {
  // console.log(item)
  // const timeSplited = item.createdAt.split("T");
  // const timeDisplayedDay = timeSplited[0];

  // const MOreInfo=()=>{
  //   window.location.href = "/moreInfo";
  // }

  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const openModal = () => {
    setIsModalOpen(true);
  
  };

  // const UpdateItem = () => {

  // };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleCloseButtonClick = (e) => {
  //   e.stopPropagation(); // Prevent event from propagating to Task
  //   closeModal();
  // }

  return (
    // <Task onClick={() => updatesong(song._id, song.text, song.artist)}>

    <Task onDoubleClick={openModal}>
      <HoverModel isOpen={isModalOpen} closeModal={closeModal} item={item}/>
      <Itemname>
        {item.itemName}
        <HoverIcon onClick={() => deleteItem(item._id)} />
        {/* <HoverIcon onClick={() => deletesong(song._id)} /> */}
      </Itemname>
      {/* <Provider>provider: {item.provider}</Provider>
      <Provider>Bought prise: {item.price}birr</Provider>
      <Provider>provides pises: {item.amount}pises</Provider>
      <Provider>registered at: {timeDisplayedDay}</Provider> */}
    </Task>
  );
};

export default Item;

const Task = styled.div`
  background: rgba(247, 247, 221);
  //color:white;
  margin: 5px 50px 5px 50px;
  padding: 35px 20px;
  cursor: pointer;
  border-radius: 0.375rem;
  user-select: none;

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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

//
