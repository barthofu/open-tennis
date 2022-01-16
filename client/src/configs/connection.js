const apiURL = {
    development: 'https://cpoa.api.barthofu.com',
    production: 'https://cpoa.api.barthofu.com'
}

export default apiURL[process.env.NODE_ENV]