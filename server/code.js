//代码段对象:
const Folder = require("./folder")
const Tag = require("./tag")
class Code {
  constructor() {
    this.code_id="";
    this.title = "";
    this.description = "";
    this.source_list = [];//源代码列表
    this.folder = new Folder();
    this.tag = new Tag();
    this.edit_time=0;//编辑时间
  }
}
module.exports = Code;