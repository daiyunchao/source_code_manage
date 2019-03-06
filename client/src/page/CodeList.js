import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import CodeItem from '../components/CodeItem'
import { Menu, Icon, Layout, Breadcrumb, Divider, Button, Popover } from 'antd';
@observer
class CodeList extends Component {
  constructor() {
    super()
    if(gs.needGetData){
      gm.get_code_list();
    }
  }
  render() {
    let codeListHTML = gd.currentSourceCodeList.map((item, index, arr) => {
      return (<CodeItem {...item} key={item.code_id}></CodeItem>)
    })
    return (
      <div>
        {
          gd.currentSourceCodeList.length > 0
            ?
            codeListHTML
            : gs.isCodeListLoadding ?
              <div className="no_code">代码加载中....</div>
              : <div className="no_code"><Icon type="close" />暂无代码段</div>

        }

      </div>)
  }
}
export default CodeList;