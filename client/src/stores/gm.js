import { observable, extendObservable, autorun } from 'mobx';
import envConfig from '../tools/envConfig'
class GM {
  constructor() {
    this.history = null;
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