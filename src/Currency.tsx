import React from "react";
import useStyles from "./style";
// import NumberFormat from 'react-number-format';

import { Grid, Select, TextField } from "@material-ui/core";

const Currency = (props: any) => {
  const {
    currencyType,
    selectedCurrency,
    onchangeAmount,
    onChangeCurrency,
    defaults,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Select
          className={classes.select}
          id="demo-simple-select"
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {currencyType.map((item: any) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <TextField
          className={classes.input}
          id="outlined-basic"
          type="number"
          variant="standard"
          value={defaults}
          onChange={onchangeAmount}
        />
      </Grid>
    </div>
  );
};

export default Currency;
