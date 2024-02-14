import styled from "styled-components"
// import Items from "../ItemComponents/Items";
import { useState, /*useEffect*/ } from "react"
import HoverModel from "../ItemComponents/HoverModel"
import HoverModelForSearched from "../ItemComponents/HoverModelForSearched"

const AddItemPage = ({setItemcompleteRefrashe}) => {
  const [provider, setProvider] = useState ("")
  const [itemName, setItemName] = useState ("")
  const [price, setprice] = useState ("")
  const [amount, setAmount] = useState ("")

  // const [createdAt, setcreatedAt] = useState("")
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);



  
 

  const addItem = (item) => {
    const newItem = { ...item };
    setItems([...items, newItem]);
    setItemcompleteRefrashe(newItem);
    window.location.href = "/mainpage";
    alert('completed add');
  }

  const addSearchedItem = (searchedItem) => {
    const newItem = { ...searchedItem };
    setItems([...items, newItem]);
    alert('completed');
  }

  

  const onCreatesubmit = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("token");
    let tokenString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
    }

    const bearerToken = tokenString;

    if (!provider || !itemName || !price || !amount) {
      alert("Enter all the necessary parts");
      return;
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("provider", provider);
    formData.append("price", price);
    formData.append("amount", amount);

    // Check if an image is selected
    if (image) {
      formData.append("image", image); // Append the selected image file to the form data
    }

    try {
      // console.log(formData)
      // Send the POST request to add the new item
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Call the addItem function passed as a prop to update the parent component's state
      addItem(data);

      // Reset the form fields
      setProvider("");
      setItemName("");
      setprice("");
      setAmount("");
      setImage(null);

      // alert("Item registered successfully");
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to register item");
    }
  };

  const handleImageChange = (e) => {
    // Update the 'image' state when a new image is selected
    setImage(e.target.files[0]);
  };


  return (
    <Container>
      {items.map((item) => (
  <HoverModel key={item._id} item={item} onUpdate={addItem} />
))}

{items.map((searchedItem) => (
  <HoverModelForSearched key={searchedItem._id} item={searchedItem} onUpdate={addSearchedItem} />
))}

    <FormContainer>
      <Title>Register Items</Title>
      <form className="form" onSubmit={onCreatesubmit}>
        <FormGroup>
          <Label htmlFor="ItemName">ItemName</Label>
          <Input
            type="text"
            name="ItemName"
            id="ItemName"
            value={itemName}
            placeholder="Enter the items name"
            onChange={(e) => setItemName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Provider">Provider</Label>
          <Input
            type="text"
            name="Provider"
            id="Provider"
            value={provider}
            placeholder="Enter the Provider's name"
            onChange={(e) => setProvider(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">price</Label>
          <Input
            type="text"
            name="price"
            id="price"
            value={price}
            placeholder="Enter the price the item was bought with"
            onChange={(e) => setprice(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="text"
            name="amount"
            id="amount"
            value={amount}
            placeholder="How much unit of the item have been deliverd ?"
            onChange={(e) =>  setAmount(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="image">Item Image</Label>
            <Input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormGroup>
       
        <SignButton type="submit">Register</SignButton>
      </form>
      
    </FormContainer>
  </Container>
  )
}

export default AddItemPage

// const Text = styled.h1``


const Container = styled.div`
  // width: 100%;
  // height: 100vh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;
// const GotoRegister = styled(Link)``;
const FormContainer = styled.div`
  width: 320px;
  // border-radius: 0.75rem;
  background-color: rgba(92,188,99, 95%);
  padding: 2rem;
  color: rgba(62, 58, 57);
`;

const Title = styled.p`
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
`;

const FormGroup = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const Label = styled.label`
  display: block;
  color: rgba(62, 58, 57);
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
 // background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
 // color: rgba(243, 244, 246, 1);

  &:focus {
    border-color: rgba(167, 139, 250);
  }
`;

const SignButton = styled.button`
  display: block;
  width: 100%;
  background-color: rgba( 229, 143, 101, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(62, 58, 57);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  &:hover {
    background-color: rgb(255,128,125);
  }
  cursor: pointer;
`;

// const SocialMessage = styled.div`
//   display: flex;
//   align-items: center;
//   padding-top: 1rem;
// `;

// const Signup = styled.p`
//   text-align: center;
//   font-size: 0.75rem;
//   line-height: 1rem;
//   color: rgba(62, 58, 57);
// `;
// const PasswordIndicatorContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 0.5rem;
// `;

// const PasswordStrength = styled.div`
//   flex: 1;
//   height: 8px;
//   border-radius: 4px;
// `;

// const StrengthSegment = styled.div`
//   height: 100%;
//   border-radius: inherit;
// `;

// const Weak = styled(StrengthSegment)`
//   background-color: #ff6347; /* Red for weak */
// `;

// const Moderate = styled(StrengthSegment)`
//   background-color: #ffa500; /* Orange for moderate */
// `;

// const Strong = styled(StrengthSegment)`
//   background-color: #00AB66; /* Blue for strong */
// `;

// const PasswordIndicatorText = styled.p`
//   margin-left: 0.5rem;
//   font-size: 0.75rem;
//   color:rgba(62, 58, 57);
// `;
