import * as Router from 'koa-router'

import areaRouter from './routers/area.router'
import albumRouter from './routers/album.router'

const router = new Router()
router.use(areaRouter.routes())
router.use(albumRouter.routes())

export default router