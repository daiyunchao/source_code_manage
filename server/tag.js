let mongodb = require("./tools/mongo_conn");
const CodeError = require('./tools/error');
const CommonTools = require("./tools/comm");
const collectionName = "tag";
class Tag {
  constructor() {
    this.tagId = "";
    this.tagName = "";
  }
  async createTag(tagName) {
    let tag = await mongodb.findOne({
      collectionName,
      whereCommand: { "tagName": tagName }
    })
    if (tag && tag.tagName) {
      throw new CodeError("302", CodeError.errorsMsg()["302"]);
    }
    return await mongodb.insert({
      collectionName, insertObj: {
        "tagId": CommonTools.newUUID(),
        "tagName": tagName
      }
    })
  }

  async getTagById(tagId) {
    let tagInfo = await mongodb.findOne({
      collectionName,
      whereCommand: {
        "tagId": tagId
      }
    })
    return tagInfo;
  }

  async getTagList() {
    let tagList = await mongodb.find({
      collectionName
    })
    return tagList;
  }
}
module.exports = Tag;