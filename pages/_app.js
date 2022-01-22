import { Section } from '../components';
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from "../styles/theme";
import '../styles/globals.css'
import { Menu } from '../widgets';

function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider
    theme={theme}
  >
    <GlobalStyles/>
    <Section>
      
      <Menu
        open={false}
      />
      
      <Component {...pageProps} />
    </Section>
  </ThemeProvider>
  )
}

export default MyApp
