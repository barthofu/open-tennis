import '@styles/main.scss'
import '@styles/scrollbar.scss'
import '@styles/modal.scss'
import '@styles/reactSelect.scss'
import '@styles/_fonts.scss'

function MyApp({ Component, pageProps }) {
    
    return (<>
        <Component {...pageProps} />
    </>
    )
}

export default MyApp
