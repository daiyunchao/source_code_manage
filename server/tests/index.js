const Folder = require("../folder")
const Tag = require("../tag")
const Code = require("../code")
const mongodb = require("../tools/mongo_conn")

class Test {
  async test_create_folder() {
    let folder = new Folder();
    let folderName = "test_create_folder" + Math.random()
    await folder.createFolder(folderName)
  }

  async test_folder_list() {
    const folder = new Folder();
    let folderList = await folder.getFolderList()
    console.log("folderList==>", folderList);

  }

  async test_create_tag() {
    let tag = new Tag()
    let tagName = "test_create_tag" + Math.random()
    await tag.createTag(tagName);
  }

  async test_tag_list() {
    let tag = new Tag()
    let tagList = await tag.getTagList()
    console.log("tagList==>", tagList);

  }

  async test_get_folder_by_id() {
    const folder = new Folder();
    let folderId = "DSYaDJUHOnYcRyWh";
    let folderInfo = await folder.getFolderById(folderId);
    console.log("folderInfo==>", folderInfo);
  }

  async test_get_tag_by_id() {
    let tag = new Tag()
    let tagId = "cWKrXRfrpyvDKv7G";
    let tagInfo = await tag.getTagById(tagId);
    console.log("tagInfo==>", tagInfo);
  }

  async test_create_code() {
    let code = new Code();
    code.create_code("test_create_code", "this is test ",
      [
        `import os, sys, commands, re, pwd, time

      # 调用方法,如果成功go on 如果失败了则退出
      def callSys(cmdString):
        print "\n"
        print "Start: ", cmdString
        ret = os.system(cmdString)
        if ret != 0:
          print "Error :", cmdString
          exit()
        print "Finish: ", cmdString
      
      # 执行命令 不问结果:
      def runSys(cmdString):
        print "\n"
        print "Start: ", cmdString
        ret = os.system(cmdString)
        print "Finish: ", cmdString
      
      # 调用方法
      callSys("yarn install")
      runSys("npm install -d ")`,
        `def writeFile(filePath, content):
      print "\n"
      print "Start writeFile: ", filePath
      fo = open(filePath, "w")
      fo.write(content)
      fo.close()
      print "Finish writeFile: ", filePath
    `
      ], 'DSYaDJUHOnYcRyWh', 'cWKrXRfrpyvDKv7G')
  }

  async test_code_get_detail() {
    //zcDaO3n1VAaaVrlk
    let code = new Code();
    let codeDetail = await code.getCodeDetail("zcDaO3n1VAaaVrlk");
    console.log("codeDetail-->", codeDetail);

  }

  async test_code_get_list() {
    let code = new Code();
    let codeList = await code.getCodeList();
    console.log("codeList-->", codeList);
  }

  async test_code_edit() {
    let code = new Code();
    await code.edit_code('zcDaO3n1VAaaVrlk', "test_create_code_2", "this is test_2",
      [
        `import os, sys, commands, re, pwd, time

    # 调用方法,如果成功go on 如果失败了则退出
    def callSys(cmdString):
      print "\n"
      print "Start: ", cmdString
      ret = os.system(cmdString)
      if ret != 0:
        print "Error :", cmdString
        exit()
      print "Finish: ", cmdString
    
    # 执行命令 不问结果:
    def runSys(cmdString):
      print "\n"
      print "Start: ", cmdString
      ret = os.system(cmdString)
      print "Finish: ", cmdString
    
    # 调用方法
    callSys("yarn install")
    runSys("npm install -d ")`,
        `def writeFile(filePath, content):
    print "\n"
    print "Start writeFile: ", filePath
    fo = open(filePath, "w")
    fo.write(content)
    fo.close()
    print "Finish writeFile: ", filePath
  `
      ], 'DSYaDJUHOnYcRyWh', 'cWKrXRfrpyvDKv7G')
  }
  async deleteCode() {
    let code = new Code()
    await code.delete_code('zcDaO3n1VAaaVrlk');
  }
}



//DSYaDJUHOnYcRyWh folderId
//cWKrXRfrpyvDKv7G tagId
let test = new Test()
mongodb.conn("source_code_manage", () => {
  // test.test_create_folder()
  // test.test_create_tag();
  // test.test_folder_list()
  // test.test_tag_list();
  // test.test_get_folder_by_id();
  // test.test_get_tag_by_id();
  // test.test_create_code();
  // test.test_code_get_detail()
  // test.test_code_get_list();
  // test.test_code_edit();
  // test.deleteCode();
});

