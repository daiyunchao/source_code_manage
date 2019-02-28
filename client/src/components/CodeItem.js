import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'

export default class CodeItem extends Component {
  render() {
    return (
      <div className="post-item">
        <div className="caption wrapper-lg">
          <h2 className="post-title"><a href="#">Bootstrap 3: What you need to know</a></h2>
          <div className="post-sum">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat. Vestibulum ullamcorper sodales nisi nec condimentum. Mauris convallis mauris at pellentesque volutpat.
</p>
            <h3>Html5 and CSS3</h3>
            <SyntaxHighlighter language='javascript' style={docco}>
              {`
                function getQueryString(name) { 
                  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                  var r = window.location.search.substr(1).match(reg); 
                  if (r != null) return unescape(r[2]); 
                  return null; 
                } 
              `}
            </SyntaxHighlighter>
          </div>
          <div className="line line-lg"></div>
          <div className="text-muted">

          </div>
        </div>
      </div>
    )
  }
}