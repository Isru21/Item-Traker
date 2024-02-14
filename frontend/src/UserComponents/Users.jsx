import User from "./User";
import styled from "styled-components";
//mui
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

const Users = ({ users, setId }) => {
  return (
    <Itemholder>
      <Grid
        container
        // justifyContent="center"
        // alignItems="center"
        spacing={2}
        sx={{ marginBottom: 4 }}
        item
      >
        <Grid container justifyContent="center" alignItems="center">
          {" "}
          <Typography variant="h4">Employee list</Typography>
        </Grid>
        {users.map((user) => (
          <Grid item key={user} xs={12} sm={6} md={12}>
            {/* {console.log(item, "reqwsts")} */}

            <CardActionArea
              component="a"
              // href="#"
              color="primary"
              // onDoubleClick={()=> handleClick(request.apartment_id)}
              // onClick={() => {
              //   setId(request._id);
              //   setRequestedAppartama(request.realestate_name);
              //   setSentmessage(request.message);
              //   setUserName(request.client_name);
              // }}
              key={user._id}
              className="links"
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "  rgba(92,188,99, 95%)",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <User key={user._id} user={user} setId={setId} />
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Itemholder>
  );
};

export default Users;

const Title = styled.h1`
  // padding: 5% 45% 1% 45%
`;
const Itemholder = styled.div`
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  background: rgba(229, 143, 101, 15%);
  // border-radius:  1.435rem;
  padding: 18px;
`;
