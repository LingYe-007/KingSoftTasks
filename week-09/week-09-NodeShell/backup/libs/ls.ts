import * as chalk from "chalk";
import { CommandArgs } from "../types";
import * as fs from "fs";
// import path from "path/posix";
import * as path from "path";

/**
 * 枚举文件
 * @param args
 */
// 默认文件夹排序,文件夹与文件分开
function sortFiles(files: string[]) {
  let filesCol = [];
  let fileCol = [];
  files.map((item) => {
    let itemPath = path.join("./", item);
    let stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      filesCol.push(item);
    } else {
      fileCol.push(item);
    }
  });
  return [filesCol, fileCol];
}

// 格式化时间
function Add0(MonthDay: number) {
  return MonthDay < 10 ? "0" + MonthDay : MonthDay;
}
function formatTime(time: Date) {
  let nowTime = `${time.getFullYear()}-${Add0(time.getMonth())}-${Add0(
    time.getDay()
  )} ${Add0(time.getHours())}:${Add0(time.getMinutes())}`;
  return nowTime;
}

// 按照时间顺序排列
function compare(property: string) {
  return function (a: {}, b: {}) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  };
}
function sortTime(files: string[], order = null) {
  let newFiles = [];
  let lastFiles = [];
  files.map((item) => {
    let itemPath = path.join("./", item);
    let stats = fs.statSync(itemPath);
    let dic = {};
    dic["key"] = item;
    dic["mtime"] = stats.mtime;
    newFiles.push(dic);
  });
  newFiles.sort(compare("mtime"));
  if (order === "desc") {
    newFiles.reverse();
    newFiles.map((item) => {
      lastFiles.push(item["key"]);
    });
  } else {
    newFiles.map((item) => {
      lastFiles.push(item["key"]);
    });
  }
  return lastFiles;
}

// 按照文件名降序
function sortDesc(files: string[]) {
  let [filesCol, fileCol] = sortFiles(files);
  return [filesCol.reverse(), fileCol.reverse()];
}

export default function (args: CommandArgs) {
  let files = fs.readdirSync("./");
  if (files) {
    // 参数的判断
    if (args.options !== {}) {
      let i = 0;
      const argOptions = { "-sort": "mtime", "-order": "desc" };
      argOptions["-sort"] == args.options["-sort"] ? (i += 1) : i;
      argOptions["-order"] == args.options["-order"] ? (i += 2) : i;
      switch (i) {
        default:
          let [filesCol, fileCol] = sortFiles(files);
          outPut(filesCol, fileCol);
          break;
        case 1:
          // 参数为'-sort:mtime'
          files = sortTime(files);
          outPut(files);
          break;
        case 2:
          // 参数为'-order-desc'
          let [filesCollection, fileCollection] = sortDesc(files);
          outPut(filesCollection, fileCollection);
          break;
        case 3:
          // 两者都有
          files = sortTime(files, "desc");
          outPut(files);
          break;
      }
    }
  } else {
    console.warn("您输入的参数不存在,请重新输入");
  }
}

function outPut(files: string[], file = []) {
  // 最后输出
  console.log(
    `LastWriteTime            Length Name
----------------  ------------- ----`
  );
  files.map((item) => {
    let itemPath = path.join("./", item);
    let stats = fs.statSync(itemPath);
    console.log(
      `${formatTime(stats.mtime)}${String(stats.size).padStart(15, " ")} ${
        stats.isDirectory() ? chalk.blue(item) : chalk.green(item)
      }`
    );
  });
  file.map((item) => {
    let itemPath = path.join("./", item);
    let stats = fs.statSync(itemPath);
    console.log(
      `${formatTime(stats.mtime)}${String(stats.size).padStart(15, " ")} ${
        stats.isDirectory() ? chalk.blue(item) : chalk.green(item)
      }`
    );
  });
}
