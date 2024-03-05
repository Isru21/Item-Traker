import styled from "styled-components";
import Items from "./ItemComponents/Items";
import SeachedItems from "./ItemComponents/SeachedItems";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddItemPage from "./Pages/AddItemPage";
import SignInPage from "./Pages/SignInPage";
import Navbar from "./Pages/Navebar";
import AdminPage from "./Pages/AdminPage";
// import DOMPurify from 'dompurify';
//mui
import Dialog from "@mui/material/Dialog";
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
  const [isEmployeeFromOpen, setIsEmployeeFromOpen] = useState(false);
  const [isShowemployeeopen, setIsShowemployeeopen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [Idset, setIdset] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    let tokenString = "";

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
  const handleDeletecheck = (_id) => {
    setIdset(_id);
    setShowConfirmation(!showConfirmation);
  };
  const deleteItem = () => {
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
    setShowConfirmation(false);
  };

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

      <Dialog
        open={isEmployeeFromOpen}
        onClose={() => setIsEmployeeFromOpen(false)}
      >
        <DialogActions style={{ width: "100%", height: "100%" }}>
          <SignInPage />
        </DialogActions>
      </Dialog>

      <Dialog
        open={isShowemployeeopen}
        onClose={() => setIsShowemployeeopen(false)}
      >
        <DialogActions style={{ width: "100%", height: "100%" }}>
          <AdminPage />
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
              borderRadius: 2,
              padding: 2,
              zIndex: 9999,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, mt: 1, color: "red" }}>
              This item will be deleted
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Button
                // variant="contained"
                sx={{
                  mr: 2,
                  color: "red",

                  backgroundColor: "#CC645E",
                  color: "white",
                }}
                onClick={deleteItem}
              >
                Yes
              </Button>
              <Button
                // variant="outlined"
                sx={{
                  outlineColor: "#78B777",

                  backgroundColor: "#78B777",
                  color: "white",
                }}
                onClick={() => setShowConfirmation(false)}
              >
                No
              </Button>
            </Grid>
          </Paper>
        )}{" "}
        {ItemAlternator || userReqSearch === "" ? (
          <Items items={items} handleDeletecheck={handleDeletecheck} />
        ) : (
          <SeachedItems
            SearchedItems={SearchedItems}
            handleDeletecheck={handleDeletecheck}
          />
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
`;
const Header = styled.div``;
