const baseURLConfig = {
    development: 'http://127.0.0.1:3000',
    production: 'http://127.0.0.1:3000'
}

const apiURLConfig = {
    development: 'https://cpoa.api.barthofu.com',
    production: 'https://cpoa.api.barthofu.com'
}

export const baseURL = baseURLConfig[process.env.NODE_ENV]
export const apiURL = apiURLConfig[process.env.NODE_ENV]