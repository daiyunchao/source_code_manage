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
        if (window.location.href.indexOf("9073") > -1||window.location.href.indexOf("9074") > -1) { return "" }
        else{return ""}
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
    if(window.location.href.indexOf("https://")==0){
      this.apiPrex = "https://192.168.1.69/ms/admin_manager/api/";
      this.wbAuthPrefx = "https://192.168.1.69";
      this.loginPage="https://192.168.1.69/admin_manage/manager/login";
    }else{
      this.apiPrex = "http://192.168.1.69/ms/admin_manager/api/";
      this.wbAuthPrefx = "http://192.168.1.69";
      this.loginPage="http://192.168.1.69/admin_manage/manager/login";
    }
    this.wbAuthClientId = "uE2e3TpNLSyehvxH";
    this.wbAuthPwd = "eI2Ihf5FDcguoL2OGoHb0WASOywzM0CP";
    this.industryId="5bea39e0f7b110296e1b914e";
    this.wbAuthSelfLoginUrl = "https://192.168.1.69/interest_exam/manager/index.html";
  }

  setPro() {
    this.apiPrex = "https://weibang.youth.cn/ms/admin_manager/api/";
    this.wbAuthPrefx = "https://weibang.youth.cn";
    this.loginPage="https://weibang.youth.cn/admin_manage/manager/login"
    this.wbAuthClientId = "uE2e3TpNLSyehvxH";
    this.wbAuthPwd = "eI2Ihf5FDcguoL2OGoHb0WASOywzM0CP";
    this.industryId="5c0a27063338ed59030eda7f";
    this.wbAuthSelfLoginUrl = "https://weibang.youth.cn/interest_exam/manager/index.html";
  }
}
export default new envConfig();