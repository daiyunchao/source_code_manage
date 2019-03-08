import { observable, extendObservable, autorun } from 'mobx';
class GD {
  currentCodeDetail = {};
  constructor() {
    this.initCurrentCodeDetail();
  }
  @observable currentFolderList = [];

  @observable currentTagList = [];

  @observable currentSourceCodeList = [];

  @observable current_folder_id = "";

  @observable current_tag_id = "";

  @observable current_code_detail_by_page = {};


  initCurrentCodeDetail() {

    //创建对象
    extendObservable(this.currentCodeDetail, {
      code_id: "",
      title: "",
      description: "",
      source_list: [''],
      folder_id: "",
      tag_id: ""
    })

  }

  copyProps(source, copyObj) {
    for (let item in source) {
      if (copyObj) {
        if (copyObj.hasOwnProperty(item)) {
          source[item] = copyObj[item];
        }
      }
    }
  }

  changeCodeDetailValue(key, value) {
    this.currentCodeDetail[key] = value
  }





}
let gd = new GD();
export default gd;