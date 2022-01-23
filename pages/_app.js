import { Section } from '../components';
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from "../styles/theme";
import '../styles/globals.css'
import { Nav } from '../widgets';

function MyApp({ Component, pageProps }) {
  return (
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
  )
}

export default MyApp
