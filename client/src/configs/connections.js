const baseURLConfig = {
    development: 'http://127.0.0.1:3000',
    production: ''
}

const apiURLConfig = {
    development: 'https://cpoa.api.barthofu.com',
    production: ''
}

export const baseURL = baseURLConfig[process.env.NODE_ENV]
export const apiURL = apiURLConfig[process.env.NODE_ENV]