import styled from "styled-components/macro";
import Items from "./ItemComponents/Items";
import SeachedItems from "./ItemComponents/SeachedItems";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import HoverModel from "./ItemComponents/HoverModel";
// import DOMPurify from 'dompurify';

function App() {
  const [items, setItems] = useState([]);
  const [SearchedItems, setSearchedItems] = useState([]);
  const [userReqSearch, setUserReqSearch] = useState("");
  const [ItemAlternator, setItemAlternator] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [refrashe, setrefrashe] = useState ("");

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

    fetch("http://localhost:5000/api/items", {
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
  }, []);

  const redirectToAddItems = () => {
    window.location.href = "/AddItems";
  };

  useEffect(() => {
    handleSubmit();
  }, [userReqSearch,refrashe]);

  const handleSubmit = async (e) => {
  //  e.preventDefault();
    const storedToken = localStorage.getItem("token");
    let tokenString = "";
    console.log("selam");

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
      `http://localhost:5000/api/items/search?Searched_item=${userReqSearch}`,
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

  const deleteItem = (_id) => {
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

    if(userRole === "user"){
      alert("not outerised only allowed for admins")
    }

    fetch(`http://localhost:5000/api/items/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setItems((prevSongs) => prevSongs.filter((item) => item._id !== _id));

        console.log("item deleted successfully!");
        setrefrashe(_id)
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }


  // const ItemCliked = (itemName) =>{
  //   window.location.href = "/moreInfo";
  // }

  return (
    <Header>
      
        <FormControl>
          <Input
            className="input input-alt"
            placeholder="Search"
            // required
            type="text"
            name="search"
            id="search"
            value={userReqSearch}
            onChange={(e) => setUserReqSearch(e.target.value)}
          />
          {/* <InputAlt/> */}

          <InputBorderAlt className="input-border input-border-alt" />

          <HoverIcon onClick={redirectToAddItems} />
        </FormControl>
    

      <Body>
        {" "}
        {ItemAlternator || userReqSearch === "" ? (
          <Items items={items} deleteItem={deleteItem}/>
        ) : (
          <SeachedItems SearchedItems={SearchedItems}  deleteItem={deleteItem} />
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
  background-size: 100%;
  width: 100vw;
  height: 25vh;
  position: absolute;
  z-index: -1;
  //background-color: rgba(255, 215, 0, 95%);
  background-color: rgba(92,188,99, 95%);

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
