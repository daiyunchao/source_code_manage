
class CodeError {
  static errorsMsg() {
    return {
      "301": "目标不存在",
      "302": "目标已存在",
      "500": "服务器错误"
    }
  }
  constructor(code, error_message) {
    this.code = code;
    this.error_message = error_message;
  }

}

module.exports = CodeError;