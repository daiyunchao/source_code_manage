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
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const folderContent = (
  <div>
    <p><a>文件夹名称1</a></p>
    <p><a>文件夹名称2</a></p>
  </div>
);

const tagContent = (
  <div>
    <p><a>标签名1</a></p>
    <p><a>标签名2</a></p>
  </div>
);
const Home = withRouter((props) => {
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
            gm.goPage('/');
          }}>
            <Icon type="code" style={{ fontSize: "30px", "color": "#1ab667" }} />
            <div className="font-bold">最新</div>
          </div>
          <Popover trigger="click" placement="right" content={folderContent} title="选择文件夹">
            <div className="menuItem">
              <Icon type="folder" style={{ fontSize: "30px", "color": "#4cb6cb" }} />
              <div className="font-bold">文件夹</div>
            </div>
          </Popover>
          <Popover trigger="click" placement="right" content={tagContent} title="选择标签">
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
              搜索代码段~$:<input placeholder="输入代码段名称或内容查询,回车搜索" className="search_input" />
              <div className="header_right">
                <Popover trigger="click" placement="leftBottom" content={content} title="更多操作">
                  <a style={{ fontSize: "14px", color: "#1890ff" }}>更多操作<Icon type="down" style={{ fontSize: "4px" }} /></a>
                </Popover>
              </div>
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
});

@observer
class Nav extends Component {
  render() {
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Home />
      </Layout>
    )
  }
}
export default Nav