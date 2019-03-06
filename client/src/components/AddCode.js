import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/dawn';
function onChange(newValue) {
  console.log('change', newValue);
}
export default class AddCode extends Component {
  constructor() {
    super()
    this.state = {
      code: `function add(a, b) {
        return a + b;
      }`
    }
  }
  render() {
    return (
      <div>
        <h3>输入代码段{this.props.index}:<a className="add_new_code_a" onClick={() => {
          gd.currentCodeDetail.source_list.splice(this.props.index - 1, 1);
        }}>-删除该代码段</a></h3>
        <AceEditor
          mode=""
          width="100%"
          theme="dawn"
          onChange={(newValue) => { this.props.code_change(this.props.index - 1, newValue) }}
          value={this.props.code}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
        <div className="line line-lg"></div>
      </div>
    )
  }
}