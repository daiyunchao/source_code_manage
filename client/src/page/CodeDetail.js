import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import AddCode from '../components/AddCode'
import CommonTools from '../tools/commonTools'
import { Menu, Icon, Layout, Breadcrumb, Divider, Button, Popover } from 'antd';
import CodeItem from '../components/CodeItem'
@observer
class CodeDetail extends Component {
  constructor() {
    super();
    let codeId = CommonTools.getQueryString("code_id");
    gm.getCodeDetail(codeId);
  }
  render() {
    if(gd.current_code_detail_by_page&&gd.current_code_detail_by_page.title){
      return (
        <CodeItem {...gd.current_code_detail_by_page} notShowFolder={true} notShowTag={false}></CodeItem>
      )
    }else{
      return (<div>代码段加载中...</div>)
    }
   
  }
}

export default CodeDetail;