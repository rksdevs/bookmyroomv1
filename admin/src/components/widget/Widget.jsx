import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [count, setCount] = useState([]);

  const dataSetsUrls = ["/users", "/hotels", "/rooms"];
  let data;

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        count: count[0],
        path: "/users",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotels":
      data = {
        title: "HOTELS",
        count: count[1],
        path: "/hotels",
        isMoney: false,
        link: "View all hotels",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "rooms":
      data = {
        title: "ROOMS",
        count: count[2],
        path: "/rooms",
        isMoney: false,
        link: "View all rooms",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  useEffect(() => {
    const fetch = async (url) => {
      const res = await axios.get(url);
      return res.data.length;
    };

    const fetchOutput = async () => {
      const output = await Promise.all(
        dataSetsUrls.map((item) => {
          return fetch(item);
        })
      );
      setCount([...output]);
      // console.log(count);
    };
    // console.log(fetchOutput());
    fetchOutput();
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.count}
        </span>

        <Link to={data.path} style={{ textDecoration: "none" }}>
          <span className="link">{data.link}</span>
        </Link>
      </div>
      {/* <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div> */}
    </div>
  );
};

export default Widget;
