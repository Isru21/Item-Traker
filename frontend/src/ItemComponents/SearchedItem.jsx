import styled from "styled-components"
import { FaTimes } from 'react-icons/fa';
import HoverModelForSearched from './HoverModelForSearched'
import React, { useState } from 'react';


const SearchedItem = ({searchedItem, deleteItem}) => {
    // const timeSplited = searchedItem.createdAt.split("T");
    // const timeDisplayedDay = timeSplited[0];

    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  
  return (
    <Task onDoubleClick={openModal}>
          <HoverModelForSearched isOpen={isModalOpen} closeModal={closeModal} searchedItem={searchedItem} /> 
      <Itemname>
        {searchedItem.itemName}
        <HoverIcon onClick={() => deleteItem(searchedItem._id)}/>
        {/* <HoverIcon onClick={() => deletesong(song._id)} /> */}
      </Itemname>
      {/* <Provider>provider: {searchedItem.provider}</Provider> */}
      {/* <Provider>Bought prise: {searchedItem.price}birr</Provider>
      <Provider>provides pises: {searchedItem.amount}pises</Provider>
      <Provider>registered at: {timeDisplayedDay}</Provider> */}
      
    </Task>
  )
}

export default SearchedItem
const Task = styled.div`
background:  rgba(247,247,221);

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