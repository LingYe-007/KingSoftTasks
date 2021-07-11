const axios = require('axios').default
const { describe, it } = require('mocha')
const { expect } = require('chai')

const { host } = require('./util')

describe('GET /api/area', () => {
  it('默认列表', async () => {
    let res = await axios.get(`${host}/api/area`)
    expect(res.data.stat).eq('OK')
  })
})

describe('GET /api/area/:_id', () => {
  it('根据_id查询area', async () => {
    let res = await axios.get(`${host}/api/area`)
    let first = res.data.rows[0]
    let result = await axios.get(`${host}/api/area/${first._id}`)
    expect(result.data.stat).eq('OK')
    expect(result.data.result.name).eq(first.name)
  })
})

describe('GET /api/area/:_id/albums', () => {
  it('查询指定area下面的所有album', async () => {
    let res = await axios.get(`${host}/api/area`)
    let second = res.data.rows[1]
    let result = await axios.get(`${host}/api/area/${second._id}/albums`)
    expect(result.data.stat).eq('OK')
    let rows = result.data.rows
    let success = true
    for (let row of rows) {
      if (row.areaId.toString() !== second._id.toString()) success = false
    }
    expect(success).eq(true)
  })
})

let _id = ''
describe('POST /api/area', () => {
  it('添加area', async () => {
    let res = await axios.post(`${host}/api/area`, {
      name: '月球'
    })
    expect(res.data.stat).eq('OK')
    _id = res.data.result._id
    res = await axios.post(`${host}/api/area`, {
      name: '月球'
    })
    expect(res.data.stat).eq('ERR_EXISTS')
  })
})

describe('PUT /api/area/:_id', () => {
  it('更新area', async () => {
    let res = await axios.put(`${host}/api/area/${_id}`, {
      name: '快乐星球'
    })
    expect(res.data.stat).eq('OK')
  })
})

describe('DELETE /api/area/:_id', () => {
  it('删除area', async () => {
    let res = await axios.delete(`${host}/api/area/${_id}`)
    expect(res.data.stat).eq('OK')
    let result = await axios.get(`${host}/api/area/${_id}`)
    expect(result.data.stat).eq('ERR_NOT_FOUND')
  })
})