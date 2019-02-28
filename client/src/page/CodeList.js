import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import CodeItem from '../components/CodeItem'
export default class CodeList extends Component {
  render() {
    return (
      <div>
        <CodeItem></CodeItem>
        <CodeItem></CodeItem>
        <CodeItem></CodeItem>
        <CodeItem></CodeItem>
      </div>)
  }
}