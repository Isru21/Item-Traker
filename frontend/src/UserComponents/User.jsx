import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
//mui
import { Button, Container, Typography } from "@mui/material";

const User = ({ user,setId }) => {
  return (
    <MainBody>
      <Container
        sx={{
          //f0f0f0
          // backgroundColor: "#E1E2E7",
          m: 1,
          display: "flex",
          justifyContent: "space-between",
          // justifyContent: "space-between",
        }}
        maxWidth="xl"
      >
        {/* <Typography variant="h6">Employee</Typography> */}
        <Typography variant="subtitle1"><strong>Name:</strong> {user.name} </Typography>
        <Typography variant="subtitle1"> <strong>Phone Number:</strong> {user.phone} </Typography>
        <HoverIcon onClick={() => setId(user._id)} />
      </Container>
    </MainBody>
  );
};

export default User;

const MainBody = styled.div`
  background: rgba(247, 247, 221,30%);
  // margin: 5px 7px;
  padding: 7px 0px;
  // cursor: pointer;
  // border-radius: 0.375rem;
`;
const Employe = styled.h3`
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
`;
const OtherInfo = styled.p``;
const HoverIcon = styled(FaTimes)`
  cursor: pointer;
  // color: rgba(197, 62, 62, 0.821);
  // &:hover {
  //   color: red;
  // }
  color: black;
  &:hover,
  &:focus {
    color: red;
    text-decoration: none;
    cursor: pointer;
  }
`;