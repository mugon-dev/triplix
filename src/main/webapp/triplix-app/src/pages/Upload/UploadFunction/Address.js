import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import ClearTwoToneIcon from "@material-ui/icons/ClearTwoTone";
import MapDialog from "./MapDialog";
import StickMap from "./StickMap";
export const AddressTtile = styled.p`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  padding-top: 30px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "40px",
    width: "100%",
    background: "#FFFFFF",
    border: "2px solid #FF534B",
    boxSizing: "border-box",
    borderRadius: "22.5px",
    marginTop: "10px",
  },
  input: {
    marginLeft: theme.spacing(1),
    width: "80%",
  },
  iconButton: {
    padding: 9,
  },
  closeButton: {
    float: "right",
    padding: 8,
  },
}));

function Address(props) {
  const classes = useStyles(props);
  const [address, setAddress] = useState(props.address);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [stickopen, setStickopen] = useState(false);
  const handleClose = (value) => {
    console.log(value);
    setLocation(value);
    props.setAddress(value);
    props.setLocation(value);
    setOpen(false);
    setStickopen(true);
  };

  const searchKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchValue(e.target.value);
      setOpen(true);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <AddressTtile>위치추가</AddressTtile>

      <Paper component="form" className={classes.root}>
        <IconButton
          // type="submit"
          className={classes.iconButton}
          onClick={() => props.resetSearchLocation()}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="위치 검색"
          //value={props.address}
          onKeyPress={searchKeyPress}
          onChange={(e) => props.setAddress(e.target.value)}
          // inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton
          className={classes.closeButton}
          aria-label="directions"
          onClick={() => {
            props.setAddress("");
          }}
        >
          <ClearTwoToneIcon />
        </IconButton>
        {stickopen ? (
          <StickMap
            latitude={location.latitude}
            longitude={location.longitude}
          />
        ) : null}
      </Paper>
      <MapDialog
        searchValue={searchValue}
        open={open}
        onClose={handleClose}
        location={setLocation}
      />
    </div>
  );
}

export default Address;
