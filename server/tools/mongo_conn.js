let MongoClient = require('mongodb').MongoClient;
let db_url = "mongodb://192.168.1.68:27017/source_code_manage"
class MongoConn {
  constructor(dataBaseName) {
    this.db = null;
    this.targetDataBase;
    MongoClient.connect(db_url, (err, db) => {
      if (err) throw err;
      console.log("数据库已经连接!");
      this.db = db;
      this.targetDataBase = db.db(dataBaseName);
    });
  }
  close() {
    this.db && this.db.close();
  }

  //插入数据
  async insert({ collectionName, insertObj }) {
    new Promise((r, j) => {
      let method = "insertOne";
      if (Array.isArray(insertObj)) {
        method = "insertMany";
      }
      this.targetDataBase.collection(collectionName)[method](insertObj, (err, res) => {
        if (err) {
          return j(err);
        }
        return r(res);
      })
    })
  }



  async find({ collectionName, whereCommand = {}, sortCase = {} }) {
    new Promise((r, j) => {
      this.targetDataBase.collection(collectionName).find(whereCommand).sort(sortCase).toArray((err, result) => {
        if (err) {
          return j(err);
        }
        return r(result);
      })
    })
  }

  async findOne({ collectionName, whereCommand = {}, sortCase = {} }) {
    new Promise((r, j) => {
      this.targetDataBase.collection(collectionName).findOne(whereCommand).sort(sortCase).toArray((err, result) => {
        if (err) {
          return j(err);
        }
        return r(result);
      })
    })
  }

  async update({ collectionName, whereCommand = {}, updateCommand = {}, updateMany = false }) {
    new Promise((r, j) => {
      let method = "updateOne";
      if (updateMany) {
        method = "updateMany"
      }
      this.targetDataBase.collection(collectionName)[method](whereCommand, updateCommand, (err, res) => {
        if (err) {
          return j(err);
        }
        return r(res);
      })
    })
  }

  async delete({ collectionName, whereCommand = {}, deleteMany = false }) {
    new Promise((r, j) => {
      let method = "deleteOne";
      if (deleteMany) {
        method = "deleteMany"
      }
      this.targetDataBase.collection(collectionName)[method](whereCommand, (err, res) => {
        if (err) {
          return j(err);
        }
        return r(res);
      })
    })
  }



}

module.exports = new MongoConn("source_code_manage");