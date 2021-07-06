import { CommandArgs } from '../types'

/**
 * 目录切换
 * @param args 
 */
export default function(args: CommandArgs) {
  process.chdir(args.argv[0])
}