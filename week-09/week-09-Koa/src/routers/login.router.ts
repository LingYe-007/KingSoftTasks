import * as Joi from 'joi'
import { ObjectId } from 'mongodb'
import * as Router from 'koa-router'

import { badParams } from '../stats'
import * as userService from '../services/user.service'

const router = new Router({
    prefix:"/api/user"
})

router.post('/',async (ctx)=>{
    let schema=Joi.object({
        username:Joi.string().min(4).max(16).required().label('username'),
        nickname:Joi.string().min(5).max(14).required().label('nickname'),
        password:Joi.string().min(8).max(25).required().label('password')
    })
    let {value,error}=schema.validate(ctx.request.body)
    if(error) throw badParams(error.message);
    let result =await userService.add(value)
    return result
})