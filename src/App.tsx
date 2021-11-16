import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import "./App.css";
import useStyles from "./style";
import Currency from "./Currency";
import { CurrencyInterface } from "./models";
import { ArrowCircle } from "./Svg/index";
// import { getCurrencyApi } from "./Services";

const BaseUrl =
  "https://openexchangerates.org/api/latest.json?app_id=f3ee7e30a76641d0b46c1517056875fb";

const App = () => {
  const classes = useStyles();
  const [currencyType, setCurrencyType] = useState<CurrencyInterface>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [exchanges, setExchanges] = useState<any>();
  const [defaults, setDefaults] = useState<number>(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState<boolean>(true);

  let toAmount, fromAmount;
  if (amountFromCurrency) {
    fromAmount = defaults;
    toAmount = defaults * exchanges;
  } else {
    toAmount = defaults;
    fromAmount = defaults / exchanges;
  }

  // useEffect(() => {
  //   getApi();
  // }, []);

  // const getApi = async () => {
  //   try {
  //     const { status, data } = await getCurrencyApi();
  //     if (status === 200) {
  //       const firstItem = Object.keys(data.rates)[0];
  //       setCurrencyType([data.base, ...Object.keys(data.rates)]);
  //       setFromCurrency(data.base);
  //       setToCurrency(firstItem);
  //       setExchanges(data.rates[firstItem]);
  //     }
  //   } catch (e) {
  //     return e;
  //   }
  // };
  useEffect(() => {
    fetch(BaseUrl)
      .then((res) => res.json())
      .then((data) => {
        const firstItem = Object.keys(data.rates)[1];
        setCurrencyType([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstItem);
        setExchanges(data.rates[firstItem]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BaseUrl}&base:${fromCurrency}&symbols:${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchanges(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);
  
  const handleFromAmountChange = (e: any) => {
    setDefaults(e.target.value);
    setAmountFromCurrency(true);
  };

  const handleToAmountChange = (e: any) => {
    setDefaults(e.target.value);
    setAmountFromCurrency(false);
  };


  return (
    <>
      <Card className={classes.fromCard}>
        <Currency
          currencyType={currencyType}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e: any) => setFromCurrency(e.target.value)}
          onchangeAmount={handleFromAmountChange}
          defaults={fromAmount}
        />
      </Card>
      <div className={classes.arrow}>{ArrowCircle}</div>
      <Card className={classes.toCard}>
        <Currency
          currencyType={currencyType}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e: any) => setToCurrency(e.target.value)}
          onchangeAmount={handleToAmountChange}
          defaults={toAmount}
        />
      </Card>
    </>
  );
};

export default App;
