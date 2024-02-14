import React from "react";
import styled from "styled-components";
import { useState /*useEffect*/ } from "react";
//mui
import { Container, Grid, Typography, CardMedia } from "@mui/material";
const HoverModel = ({
  isOpen,
  closeModal,
  searchedItem,
  onUpdate,
  setIsModalOpen,
  isModalOpen,
}) => {
  const [provider, setProvider] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setprice] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState(null);

  // const timeSplited = searchedItem.createdAt.split("T");
  // const timeDisplayedDay = timeSplited[0];

  // console.log( searchedItem.createdAt, 'time')

  const onCreatesubmit = async (e) => {
    const storedToken = localStorage.getItem("token");
    let tokenString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
    }
    const bearerToken = tokenString;

    // const formData = new FormData();
    // formData.append("itemName", itemName);
    // formData.append("provider", provider);
    // formData.append("price", price);
    // formData.append("amount", amount);
    // const newItem = {
    //   provider: provider,
    //   itemName: itemName,
    //   price: price,
    //   amount: amount,
    //   image:image
    // };
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("provider", provider);
    formData.append("price", price);
    formData.append("amount", amount);

    // Check if an image is selected
    if (image) {
      formData.append("image", image); // Append the selected image file to the form data
    }

    // if (image) {
    //   formData.append("image", image); // Append the selected image file to the form data
    // }

    try {
      console.log(formData, "new item");
      // Send the POST request to add the new song
      const response = await fetch(
        `http://localhost:5000/api/items/${searchedItem._id}`,
        {
          method: "PUT",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },

          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      onUpdate(data);
      // window.location.href = "/mainpage";
      // setProvider("");
      // setItemName("");
      // setprice("");
      // setAmount("");
    } catch (error) {
      console.error("Fetch error:", error);
      alert("image updated");
    }
  };
  const handleImageChange = (e) => {
    // Update the 'image' state when a new image is selected
    const file = e.target.files[0];
    if (file) {
      // Update your state with the selected file
      setImage(file);
    }
  };

  //console.log(item._id)
  return (
    <ModalWrapper className={"open"}>
      <ModalContent>
        {searchedItem && (
          <div>
            <Typography
              variant="h3"
              align="center"
              style={{ borderBottom: "2px solid black" }}
            >
              {searchedItem.itemName}
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ pt: 4 }}
            >
              <CardMedia
                component="img"
                src={
                  searchedItem.imageUrl
                    ? `http://localhost:5000/${searchedItem.imageUrl}`
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt=""
                // height="300"
                sx={{ width: 200, height: 200 }}
              />
            </Grid>
            <Typography align="center" variant="h6">
              provider: {searchedItem.provider}
            </Typography>
            <Typography align="center" variant="h6">
              Bought prise: {searchedItem.price}birr
            </Typography>
            <Typography align="center" variant="h6">
              provides pises: {searchedItem.amount}pises
            </Typography>
            <Typography align="center" variant="h6">
              uploaded by: {searchedItem.user}
            </Typography>

            {searchedItem.createdAt && (
              <Typography align="center" variant="h6">
                Created At:{" "}
                {searchedItem.createdAt
                  ? searchedItem.createdAt.split("T")[0]
                  : ""}
              </Typography>
            )}
          </div>
        )}

        <br />
        <Grid container justifyContent="center" alignItems="center">
          <FormContainer onSubmit={onCreatesubmit}>
            <Typography
              align="center"
              variant="h5"
              style={{ borderBottom: "2px solid black" }}
              sx={{ mb: 1 }}
            >
              Update
            </Typography>
            <Label htmlFor="ItemName">ItemName</Label>
            <Input
              type="text"
              id="ItemName"
              name="ItemName"
              // defaultValue={searchedItem.itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <Label htmlFor="Provider">Provider</Label>
            <Input
              type="text"
              id="Provider"
              name="Provider"
              // defaultValue={searchedItem.provider}
              onChange={(e) => setProvider(e.target.value)}
              required
            />
            <Label htmlFor="price">price</Label>
            <Input
              type="text"
              id="price"
              name="price"
              // defaultValue={searchedItem.price}
              onChange={(e) => setprice(e.target.value)}
              required
            />
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="text"
              name="amount"
              id="amount"
              // defaultValue={searchedItem.amount}
              // value={item.amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <Label htmlFor="image">Update Image</Label>
            <Input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <SubmitButton type="submit">Update</SubmitButton>
          </FormContainer>
        </Grid>
      </ModalContent>
    </ModalWrapper>
  );
};

export default HoverModel;

const ModalWrapper = styled.div`
  // display: none;
  // position: fixed;
  // z-index: 1;
  // left: 0;
  // top: 0;
  // width: 100%;
  // height: 100%;
  // overflow: auto;
  // background-color: rgba(0, 0, 0, 0.4);
  padding: 0px 76px;

  // &.open {
  //   display: block;
  // }
`;

const ModalContent = styled.div`
  // background-color: #fefefe;
  // margin: 5% auto;
  // padding: 20px;
  // border: 1px solid #888;
  // width: 80%;
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
