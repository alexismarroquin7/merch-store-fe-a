// components
import { Section } from '../components';

// widgets
import { Nav } from '../widgets';

// store
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../store";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// styles
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from "../styles/theme";
import '../styles/globals.css'

const middleware = applyMiddleware(thunk, logger);
const store = createStore(
  rootReducer,
  middleware
);

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <ThemeProvider
      theme={theme}
    >
      <GlobalStyles/>
      
      <Nav
        menuOpen={false}
      />
      <Section>  
        <Component {...pageProps} />
      </Section>
    </ThemeProvider>
  </Provider>
  )
}

export default MyApp
