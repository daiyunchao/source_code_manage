let CodeError = require("./error")
class Ret {
  getRightResult(data) {
    return {
      "code": 200,
      "data": data
    }
  }
  getErrorResult(codeErrorObj) {
    if (codeErrorObj instanceof CodeError) {
      return {
        "code": codeErrorObj.code,
        "error_message": codeErrorObj.error_message,
      }
    } else {
      return {
        "code": 500,
        "error_message": "未知错误",
      }
    }

  }
}
module.exports = Ret;