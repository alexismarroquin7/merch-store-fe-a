import { MenuIcon, Section } from '../components';
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from "../styles/theme";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider
    theme={theme}
  >
    <GlobalStyles/>
    <Section>
      <MenuIcon
        open={true}
      />
      <Component {...pageProps} />
    </Section>
  </ThemeProvider>
  )
}

export default MyApp
