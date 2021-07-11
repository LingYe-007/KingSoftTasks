const fs = require('fs')
const path = require('path')

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf-8'))

exports.host = `http://localhost:${config.port}`