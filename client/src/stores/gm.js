import { observable, extendObservable, autorun } from 'mobx';
import envConfig from '../tools/envConfig'
import asyncRequest from '../tools/asyncRequest'
import gd from './gd'
import gs from './gs'
import { message, Button } from 'antd';
class GM {
  constructor() {
    this.history = null;
  }
  getFolderByFolderId(folderId) {
    let folder = {};
    for (const folderInfo of gd.currentFolderList) {
      if (folderInfo["folderId"] == folderId) {
        folder = folderInfo;
        break;
      }
    }
    return folder;
  }

  getTagByTagId(tagId) {
    let tag = {};
    for (const tagInfo of gd.currentTagList) {
      if (tagInfo["tagId"] == tagId) {
        tag = tagInfo;
        break;
      }
    }
    return tag;
  }

  resetCodeLoadding() {
    gs.isCodeListLoadding = false;
  }
  setCodeListLoadding() {
    gs.isCodeListLoadding = true;
  }
  async createFolder(folderName) {
    try {
      let data = await asyncRequest.createFolder(folderName);
      if (data && !data.isError) {
        let newFolderInfo = data.retData.folderInfo;
        gd.currentFolderList.push(newFolderInfo);
        message.success("添加完成");
      } else {
        throw new Error();
      }

    } catch (error) {
      message.error("添加失败,请检查是否文件夹重名");
    }
  }

  async createTag(tagName) {
    try {
      let data = await asyncRequest.createTag(tagName);
      if (data && !data.isError) {
        let newTagInfo = data.retData.tagInfo;
        gd.currentTagList.push(newTagInfo);
        message.success("添加完成");
      } else {
        throw new Error();
      }
    } catch (error) {
      message.error("添加失败,请检查是否标签重名");
    }
  }

  async search_code_list(search_val) {
    let data = await asyncRequest.get_code_list();
    if (data && !data.isError) {
      let codeList = data.retData.codeList;
      gd.currentSourceCodeList = codeList;
      this.resetCodeLoadding();
    } else {
      message.success('获取代码列表失败');
    }
  }


  async getFolderList() {
    let data = await asyncRequest.get_folder_list();
    console.log("folderListData===>", data);
    if (data && !data.isError) {
      gd.currentFolderList = data.retData.folderList;
    }

  }

  async getTagList() {
    let data = await asyncRequest.get_tag_list();
    if (data && !data.isError) {
      gd.currentTagList = data.retData.tagList;
    }
  }

  async getCodeDetail(codeId) {
    let data = await asyncRequest.get_code_detail(codeId);
    if (data && !data.isError) {
      gd.current_code_detail_by_page = data.retData.codeInfo;
    }
  }

  async create_code() {
    let { title, description, source_list, folder_id, tag_id } = gd.currentCodeDetail;
    let data = await asyncRequest.create_code(title, description, source_list, folder_id, tag_id);
    if (data && !data.isError) {
      let codeInfo = data.retData.codeInfo;
      gd.currentSourceCodeList.push(codeInfo);
      message.success('创建成功');
    } else {
      message.success('创建失败');
    }
  }

  async get_code_list() {
    let data = await asyncRequest.get_code_list();
    if (data && !data.isError) {
      let codeList = data.retData.codeList;
      gd.currentSourceCodeList = codeList;
      this.resetCodeLoadding();
      gs.needGetData=false;
    } else {
      message.success('获取代码列表失败');
    }
  }

  async get_sarch_code_list(sarchVal) {
    let data = await asyncRequest.get_sarch_code_list(sarchVal);
    if (data && !data.isError) {
      let codeList = data.retData.codeList;
      gd.currentSourceCodeList = codeList;
      this.resetCodeLoadding();
    } else {
      message.success('获取代码列表失败');
    }
  }
  async get_code_list_by_folder() {
    let data = await asyncRequest.get_folder_code_list(gd.current_folder_id);
    if (data && !data.isError) {
      let codeList = data.retData.codeList;
      gd.currentSourceCodeList = codeList;
      this.resetCodeLoadding();
    } else {
      message.success('获取代码列表失败');
    }
  }

  async get_code_list_by_tag() {
    let data = await asyncRequest.get_tag_code_list(gd.current_tag_id);
    if (data && !data.isError) {
      let codeList = data.retData.codeList;
      gd.currentSourceCodeList = codeList;
      this.resetCodeLoadding();
    } else {
      message.success('获取代码列表失败');
    }
  }




  setHistory(history) {
    this.history = history
  }
  goPage(pageName, params) {
    pageName = envConfig.prefx + pageName;
    this.history.push(pageName, params)
  }

  goBack() {
    this.history.goBack()
  }
}
let gm = new GM();
export default gm;