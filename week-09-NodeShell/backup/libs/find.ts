import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk'

import { CommandArgs } from '../types'

function find(dir: string, name: string, fileOnly = false) {
  let files = fs.readdirSync(dir)
  for (let file of files) {
    let fullpath = path.join(dir, file)
    let stat = fs.statSync(fullpath)
    let isDirectory = stat.isDirectory()
    let subpath = fullpath.substr(process.cwd().length)
    if (fileOnly === true && isDirectory === false && file.includes(name)) {
      let output = path.join(dir, file.replaceAll(name, chalk.bgGreen(name)))
      console.log(output)
    }
    if (fileOnly === false && subpath.includes(name)) {
      let output = path.join(
        process.cwd(),
        subpath.replaceAll(name, chalk.bgGreen(name))
      )
      console.log(output)
    }
    if (isDirectory === true) {
      find(fullpath, name, fileOnly)
    }
  }
}

function help() {
  console.log(`usage: find <name> [options]

      options:
      ${'--file'.padEnd(15, ' ')}files only`)
}

/**
 * 文件搜索
 * @param args 
 * @returns 
 */
export default function (args: CommandArgs) {
  if (args.options['--help']) return help()
  let name = args.argv[0]
  if (!name) {
    return console.log(chalk.red('name required'))
  }
  let fileOnly = args.options['--file'] ? true : false
  find(process.cwd(), name, fileOnly)
}
