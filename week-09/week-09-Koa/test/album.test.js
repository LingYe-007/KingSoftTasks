const axios = require("axios").default;
const { describe, it } = require("mocha");
const { expect } = require("chai");

const { host } = require("./util");

describe("GET /api/album", () => {
  it("默认列表", async () => {
    let res = await axios.get(`${host}/api/album`);
    expect(res.data.stat).eq("OK");
  });
});

describe("GET /api/album/:_id", () => {
  it("查询某个指定的album", async () => {
    let res = await axios.get(`${host}/api/album`);
    expect(res.data.stat).eq("OK");
    let second = res.data.rows[0];
    let result = await axios.get(`${host}/api/album/${second._id}`);
    expect(result.data.stat).eq("OK");
    let success = true;
    if (result.data.result._id !== second._id) {
      success = false;
    }
    expect(success).eq(true);
  });
});

let _id = "";
describe("POST api/album", () => {
  it("添加album", async () => {
    let res = await axios.post(`${host}/api/album`, {
      name: "亮哥",
      singer: "JiangSh",
      release_time: "2012312",
      cover: "there is n",
      areaId: "60e79f191126442c4899c665",
    });
    expect(res.data.stat).eq("OK");
    _id = res.data.result._id;
    res = await axios.post(`${host}/api/album`, {
      name: "亮哥",
      singer: "JiangSh",
      release_time: "2012312",
      cover: "there is n",
      areaId: "60e79f191126442c4899c665",
    });
    expect(res.data.stat).eq("ERR_EXISTS");
  });
});

describe("DELETE /api/album/:_id", () => {
  it("删除album", async () => {
    let res = await axios.delete(`${host}/api/album/${_id}`);
    expect(res.data.stat).eq("OK");
    let result = await axios.get(`${host}/api/album/${_id}`);
    expect(result.data.stat).eq("ERR_NOT_FOUND");
  });
});

describe("PUT /api/album/:_id", () => {
  it("更新album", async () => {
    let res = await axios.put(`${host}/api/area/${_id}`, {
      name: "亮哥哥哥",
    });
    expect(res.data.stat).eq("OK");
  });
});
