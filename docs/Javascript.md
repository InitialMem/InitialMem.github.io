# JAVAScript

## 组成

ECMAScript，规定了JS的基本语法和核心知识

DOM，文档对象模型，处理HTML的接口，对页面上的各种元素进行操作（大小，位置，颜色等）

BOM，浏览器对象模型，浏览器的接口，对浏览器进行操作，弹出框，控制浏览器跳转，获取分辨率

## 引用方式

#### 行内式

```html
<div onclick="alert('Hello World!')">
    
</div>
```

#### 内嵌式

```html
<script>
    alert('Hello world!');
</script>
```

#### 引用外部

```html
<script src="newFile.js"></script>
```

## 变量

```javascript
// 1.类型完全动态
var x = 123;
x = 'str';

// 2.Number
Console.log(Number.isNan('123'));	//判断数值类型

// 3.String
var strx = 'Hello World!';	//单双引号嵌套
var stry = '\n'				//转义字符
var strz = strx + stry;		//拼接

// 4.Boolean
// 5.Undefined
// 6.Null

/*
转字符串
    1.num.toString()
    2.String(num)
    3.num+''
*/

/*
转数字
1.parseInt(strx)
2.parseFloat(stry)
3.Number(strz)
4.strz-''
*/

/*
转Boolean
1.Boolean(num);
*/
```

## 运算符

####  ==和 === 的区别

== 比较的时候只判断值，因为会进行隐式转换。值相等则返回 true

=== 比较判断的时同时需要值相等和类型相同，两者均满足则返回 true

#### + 运算符

对于数字无效，对于其他类型将其转化为数字，相当于Number()

```javascript
var x = '123';
var y = '1';
console.log(+x + +y);	//124
```

#### , 运算符

处理多语句，返回最后的语句

```javascript
var x = (1+2, 2+3);
console.log(x);		//5
```

#### !! 运算符

相当于Boolean()

```javascript
console.log(!!"0");		// true
```

#### ?? 运算符

a??b	a为undefined或者null时，返回b

## 流程控制

#### for in(ES5) & for of(ES6)

```javascript
var a = ['A','B','C'];
var s = new Set(['A','B','C']);
var m = new Map([[1:'x'],[2:'y'],[3,'z']]);

//遍历数组
for(var x of a){
	alert(x);//输出的是值 A　B　C
}
for(var x in a){
	alert(x);//输出的是下标 0 1 2
}

//遍历Set集合
for(var x of s){
	alert(x);//输出的是Set集合每个元素的值 A　B　C
}
for(var x in s){
	alert(x);// 不起作用，不能使用for...in循环遍历Set集合
}

//遍历Map集合
for(var x of m){
	alert(x[0]+"="+x[1]);//既可以拿到键名，也可以拿到键值，输出的是值 A　B　C
}
for(var x in m){
	alert(x[0]+"="+x[1]);//for...in循环不能用于遍历Map
}
```

## 函数

```javascript
//1.fuction
function func(params){
    //statements;
}

//2.var
const func = function{
    //statements;
}

/*
    3.=>
    不带花括号：(...args) => expression，计算表达式，直接返回。
    带花括号：(...args) => { statements }，可以编写多行多个语句，需要 return 语句返回。
*/
let func = (x, y) => x+y;

//arguments内置对象，具有length属性，获取所有形参
function test(){
    return arguments;
}
console.log(test(1,2));		//arguments(2) [1,2]
```

## 数组

```javascript
//1.类型动态
var arr = [];
var arr = new Array(2);
var arr1 = new Array(1,2);

//2.类型判断
console.log(arr instanceof Array);	// true
console.log(isArray(arr));			// true

//3.增删
arr.push();		//末尾添加一个或多个
arr.pop();		//删除最后一个
arr.unshift();	//开头添加一个或多个
arr.shift();	//删除第一个

//4.排序
arr.reverse();
arr.sort((a,b)=>a-b);

//5.查询
arr.indexof('a');
arr.lastIndexOf('a');	//从后向前找，返回索引

//6.转化字符串
arr.join('分隔符');	//返回字符串，用分隔符链接
str.split('分隔符');	//字符串转数组，按分隔符分割
```

## 字面量，声明提升，作用域

类型的一个实例叫做字面量

```javascript
var a = 1;		//这里的1就叫做Number类型的字面量
```

JS中声明（包括函数声明）会在预解析时自动提前，但是赋值语句不提前

```javascript
func();
var func = function () {
    console.log('hello');
}
// 出错，以上代码相当于：
var func;
func();
func = function () {
    console.log('hello');
}
```

ES6语法中才引入了块级作用域，ES5中只有全局和局部作用域

块级作用域指{}包含的区域，例如for，if，while

- var 声明的是局部或全局作用域的变量
- let 声明的是块级作用域的变量
- const 声明的是块级作用域的变量

## 对象

```javascript
// 1.字面量创建
var obj = {
    uwelc: 'Hello',
    welc: function() {
        console.log('Hi!');
    }
}

// 2.new创建
var obj = new Object();
//添加属性
obj.uwelc = 'Hello'
obj.welc = function(){
    console.log('Hi!');
}

// 3.构造函数创建
// 定义
function ConFuncName(params) {
    this.attr = value;
    this.methods = function() {};
}
// 调用
let obj = new ConFuncName(params);

//调用属性
obj.uwelc
obj['uwelc']	//引号里的可以是变量
//对对象的属性进行遍历
for(var d in obj){
    console.log(d);			//属性名
    console.log(obj[d]);	//属性值
}
    
```

## DOM

DOM文档对象模型，为了能用Javascript操作HTML，Javascript就有了自己的DOM编程接口，用来操作HTML。

#### DOM下的HTML

- 文档：一个页面就是一个文档，DOM中使用document表示
- 元素：页面中的所有标签都是元素，DOM中使用element表示
- 节点：网页中的所有内容都是节点（标签、属性、文本、注释等），DOM中使用node表示

#### 获取元素

```javascript
// 1.ID获取
document.getElementById('id');

// 2.标签获取
document.getElementByTagName('div');

// 3.Class获取 H5方法
document.getElementsByClassName('className');

// 4.选择器获取
document.querySelector('选择器')
document.querySelectorAll('选择器');

//返回值为数组或者单个元素

//获取body，html元素
document.body;
document.documentElement;
```

#### 操作元素

```javascript
var elements = document.querSelector('div');

// 1.改变标签内容和属性

// 改变内容
elements.innerText = '<strong></strong>';	//纯文本
elements.innerHTML = '<strong></strong>';	//识别HTML

// 获取属性
elements.getAttribute('data-prop')	//获取属性，命名规范：加上date-，用来区分自定义属性

elements.dataset.prop				//dataset数组存放了data-开头的自定义属性
elements.dataset['prop']
elements.dateset.propName			//多个-命名的属性用驼峰命名法获取	date-prop-name

// 设置属性
elements.setAttribute('prop', 2);
elements.removeAttribute('prop');

// 2.改变标签样式
elements.style.color = 'red';
// 改类名
elements.className = 'change';
```

#### 绑定事件

传统注册方式：

```javascript
//注册
var d = document.querySelector('div');
d.onclick = () => alert('div被点击');
//解绑
d.onclick = null;
```

监听方式：

```javascript
//注册监听事件，IE9下attachEvent()
var div = document.querySelector('div');
var fc1 = function(){
    alert('Hi!');
}
div.addEventListener('click', fc1);

//解绑监听事件，IE8下detachEvent()
div.removeEventListener('click', fc1);
```

##### DOM事件流

捕获=>当前目标阶段=>冒泡

事件流指的是事件传递的路径，捕获指的是事件由最上层元素逐渐传递到里层元素，冒泡是指由里层元素向上传递到外层元素

元素监听事件时只能选择监听其中的一条路径

1. `onclick` 和 `attachEvent` 只能得到冒泡阶段。
2. `addEventListener(type, listener, [useCapture])` 第三个参数如果是 `true`，表示在事件捕 获阶段调用事件处理程序；如果是 `false`（不写默认就是 `false`），表示在事件冒泡阶段调用事件处理 程序。
3. 实际开发中我们很少使用事件捕获，我们 更关注事件冒泡。
4. 有些事件是没有冒泡的，比如 `onblur`、`onfocus`、`onmouseenter`、`onmouseleave`

##### 事件对象

事件发生时，都会产生一个对象，该对象记录了事件发生时的相关信息。

```javascript
//该对象自动产生，并依次传递给事件监听器，IE9以下，不会给方法传递参数，直接用window.event获取即可
div.addEventListener('click', function(event){
    
})

/*
	事件对象的常用属性和方法
    e.target				返回触发事件的对象（标准）
    e.srcElement			返回触发事件的对象（非标准）
    e.type					返回事件类型
    e.preventDefault()		阻止默认事件（标准）
    e.returnValue = true	阻止默认事件（非标准，IE678）
    e.stopPropagation()		阻止冒泡（标准）
    e.cancelBubble			阻止冒泡（非标准，IE678）
*/

//阻止链接跳转
a.addEventListener('click', function(e){
    e.preventDefault();
})
```

##### 事件类型

监听不同类型的事件时返回的事件对象所带的属性不同，例：监听鼠标事件时可以获取到点击时鼠标点击的位置

```javascript
//禁止右键菜单
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
})
//禁止选中
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
})

//鼠标事件对象
/*
    e.clientX	返回鼠标相对于浏览器窗口可视区的 X 坐标
    e.clientY	返回鼠标相对于浏览器窗口可视区的 Y 坐标
    e.pageX		返回鼠标相对于文档页面的 X 坐标IE9+支持
    e.pageY		返回鼠标相对于文档页面的 Y 坐标IE9+支持
    e.screenX	返回鼠标相对于电脑屏幕的 X 坐标
    e.screenY	返回鼠标相对于电脑屏幕的 Y 坐标
*/

//键盘事件
/*
    onkeyup		某个键盘按键被松开时触发
    onkeydown	某个键盘按键被按下时触发
    onkeypress(弃用)	某个键盘按键被按下时触发，但是不识别功能键（ctrl、shif、箭头等）
*/

//键盘事件对象
/*
    key		返回物理按键的名称值（推荐使用）
    keyCode(弃用)	返回该键的ASCII值
*/
```



#### 节点操作

按照DOM模型，所有的HTML元素都可以被叫做节点，节点拥有三个基本属性，节点类型，节点名称和节点值

元素节点的nodeType为1，属性为2，文本为3

```javascript
// 1.获取节点
node.parentNode;				//父节点
parentNode.childNodes;			//子节点
parentNode.children;			//子元素
parentNode.firstChild;			//第一个节点
parentNode.lastChld;			//最后一个元素
parentNode.firstElementChlid;	//第一个子元素
parentNode.lastElementChild;	//最后一个子元素

node.nextSibling;				//下一个节点
node.nextElementSibling;		//下一个元素
node.previousSibling;			//上一个节点
node.previousElementSibling;	//上一个元素

// 2.创建节点
document.write('div');
element.innerHTML = '<div></div>';
var i = document.createElement('div');
/*
    1.document.write() 创建元素，是直接将内容写入页面的内容流，但是当文档流执行完毕，会导致页面全部重绘。即覆盖原本的页面。
    2.innerHTML 是将内容写入某个 DOM 节点，不会导致页面全部重绘。创建多个元素效率更高（不要拼接字符串，采取数组形式拼接），结构稍微复杂。
    3.createElement() 创建多个元素效率稍低一点点，但是结构更清晰。
    
    总结：不同浏览器下，innerHTML 效率要比 creatElement高。
*/

//添加节点
e.appendChild(i);
e.insertBefore(i, ul.firstChild);

// 3.删除节点
parentNode.removeChild(childNode);

// 4.复制节点
node.cloneNode(Boolean);//true深拷贝，同时复制里面的子节点
```

## BOM

BOM把浏览器当作对象来看待，整个浏览器是window，BOM包含了DOM。

```javascript
// 窗口加载事件，文档内容全部加载完时会触发该事件
window.onload() = function() {};
window.addEventListener("load", fucntion(){});
// 有了该事件就可以把JS代码写到页面元素上方，这样就能获取到页面元素

// DOM内容加载事件
document.addEventListener('DOMContentLoaded', function() {});
// 如果页面的图片很多的话, 从用户访问到 onload 触发可能需要较长的时间, 交互效果就不能实现，必然影响用户的体验，此时用 DOMContentLoaded 事件比较合适。

// 调整窗口大小事件
window.onresize = function(){}
window.addEventListener("resize",function(){});

// 定时器
var timer1 = setTimeout(callback, seconds);		//间隔一段时间执行
var timer2 = setInterval(callback, seconds);	//每隔一段时间执行

// 删除定时器
clearTimeout(timeoutID);
clearInterval(intervalID);
```

#### JS的同步和异步

JS是单线程，只有一个主线程，同步任务在主线程执行，异步任务通过回调函数添加到消息队列中，只有主线程的任务执行完毕系统才会依次读取任务队列中的异步任务执行

主线程获取任务，执行任务，再获取任务执行的机制叫做事件循环

#### location对象

包含网页的URL，并且可以用于解析URL

```javascript
/*
URL:
    格式
    protocol://host[:port]/path/[?query]#fragment
    举例
    http://www.itcast.cn/index.html?name=andy&age=18#link
    Copy to clipboardErrorCopied
    
    组成		   说明
    protocol	通信协议（http、ftp）
    host		主机（域名）
    port		端口号（可选），省略时使用方案的默认端口，如http默认端口80
    path		路径，由零或多个 / 隔开的字符串，一般表示主机上的一个目录或文件地址
    query		参数，以键值对的形式，通过 & 符号分隔开
    fragment	片段，# 后面内容，常见于链接、锚点
*/
/*
    location对象属性	  返回值
    location.href		获取或者设置 整个URL
    location.host		返回主机（域名）
    location.port		返回端口号，未写则返回空字符串
    location.pathname	返回路径
    location.search		返回参数
    location.hash		返回片段，# 后面内容，常见于链接、锚点
    
    location对象方法	  返回值
	location.assign()	跟 href 一样，可以跳转页面（也称为重定向页面）
	location.replace()	替换当前页面，因为不记录历史，所以不能后退页面
	location.reload()	重新加载页面，相当于刷新按钿或者 f5 如果参数为 true 强制刷新 ctrl+f5
*/
```

#### Navigator对象

包含浏览器的信息和用户信息

```javascript
// 根据客户端打开不同的页面
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.location.href = ""; //手机
} else {
    window.location.href = ""; //电脑
}
```

#### History对象

包含用户访问过的URL

| `history`对象方法 | 作用                                                      |
| ----------------- | --------------------------------------------------------- |
| `back()`          | 网页地址后退功能                                          |
| `forward()`       | 前进功能                                                  |
| `go(参数)`        | 前进后退功能，参数为 `1`，前进一个页面，`-1` 后退一个页面 |

`history` 对象一般在实际开发中比较少用，但是会在一些OA 办公系统中见到。

