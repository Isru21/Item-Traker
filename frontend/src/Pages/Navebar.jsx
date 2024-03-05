import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { AppBar } from "@mui/material";
import { Grid } from "@mui/material";
//mui
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
//mui2
import { styled, alpha } from "@mui/material/styles";
// import AppBar from '@mui/material/AppBar'
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Typography from '@mui/material/Typography';
import InputBase from "@mui/material/InputBase";
// import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "#474747",
        }}
        // position="absolute"
      >
        {" "}
        <Grid sx={{ mb: 1 }}>
          <Container
            sx={{
              backgroundColor: "#474747",
            }}
            // maxWidth="sm"
          >
            <nav>
              <Grid container justifyContent="center" alignItems="center">
                <Button
                  onClick={(e) => setIsModalOpen(true)}
                  style={{
                    color: "white",

                    textDecoration: "underline",
                    borderRadius: 0,
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    {" "}
                    <AddIcon />
                  </IconButton>
                </Button>

                {/* </Link> */}
                {userRoleCheck === "admin" && (
                  <Button
                    onClick={(e) => setIsEmployeeFromOpen(true)}
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      borderRadius: 0,
                    }}
                  >
                    <PersonAddIcon />
                  </Button>
                )}
                {userRoleCheck === "admin" && (
                  <Button
                    onClick={(e) => setIsShowemployeeopen(true)}
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      borderRadius: 0,
                    }}
                  >
                    <GroupIcon />
                  </Button>
                )}
              </Grid>
            </nav>
          </Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            maxWidth="xl"
          >
            <Toolbar>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  className="input input-alt"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  type="text"
                  name="search"
                  id="search"
                  value={userReqSearch}
                  onChange={(e) => setUserReqSearch(e.target.value)}
                />
              </Search>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
