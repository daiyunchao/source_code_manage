const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const router = new Router();
app.use(bodyParser());
const Folder = require("./folder")
const Code = require("./code")
const Tag = require("./tag")
const Ret = require("./tools/ret")
const prefix = "/"
router.get(prefix, async (ctx, next) => {
  // ctx.type = 'html';
  ctx.body = "hello world";
});
router.post(prefix + '/create_folder', async (ctx, next) => {
  let body = ctx.request.body;
  let { folderName } = body;
  let ret = new Ret();
  try {
    let folderInfo = await new Folder().createFolder(folderName);
    ctx.body = ret.getRightResult({ "folderInfo": folderInfo });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/create_tag', async (ctx, next) => {
  let body = ctx.request.body;
  let { tagName } = body;
  let ret = new Ret();
  try {
    let tagInfo = await new Tag().createTag(tagName);
    ret.getRightResult({ "tagInfo": tagInfo });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_folder_list', async (ctx, next) => {
  let body = ctx.request.body;
  let ret = new Ret();
  try {
    let folderList = await new Folder().getFolderList();
    ret.getRightResult({ "folderList": folderList });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_tag_list', async (ctx, next) => {
  let body = ctx.request.body;
  let ret = new Ret();
  try {
    let tagList = await new Tag().getTagList();
    ret.getRightResult({ "tagList": tagList });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_folder_info', async (ctx, next) => {
  let body = ctx.request.body;
  let { folderId } = body;
  let ret = new Ret();
  try {
    let folderInfo = await new Folder().getFolderById(folderId);
    ret.getRightResult({ "folderInfo": folderInfo });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_tag_info', async (ctx, next) => {
  let body = ctx.request.body;
  let { tagId } = body;
  let ret = new Ret();
  try {
    let tagInfo = await new Tag().getTagById(tagId);
    ret.getRightResult({ "tagInfo": tagInfo });
  } catch (error) {
    ret.getErrorResult(error);
  }
})


router.post(prefix + '/create_code', async (ctx, next) => {
  let body = ctx.request.body;
  let { title, description, source_list, folder_id, tag_id } = body;
  let ret = new Ret();
  try {
    let codeInfo = await new Code().create_code(title, description, source_list, folder_id, tag_id);
    ret.getRightResult({ "codeInfo": codeInfo });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/edit_code', async (ctx, next) => {
  let body = ctx.request.body;
  let { code_id, title, description, source_list, folder_id, tag_id } = body;
  let ret = new Ret();
  try {
    let codeInfo = await new Code().edit_code(code_id, title, description, source_list, folder_id, tag_id);
    ret.getRightResult({ "codeInfo": codeInfo });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_code_detail', async (ctx, next) => {
  let body = ctx.request.body;
  let { code_id } = body;
  let ret = new Ret();
  try {
    let codeInfo = await new Code().getCodeDetail(code_id);
    ret.getRightResult({ "codeInfo": codeInfo });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_code_list', async (ctx, next) => {
  let body = ctx.request.body;
  let ret = new Ret();
  try {
    let codeList = await new Code().getCodeList();
    ret.getRightResult({ "codeList": codeList });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_folder_code_list', async (ctx, next) => {
  let body = ctx.request.body;
  let { folderId } = body;
  let ret = new Ret();
  try {
    let codeList = await new Code().getCodeListByFolder(folderId);
    ret.getRightResult({ "codeList": codeList });
  } catch (error) {
    ret.getErrorResult(error);
  }
})

router.post(prefix + '/get_tag_code_list', async (ctx, next) => {
  let body = ctx.request.body;
  let { tagId } = body;
  let ret = new Ret();
  try {
    let codeList = await new Code().getCodeListByTag(tagId);
    ret.getRightResult({ "codeList": codeList });
  } catch (error) {
    ret.getErrorResult(error);
  }
})




app.use(router.routes());
app.listen(3698, () => {
  console.log("server is running at 3698 port");
})