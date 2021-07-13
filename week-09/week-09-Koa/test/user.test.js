const axios = require("axios").default;
const { desribe, it } = require("mocha");
const { expect } = require("chai");
axios.defaults.withCredentials = true;

const { host } = require("./util");

describe("GET /api/user", () => {
  it("默认列表", async () => {
    let res = await axios.get(`${host}/api/user`);
    expect(res.data.stat).eq("OK");
  });
});

let _id = "";
describe("POST api/user", () => {
  it("添加user", async () => {
    let res = await axios.post(`${host}/api/user`, {
      username: "892104576",
      nickname: "LingYe-007",
      password: "892104576wxg",
    });
    _id = res.data.result._id;
    expect(res.data.stat).eq("OK");
    res = await axios.post(`${host}/api/user`, {
      username: "892104576",
      nickname: "LingYe-007",
      password: "892104576wxg",
    });
    expect(res.data.stat).eq("ERR_EXISTS");
  });
});

describe("POST api/user/login", () => {
  it("用户登录", async () => {
    let res = await axios.post(`${host}/api/user/login`, {
      username: "892104576",
      password: "892104576wxg",
    });
    expect(res.data.stat).eq("OK");
    expect(res.data.method).eq("NoToken");
    let token = res.data.token;
    // 请求拦截携带token
    axios.interceptors.request.use(
      function (config) {
        if (token) {
          config.headers.cookie = `token=${token}`;
          return config;
        }
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    res = await axios.post(`${host}/api/user/login`, {
      username: "892104576",
      passward: "892104576wxg",
    });
    expect(res.data.stat).eq("OK");
    expect(res.data.method).eq("IsToken");
  });
});

describe("PUT /api/user/:username", () => {
  it("更新用户信息", async () => {
    let res = await axios.put(`${host}/api/user/892104576`, {
      password: "892104576wx",
      nickname: "LingYe-05",
      username: "892104576",
    });
    expect(res.data.stat).eq("OK");
  });
});

describe("Del api/user/signout/:username", () => {
  it("用户注销", async () => {
    let res = await axios.delete(`${host}/api/user/signout/892104576`);
    expect(res.data.stat).eq("OK");
  });
});

describe("Del api/user/:_id", () => {
  it("删除用户信息", async () => {
    //   console.log(_id);
    let res = await axios.delete(`${host}/api/user/${_id}`);
    expect(res.data.stat).eq("OK");
    res = await axios.delete(`${host}/api/user/${_id}`);
    expect(res.data.stat).eq("ERR_NOT_FOUND");
  });
});
