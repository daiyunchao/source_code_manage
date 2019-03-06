import axios from 'axios';
import gd from '../stores/gd';
import envConfig from './envConfig.js'
class asyncHelper {
  commonRequest(handlerName, handlerAPI) {
    let self = this;
    return async function () {
      let args = Array.from(arguments);
      let response = await handlerAPI.apply(handlerName, args)
      console.log("response===>", response);
      if (response && response["error"] && response["error"]["code"] == 0) {
        return {"isError": false, "retData": response.data}
      } else {
        return {"isError": true, "errorMsg": response["error"]["message"], "error": response["error"]}
      }
    }
  }

  async post({
    url = "",
    apiName = "",
    header = {
      "Content-type": "application/json"
    },
    postData = {}
  }) {
    // console.log(response.data);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
    if (!url) {
      url = `${envConfig.apiPrex}${apiName}`
    }
    let response = await
      axios.post(url, postData, {
        headers: header
      });
    let responseData = response.data;
    let retData = {};
    
    if (responseData && responseData["error"] && responseData["error"]["code"] == 0) {
      retData = {"isError": false, "retData": responseData.data}
    }else if(responseData && responseData["error"] && responseData["error"]["code"] == 200){
      retData = {"isError": false, "retData": responseData.data}
    }else if(responseData&&responseData["code"]==200){
      retData = {"isError": false, "retData": responseData.data}
    } else {
      retData = {
        "isError": true,
        "errorMsg": responseData["error"]["message"] || responseData["error"]["display_message"],
        "error": responseData["error"]
      }
    }
    console.log(apiName + " responseData==> ", retData);
    return retData;
  }
}
export default new asyncHelper();
