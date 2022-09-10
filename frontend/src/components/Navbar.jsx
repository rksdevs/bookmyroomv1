import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Logo = styled.div`
  color: white;
  a {
    color: white;
    text-decoration: none;

    &:visited {
      text-decoration: none;
    }
  }
`;

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Logo>
              <Link to="/">BookMyRoom</Link>
            </Logo>
          </Typography>
          {user ? (
            <>
              {" "}
              <Button color="inherit">{user.userName}</Button>{" "}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/register"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
