// 引入fetch请求
import * as request from "./request.js"
// 导入接口,因为不用localstore数据,所以可以不用导入接口
import {IAlbum,IArea} from "./types.js"
// 导入类
import {Area,Album} from './types.js'
// 定义接口
let albums:Album[]=[]
let areas:Area[]=[]
// 初始化页面数据
albums = await request.get<Album[]>("../data/albums.json")
let albums1 = albums.filter(x=>x.area===1)
areas =await request.get<Area[]>('../data/areas.json')
// 更新或加载页面数据
async function onLoadData(areaList:Area[],albumList:Album[]){
    // 地区遍历节点添加
    areaList.map(area=>createNav(area))
    // 相册遍历节点添加
    albumList.map(albums=>createAlbums(albums))
}

// 创造地区DOM节点
function createNav(areas:Area) {
    let nav = document.querySelector(".nav")
    let el=document.createElement('div')
    el.innerHTML=areas.name
    el.className="nav-item"
    el.dataset.id=areas.id.toString()
    let frist='1'
    if(el.dataset.id===frist){
        el.style.background='#30C77E'
        el.style.color='white'
    }
    // 添加地区点击事件
    el.addEventListener('mousedown',function(e){
        let navList=document.querySelectorAll('.nav-item') as NodeListOf<HTMLElement>
        for(let i=0;i<navList.length;i++){
            if(navList[i].dataset.id===el.dataset.id){
                navList[i].style.background='#30C77E'
                navList[i].style.color='white'
            }
            else{
                navList[i].style.background='none'
                navList[i].style.color='black'
            }
        }
        let newAblums=[]
        document.querySelector('.music-list').innerHTML=""
        newAblums=albums.filter(x=>x.area.toString()===el.dataset.id)
        onLoadData([],newAblums)
    })
    // 添加地区鼠标移入事件
    // el.addEventListener('mouseleave',function(){
    //     el.style.background='none'
    //     el.style.color='black'
    // })
    nav.appendChild(el)
    return el
}

// 创造相册DOM节点
function createAlbums(albums:Album){
    // 添加节点
    let musicList =document.querySelector('.music-list')
    let el=document.createElement('div')
    el.className='music-item'
    el.dataset.area=albums.area.toString()
    let image=document.createElement('img')
    image.src=albums.cover
    let name = document.createElement('h5')
    name.innerHTML=albums.name
    let singer= document.createElement('p')
    singer.innerHTML=albums.singer
    let time =document.createElement('span')
    time.innerHTML=albums.release_time
    // 添加遮罩层
    // let mask =document.createElement('div')
    let maskImg=document.createElement('img')
    maskImg.className="mask-item"
    maskImg.src='../imgs/delete.png'
    // 鼠标移入事件
    el.addEventListener('mouseenter',function(){
        maskImg.style.display="block"
    })
    // 鼠标移出事件
    el.addEventListener('mouseleave',function(){
        maskImg.style.display='none'
    })
    // 鼠标点击事件
    maskImg.addEventListener('mousedown',function(e){
        console.log(e)
        musicList.removeChild(el)
    })
    // 解构赋值
    // {
    // el.dataset.area,
    // image.src,
    // name.innerHTML,
    // singer.innerHTML,
    // time.innerHTML
    // }=albums;
    el.appendChild(image)
    el.appendChild(name)
    el.appendChild(singer)
    el.appendChild(time)
    el.appendChild(maskImg)
    musicList.appendChild(el)
    return el
}

// 页面第一次加载数据
onLoadData(areas,albums1)