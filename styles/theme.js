import { createGlobalStyle } from "styled-components";

const light = {
  color: {
    primary: {
      name: 'dark_blue',
      value: '#001730'
    },
    secondary: {
      name: 'sea_green',
      value: '#4AD7D1'
    },
    terciary: {
      name: 'red',
      value: '#FE4A49'
    },
  }
};

const dark = {

};

export const theme = {
  borderRadius: {
    primary: "10px"
  },
  light,
  dark
}

export const GlobalStyles = createGlobalStyle`
  /* add global styles here */
`