import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import { Modal, Button,message } from 'antd';
@observer
class AddTag extends Component {
  constructor() {
    super();
    this.state = {
      tagName: ""
    }
  }
  async addFolder() {
    if(!this.state.tagName){
      message.error("请输入标签的名称");
      return;
    }
    await gm.createTag(this.state.tagName);
    gs.isShowAddTagModal = false;

  }
  cancelAdd() {
    this.setState({
      tagName: ""
    })
    gs.isShowAddTagModal = false;
  }
  render() {
    return (
      <Modal
        title="添加标签"
        visible={gs.isShowAddTagModal}
        onOk={this.addFolder.bind(this)}
        onCancel={this.cancelAdd.bind(this)}
        okText={"确定创建"}
        cancelText={"取消创建"}
      >
        <input placeholder={"请输入标签名称"} className="code_title_input"
          onChange={(e) => { this.setState({ tagName: e.target.value }) }}
          value={this.state.tagName}></input>
      </Modal>
    )
  }
}

export default AddTag;