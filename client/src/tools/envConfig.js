import { gd, gm, gs } from '../stores'
import commonTools from './commonTools'
class envConfig {
  constructor() {
    this.apiPrex = "";
    this.wbAuthPrefx = "";
    this.wbAuthClientId = "";
    this.wbAuthPwd = "";
    this.wbAuthSelfLoginUrl = "";
    this.prefx = (
      () => {
        if (window.location.href.indexOf("3000") > -1) { return "" }
        else { return "/source_code_manage" }
      }
    )();// /interest_exam/manager
  }

  initEnvConfig() {
    if (window.location.href.indexOf("localhost") > -1 || window.location.href.indexOf("192.168.1") > -1) {
      this.setDev();
    } else {
      this.setPro();
    }
  }

  //说明是授权过来打开的页面
  getInitRoter() {
    if (window.location.href.indexOf("?code=") > -1) {
      console.log("in getInitRoter");
      let code = commonTools.getQueryString("code");
      gm.loginByWBCode({ code })
    }
  }

  setDev() {
    this.apiPrex = "http://192.168.1.68:3698/source_code_mange/";
  }

  setPro() {
    this.apiPrex = "http://192.168.1.68:3698/source_code_mange/";
  }
}
export default new envConfig();