import { CommandArgs } from "../types";
import { request } from "undici";
import * as fs from "fs";
import * as path from "path";
import ProgressBar = require("progress");
import { IncomingHttpHeaders } from "http2";
import { resolve } from "path/posix";

// 文件名字的判断
async function decName(
  url: string,
  headers: IncomingHttpHeaders,
  name?: string | boolean
) {
  if (name) {
    return name;
  } else {
    let Name = path.basename(url);
    var reg = /\.(png|jpg|gif|jpeg|webp|svg)/g;
    let isFile = reg.test(Name);
    if (!isFile) {
      let Name = headers["content-disposition"];
      return Name.split("filename=")[1];
    } else {
      if (Name.indexOf("?") != -1) {
        let NameList = Name.split("?");
        return NameList[0];
      } else {
        return Name;
      }
    }
  }
}
// 格式化字节显示
function bytes(value: number) {
  if (value < 1024) return value + "B";
  if (value < 1 << 20) return (value / (1 << 10)).toFixed(2) + "KB";
  if (value < 1 << 30) return (value / (1 << 20)).toFixed(2) + "MB";
  return (value / (1 << 30)).toFixed(2) + "GB";
}

// 加载文件
async function loadFile(url: string, defaultName?: string | boolean) {
  const { body, headers } = await request(url);
  let size = Number(headers["content-length"]);
  let name = (await decName(url, headers, defaultName)).toString();
  let stream = fs.createWriteStream(path.join("./", name));
  body.pipe(stream);
  let bar = new ProgressBar(
    "downloading [:bar] :loaded/" + bytes(size) + " :percent :etas",
    {
      total: size,
      width: 50,
      complete: "\033[32m=\033[0m",
    }
  );
  body.on("data", (chunk: Buffer) => {
    bar.tick(chunk.byteLength, {
      loaded: bytes(bar.curr + chunk.byteLength),
    });
  });
  return new Promise(
    (resolve,reject)=>{
      stream.on("finish", () => {
        resolve(console.log(`download ${name} finished`));
      });
    }
  )
}

/**
 * 下载文件
 * @param args
 */
export default async function (args: CommandArgs) {
  await loadFile(args.argv[0], args.options["-o"]);
}
