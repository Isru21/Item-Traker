import styled from "styled-components";
import SearchedItem from "./SearchedItem";
//mui
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

const SeachedItems = ({ SearchedItems, handleDeletecheck }) => {
  // console.log(SearchedItems)
  return (
    <Itemholder>
      <Grid container spacing={2} sx={{ marginBottom: 4 }} item>
        {SearchedItems.map((searchedItem) => (
          <Grid item key={searchedItem} xs={12} sm={6} md={6}>
            <CardActionArea
              component="a"
              // href="#"
              color="primary"
              key={searchedItem._id}
              className="links"
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#707378",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <SearchedItem
                    key={searchedItem._id}
                    searchedItem={searchedItem}
                    handleDeletecheck={handleDeletecheck}
                  />
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Itemholder>
  );
};

export default SeachedItems;

const Itemholder = styled.div`
  background: rgba(222, 219, 203, 30%);
  padding: 0px 10px;
`;
