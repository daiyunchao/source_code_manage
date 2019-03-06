const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const router = new Router();
app.use(bodyParser());
const Folder = require("./folder")
const Code = require("./code")
const Tag = require("./tag")
const Ret = require("./tools/ret")
const mongoCon=require("./tools/mongo_conn")
const prefix = "/source_code_mange";

app.use(cors({
  origin: function (ctx) {
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

router.get(prefix+"/", async (ctx, next) => {
  // ctx.type = 'html';
  ctx.body = "hello world";
});
router.post(prefix + '/create_folder', async (ctx, next) => {
  console.log("in create_folder");
  
  let body = ctx.request.body;
  let { folderName } = body;
  console.log("in create_folder folderName:",folderName);
  let ret = new Ret();
  try {
    let folderInfo = await new Folder().createFolder(folderName);
    console.log("folderInfo===>",folderInfo);
    
    ctx.body = ret.getRightResult({ "folderInfo": folderInfo });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/create_tag', async (ctx, next) => {
  let body = ctx.request.body;
  let { tagName } = body;
  let ret = new Ret();
  try {
    let tagInfo = await new Tag().createTag(tagName);
    ctx.body = ret.getRightResult({ "tagInfo": tagInfo });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_folder_list', async (ctx, next) => {
  let body = ctx.request.body;
  let ret = new Ret();
  try {
    let folderList = await new Folder().getFolderList();
    ctx.body = ret.getRightResult({ "folderList": folderList });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_tag_list', async (ctx, next) => {
  let body = ctx.request.body;
  let ret = new Ret();
  try {
    let tagList = await new Tag().getTagList();
    ctx.body = ret.getRightResult({ "tagList": tagList });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_folder_info', async (ctx, next) => {
  let body = ctx.request.body;
  let { folderId } = body;
  let ret = new Ret();
  try {
    let folderInfo = await new Folder().getFolderById(folderId);
    ctx.body = ret.getRightResult({ "folderInfo": folderInfo });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_tag_info', async (ctx, next) => {
  let body = ctx.request.body;
  let { tagId } = body;
  let ret = new Ret();
  try {
    let tagInfo = await new Tag().getTagById(tagId);
    ctx.body = ret.getRightResult({ "tagInfo": tagInfo });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})


router.post(prefix + '/create_code', async (ctx, next) => {
  let body = ctx.request.body;
  let { title, description, source_list, folder_id, tag_id } = body;
  let ret = new Ret();
  try {
    let codeInfo = await new Code().create_code(title, description, source_list, folder_id, tag_id);
    ctx.body = ret.getRightResult({ "codeInfo": codeInfo });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/edit_code', async (ctx, next) => {
  let body = ctx.request.body;
  let { code_id, title, description, source_list, folder_id, tag_id } = body;
  let ret = new Ret();
  try {
    let codeInfo = await new Code().edit_code(code_id, title, description, source_list, folder_id, tag_id);
    ctx.body = ret.getRightResult({ "codeInfo": codeInfo });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_code_detail', async (ctx, next) => {
  let body = ctx.request.body;
  let { code_id } = body;
  let ret = new Ret();
  try {
    let codeInfo = await new Code().getCodeDetail(code_id);
    ctx.body = ret.getRightResult({ "codeInfo": codeInfo });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_code_list', async (ctx, next) => {
  let body = ctx.request.body;
  let ret = new Ret();
  try {
    let codeList = await new Code().getCodeList();
    ctx.body =  ret.getRightResult({ "codeList": codeList });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_sarch_code_list', async (ctx, next) => {
  let body = ctx.request.body;
  let { search_val } = body;
  let ret = new Ret();
  try {
    let codeList = await new Code().searchCode(search_val);
    ctx.body =  ret.getRightResult({ "codeList": codeList });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_folder_code_list', async (ctx, next) => {
  let body = ctx.request.body;
  let { folderId } = body;
  let ret = new Ret();
  try {
    let codeList = await new Code().getCodeListByFolder(folderId);
    ctx.body = ret.getRightResult({ "codeList": codeList });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_tag_code_list', async (ctx, next) => {
  let body = ctx.request.body;
  let { tagId } = body;
  let ret = new Ret();
  try {
    let codeList = await new Code().getCodeListByTag(tagId);
    ctx.body = ret.getRightResult({ "codeList": codeList });
  } catch (error) {
    ctx.body = ret.getErrorResult(error);
  }
})




app.use(router.routes());
mongoCon.conn("source_code_manage",()=>{
  app.listen(3698, () => {
    console.log("server is running at 3698 port");
  })
})
