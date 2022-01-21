import '@styles/main.scss'
import '@styles/scrollbar.scss'
import '@styles/modal.scss'

function MyApp({ Component, pageProps }) {
    
    return (<>
        <Component {...pageProps} />
    </>
    )
}

export default MyApp
