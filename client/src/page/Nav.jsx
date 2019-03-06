import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import envConfig from '../tools/envConfig'
import {
  HashRouter as Router, Route, Switch, Link, withRouter,
} from 'react-router-dom';
import { Menu, Icon, Layout, Breadcrumb, Divider, Button, Popover } from 'antd';
import CodeList from './CodeList'
import AddSourceCode from './AddSourceCode'
import AddFolder from '../components/AddFolder';
import AddTag from '../components/AddTag';
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


@observer
class Home extends Component {
  constructor() {
    super()

  }
  search_key_down(e) {
    var et = e || window.event;
    var keycode = et.charCode || et.keyCode;
    if (keycode == 13) {
      if (location.href.indexOf("add_code") > 0) {
        gm.goPage("/")
      }
      gm.get_sarch_code_list(gs.currentSearchValue);
    }
  }
  sarch_value_change(e) {
    gs.currentSearchValue = e.target.value;
  }
  render() {
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Sider width={60}>
          <div style={{ width: "60px", "height": "100%", "backgroundColor": "#232c32" }}>
            {/* <div className="menuItem">
                <Icon type="file-search" style={{ fontSize: "30px", "color": "#428bca" }} />
                <div class="font-bold">搜索</div>
              </div> */}
            <div className="menuItem" onClick={() => {
              gm.goPage('/add_code');
            }}>
              <Icon type="edit" style={{ fontSize: "30px", "color": "white" }} />
              <div className="font-bold">添加</div>
            </div>
            <div className="menuItem" onClick={() => {
              gm.setCodeListLoadding();
              gm.get_code_list();
              gs.currentSearchValue = "";
              gm.goPage('/');
            }}>
              <Icon type="code" style={{ fontSize: "30px", "color": "#1ab667" }} />
              <div className="font-bold">最新</div>
            </div>
            <Popover trigger="click" placement="right" content={
              <div>
                <p>
                  <a style={{ color: "#1890ff" }} onClick={
                    () => {
                      gs.isShowAddFolderModal = true;
                    }
                  }><Icon type="plus-circle" />添加文件夹</a>
                </p>
                {this.props.folderListHTML}
              </div>
            } title="选择文件夹">
              <div className="menuItem">
                <Icon type="folder" style={{ fontSize: "30px", "color": "#4cb6cb" }} />
                <div className="font-bold">文件夹</div>
              </div>
            </Popover>
            <Popover trigger="click" placement="right" content={
              <div>
                <p>
                  <a style={{ color: "#1890ff" }} onClick={() => {
                    gs.isShowAddTagModal = true;
                  }}><Icon type="plus-circle" />添加标签</a>
                </p>
                {this.props.tagListHTML}

              </div>
            } title="选择标签">
              <div className="menuItem">
                <Icon type="tags" style={{ fontSize: "30px", "color": "#747bb9" }} />
                <div className="font-bold">标签</div>
              </div>
            </Popover>

          </div>
        </Sider>
        <Layout style={{ backgroundColor: "#fff", minWidth: "1400px" }}>
          <Content>
            <div className="content">
              <div className="header">
                <Icon type="search" style={{ "color": "#428bca" }} />
                搜索代码段~$:<input placeholder="输入代码段名称或内容查询,回车搜索" onKeyDown={this.search_key_down.bind(this)} onChange={this.sarch_value_change.bind(this)} className="search_input" />
                {/* <div className="header_right">
                  <Popover trigger="click" placement="leftBottom" content={content} title="更多操作">
                    <a style={{ fontSize: "14px", color: "#1890ff" }}>更多操作<Icon type="down" style={{ fontSize: "4px" }} /></a>
                  </Popover>
                </div> */}
              </div>
              <div style={{ backgroundColor: "#f1f4f8", width: "100%", "height": "100%", minHeight: "700px" }}>
                <Switch>
                  <Route exact path={envConfig.prefx + "/add_code"} component={AddSourceCode} />
                  <Route exact path={envConfig.prefx + "/"} component={CodeList} />
                  {/* <Route exact path={envConfig.prefx + "/portrait"} component={Portrait} /> */}
                </Switch>
              </div>
            </div>
          </Content>
        </Layout>

      </Layout>
    );

  }
}

@observer
class Nav extends Component {
  constructor() {
    super();
    gm.getFolderList()
    gm.getTagList()
  }
  render() {
    console.log("in Nav render", gd.currentFolderList);

    let folderListHTML = gd.currentFolderList.map((item, index, arr) => {

      return (<p key={"folder_item" + item.folderId}><a onClick={() => {
        gd.current_folder_id = item.folderId;
        gm.setCodeListLoadding();
        gs.currentSearchValue = "";
        gm.get_code_list_by_folder();
        gm.goPage("/")
      }}><Icon type="folder-open" />{item.folderName}</a></p>)
    })
    let tagListHTML = gd.currentTagList.map((item, index, arr) => {
      return (<p key={"tag_item" + item.tagId}><a onClick={() => {
        gd.current_tag_id = item.tagId;
        gm.setCodeListLoadding();
        gs.currentSearchValue = "";
        gm.get_code_list_by_tag();
        gm.goPage("/")
      }}><Icon type="tag" />{item.tagName}</a></p>)
    })
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Home folderListHTML={folderListHTML} tagListHTML={tagListHTML} />
        <AddFolder></AddFolder>
        <AddTag></AddTag>
      </Layout>
    )
  }
}
export default Nav