import * as chalk from 'chalk'
import * as readline from 'readline'

import { CommandArgs } from './types'
import cd from './libs/cd'
import find from './libs/find'
import clear from './libs/clear'
import exit from './libs/exit'
import ls from './libs/ls'
import cat from './libs/cat'
import cp from './libs/cp'
import wget from './libs/wget'

const commands = {
  cd,
  find,
  cls: clear,
  clear,
  exit,
  ls,
  cat,
  cp,
  wget
}

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function parseArgs(str: string): CommandArgs {
  str = str.replace(/(\s+)/g, ' ')
  let arr = str.split(' ')
  let args: CommandArgs = {
    cmd: arr[0],
    argv: [],
    options: {}
  }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i]?.startsWith('-') === false) args.argv.push(arr[i])
    else {
      if (arr[i + 1]?.startsWith('-') === false) {
        args.options[arr[i]] = arr[i + 1]
        i += 1
      } else {
        args.options[arr[i]] = true
      }
    }
  }
  return args
}

function run() {
  rl.question(chalk.cyan('NodeShell') + ' ' + process.cwd() + '> ', async answer => {
    try {
      let args = parseArgs(answer)
      if (commands[args.cmd]) await commands[args.cmd](args)
      else console.error(chalk.red('command ' + args.cmd + ' not found'))
    } catch (error) {
      console.trace(error)
    }
    run()
  })
}

clear()
run()