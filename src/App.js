import "./App.css";
import { useEffect, useRef, useState } from "react";
import SearchAppBar from "./components/SearchAppBar";
import SearchBar from "./components/SearchBar";
import SearchList from "./components/SearchList";
import {Typography, Box, Grid } from "@mui/material";
import LineChart from "./components/LineChart";


const API_key = "LRKN2YLVF2UZZ3EV";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [symbolSearch, setSymbolSearch] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [symbolsData, setSymbolsData] = useState([]);
  const [showList, setShowList] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);

  let windowLoaded = true

  useEffect(() => {
      const storedSymbols =  JSON.parse(localStorage.getItem("symbolData"));

      if(storedSymbols) {
        setSymbolsData(storedSymbols)
      }
  }, [])

  useEffect(() => {
    if(symbolsData.length > 0) localStorage.setItem("symbolData", JSON.stringify(symbolsData)); 
  }, [symbolsData]);


  let searchInputRef = useRef(null);

  useEffect(() => {
    async function searchData() {
      console.log("data.bestMatches");
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery.toUpperCase()}&apikey=+ ${API_key}`
      );
      const data = await response.json();
      setSymbolSearch(data.bestMatches);
      setShowList(true);
      setButtonEnable(false);
      console.log(data.bestMatches);
    }
    if (searchQuery.length > 0) {
      searchData();
    } else {
      setShowList(false);
    }
  }, [searchQuery]);

  const timeArray = [];


  async function graphData(symbol) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol.toUpperCase()}&apikey=+ ${API_key}`
    );
    const data = await response.json();
    const newSymbol = data;
    console.log("new Symbol", newSymbol);
    // console.log(newSymbol["Time Series (Daily)"])

    const todayMarket = newSymbol["Time Series (Daily)"][Object.keys(newSymbol["Time Series (Daily)"])[Object.keys(newSymbol["Time Series (Daily)"]).length - 1]]

    // console.log("todayMarket", Object.keys(newSymbol["Time Series (Daily)"]), todayMarket)
    for (var key in newSymbol["Time Series (Daily)"]) {
      if (newSymbol["Time Series (Daily)"].hasOwnProperty(key)) {
        timeArray.push(newSymbol["Time Series (Daily)"][key]["4. close"]);
      }
    }

    setSymbolsData((prevData) => {
      return [
        ...prevData,
        {
          symbol: newSymbol["Meta Data"]["2. Symbol"],
          timeSeries: timeArray,
          open: todayMarket["1. open"],
          close: todayMarket["4. close"],
        },
      ];
    });
    console.log("symbole data", symbolsData);
  }

  const selectFromList = (symbol) => {
    searchInputRef.current.value = symbol;
    setSymbol(symbol);
    setButtonEnable(true);
    setShowList(false);
  };

  const trackSymbol = () => {
    console.log("trackSymobl", symbol);
    graphData(symbol);
    searchInputRef.current.value = ''
    setButtonEnable(false)
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100vw" }}
    >
      <Grid item>
        <header className="App-header">
          <SearchAppBar
            setSearchQuery={setSearchQuery}
            searchInputRef={searchInputRef}
          />
        </header>
      </Grid>
      <Grid item>
        <SearchBar
          setSearchQuery={setSearchQuery}
          searchInputRef={searchInputRef}
          trackSymbol={trackSymbol}
          buttonEnable={buttonEnable}
        />
      </Grid>

      {/* <Grid item sx={{ position: "static" }}> */}
      <Box>
        <SearchList
          symbolSearch={symbolSearch}
          selectFromList={selectFromList}
          showList={showList}
        />
      </Box>
      <Box
      // sx={{bgcolor:"greenyellow", width:500}}
      >
        {symbolsData.map((symbol) => {
          return (
            <Grid
            key={symbol.key}
              item
              sx={{
                bgcolor: "ghostwhite",
                width: 500,
                height: 300,
                mb: 2,
                boxShadow: 1,
                borderRadius: "2px",
              }}
            >
              <LineChart symbolData={symbol} />
              <Grid
                container
               sx={{
                mt:1
               }}
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Typography sx={{ color: "#4B7BF5" }}>
                  Open: {symbol.open}
                </Typography>
                <Typography sx={{ color: symbol.close-symbol.open>=0 ? "green":"red" }}>Close: {symbol.close}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>
      {/* </Grid> */}
      {/* <Grid>
        <Typography variant="h6">Your Symbol tracking</Typography>
      </Grid> */}
    </Grid>
  );
}

export default App;
