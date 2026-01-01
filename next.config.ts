// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/nse/:path*',
        destination: 'https://www.nseindia.com/api/:path*',
      },
    ];
  },
}