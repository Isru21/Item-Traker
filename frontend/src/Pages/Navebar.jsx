import { Link } from "react-router-dom";
// import { useAuthContext, useDataContext } from "../../hooks/useContexts";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/system";
// import { styled } from "@mui/system";
import { AppBar } from "@mui/material";
import { Grid } from "@mui/material";
import { Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

//mui
import AddIcon from "@mui/icons-material/Add";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useEffect, useState } from "react";

export default function Navbar({
  userReqSearch,
  setUserReqSearch,
  setIsModalOpen,
  setIsEmployeeFromOpen,
  setIsShowemployeeopen,
}) {
  const [userRoleCheck, SetuserRoleCheck] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);

    let roleString = "";

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);

      roleString = tokenObject.role;
    }

    SetuserRoleCheck(roleString);
  }, []);
  return (
    <AppBar
      sx={{
        backgroundColor: "#E1E2E7",
      }}
    >
      {" "}
      <Grid>
        {/* <AddIcon/> */}

        <Container
          sx={{
            //f0f0f0
            backgroundColor: "#E1E2E7",
            m: 3,
            display: "flex",
            justifyContent: "space-between",
            // justifyContent: "space-between",
          }}
          maxWidth="xl"
        >
          {/* <Typography variant="h5" color={"black"}>
            {" "}
            <strong>Item Tracker</strong>
          </Typography> */}

          {/* <Grid container justifyContent="center" alignItems="center"> */}
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

          <nav>
            <Button
              // variant="outlined"
              // style={{ backgroundColor: "#2D3642", color: "#fff" }}
              onClick={(e) => setIsModalOpen(true)}
              style={{
                // color: "#fff",
                color: "#2D3642",
                // backgroundColor: "rgba(0,0,0,.1)",
                textDecoration: "underline",
                borderRadius: 0,
              }}
            >
              Register Items
            </Button>

            {/* </Link> */}
            {userRoleCheck === "admin" && (
              <Button
                // variant="contained"
                // style={{ backgroundColor: "#2D3642", color: "#fff" }}
                onClick={(e) => setIsEmployeeFromOpen(true)}
                style={{
                  color: "#2D3642",
                  textDecoration: "underline",
                  borderRadius: 0,
                }}
              >
                Add Employee
              </Button>
            )}
            {userRoleCheck === "admin" && (
              <Button
                // variant="contained"
                // style={{ backgroundColor: "#2D3642", color: "#fff" }}
                onClick={(e) => setIsShowemployeeopen(true)}
                style={{
                  color: "#2D3642",
                  textDecoration: "underline",
                  borderRadius: 0,
                }}
              >
                show Employees
              </Button>
            )}

            {/* { user &&(   
            <Link to={"/requests"}>
              <Button
                // variant="contained"
                style={{
                  color: "#2D3642",
                  textDecoration: "underline",
                  borderRadius: 0,
                }}
              >
                Requests
              </Button>
            </Link>)} */}
          </nav>
        </Container>
      </Grid>
    </AppBar>
  );
}

const GreenRingAvatar = styled("div")({
  // position: 'relative',
  // display: 'inline-block',
  marginRight: "7px",
  // width: '52px', // Adjust the width to accommodate the increased border size
  // height: '52px',
  // '&::before': {
  //   content: '""',
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   borderRadius: '50%',
  //   border: '14px solid #4CAF50', // Green color for the ring
  //   boxSizing: 'border-box',
  //   pointerEvents: 'none',
  // },
});

const Input = styled.input`
  color: black;
  font-size: 0.9rem;
  background-color: #fff;
  width: 40wv;
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
// const HoverIcon = styled(AiOutlinePlus)`
//   margin-left: 30vw;
//   cursor: pointer;
//   color: black;
//   width: 4vw;
//   height: 4vh;
//   // background: rgba(218,192,167);
//   // display: flex;
//   // justify-content: center;
//   // align-items: center;
//   &:hover {
//     color: rgba(197, 62, 62, 0.821);
//   }
// `;
