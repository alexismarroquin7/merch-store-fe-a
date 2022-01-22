import { ThemeProvider } from 'styled-components'
import '../styles/globals.css'

import { GlobalStyles, theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider
    theme={theme.light}
  >
    <GlobalStyles/>
    <Component {...pageProps} />
  </ThemeProvider>
  )
}

export default MyApp
