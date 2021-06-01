const config = require('./webpack.config')

config.mode = 'production'
config.devtool = false

module.exports = config