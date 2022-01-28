import '@styles/main.scss'
import '@styles/scrollbar.scss'
import '@styles/modal.scss'
import '@styles/reactSelect.scss'
import '@styles/_fonts.scss'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
    
    return (<>
        <ThemeProvider defaultTheme="dark">
            <Component {...pageProps} />
        </ThemeProvider>
    </>
    )
}

export default MyApp
