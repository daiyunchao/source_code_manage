/**
 * Created by Liu on 2018/6/6.
 */
var crypto = require('crypto');
let commonTools = {
  themeColor: "#00cc66",

  getQueryString: function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); // 匹配目标参数
    let result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
      return decodeURIComponent(result[2]);
    } else {
      return null;
    }
  },
  //将时间戳转换为时间(今年不显示年份):
  getDateTimeByTimeStampNotThisYear: function (timeStamp) {

    var thisYear = new Date().getFullYear();
    var date = new Date(Number(timeStamp));
    var timeStampYear = date.getFullYear();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() >= 10 ? date.getDate() + " " : "0" + date.getDate() + " ";
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = ":" + date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    if (thisYear == timeStampYear) {
      return M + D + h + m;
    } else {
      return Y + M + D + h + m;
    }
  },

  //将时间戳转换为时间:
  getDateTimeByTimeStamp: function (timeStamp) {

    var date = new Date(Number(timeStamp));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },

  //将时间戳转换为时间:
  getDateTimeWithDay: function (timeStamp) {

    var date = new Date(Number(timeStamp));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    return Y + M + D;
  },
  //将时间戳转换为时间(没有年份):
  getDateTimeByTimeStampNotYear: function (timeStamp) {

    var date = new Date(Number(timeStamp));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() >= 10 ? date.getDate() + " " : "0" + date.getDate() + " ";
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = ":" + date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return M + D + h + m;
  },
  //将时间戳转换为时间(没有秒):
  getDateTimeByTimeStampNotSec: function (timeStamp) {

    var date = new Date(Number(timeStamp));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + " " : date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = ":" + date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m;
  },
  getTimestampString: function (propsValue) {
    console.log("propsValue-->", propsValue);
    let hours = parseInt(propsValue / (1000 * 60 * 60));
    let minutes = parseInt((propsValue - hours * 1000 * 60 * 60) / (1000 * 60));
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    ;
    return hours + ":" + minutes;
  },

  formatDuring: function (mss, useCN) {

    let string = "";
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = (mss % (1000 * 60)) / 1000;
    seconds = Math.ceil(seconds);
    if (hours != 0) {
      string = hours + "小时" + minutes + "分" + seconds + "秒";
    } else {
      if (minutes != 0) {
        string = +minutes + "分" + seconds + "秒";
      } else {
        if (seconds != 0) {
          string = seconds + "秒";
        }
      }
    }
    return string;
  },

  // rc4Convert: function (sourceText) {
  //   return rc4Decrypt("h8uJk2U8ew9H17ycbN6gH0c8Lmn6Ko2p", sourceText)
  // },
  newUUID: function () {
    return this.randomString(16);
  },
  randomString: function (size) {
    if (size === 0) {
      throw new Error('Zero-length randomString is useless.');
    }
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789';
    var objectId = '';
    // var bytes = (0, crypto.randomBytes)(size);
    var bytes = crypto.randomBytes(size);
    // console.log(bytes)
    for (var i = 0; i < bytes.length; ++i) {
      // num = bytes.readUInt8(i)
      // console.log("" + "num " + i + " = " + num)
      objectId += chars[bytes.readUInt8(i) % chars.length];
    }
    return objectId;
  },
};

export default commonTools;