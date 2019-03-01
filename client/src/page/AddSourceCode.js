import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import AddCode from '../components/AddCode'
export default class AddSourceCode extends Component {
  render() {
    return (
      <div className="post-item">
        <div className="caption wrapper-lg">
          <table className="code_table">
            <tr>
              <td className="code_table_span_name">
                <span className="code_title_span">代码段名称:</span>
              </td>
              <td className="code_table_span_content">
                <input className="code_title_input"></input>
              </td>
            </tr>
            <tr>
              <td className="code_table_span_name">
                <span className="code_title_span">代码段描述:</span>
              </td>
              <td className="code_table_span_content">
                <input className="code_title_input"></input>
              </td>
            </tr>
            <tr>
              <td className="code_table_span_name">
                <span className="code_title_span">选择文件夹:</span>
              </td>
              <td className="code_table_span_content">
                <select className="code_title_input select_folder">
                  <option>默认文件夹</option>
                  <option>文件夹1</option>
                  <option>文件夹2</option>
                  <option>文件夹3</option>
                </select>
                <a className="add_new_code_a">+添加文件夹</a>
              </td>
            </tr>
            <tr>
              <td className="code_table_span_name">
                <span className="code_title_span">选择标签:</span>
              </td>
              <td className="code_table_span_content">
                <select className="code_title_input select_folder">
                  <option></option>
                  <option>标签1</option>
                  <option>标签2</option>
                  <option>标签3</option>
                </select>
                <a className="add_new_code_a">+添加标签</a>
              </td>
            </tr>
          </table>
          <AddCode index={1}></AddCode>
          <AddCode index={2}></AddCode>
          <AddCode index={3}></AddCode>
          <div className="text-muted">
          </div>
        </div>
      </div>
    )
  }
}