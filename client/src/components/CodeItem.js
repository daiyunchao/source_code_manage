import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'

export default class CodeItem extends Component {
  render() {
    return (
      <div className="post-item">
        <div className="caption wrapper-lg">
          <h2 className="post-title"><a href="#">js获取地址栏参数的两种方法</a></h2>
          <div className="post-sum">
            <p>项目中经常遇到获取上个页面跳转过来获取当前的参数</p>
            <h3>代码段1:</h3>
            <SyntaxHighlighter  style={dark}>
              {`
             function getUrlParms(name){
              var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
              var r = window.location.search.substr(1).match(reg);
              if(r!=null)
              return unescape(r[2]);
              return null;
              }
            var id = getUrlParms("id");


            //上述方法可以获取地址栏传过来的id，还可以这样写
              `}
            </SyntaxHighlighter>
            <h3>代码段2:</h3>
            <SyntaxHighlighter  style={dark}>
              {`
             function getRequest() {
              var url = window.location.search; //获取url中"?"符后的字串
              var theRequest = new Object();
              if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                   
                  theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
                   
                }
              }
              return theRequest;
            }
            var id= getRequest().id;
              `}
            </SyntaxHighlighter>
          </div>
          <div className="line line-lg"></div>
          <div className="text-muted">

          </div>
        </div>
      </div>
    )
  }
}