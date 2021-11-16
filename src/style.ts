import { makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  select: {
    underline: {
      borderBottom: "0px solid !important",
    },
    height: 55,
    fontSize: 20,
    width: 80,
    margin: "0px 0px 40px 0px",
  },
  fromCard: {
    backgroundColor: "#FEFEFF",
    minHeight: 140,
    minWidth: 500,
    paddingTop:10
  },
  toCard: {
    backgroundColor: "#EEEEEE",
    minHeight: 140,
    minWidth: 500,
    paddingTop:10
  },
  input: {
    fontWeight:"bold",
    direction:"rtl",
    margin: "0px 0px 40px 70px",
    paddingTop:15
  },
  arrow:{
    direction:"ltr",
    
  }
}));
