import { observable, extendObservable, autorun } from 'mobx';
class GS {
  @observable isShowAddFolderModal = false;
  @observable isShowAddTagModal = false;
  @observable isCodeListLoadding = true;
  @observable currentSearchValue="";
  @observable needGetData=true;
  constructor() {

  }
}
let gs = new GS();
export default gs;