import asyncHelper from './asyncHelper';
class AsyncRequest {
  async createFolder(folderName) {
    return await asyncHelper.post({
      apiName: "create_folder",
      postData: {
        folderName
      }
    })
  }

  async createTag(tagName) {
    return await asyncHelper.post({
      apiName: "create_tag",
      postData: {
        tagName
      }
    })
  }

  async get_folder_list() {
    return await asyncHelper.post({
      apiName: "get_folder_list",
      postData: {}
    })
  }

  async get_tag_list() {
    return await asyncHelper.post({
      apiName: "get_tag_list",
      postData: {}
    })
  }


  async get_folder_info(folderId) {
    return await asyncHelper.post({
      apiName: "get_folder_info",
      postData: {
        folderId
      }
    })
  }

  async get_tag_info(tagId) {
    return await asyncHelper.post({
      apiName: "get_tag_info",
      postData: {
        tagId
      }
    })
  }

  async create_code(title, description, source_list, folder_id, tag_id) {
    return await asyncHelper.post({
      apiName: "create_code",
      postData: {
        title, description, source_list, folder_id, tag_id
      }
    })
  }

  async edit_code(code_id, title, description, source_list, folder_id, tag_id) {
    return await asyncHelper.post({
      apiName: "edit_code",
      postData: {
        code_id, title, description, source_list, folder_id, tag_id
      }
    })
  }

  async get_code_detail(code_id) {
    return await asyncHelper.post({
      apiName: "get_code_detail",
      postData: {
        code_id
      }
    })
  }
  
  async get_code_list() {
    return await asyncHelper.post({
      apiName: "get_code_list",
      postData: {}
    })
  }
    async get_sarch_code_list(search_val) {
    return await asyncHelper.post({
      apiName: "get_sarch_code_list",
      postData: {
        search_val
      }
    })
  }
  async get_folder_code_list(folderId) {
    return await asyncHelper.post({
      apiName: "get_folder_code_list",
      postData: {folderId}
    })
  }
  
  async get_tag_code_list(tagId) {
    return await asyncHelper.post({
      apiName: "get_tag_code_list",
      postData: {tagId}
    })
  }
}
export default new AsyncRequest();