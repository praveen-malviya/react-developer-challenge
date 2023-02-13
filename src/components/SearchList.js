import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton,Box } from "@mui/material";

const SearchBar = ({ symbolSearch, selectFromList, showList }) => {
  return (
    <Box
      sx={{
        display: showList ? "flex" : "none",
        alignItems: "center",
        p: "10px",
        mt: -2.5,
        mb:5,
        boxShadow: 2,
        width: 350,
        borderRadius: "5px",
      }}
    >
      <List>
        {symbolSearch &&
          symbolSearch.map((item) => {
            return (
              <ListItem key={item["1. symbol"]} sx={{ p: 0, m: 0 }}>
                <ListItemButton
                  onClick={() =>
                    selectFromList(item["1. symbol"], item["2. name"])
                  }
                  // className={location.pathname == item.path ? classes.active : null}
                >
                  <ListItemText
                    primary={item["2. name"]}
                    primaryTypographyProps={{ fontSize: "10px" }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export default SearchBar;
