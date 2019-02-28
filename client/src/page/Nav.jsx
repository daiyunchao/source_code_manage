import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { gd, gm, gs } from '../stores'
import envConfig from '../tools/envConfig'
import {
  HashRouter as Router, Route, Switch, Link, withRouter,
} from 'react-router-dom';
import { Menu, Icon, Layout, Breadcrumb, Divider } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

@observer
class NavSider extends React.Component {
  componentDidMount = () => {
    gs.menuKey = "banner_notify";
  };
  handleClick = (e) => {
    console.log("handleClick-->", e)
    gs.menuKey = e.key;
    switch (e.key) {
      case "portrait":
        gm.goPage("/portrait");
        break;
      case "banner_notify":
        gm.goPage("/banner_notify");
        break;
      case "system_notify":
        gm.goPage("/system_notify");
        break;

      default:
        break;
    }



  };
  onOpenChange = (openKeys) => {
    console.log("onOpenChange-->", openKeys)
    gs.navOpenKeys = openKeys;
  };

  render() {
    return (
      <Menu
        theme="dark"
        onClick={this.handleClick}
        openKeys={gs.navOpenKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={[gs.menuKey]}
        mode="inline">
        <Menu.Item key="portrait" >

          <span>头像审核</span>
        </Menu.Item>
        <Menu.Item key="banner_notify" >

          <span>横幅通知</span>
        </Menu.Item>
        <Menu.Item key="system_notify" >

          <span>系统通知</span>
        </Menu.Item>

      </Menu>
    );
  }
}


const Home = withRouter((props) => {

  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider width={60}>
        <div style={{ width: "60px", "height": "100%", "backgroundColor": "#232c32" }}>
          {/* <div className="menuItem">
            <Icon type="file-search" style={{ fontSize: "30px", "color": "#428bca" }} />
            <div class="font-bold">搜索</div>
          </div> */}
          <div className="menuItem">
            <Icon type="code" style={{ fontSize: "30px", "color": "#1ab667" }} />
            <div class="font-bold">最新</div>
          </div>
          <div className="menuItem"><Icon type="folder" style={{ fontSize: "30px", "color": "#4cb6cb" }} />
            <div class="font-bold">文件夹</div>
          </div>
          <div className="menuItem"><Icon type="tags" style={{ fontSize: "30px", "color": "#747bb9" }} />
            <div class="font-bold">标签</div>
          </div>
        </div>
      </Sider>
      <Layout style={{ backgroundColor: "#fff", minWidth: "1400px" }}>
        <Content>
          <div className="content">
            <div class="header"><Icon type="search" style={{"color":"#428bca"}} />搜索代码段~$:<input placeholder="输入代码段名称或内容查询,回车搜索" className="search_input"/></div>
            <div style={{ backgroundColor: "#f1f4f8", width: "100%", "height": "100%", minHeight: "700px" }}>
              <Switch>
                {/* <Route exact path={envConfig.prefx + "/banner_notify"} component={BannerNotify} />
            <Route exact path={envConfig.prefx + "/system_notify"} component={SystemNotify} />
            <Route exact path={envConfig.prefx + "/portrait"} component={Portrait} /> */}
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