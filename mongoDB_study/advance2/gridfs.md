### 概念
是mongodb自带的文件系统，使用二进制存储文件。可以以BSON的格式保存二进制对象。
但是普通的BSON 对象的体积不能超过4M。所以mongodb提供了gridfs.他可以把大文件透明的分割小文件，从而保存大体积的数据。
### 上传一个文件
1. mongofiles -d files -l "E:\test.txt" put 'test.txt'
### 查看文件
1. mongofiles -d files get 'test.txt'
### 查看所有文件
1. mongofiles -d files list
### 删除文件//只能识别双引号不能用单引号；
1. mongofiles -d files delete "test.txt"
### eval 服务器端脚本 当前数据库下使用；
//可执行js语句
db.eval("1+1");
db.eval("return 'hello'");
db.system.js.insert({_id:'x',value:1})//定义全局变量,x=1
db.system.js.insert({_id:'say',value:function(){return 'hello'}})
db.eval("say()");