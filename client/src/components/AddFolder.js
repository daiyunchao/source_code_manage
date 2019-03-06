import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import { Modal, Button,message } from 'antd';
@observer
class AddFolder extends Component {
  constructor() {
    super();
    this.state = {
      folderName: ""
    }
  }
  async addFolder() {
    if(!this.state.folderName){
      message.error("请输入文件夹的名称");
      return;
    }
    await gm.createFolder(this.state.folderName);
    gs.isShowAddFolderModal = false;

  }
  cancelAdd() {
    this.setState({
      folderName: ""
    })
    gs.isShowAddFolderModal = false;
  }
  render() {
    return (
      <Modal
        title="添加文件夹"
        visible={gs.isShowAddFolderModal}
        onOk={this.addFolder.bind(this)}
        onCancel={this.cancelAdd.bind(this)}
        okText={"确定创建"}
        cancelText={"取消创建"}
      >
        <input placeholder={"请输入文件夹名称"} className="code_title_input"
          onChange={(e) => { this.setState({ folderName: e.target.value }) }}
          value={this.state.folderName}></input>
      </Modal>
    )
  }
}

export default AddFolder;