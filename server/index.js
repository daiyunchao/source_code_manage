const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const router = new Router();

router.get('/',async (ctx,next) => {
  // ctx.type = 'html';
  ctx.body = "hello world";
});
app.use(router.routes());
app.listen(3698,()=>{
  console.log("server is running at 3698 port");
})