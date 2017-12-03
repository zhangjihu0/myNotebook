#### 今天内容 show dbs 显示所用的数据库；
扩展命令、数据库管理、索引、主从和副本以及分片。
#### 命令和配置 mongod --config mong.conf
1. 启动项
 --dbpath 指定数据文件的目录
 --port 端口 默认是27017 2801
 --fork 以后台守候的方式进行启动
 --logpath 指定日志文件输出路径
 --config 指定一个配置文件
 --auth 以安全的方式启动数据库，默认不验证
 --rest 会启动一个帮助页面
2. 启动数据库
3. 关闭数据库
3.1 ctrl+c
3.2 在另一个cmd中
  mongo localhost:5000 
  use admin
  db.shutdownServer();//cmd
3.3 直接关闭cmd

#### 导入导出cmd 
--备注:在保持连接的情况下，mongo localhost:5000 use blog 
for(var i=1;i<=100;i++>){
  db.persons.insert({name:i,age:i})
}插入数据；
db.persons.find().count();查看数据库条数；
db.persons.find()只会返回20条数据

-导出  mongoexport
  Ctrl c 
  mongoexport -d blog -c person --cvs -o bak.cvs
  -d 指定导出的数据库
  -c 指定导出的集合
  -o 导出的文件存储路径
  -q 进行过滤
  --cvs 指定文件格式
-文件导入
  mongoimport --db blog --collection person --file bak.json;
  mongodump -d blog -o bak.dmp//导出整个数据库生成bak.dmp文件；
#### 备份数据库
   mongoimport --db blog --collection person --file bak.json
#### 数据恢复
  运行时恢复  --directoryperdb一个单独的目录 \blog 对应的文件名称；
  mongorestore -db blog --directoryperdb bak.dmp\blog
#### 文件备份
  把备份文件放到其他目录，然后修改config更改指向重新连接；
#### 为了数据的完整性和一致性；导出前先锁库即不能再写入了；
导出前添加锁：use admin db.runCommand({fsync:1,lock:1})fsync:同步状态；
db.fsyncUnlock();解除锁定；
#### 用户和权限
##### 安全措施
物理隔离 网络隔离 防火墙 （ip ip段 白名单 黑名单）用户名密码验证；

####用户管理 
1. 为数据库添加用户：
    use admin 
    db.addUser('zry','123')// {user:zry,roles:['root']}//已被废弃；
    show roles 展示所有角色；
    db.createUser({user:'zf',pwd:'123',roles:[role:'userAdmin',db:'admin']})
2. 展示特权：
  db.runCommand({userInfo:'zry',showPrivileges:true}) showPrivileges://展示用户信息包含权限；
3. 查询当前的数据库的所有用户
  db.system.users.find();//所用用户的列表和定义的权限
4. 在创建的数据上，登录来确认权限
  db.auth('zf','123') //
5. 修改用户密码
  db.changeUserPassword('zhnagsan','456')//修改用户密码；
6. 修改用户信息
    db.runCommand({updateUser:'zhangsan',pwd:'789',customData:{title:'manager',age:'30'})
7. 删除用户
  db.system.users.remove({user:"java1"});
### 用户的注意事项
1. 用户的操作都需要在admin下面进行use admin
2. 如果在某一个数据库下执行操作，那只对当前数据库生效。
3. addUser 已经废弃,不建议使用。但是创建出来的是默认的有root权限的用户
