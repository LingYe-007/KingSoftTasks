import { CommandArgs } from "../types";
import * as fs from "fs";
import * as path from "path";
import { argv } from "process";

/**
 * 拷贝文件或目录
 * @param args
 */

// 判断其是否为文件夹
async function isFilefold(file: string) {
  let stats = fs.statSync(file);
  if (stats.isDirectory()) return true;
  else return false;
}

// 开辟文件夹
async function mkdir(filename: string, Path: string) {
  fs.mkdir(path.join(Path,filename), {recursive:true},() => {
    return true;
  });
}

// stream读写文件
async function copyFile(file: string, Path: string) {
  let files = fs.readdirSync(file);
  mkdir('',Path)
  files.map(async (item) => {
    let result= await isFilefold(path.join(file,item))
    if (result) {
      mkdir(item,Path);
      copyFile(path.join(file,item), path.join(Path,item));
    } else {
      let readable = fs.createReadStream(path.join(file,item));
      let writeable = fs.createWriteStream(path.join(Path,item));
      writeable.on('finish', () =>{})
      readable.pipe(writeable);
    }
  });
}
export default async function (args: CommandArgs) {
  // 将第一个参数的位置拷贝到第二个参数的位置
  // fs.mkdir(args.argv[0],()=>{})
  copyFile(args.argv[0],args.argv[1]);
}
