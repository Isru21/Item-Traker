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
            <CardActionArea
              component="a"
              color="primary"
              key={user._id}
              className="links"
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: " #535353",
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

const Itemholder = styled.div`
  padding: 18px;
`;
