import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message, Button,Icon } from 'antd';
@observer
class CodeItem extends Component {
  copyCode(content) {

  }
  copyCompleteText(content, result) {
    if (result) {
      return message.success("复制完成");
    }
    message.error("复制失败")
  }
  render() {
    let folder=gm.getFolderByFolderId(this.props.folder_id);
    let tag=gm.getTagByTagId(this.props.tag_id);
    let codeListHTML = this.props.source_list.map((item, index, arr) => {
      return (
        <div key={"code_" + index}>
          <h3>代码段{index + 1}:(<CopyToClipboard text={item}
            onCopy={(text, result) => {
              this.copyCompleteText(text, result);
            }}>
            <a >复制代码段{index+1}</a>
          </CopyToClipboard>)</h3>
          <SyntaxHighlighter style={dark}>
            {`${item}`}
          </SyntaxHighlighter>
        </div>
      )
    })
    return (
      <div className="post-item">
        <div className="caption wrapper-lg">
          <h2 className="post-title"><a href="#">{this.props.title}</a></h2>
          <div className="post-sum">
            <p>{this.props.description}</p>
            <p><Icon type="folder-open" />:<a style={{color:"rgb(24, 144, 255)"}} onClick={()=>{
              gd.current_folder_id = this.props.folder_id;
              gm.setCodeListLoadding();
              gm.get_code_list_by_folder();
            }}>{folder.folderName}</a></p>
            <p><Icon type="tags" />:<a style={{color:"rgb(24, 144, 255)"}} onClick={()=>{
               gd.current_tag_id = this.props.tag_id;
               gm.setCodeListLoadding();
               gm.get_code_list_by_tag();
            }}>{tag.tagName}</a></p>
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