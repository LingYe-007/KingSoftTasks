import * as chalk from 'chalk'
import { isBinaryFileSync } from 'isbinaryfile'
import { CommandArgs } from '../types'
import * as fs from 'fs'
/**
 * 读取文本文件
 * @param args 
 */
// 判断文件操作
function judgeFile(file:string) {
  let result =isBinaryFileSync(file)
  return !result 
}

// 读取文件内容
async function run(filePath:string) {
  try {
    let data = await fs.promises.readFile(filePath, 'utf-8')
    return data
  } catch (err) {
    console.error('文件读取失败')
  }
}

// 读取文件操作
export default async function(args: CommandArgs) {
  if(args.argv!==[] && judgeFile(args.argv[0])){
    try{
    let stats=fs.statSync(args.argv[0])
    if(stats.size>=10240)
    {
      console.log("ERROR!您要读取的文件过大.")
    }
    else{
     let result=await run(args.argv[0])
     console.log(result)
    }
  }
  catch(err){
    console.log(err)
  }    
}
else{
  console.log(chalk.red("请输入正确的参数！"))
}       
}