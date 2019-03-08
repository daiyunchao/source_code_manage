import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import AddCode from '../components/AddCode'
import { Menu, Icon, Layout, Breadcrumb, Divider, Button, Popover, message } from 'antd';
@observer
class AddSourceCode extends Component {
  constructor() {
    super();
    // gm.createFolder();
    gm.getFolderList();
    gm.getTagList();
  }
  code_item_change(index, newValue) {
    gd.currentCodeDetail.source_list[index] = newValue;
  }
  saveCode() {
    if (gd.currentCodeDetail.folder_id == "") {
      gd.currentCodeDetail.folder_id = document.getElementById("select_folder").value;
    }
    if (gd.currentCodeDetail.tag_id == "") {
      gd.currentCodeDetail.tag_id = document.getElementById("select_tag").value;
    }
    if (gd.currentCodeDetail.title == "") {
      message.error("标题是必填项")
      return;
    }
    let haveItemIsNone = false;
    for (const val of gd.currentCodeDetail.source_list) {
      if (!val) {
        haveItemIsNone = true;
        break;
      }
    }
    if (haveItemIsNone) {
      message.error("有的代码段是空的")
      return;
    }
    console.log("gd.currentCodeDetail==>", gd.currentCodeDetail);
    if(gs.currentIsEditStatus){
      gm.edit_code();
    }else{
      gm.create_code();

    }

  }
  render() {
    let folderListHtml = gd.currentFolderList.map((item, index) => {
      let selected = false
      if (item.folderId == gd.currentCodeDetail.folder_id) {
        selected = true;
      }
      return (<option selected={selected} key={item.folderId} value={item.folderId}>{item.folderName}</option>)

    })
    let tagListHtml = gd.currentTagList.map((item, index) => {
      let selected = false
      if (item.tagId == gd.currentCodeDetail.tag_id) {
        selected = true;
      }
      return (<option selected={selected} key={item.tagId} value={item.tagId}>{item.tagName}</option>)
    })
    let codeHtml = gd.currentCodeDetail.source_list.map((item, index) => {
      return (<AddCode key={"addCode_" + index} index={index + 1} code={item} code_change={this.code_item_change.bind(this)}></AddCode>)
    });
    return (
      <div className="post-item">
        <div className="caption wrapper-lg">
          <table className="code_table">
            <tbody>
              <tr>
                <td className="code_table_span_name">
                  <span className="code_title_span">代码段名称:</span>
                </td>
                <td className="code_table_span_content">
                  <input className="code_title_input"
                    onChange={(e) => { gd.changeCodeDetailValue("title", e.target.value) }}
                    value={gd.currentCodeDetail.title}></input>
                </td>
              </tr>
              <tr>
                <td className="code_table_span_name">
                  <span className="code_title_span">代码段描述:</span>
                </td>
                <td className="code_table_span_content">
                  <input className="code_title_input"
                    onChange={(e) => { gd.changeCodeDetailValue("description", e.target.value) }}
                    value={gd.currentCodeDetail.description}></input>
                </td>
              </tr>
              <tr>
                <td className="code_table_span_name">
                  <span className="code_title_span">选择文件夹:</span>
                </td>
                <td className="code_table_span_content">
                  <select id="select_folder" className="code_title_input select_folder"
                    onChange={(e) => { gd.changeCodeDetailValue("folder_id", e.target.value) }}>
                    {folderListHtml}
                  </select>
                  <a className="add_new_code_a" onClick={
                    () => {
                      gs.isShowAddFolderModal = true;
                    }
                  }>+添加文件夹</a>
                </td>
              </tr>
              <tr>
                <td className="code_table_span_name">
                  <span className="code_title_span">选择标签:</span>
                </td>
                <td className="code_table_span_content">
                  <select id="select_tag" className="code_title_input select_folder"
                    onChange={(e) => { gd.changeCodeDetailValue("tag_id", e.target.value) }}>
                    {tagListHtml}
                  </select>
                  <a className="add_new_code_a" onClick={() => {
                    gs.isShowAddTagModal = true;
                  }}>+添加标签</a>
                </td>
              </tr>
            </tbody>

          </table>
          {codeHtml}
          <a className="add_new_code_a" onClick={() => {
            gd.currentCodeDetail.source_list.push('')
          }}>+添加一个代码段</a>
          <div style={{ "height": "50px" }}>
            <div className="saveBtnCon">
              <Button type="primary" size="large" icon="save" style={{ width: "120px" }} onClick={this.saveCode.bind(this)}>保存</Button>
              <Button size="large" icon="api" style={{ marginLeft: "10px", width: "120px" }} onClick={() => {
                gm.goBack();
              }}>取消</Button>
            </div>
          </div>
          <div className="text-muted">
          </div>
        </div>
      </div>
    )
  }
}

export default AddSourceCode;