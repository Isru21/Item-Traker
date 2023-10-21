import React from "react";
import styled from "styled-components";
import { useState /*useEffect*/ } from "react";

const HoverModel = ({ isOpen, closeModal, searchedItem,onUpdate }) => {
  const [provider, setProvider] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setprice] = useState("");
  const [amount, setAmount] = useState("");
 
  

  const timeSplited = searchedItem.createdAt.split("T");
  const timeDisplayedDay = timeSplited[0];

  const onCreatesubmit = async (e) => {
    const storedToken = localStorage.getItem("token");
    let tokenString = "";
    

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
      
    }
    const bearerToken = tokenString;
    
    const newItem = {
      provider: provider,
      itemName: itemName,
      price: price,
      amount: amount,
    };

  try {
    // Send the POST request to add the new song
    const response = await fetch(`http://localhost:5000/api/items/${searchedItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(newItem),
    });
      console.log(response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data)
    onUpdate(data)
    // window.location.href = "/mainpage";
    // setProvider("");
    // setItemName("");
    // setprice("");
    // setAmount("");

  } catch (error) {
    console.error("Fetch error:", error);
  }

}
//console.log(item._id)
  return (
    <ModalWrapper className={isOpen ? "open" : ""}>
      <ModalContent>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <h2>{searchedItem.itemName}</h2>
        <p>provider: {searchedItem.provider}</p>
        <p>Bought prise: {searchedItem.price}birr</p>
        <p>provides pises: {searchedItem.amount}pises</p>
        <p>registered at: {timeDisplayedDay}</p>
        
        <br />
        <FormContainer  onSubmit={onCreatesubmit}>
          <Title>Update</Title>
          <Label htmlFor="ItemName">ItemName</Label>
          <Input
            type="text"
            id="ItemName"
            name="ItemName"
            defaultValue={searchedItem.itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <Label htmlFor="Provider">Provider</Label>
          <Input
            type="text"
            id="Provider"
            name="Provider"
            defaultValue={searchedItem.provider}
            onChange={(e) => setProvider(e.target.value)}
            required
          />
          <Label htmlFor="price">price</Label>
          <Input
            type="text"
            id="price"
            name="price"
            defaultValue={searchedItem.price}
            onChange={(e) => setprice(e.target.value)}
            required
          />
           <Label htmlFor="amount">Amount</Label>
          <Input
            type="text"
            name="amount"
            id="amount"
            defaultValue={searchedItem.amount}
            // value={item.amount}
            onChange={(e) =>  setAmount(e.target.value)}
          />
          <SubmitButton type="submit">Update</SubmitButton>
        </FormContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default HoverModel;

const ModalWrapper = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;

  &.open {
    display: block;
  }
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
//------------------------//

const FormContainer = styled.form`
  max-width: 320px;
  width: 100%;
  background-color: #fff;
  padding: 20px;

  // box-shadow: 0px 0px 0px 4px rgba(52, 52, 53, 0.185);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;

  // border-radius: 10px;
`;

const Title = styled.span`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1a202c;
`;

const Label = styled.label`
  color: rgb(0, 0, 0);
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  font-size: 1rem;
  color: #4a5568;
  outline: none;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:focus {
    background-color: #fff;
    box-shadow: 0 0 0 2px #cbd5e0;
  }

  &:valid {
    border: 1px solid green;
  }

  &:invalid {
    border: 1px solid rgba(14, 14, 14, 0.205);
  }
`;

const SubmitButton = styled.button`
  background-color: #1a202c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;
