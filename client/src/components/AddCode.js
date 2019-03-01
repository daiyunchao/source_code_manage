import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'

export default class AddCode extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <h3>输入代码段{this.props.index}:<a className="add_new_code_a">-删除该代码段</a></h3>
        <div className="add_code_content" contentEditable={true}></div>
        <div className="line line-lg"></div>
      </div>
    )
  }
}