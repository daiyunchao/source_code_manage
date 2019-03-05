//代码段对象:
const Folder = require("./folder")
const Tag = require("./tag")
let mongodb = require("./tools/mongo_conn");
const CodeError = require('./tools/error');
const CommonTools = require("./tools/comm");
const collectionName = "code";
class Code {
  constructor() {
    this.code_id = "";
    this.title = "";
    this.description = "";
    this.source_list = [];//源代码列表
    this.folder_id = "";
    this.tag_id = "";
    this.edit_time = 0;//编辑时间
  }

  //创建
  async create_code(title, description, source_list, folder_id, tag_id) {
    let code_id = CommonTools.newUUID();
    try {
      await mongodb.insert(
        {
          collectionName,
          insertObj: {
            code_id,
            title,
            description,
            source_list,
            folder_id,
            tag_id,
          }
        })
    } catch (error) {
      throw new CodeError("500", CodeError.errorsMsg["500"]);
    }
  }
  //修改
  edit_code(code_id, title, description, source_list, folder_id, tag_id) {
    try {
      await mongodb.update({
        collectionName,
        whereCommand: { "code_id": code_id },
        updateCommand: {
          "$set":
          {
            title,
            description,
            source_list,
            folder_id,
            tag_id,
          }
        }
      })
    } catch (error) {
      throw new CodeError("500", CodeError.errorsMsg["500"]);
    }
  }


  //删除
  delete_code(code_id) {
    try {
      await mongodb.delete(
        {
          collectionName,
          whereCommand: {
            "code_id": code_id
          }
        })
    } catch (error) {
      throw new CodeError("500", CodeError.errorsMsg["500"]);
    }
  }

  //获取详情
  async getCodeDetail(code_id) {
    try {
      return await mongodb.findOne({
        collectionName, whereCommand: {
          "code_id": code_id
        }
      })
    } catch (error) {
      throw new CodeError("500", CodeError.errorsMsg["500"]);
    }
  }

  //获取列表
  async getCodeList(){
    try {
      return await mongodb.find({
        collectionName, whereCommand: {}
      })
    } catch (error) {
      throw new CodeError("500", CodeError.errorsMsg["500"]);
    }
  }

}
module.exports = Code;