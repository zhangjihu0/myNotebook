// 作用域
// person在每次被调用的时候会创建相应的作用域，执行完之后，作用域销毁
// 内部的局部活动变量也被销毁局部变量存活时间变短
var person = function(){
  var name = ""
}
person();
//垃圾回收的基本过程
// 1.标识符查找 就是变量名
function say(){

  console.log(name)
}

function first(){
  var name ='first';
  function second(){
    var name ='second';
    function third(){
      var name = 'third'
    }
    third();
  }
  second()
}
first()
//变量如何释放
//全局变量无法销毁
//只能通过delete删除引用或重新赋值
global.name= 'zfpx';
age = {age:6};
console.log(global.name);
delete global.name //不好，会打破v8的属性结构机制；
name=null;//被v8垃圾回收

/**
 * 外部不能访问内部定义的变量
 * 闭包可以实现外部作用域访问内部作用域的变量或方法
 * 一般情况下由于city是局部变量应该销毁但由于返回了一个匿名函数，具备了访问city的能力
 * 所以无法回收的情况分为两种，一种全局一种是闭包
 */
function City(name){
  this.name =name;
  this.age =0;
}
var cityFactory = function(name){
  var city = new City(name);
  return function(){
    return city
  }
}
var beijing = cityFactory('北京')
beijing=null;//City的实例会被回收
console.log(beijing())