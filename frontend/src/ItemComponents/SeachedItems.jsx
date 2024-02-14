// import styled from "styled-components"
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
    // <Itemholder>
    //   {SearchedItems.map((searchedItem)=>(
    //     <SearchedItem
    //         key={searchedItem._id}
    //         searchedItem={searchedItem}
    //         deleteItem={deleteItem}
    //     />
    //   ))}
    // </Itemholder>
    <Itemholder>
      <Grid
        container
        // justifyContent="center"
        // alignItems="center"
        spacing={2}
        sx={{ marginBottom: 4 }}
        item
      >
        {SearchedItems.map((searchedItem) => (
          <Grid item key={searchedItem} xs={12} sm={6} md={6}>
      

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
              key={searchedItem._id}
              className="links"
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: " #E1E2E7",
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
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  background: rgba(222, 219, 203, 50%);
  //  border-radius:1.435rem;
  //margin: 0px 130px
  padding: 50px;
`;
