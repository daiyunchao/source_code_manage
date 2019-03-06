### 源代码管理工具(个人版)
> 设计为自己平常使用,无用户概念,功能简单

#### 设计初衷
原因很简单,我想管理我的代码片段,以便在需要的时候能快速找到.
`gist`很好,但常常打不开(特别是家里的电脑),于是就有这个简单的管理工具

#### 使用技术
React Mobx Node Koa2 Mongodb

#### 如何使用

git 获取代码:
`clone git https://github.com/daiyunchao/source_code_manage.git`

#### 启动开发版:
启动客户端开发版 端口为:3000:
`cd client`
`yarn install`
`yarn run start`

启动服务器 端口为:3698(如果需要修改端口,对应的客户端也需要做修改,具体可在client文件夹中全局搜索3698)
`cd server`
`yarn install`
`node ./index.js`



#### 启动产品版
客户端
`cd client`
`yarn install`
`yarn run build`


服务器pm2启动:
`cd server`
`yarn install`
`pm2 start ./script/pm2_start.json`(需要需要cwd文件路径)

```

修改数据库地址:
`/tools/mongo_conn.js`

修改端口号:
`./index.js`

```
#### 效果

![列表](https://github.com/daiyunchao/source_code_manage/blob/master/xgt/list.png)

![添加](https://github.com/daiyunchao/source_code_manage/blob/master/xgt/add.png)

![添加文件夹](https://github.com/daiyunchao/source_code_manage/blob/master/xgt/add_folder.png)

![添加标签](https://github.com/daiyunchao/source_code_manage/blob/master/xgt/add_tag.png)