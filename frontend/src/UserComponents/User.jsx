import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
//mui
import { Container, Typography } from "@mui/material";

const User = ({ user, setId }) => {
  return (
    <MainBody>
      <Container
        sx={{
          m: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
        maxWidth="sm"
      >
        <Typography variant="subtitle3" sx={{ color: "white" }}>
          <strong>Name:</strong> {user.name}{" "}
        </Typography>
        <Typography variant="subtitle3" sx={{ color: "white" }}>
          {" "}
          <strong>Phone:</strong> {user.phone}{" "}
        </Typography>
        <HoverIcon onClick={() => setId(user._id)} />
      </Container>
    </MainBody>
  );
};

export default User;

const MainBody = styled.div`
  padding: 0px 0px;
`;

const HoverIcon = styled(FaTimes)`
  cursor: pointer;
  color: #aaa;
  &:hover,
  &:focus {
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
`;
