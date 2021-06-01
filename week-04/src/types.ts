export interface IAlbum{
    area:number
    name:string
    singer:string
    release_time:string
    cover:string
}

export class Album implements IAlbum{
    // 当前音乐对应的DOM元素
    el:HTMLElement
    name:string
    area:number
    singer:string
    release_time:string
    cover:string
}

export interface IArea{
    id:number
    name:string
}

export class Area implements IArea{
    // 当前地区对象对应的DOM元素
    el:HTMLElement
    id:number
    name:string
}