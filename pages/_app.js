// components
import { Section } from '../components';

// widgets
import { Nav } from '../widgets';

// store
import { Provider, useSelector } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../store";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// styles
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from "../styles/theme";
import '../styles/globals.css'

let persistedState = {};

if(typeof window !== "undefined"){
  persistedState = JSON.parse(localStorage.getItem('merch_store_fe_a')) 
  ? JSON.parse(localStorage.getItem('merch_store_fe_a')) 
  : {}
}

const middleware = applyMiddleware(thunk, logger);
const store = createStore(
  rootReducer,
  persistedState,
  middleware
);

store.subscribe(() => {
  if(typeof window !== "undefined"){
    localStorage.setItem(
      'merch_store_fe_a',
      JSON.stringify(store.getState())
    );
  }
});

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <ThemeProvider
      theme={theme}
    >
      <GlobalStyles/>
      
      <Nav/>
      
      <Section
        padding="2rem 0"
      >  
        <Component {...pageProps} />
      </Section>
    </ThemeProvider>
  </Provider>
  )
}

export default MyApp
