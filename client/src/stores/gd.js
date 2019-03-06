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

  
  initCurrentCodeDetail() {
    extendObservable(this.currentCodeDetail, {
      title: "",
      description: "",
      source_list: [''],
      folder_id: "",
      tag_id: ""
    })
  }

  changeCodeDetailValue(key, value) {
    this.currentCodeDetail[key] = value
  }





}
let gd = new GD();
export default gd;