import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message, Button, Icon, Modal } from 'antd';
import envConfig from '../tools/envConfig';
const confirm = Modal.confirm;
@observer
class CodeItem extends Component {
  constructor() {
    super();
    this.state = {
      showState: "sample",
      showMoreFont: "显示全部"
    }
  }
  copyCode(content) {

  }
  copyCompleteText(content, result) {
    if (result) {
      return message.success("复制完成");
    }
    message.error("复制失败")
  }
  editCode() {
    let codeItem = this.props;
    gd.copyProps(gd.currentCodeDetail, codeItem);
    gs.currentIsEditStatus = true;
    gm.goPage("/edit_code")
  }
  deleteCode() {
    let codeItem = this.props;
    let code_id = codeItem.code_id;
    confirm({
      title: '确定要删除该代码段吗?',
      content: '你确定要删除该代码段吗,如果删除将不能恢复',
      onOk() {
        gm.delete_code(code_id);
      },
      onCancel() { },
    });

  }
  render() {
    let folder = gm.getFolderByFolderId(this.props.folder_id);
    let tag = gm.getTagByTagId(this.props.tag_id);
    let codeListHTML = this.props.source_list.map((item, index, arr) => {
      return (
        <div key={"code_" + index}>
          <h3>代码段{index + 1}:(<CopyToClipboard text={item}
            onCopy={(text, result) => {
              this.copyCompleteText(text, result);
            }}>
            <a >复制代码段{index + 1}</a>
          </CopyToClipboard>)</h3>
          <SyntaxHighlighter style={dark}>
            {`${item}`}
          </SyntaxHighlighter>
        </div>
      )
    })
    let itemStyle = {
      "minHeight":"95%"
    }
    if (!this.props.notShowFolder && this.state.showState == "sample") {
      itemStyle = {
        "height": "400px",
        "overflowY": "hidden"
      }
    }
    return (
      <div className="post-item" style={itemStyle}>
        {this.props.notShowFolder ?
          null :
          <div className="showMore" onClick={() => {
            if (this.state.showState == "sample") {
              this.setState({
                showState: "complete",
                showMoreFont: "显示部分"
              })
            } else {
              this.setState({
                showState: "sample",
                showMoreFont: "显示全部"
              })
            }
          }}>{this.state.showMoreFont}</div>
        }
        <div className="caption wrapper-lg">
          <h2 className="post-title">
            <a rel="noopener noreferrer" href={envConfig.prefx + "/code_detail?code_id=" + this.props.code_id} target="_blank">
              {this.props.title}</a>
          </h2>
          <div className="post-sum">
            <p>{this.props.description}
              <a className="list_a_opt" onClick={this.editCode.bind(this)}><Icon type="edit" />编辑代码段</a>
              <a className="list_a_opt" onClick={this.deleteCode.bind(this)}><Icon type="delete" />删除代码段</a>
            </p>

            {
              this.props.notShowFolder ?
                null
                : <div>
                  <p><Icon type="folder-open" /><a style={{ color: "rgb(24, 144, 255)" }}
                    onClick={() => {
                      gd.current_folder_id = this.props.folder_id;
                      gm.setCodeListLoadding();
                      gm.get_code_list_by_folder();
                    }}>{folder.folderName}</a></p>
                  <p><Icon type="tags" /><a style={{ color: "rgb(24, 144, 255)" }}
                    onClick={() => {
                      gd.current_tag_id = this.props.tag_id;
                      gm.setCodeListLoadding();
                      gm.get_code_list_by_tag();
                    }}>{tag.tagName}</a></p>
                </div>
            }
            {codeListHTML}
          </div>
          <div className="line line-lg"></div>
          <div className="text-muted">

          </div>
        </div>
      </div>
    )
  }
}

export default CodeItem;