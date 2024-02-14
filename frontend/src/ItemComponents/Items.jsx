import styled from "styled-components";
import Item from "./Item";
import HoverModel from "./HoverModel";

//mui
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";

const Items = ({ items, handleDeletecheck }) => {
 
  return (
    <Itemholder>
      <Grid container spacing={2} sx={{ marginBottom: 4 }} item>
        {items.map((item) => (
          <Grid item key={item} xs={12} sm={6} md={6}>
            <CardActionArea
              component="a"
              color="primary"
              key={item._id}
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
                  <Item
                    key={item._id}
                    item={item}
                    handleDeletecheck={handleDeletecheck}
                    // isModalOpen={isModalOpen}
                    // setIsModalOpen={setIsModalOpen}
                    
                   
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

export default Items;

const Itemholder = styled.div`
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  background: rgba(222, 219, 203, 30%);
  // border-radius:  1.435rem;
  // margin: 0px 130px
  padding: 50px;
`;
