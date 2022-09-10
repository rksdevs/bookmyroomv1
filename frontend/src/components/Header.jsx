import styled from "styled-components";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import CarRentalIcon from "@mui/icons-material/CarRental";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { DateRange } from "react-date-range";
import { useState, useContext } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const HeaderMain = styled.div`
  background-color: #16213e;
  color: white;
  display: flex;
  justify-content: center;
  position: relative;
`;
const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: ${(props) =>
    props.type === "list" ? "20px 0px 0px 0px" : "20px 0px 100px 0px"};
`;
const HeaderList = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 50px;
`;
const HeaderListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .active {
    border: 1px solid white;
    padding: 10px;
  }
`;
const HeaderContainerSpan = styled.span``;
const HeaderHeading = styled.h1``;
const HeaderDesc = styled.p`
  margin: 20px 0;
`;
const HeaderButton = styled.button`
  background-color: inherit;
  font-size: large;
  color: #f50057;
  padding: 10px;
  border: 1px solid #f50057;
  border-radius: 20px;

  &:hover {
    background-color: #f50057;
    color: #16213e;
  }
`;

const HeaderSearch = styled.div`
  height: 60px;
  background-color: white;
  border: 3px solid #f50057;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #0f3460;
  padding: 20px 0px;
  border-radius: 5px;
  position: absolute;
  bottom: -30px;
  width: 100%;
  max-width: 1024px;
`;
const HeaderSearchItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
const HeaderSearchInput = styled.input`
  border: none;
  outline: none;
`;
const HeaderSearchButton = styled.button`
  background-color: #16213e;
  font-size: large;
  color: #f50057;
  padding: 10px;
  border: 1px solid #f50057;
  border-radius: 10px;

  &:hover {
    background-color: #f50057;
    color: #16213e;
  }
`;

const HeaderSearchOptions = styled.div`
  position: absolute;
  top: 50px;
  background-color: white;
  color: #16213e;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  padding: 5px;
  z-index: 2;
`;
const HeaderSearchOptionItem = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const HeaderSearchOptionItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #16213e;
`;
const HeaderContainerSpanOption = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
`;

const HeaderSearchOptionButton = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #16213e;
  color: #16213e;
  cursor: pointer;
  background-color: white;
  border-radius: 5px;

  &:hover {
    background-color: #f50057;
    color: #16213e;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const Header = ({ type }) => {
  const { dispatch } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openRoomOptions, setOpenRoomOptions] = useState(false);
  const [roomOptions, setRoomOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setRoomOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "i" ? roomOptions[name] + 1 : roomOptions[name] - 1,
      };
    });
  };

  const handleSearch = (e) => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, roomOptions },
    });
    navigate("/hotellist", { state: { destination, dates, roomOptions } });
  };

  const handleSigninOrRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <HeaderMain>
      <HeaderContainer>
        <HeaderList>
          <HeaderListItem className="active">
            <HotelIcon />
            <HeaderContainerSpan>Stays</HeaderContainerSpan>
          </HeaderListItem>
          <HeaderListItem>
            <FlightIcon />
            <HeaderContainerSpan>Flights</HeaderContainerSpan>
          </HeaderListItem>
          <HeaderListItem>
            <CarRentalIcon />
            <HeaderContainerSpan>Car Rentals</HeaderContainerSpan>
          </HeaderListItem>
          <HeaderListItem>
            <HotelIcon />
            <HeaderContainerSpan>Attractions</HeaderContainerSpan>
          </HeaderListItem>
          <HeaderListItem>
            <LocalTaxiIcon />
            <HeaderContainerSpan>Airport Taxi</HeaderContainerSpan>
          </HeaderListItem>
        </HeaderList>
        {type !== "list" && (
          <>
            {" "}
            <HeaderHeading>A Lifetime of discounts? It's Genius!</HeaderHeading>
            <HeaderDesc>
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free BookMyRoom account
            </HeaderDesc>
            {!user && (
              <HeaderButton
                color="secondary"
                variant="outlined"
                onClick={handleSigninOrRegister}
              >
                Signin / Register
              </HeaderButton>
            )}
            <HeaderSearch>
              <HeaderSearchItem>
                <HotelIcon />
                <HeaderSearchInput
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </HeaderSearchItem>
              <HeaderSearchItem onClick={() => setOpenDate(!openDate)}>
                <CalendarMonthIcon />
                <HeaderContainerSpan>
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </HeaderContainerSpan>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </HeaderSearchItem>
              <HeaderSearchItem
                onClick={() => setOpenRoomOptions(!openRoomOptions)}
              >
                <PersonIcon />
                <HeaderContainerSpan>
                  {`${roomOptions.adult} adults . ${roomOptions.children} children . ${roomOptions.room} rooms`}
                </HeaderContainerSpan>
                {openRoomOptions && (
                  <HeaderSearchOptions>
                    <HeaderSearchOptionItem>
                      <HeaderContainerSpan>Adults</HeaderContainerSpan>
                      <HeaderSearchOptionItemContainer>
                        <HeaderSearchOptionButton
                          disabled={roomOptions.adult <= 1}
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </HeaderSearchOptionButton>
                        <HeaderContainerSpanOption>
                          {roomOptions.adult}
                        </HeaderContainerSpanOption>
                        <HeaderSearchOptionButton
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </HeaderSearchOptionButton>
                      </HeaderSearchOptionItemContainer>
                    </HeaderSearchOptionItem>
                    <HeaderSearchOptionItem>
                      <HeaderContainerSpan>Children</HeaderContainerSpan>
                      <HeaderSearchOptionItemContainer>
                        <HeaderSearchOptionButton
                          disabled={roomOptions.children <= 0}
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </HeaderSearchOptionButton>
                        <HeaderContainerSpanOption>
                          {roomOptions.children}
                        </HeaderContainerSpanOption>
                        <HeaderSearchOptionButton
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </HeaderSearchOptionButton>
                      </HeaderSearchOptionItemContainer>
                    </HeaderSearchOptionItem>
                    <HeaderSearchOptionItem>
                      <HeaderContainerSpan>Rooms</HeaderContainerSpan>
                      <HeaderSearchOptionItemContainer>
                        <HeaderSearchOptionButton
                          disabled={roomOptions.room <= 1}
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </HeaderSearchOptionButton>
                        <HeaderContainerSpanOption>
                          {roomOptions.room}
                        </HeaderContainerSpanOption>
                        <HeaderSearchOptionButton
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </HeaderSearchOptionButton>
                      </HeaderSearchOptionItemContainer>
                    </HeaderSearchOptionItem>
                  </HeaderSearchOptions>
                )}
              </HeaderSearchItem>
              <HeaderSearchButton onClick={handleSearch}>
                Search
              </HeaderSearchButton>
            </HeaderSearch>
          </>
        )}
      </HeaderContainer>
    </HeaderMain>
  );
};
export default Header;
