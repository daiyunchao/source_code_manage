let mongodb = require("./tools/mongo_conn");
const CodeError = require('./tools/error');
const CommonTools = require("./tools/comm");
const collectionName = "folder";
class Folder {
  constructor() {
    this.floderId = "";
    this.folderName = "";
  }
  async createFolder(folderName) {
    let folder = await mongodb.findOne({
      collectionName,
      whereCommand: { "folderName": folderName }
    })
    if (folder && folder.folderName) {
      throw new CodeError("302", CodeError.errorsMsg["302"]);
    }
    return await mongodb.insert({
      collectionName, insertObj: {
        "folderId": CommonTools.newUUID(),
        "folderName": folderName
      }
    })
  }

  async getFolderById(folderId) {
    let folderInfo = await mongodb.findOne({
      collectionName,
      whereCommand: {
        "folderId": folderId
      }
    })
    return folderInfo;
  }

  async getFolderList() {
    let folderList = await mongodb.find({
      collectionName
    })
    return folderList;
  }
}
module.exports = Folder;
