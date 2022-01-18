const path = require('path')

const nextConfig = {

    sassOptions: {
        includePaths: [
            path.join(__dirname, 'public/styles/')
        ]
    },

    images: {
        domains: [
            'cdn.discordapp.com'
        ]
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true
            },
            {  
                source: '/dashboard',
                destination: '/dashboard/vips',
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig