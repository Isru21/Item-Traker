import styled from "styled-components";
import Items from "./ItemComponents/Items";
import SeachedItems from "./ItemComponents/SeachedItems";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddItemPage from "./Pages/AddItemPage";
import SignInPage from "./Pages/SignInPage"
import HoverModel from "./ItemComponents/HoverModel";
import Navbar from "./Pages/Navebar";
import AdminPage from "./Pages/AdminPage";
// import DOMPurify from 'dompurify';
//mui
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
//mui
import { Button, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";


function App({ itemsearch }) {
  const [items, setItems] = useState([]);
  const [SearchedItems, setSearchedItems] = useState([]);
  const [userReqSearch, setUserReqSearch] = useState("");
  const [ItemAlternator, setItemAlternator] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [refrashe, setrefrashe] = useState("");
  const [itemcompleteRefrashe, setItemcompleteRefrashe] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmployeeFromOpen, setIsEmployeeFromOpen] = useState(false)
  const [isShowemployeeopen, setIsShowemployeeopen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [Idset, setIdset] = useState('')
 

  console.log(itemsearch, "search nav new");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // console.log(storedToken)
    let tokenString = "";
    //let userNameString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
    }

    const bearerToken = tokenString;
    //http://localhost:5000
    fetch("https://item-traker.onrender.com/api/items", {
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
          setItems(data);
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [itemcompleteRefrashe]);

  // const redirectToAddItems = () => {
  //   // window.location.href = "/AddItems";
  // };

  useEffect(() => {
    handleSubmit();
  }, [userReqSearch, refrashe]);

  const handleSubmit = async (e) => {
    //  e.preventDefault();
    const storedToken = localStorage.getItem("token");
    let tokenString = "";
   

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      tokenString = tokenObject.token;
    }

    const bearerToken = tokenString;
    // const sanitizedInput = DOMPurify.sanitize(userReqSearch);
    const regex = /^[A-Za-z0-9]+$/;

    // Test the input value against the regex pattern
    const isValidInput = regex.test(userReqSearch);

    // Update the state based on the validity of the input
    // setIsValid(isValidInput);
    // console.log(isValid)
    // if (!isValid) {
    //   return;
    // }

    if (!isValidInput) {
      setIsValid(false); // Update isValid state
      return;
    }

    setIsValid(true);
    fetch(
      `https://item-traker.onrender.com/api/items/search?Searched_item=${userReqSearch}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response.json().then((data) => {
          console.log(data);

          if (userReqSearch === "") {
            setItemAlternator(true);
          } else {
            setItemAlternator(false);
          }

          setSearchedItems(data);
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  const handleDeletecheck =  (_id) => {
    setIdset(_id)
    setShowConfirmation(!showConfirmation);
  };
  const deleteItem = () => {
    // const refrashe = "";
    //console.log(_id)
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

    fetch(`https://item-traker.onrender.com/api/items/${Idset}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setItems((prevSongs) => prevSongs.filter((item) => item._id !== Idset));

        console.log("item deleted successfully!");
        setrefrashe(Idset);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
      setShowConfirmation(false)
  };

  // const redirectToAddItems = (index) => {
  //   // setSelectedImageIndex(index);
  //   setIsModalOpen(true);
  //   setIsEmployeeFromOpen(true)
  // };

  // const ItemCliked = (itemName) =>{
  //   window.location.href = "/moreInfo";
  // }

  return (
    <Header>
      <Navbar
        userReqSearch={userReqSearch}
        setUserReqSearch={setUserReqSearch}
        setIsModalOpen={setIsModalOpen}
        setIsEmployeeFromOpen={setIsEmployeeFromOpen}
        setIsShowemployeeopen={setIsShowemployeeopen}
        
      />
    
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {/* <DialogTitle>Apartment Image</DialogTitle> */}
          <DialogActions style={{ width: "100%", height: "100%" }}>
            <AddItemPage setItemcompleteRefrashe={setItemcompleteRefrashe} />
          </DialogActions>
        </Dialog>

         <Dialog open={isEmployeeFromOpen} onClose={() => setIsEmployeeFromOpen(false)}>
           <DialogActions style={{ width: "100%", height: "100%" }}>
             <SignInPage />
           </DialogActions>
         </Dialog>

         <Dialog open={isShowemployeeopen} onClose={() => setIsShowemployeeopen(false)}>
           <DialogActions style={{ width: "100%", height: "100%" }}>
             <AdminPage  />
           </DialogActions>
         </Dialog>
      <Body>
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
            Are you sure you want to remove this Item?
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
              onClick={deleteItem}
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
        {" "}
        {ItemAlternator || userReqSearch === "" ? (
          <Items items={items}  handleDeletecheck={handleDeletecheck}  />
        ) : (
          <SeachedItems SearchedItems={SearchedItems} handleDeletecheck={handleDeletecheck} />
        )}{" "}
        {/*<AiOutlinePlus />  */}{" "}
      </Body>
      <div> </div>
    </Header>
  );
}

export default App;
const Body = styled.div`
  margin: 20vh 4vw;
  //  display: flex;
  //     flex-direction: row;
  //     flex-wrap: wrap;
  //width:27vw
`;
const Header = styled.div`
  // background-size: 100%;
  // width: 100vw;
  // height: 25vh;
  // position: absolute;
  // z-index: -1;
  // //background-color: rgba(255, 215, 0, 95%);
  // background-color: rgba(92, 188, 99, 95%);

  // width: 320px;
  // border-radius: 0.75rem;
  // background-color: rgba(17, 24, 39, 1);
  // margin(0rem,10rem,0rem,0rem);
  // padding: 2rem;
  // color: rgba(243, 244, 246, 1);
`;
const Input = styled.input`
  color: black;
  font-size: 0.9rem;
  background-color: #fff;
  width: 40%;
  box-sizing: border-box;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
  border-bottom: var(--border-height) solid var(--border-before-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &:focus {
    outline: none;
  }

  &:focus + .input-border {
    width: 40%;
    border-radius: 5px;
  }
`;

const InputBorder = styled.span`
  position: absolute;
  background: var(--border-after-color);
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  transition: width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  border-radius: 5px;
`;

const FormControl = styled.div`
  position: relative;
  --width-of-input: 300px;
  margin-left: 35vw;
  margin-top: 3vh;
`;

// const InputAlt = styled(Input)`
//   font-size: 1.2rem;
//   padding-inline: 1em;
//   padding-block: 0.8em;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

const InputBorderAlt = styled(InputBorder)`
  height: 3px;
  background: linear-gradient(90deg, #ff6464 0%, #ffbf59 50%, #47c9ff 100%);
  transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1);
`;
const HoverIcon = styled(AiOutlinePlus)`
  margin-left: 30vw;
  cursor: pointer;
  color: black;
  width: 4vw;
  height: 4vh;
  // background: rgba(218,192,167);
  // display: flex;
  // justify-content: center;
  // align-items: center;
  &:hover {
    color: rgba(197, 62, 62, 0.821);
  }
`;

// const tempcheck = styled.div`
// border
// `
