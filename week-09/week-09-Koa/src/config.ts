import * as fs from 'fs'
import * as path from 'path'

interface Config {
  port: number
  mongo_host: string
  mongo_db: string
}

let file = path.join(__dirname, '../config.json')
const config: Config = JSON.parse(fs.readFileSync(file, 'utf-8'))

export default config