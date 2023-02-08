# Vue



## MVVM设计模式

目的: 转变思维, 用数据驱动视图改变, 操作dom的事, vue源码内干了

设计模式: 是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结。

- MVVM，一种软件架构模式，决定了写代码的思想和层次
  - M： model数据模型 (data里定义)
  - V： view视图 （html页面）
  - VM： ViewModel视图模型 (vue.js源码)

- MVVM通过数据双向绑定让数据自动地双向同步不再需要操作DOM

**1. 在vue中，不推荐直接手动操作DOM！！！**

**2. 在vue中，通过数据驱动视图，不要在想着怎么操作DOM，而是想着如何操作数据！！**(思想转变)

总结: vue源码内采用MVVM设计模式思想, 大大减少了DOM操作, 挺高开发效率

## 模板语法

声明式地将DOM和底层Vue实例绑定

### 插值语法

用于解析**标签体内容**，参数的值是JS表达式

```html
<!--文本-->
<span>Message: {{ msg }}</span>
```

### 指令语法

用于解析**标签属性**，v-开头的特殊参数，参数的值是单个JS表达式，参数变化时响应式地作用于DOM

```html
<!--属性-->
<div v-bind:id="dynID"></div>
<div :id="dynID"></div>

<!--事件绑定-->
<a v-on:click="doSomething">...</a>
<a @click="doSomething">...</a>
```

## 数据绑定

Vue中有两种数据绑定方式：

**加上“:”，表示动态绑定数据，此时双引号不再表示字符串的意思，而是执行双引号内的内容从而得出一个结果**

单向绑定v-bind：数据只能从data流向dom

双向绑定v-model：数据还可以从dom流向data，一般应用在表单元素上，且默认和value值绑定，v-model:value可以简写为v-model="dataName"

## el和data的两种写法

el的两种写法

1. 创建Vue实例对象的时候直接配置el属性
2. 先创建Vue实例再通过vm.$mount('#root')将数据挂载到el上

Tips:$符号开头的方法是原型对象的方法，不是实例方法

data的两种写法

1. 创建Vue实例对象的时候直接配置data属性

2. 函数式写法，返回一个对象

   ```javascript
   data(){
   	return{
   		name: 'test'
   	}
   }
   ```

## 数据代理

一个对象代理对另一个对象的属性读写操作，主要通过Object.defineproperty方法实现

```javascript
//Objectdefineproperty(需要添加属性的对象，添加的属性，配置对象)
let number = 18;
let person = {
    name:'张三',
    sex:'男'
}

Object.defineProperty(person, 'age', {
    value:18,
    enumerable:true,	//控制添加的属性是否可枚举
    writable:true,		//控制属性是否可写
    configurable:true	//控制属性是否可删除
})

//第二种写法，数据代理
Object.defineProperty(person, 'age', {
    //当读取age属性时，该方法被调用，返回的是number，此时number代理了age
    get(){
        return number;
    }
    //当修改age属性时，该方法被调用，同时需要修改代理者的值，因为number代理了age，读取age时返回的是number的值
    set(value){
    	number = value;
	}
})
```

```javascript
//obj对象的x代理了obj2对象的x
let obj = {x:100}
let obj2 = {y:200}

Object.defineProperty(obj2, 'x', {
    get(){
        return obj.x;
    }
    set(value){
    	obj2.x = value;
	}
})
```

### Vue中的数据代理

通过代码可知，我们的数据是写在data对象中的，但是在模板中可以直接获取到data中的属性。这里Vue实例对象使用了数据代理通过Object.defineProperty()方法给Vue实例对象添加了data中的属性并代理data。

在Vue实例对象中的_data其实就是data对象的拷贝，并对其做了数据劫持，实现响应式。

Vue通过数据代理实现模板中可以直接获取和修改data属性，从而简化代码，原本模板中需要写_data.dataName，简化为dataName。

## 计算属性和侦听器

### 计算属性

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。

```html
<div id="example">
    {{reversedMessage}}
</div>
```

```javascript
computed: {
    // 计算属性的 getter
    reversedMessage: function () {
        return 'message'
    }
}
```

只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

#### 计算属性的setter

```javascript
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

### 侦听器

当被监视的属性发生变化时，回调函数自动调用

监视属性必须存在才能监视，可以监视data，也可以监视计算属性

写法：

1. 创建Vue时传入watch:{}
2. 通过vm.$watch()

```javascript
//方法1
watch:{
    isHot:{
        immediate:true,
        handler(newValue, oldValue){
            console.log.(newValue, oldValue)
        }
    }
}
//方法2
vm.$watch('isHot', {
    immediate:true,
    handler(newValue, oldValue){
        console.log.(newValue, oldValue)
    }
})

//只用handler时可以简写
isHot(newValue, oldValue){
    console.log.(newValue, oldValue)
}
vm.$watch('isHot', (newValue,oldValue) => {
    console.log.(newValue, oldValue)
}
})
```

#### 深度监视

watch默认不见时对象内部值的改变，在watch中配置deep:true可以监视对象内部值的改变

```javascript
watch:{
    isHot:{
        immediate:true,
        deep:true,
        handler(newValue, oldValue){
            console.log.(newValue, oldValue)
        }
    }
}
```

## 事件处理

### 监听事件

使用v-on:xxx或者@xxx绑定事件，其中xxx是事件名

```html
<div id="ex1" v-on:click="doSomething"></div>
```

### 事件处理方法

1. 事件的回调写在Methods对象中

2. Methods中的函数不要写成箭头函数否则this就不是指向vm了

```html
<div id="ex1" v-on:click="fc"></div>
```

```javascript
var example2 = new Vue({
  el: 'ex1',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    fc: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})
```

### 处理方法中的事件对象

```html
<!--通过$event占位符把原生DOM事件对象传入方法-->
<a v-on:click="fc('test', $event)"></a>
```

```javascript
methods:{
	fc: function(message, event){
        if(event){
            event.preventDefault();
        }
    }
}
```

### 事件修饰符

通过原生的DOM事件对象去调用默认方法是常见的需求，但是Vue不提倡手动操作DOM。

事件修饰符就是用来解决DOM事件细节的

| 修饰符  | 作用                                     |
| ------- | ---------------------------------------- |
| prevent | 阻止默认事件                             |
| stop    | 阻止事件冒泡                             |
| onece   | 事件只触发一次                           |
| capture | 使用捕获模式                             |
| self    | event.targe为当前元素时才触发            |
| passive | 事件的默认行为立即执行，无需等待回调完成 |

```html
<!-- 阻止事件冒泡 -->
<a v-on:click.stop="doThis"></a>

<!-- 阻止事件默认行为，提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联，执行顺序不同 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

### 按键修饰符

监听键盘事件同时添加按键修饰符

```html
<!--处理函数只会在 $event.key 等于 enter 时被调用-->
<input v-on:keyup.enter="onEnterup">
```

## Class和Style绑定

```html
<style>
    .normal{}
    .happy{}
    .sad{}
    .style1{}
    .style2{}
    .style3{}
</style>

<!-- Class 字符串语法 -->
<div :class="customClass"></div>

<!-- Class 数组语法 -->
<!-- 通过数组的增删动态改变class -->
<div :class="classArr"></div>

<!-- Class 对象语法 -->
<!-- 通过对象键值对的true和false动态切换class -->
<div :class="classObj"></div>

<!-- Style 对象语法 -->
<div :style="styleObj"></div>

<!-- Style 数组语法 -->
<div :style="styleArr"></div>
```

```javascript
data:{
    customClass:'normal',
    classArr:['normal', 'happy', 'sad']
    classObj:{
        style1:true,
        style2:true,
        style3:true
    },
    styleObj:{
        fontSize: '40px',
        color: 'red'
    },
    styleArr:[
        {
            fontSize: '40px',
            color: 'red'
        },
        {
            backgroundColor: 'gray'
        }
    ]
}
```

## 条件渲染

v-show

只是隐藏元素，相当于display:none，切换频率较高的场景

```html
<div v-show='表达式'></div>
```

v-if

移除元素，相当于删除了标签，可以和v-else-if，v-else连用，但是结构不能被打断

```html
<div>
    <a v-if='表达式'></a>
    <a v-else-if='表达式'></a>
    <a v-else='表达式'></a>
</div>
```

template标签

控制多个元素的显示和隐藏，不会添加额外标签，不影响结构，只能和v-if使用

```html
<template v-if='表达式'>
    <a>1</a>
    <a>2</a>
    <a>3</a>
</template>
```

## 列表渲染

v-for

遍历显示数据

```html
<ul>
    <li v-for='item, index of items' :key='item.id'>{{ item.msg }}</li>
</ul>

data:{
	items:[
		{ msg:'001'},
		{ msg:'002'}
	]
}
```

### key的作用

Vue生成DOM时会首先生成中间的虚拟DOM，数据发生变化时，vue会根据key一一对比新旧虚拟DOM，决定复用或重新生成，如果没有找到相对应的key，则生成新的虚拟DOM和真实DOM

### 列表过滤

```javascript
//利用filter和indexOf方法
computed:{
    filPersons(){
        return this.persons.filter((p)=>{
            return p.name.indexOf(this.keyWord) !== -1
        })
    }
}
```

### 列表排序

```javascript
computed:{
    filPersons(){
        //数据过滤
        const arr = this.persons.filter((p)=>{
            return p.name.indexOf(this.keyWord) !== -1
        })
        //数据排序
        if(this.sortType){
            arr.sort((p1,p2) => this.sortType === 1 ? p2.age-p1.age : p1.age-p2.age)
        }
        return arr
    } 
}
```

### Vue数据监视问题

## 表单输入绑定

```html
<!-- text类绑定 -->
账号：</label><input type="text" v-model="account">

<!-- radio绑定 -->
男<input type="radio" name="sex" value="男" v-model="sex">
女<input type="radio" name="sex" value="女" v-model="sex">

<!-- checkbox绑定 -->
<!-- 多选框必须要有value属性，同时绑定的数据类型要是数组，不然只能收集布尔值 -->
吃饭<input type="checkbox" value="吃饭" v-model="hobby">
睡觉<input type="checkbox" value="睡觉" v-model="hobby">
打游戏<input type="checkbox" value="打游戏" v-model="hobby">

<!-- checkbox收集布尔值的情况 -->
<input type="checkbox" v-model="xieyi"><a href="#">用户协议</a>

<!-- select的绑定 -->
所属校区：
<select v-model="area">
    <option value="请选择校区" >请选择校区</option>
    <option value="北京" >北京</option>
    <option value="上海" >上海</option>
</select>

<!-- 
	v-model的修饰符
    lazy:失去焦点后传递数据
    number:字符串转数字
    trim:去除首尾空格 
-->
年龄：<input type="number" v-model.number="age">
```

## 过滤器

Vue3废弃，类似计算属性和方法调用

```html
<div id="root">
    <h2>现在的时间是:{{ time | timeFormater('YYYY-MM-DD HH:mm:ss')}}</h2>
    <h2>{{time | timeFormater('YYYY-MM-DD HH:mm:ss') | timeSlice(4)}}</h2>
</div>
```

```javascript
//局部过滤器
filters:{
    //ES6语法，参数默认值，val为需要过滤的参数
    timeFormater(val, str='YYYY年MM月DD日 HH:mm:ss'){
        console.log(val)
        return dayjs(this.time).format(str)
    }
}
//全局过滤器，注意写在前面
Vue.filter('timeSlice', function(val, num=2){
    return val.silce(0,num)
})
```

## 其他内置指令

```html
<!-- v-text 将变量解析为文本 -->
<div v-text="text"></div>
text:'Hello'

<!-- v-html 将变量解析为HTML-->
<div v-html="text"></div>
text:'<h2>Hello</h2>'

<!-- v-cloack 编译完成后自动删除该指令，结合属性选择器隐藏未编译的Mustache标签，[v-cloak] { display: none }-->
<div v-cloack>{{text}}</div>

<!-- v-once 只渲染元素和组件一次，所有子节点将被视为静态内容，text不会响应式更新-->
<div v-once>{{text}}</div>

<!-- v-pre 跳过该元素的编译，下列元素会显示Mustache标签-->
<div v-pre>{{text}}</div>
```

## 自定义指令

```html
<a v-directiveName></a>
```

```javascript
new Vue({
    //局部指令
	directives:{
        //函数式
		directiveName(element, binding){
			
		}
        //对象式
        directiveName:{
        	//指令和元素成功绑定时
        	bind(element, binding){},
        	//指令所在的元素被插入页面时
        	inserted(element, binding){},
    		//指令所在模板被重新解析时
    		update(element, binding){}
    	}
	}
})
//全局指令
Vue.directive('directiveName', 配置对象或者函数)
```

```javascript
//自定义指令命名
//多个单词用'-'连结作为key时要用''号包裹
//自定义指令的回调函数中的this指向window
// <a v-big-number></a>

directives:{
    'big-number'(){}
}
```

## 生命周期

![](https://cdn.nlark.com/yuque/0/2022/png/1379492/1643297176928-5d5ac765-237c-462d-9188-84935e6c3c69.png?x-oss-process=image%2Fresize%2Cw_750%2Climit_0)

生命周期

​	生命周期回调函数，生命周期钩子

​	关键时期帮我们调用的特殊函数

常用的生命周期钩子

​	mounted 发送ajax请求，启动定时器，绑定自定义事件

​	beforeDestory 清除定时器，解绑自定义事件

## 组件化编程

### 模块化，组件化

模块化是指对同一类文件进行拆分，组件化指对功能进行拆分，是代码和资源的集合

### 组件的使用

```html
<div id="root">
    <School></School>				<!-- 3.使用组件 -->
</div>
```

```javascript
const School = Vue.extend({			//1.创建组件
    name: 'School',                 //Vue开发者工具里的名字
    template:`<div>Hello</div>`,
    data() {						//data写成函数式
        return {
            x:1
        }
    },
})

Vue.component('School', School)		//2.全局注册

new Vue({
    el:'#root',
    components:{
        School,						//2.局部注册
    }
})
```

### VueComponent

组件的本质是一个名为VueComponent的构造函数， 是由Vue.extend()生成的

每次调用Vue.extend都会返回一个全新的VueComponent，即不同组件是不同的对象

组件中的data,methods,watch,computed中的函数中的this均是VueComponent实例对象

原型链：让组件可以访问到Vue原型上的属性和方法

![](https://cdn.nlark.com/yuque/0/2022/png/1379492/1643034116880-0c7ffd4b-f0ed-47b2-9638-3bb71344c4f1.png?x-oss-process=image%2Fresize%2Cw_750%2Climit_0)

## Vue CLI

### 初始化

1. 配置镜像 npm config registry http://registry.npm.taobao.org
2. npm install -g @vue/cli
3. 命令行进入创建项目的目录 vue create ProjectName
4. npm run serve

### 目录结构

```
├── node_modules
├── public
│ ├── favicon.ico: 		页签图标
│ └── index.html: 		主页面
├── src
│ ├── assets: 			存放静态资源
│ │ └── logo.png
│ │── component: 		存放组件
│ │ └── HelloWorld.vue
│ │── App.vue: 			汇总所有组件
│ │── main.js: 			入口文件
------------------------------------------------
├── .gitignore: git 			版本管制忽略的配置
├── babel.config.js: 			babel 的配置文件
├── package.json: 				应用包配置文件
├── README.md: 					应用描述文件
├── package-lock.json：			包版本控制文件
```

### Render函数

```javascript
//由于脚手架默认使用不含模板解析器的vue.runtime.xxx.js，所以使用render函数创建模板
//简写
render: h => h(App)

//完整形式
render(createElement){
    return createElement(App)
}
```

### vue.config.js配置文件

使用 vue inspect > output.js 可以查看脚手架的默认配置

更改 vue.config.js 默认配置文件可以定制脚手架

[定制脚手架]: https://cli.vuejs.org/zh/config/#vue-config-js

### Ref

Ref用来给元素或者子组件注册引用信息(id的替代者)

```html
<div>
    <a ref="link"></a>
    <School ref="sch"></School>
</div>
```

```javascript
//this指的是当前实例对象所以无法直接通过ref找到子组件里的ref
method: {
	showDOM(){
        console.log(this.$refs.link)	//获取真实DOM元素
		console.log(this.$refs.sch)		//获取组件实例对象
        console.log(this.$refs.sch.$refs.stu)		//获取子组件里的元素
	}
}
```

### Props

Props用来标明外来值，实现给组件实例对象传值

Props用来标识数据是外来的，只读，如要修改则通过data接受再进行修改

```html
<!-- 加上“:”，表示动态绑定数据，此时双引号不再表示字符串的意思，而是执行双引号内的内容从而得出一个结果，此时结果就是一个number -->
<div>
    <Student name="小明" :age="18"></Student>
</div>
```

```javascript
//1.
props:['name', 'age']

//2.
props:{name:String, age:Number}

//3.
props:{
    name:{
        type: String,
        required: true,
        default: 'cess'
    },
    age:{
        type: Number,
        required: true
    }
}
```

### Mixin

把多个组件共用的配置对象封装成一个Mixin对象，使用时导入

组件和Mixin对象有冲突时，以组件优先

混入的生命周期钩子都会调用，混入的钩子优先调用

```javascript
//定义
const mixin = {
    data(){},
    methods(){},
    ....
}

//全局导入
Vue.mixin(minxin)
//局部导入
mixins:[mixin]
```

### Plugin

包含install方法的一个对象，install(Vue, x, y, z)

```javascript
export default {
	install(Vue, x, y, z){
		//全局过滤器
		Vue.filter('myFilter', function(val){return floor(val)})
		
		//全局指令
        Vue.directive('fbind', {
            bind(element, binding){element.value = binding.value},
            inserted(element, binding){element.focus()},
            updata(element, biding){element.value = binding.value}
        })
        
        //定义混入
        Vue.mixin({
            data(){return {x:100, y:200}}
        })
        
        //Vue原型添加方法
        Vue.prototype.hello = () => {alert('Hello')}
	}
}
```

### Scoped

让CSS只在当前文件生效，防止冲突，写在App内的CSS一般作为全局样式，不加Scoped

```html
<style scoped>
.demo{
    background-color: sky-blue;
}
</style>
```

## TodoList案例

1. 拆分页面，实现静态组件

2. 考虑数据存放的位置，放在共同的父组件上（状态提升）
3. 实现交互：绑定事件

父组件=>子组件通信

子组件=>父组件通信(父组件给子组件传一个函数)

v-model绑定的值不能是外部传入的值(props)

## 本地储存

储存内容为5MB左右

Window.sessionStorage，数据存在会话中，随浏览器关闭而消失

Window.localStorage，需要手动清除才会消失

相关API

```javascript
xxxStorage.setItem('key', 'value')
xxxStorage.getItem('key')			//getItem()获取不到内容时返回null,JSON.parse(null)也返回null
xxxStorage.removeItem('key')
xxxStorage.clear()		
```

## 组件自定义事件

解决子组件向父组件传递数据的问题：

1. 通过给子组件传递一个父组件的函数来实现，props
2. 组件自定义事件
3. 全局事件总线

```html
<!-- 给组件绑定自定义事件 -->
<!-- 1.通过标签绑定 -->
<School @getName="showName" ref="School"></School>

<script>
    //2.通过$on方法绑定
    mounted(){
        //Tips:事件的回调要么配置在methods中，要么使用箭头函数
        this.$refs.School.$on('getName', this.showName)
    }
    //自定义事件的回调
    methods:{
        showName(val){
            console.log(val)
        }
    }
</script>
```

```html
<!-- School组件对象 -->
<div>
    <button @click="showSchoolName">
		showSchoolName
    </button>
</div>

<script>
    methods:{
        showSchoolName(){
            //触发showName事件，事件的回调在父组件中，同时传递参数
            this.$emit('showName', 'SchoolName')
        }
    }
</script>
```

### 组件原生事件

使用native修饰符@click.native="show"

事件绑定到组件的根元素

## 全局事件总线

实现任意组件间通信，本质就是通过给中间对象绑定自定义事件来实现

中间对象必须能调用$on,$emit方法，同时要被所有组件对象看到

```javascript
//因为继承关系，所以这个对象定义在vm原型上
new Vue({
    beforCreate(){
        this.prototype.$bus = this		//安装全局事件总线，也就是通过给当前的vm绑定自定义事件实现
    }
})
```

```javascript
//全局事件总线的使用

//A组件要接受数据，则在A中给$bus绑定事件，事件的回调写在A中
mounted(){
    this.$bus.$on('EventName', Function)
}
beforeDestory(){
    this.$bus.$off('EventName')
}

//提供数据者只要触发对应的事件名就行
methods:{
    handleClick(){
        this.$bus.$emit('EventName', param)
    }
}
```

### 消息订阅和发布(pubsub-js)

1. 安装:npm i pubsub-js

2. 引入import pubsub from 'pubsub-js'

```javascript
//A组件，接收数据
mounted(){
	this.pid = pubsub.subscribe('MsgName', Function)    
}
beforeDestory(){
    pubsub.unsubscribe(this.pid)
}
```

```javascript
//B组件，发送消息
methods:{
    sendMsg(){
        pubsub.publish('MsgName', param)
    }
}
```

## $nextTick钩子

```JavaScript
//在执行下面的回调后，才会更新DOM
//所以input元素必须在更新完DOM后focus才有效
handleEdit(){
    todo.isEdit = true
    //Vue的生命周期钩子，在下次DOM更新结束后调用
    this.$nextTick(function(){
        this.$refs.inputTitle.focus()
    })
}
```

## 过渡和动画

![](https://v2.cn.vuejs.org/images/transition.png)

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义**进入过渡的开始状态**。在元素被插入之前生效，在元素被插入之后的下一帧移除。

2. `v-enter-active`：定义**进入过渡生效时的状态**。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

3. `v-enter-to`：定义**进入过渡的结束状态**。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。

4. `v-leave`：定义**离开过渡的开始状态**。在离开过渡被触发时立刻生效，下一帧被移除。

5. `v-leave-active`：定义**离开过渡生效时的状态**。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

6. `v-leave-to`：定义**离开过渡的结束状态**。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

   v-是默认的前缀，为元素定义name属性来改变默认前缀

   页面显示时播放进入动画，需要添加给transition标签添加appear属性

   多个元素添加相同动画需要把transition标签改成transition-group标签，且每个标签添加key属性

```html
<transition name="fade" appear>
    <p v-if="show">
        hello
    </p>
</transition>

<!-- 1.动画写法 -->
.fade-enter-active{				<!-- 进入动画过渡的方式 -->
	animation: fade .5s linear;
}

.fade-leave-active{				<!-- 离开动画过渡的方式 -->
	animation: fade .5s linear reverse;
}

@keyframes fade{				<!-- keframe -->
	from{
		opacity: 100;
	}
	to{
		opacity: 0;
	}
}

<!-- 2.过渡写法 -->
.fade-enter .fade-leave-to{		<!-- 进入的起点，离开的终点的keyframe -->
	opacity： 0；
}
.fade-enter-to .fade-leave{		<!-- 进入的终点，离开的起点的keyframe -->
	opacity: 1;
}

.fade-enter-active .fade-leave-active{		<!-- 过渡的时间和方式 -->
	opacity: .5s linear;
}
```

## Vue CLI 配置代理服务器(axios)

axios库: 

```javascript
npm install axios
```

配置参考：https://cli.vuejs.org/zh/config/#devserver

因为浏览器有一个安全机制叫同源策略。同源就是指**协议**、**域名(IP地址)**、**端口**都一样，如果任意一项不一致就是不同源。

简单点说就是，你的网页URL和你调用的接口URL不是一个地方的，浏览器觉得有安全风险，不想让你使用这个接口的数据。

举例说明跨域的几种情况：

如果你的页面URL是 http://www.aaa.com/zzz.htm ，那么接口地址如下几种情况

1. https://www.aaa.com/xxx （不同源，因为协议不同）

2. http://www.aaa.com:8080/xxx （不同源，因为端口不同）

3. http://www.bbb.com/xxx （不同源，因为域名不同）

4. http://abc.aaa.com/xxx （不同源，因为域名不同）

5. http://www.aaa.com/xxx （同源，协议、域名、端口均相同）

```javascript
//配置vue.config.js文件
module.exports = {
    devServe:{
        //代理服务器默认和前端开在同一端口下(解决跨域)，只能开启一个代理，代理服务器和网页同源
        proxy:"http://localhost:5000"		//向http://localhost这台服务器的5000端口请求信息，服务器通过http协议通信，不存在跨域问题
    }
}
```

```javascript
getStudents(){
    //向代理服务器请求数据，请求目标服务器student下的数据，如果public文件夹下(本地服务器)有对应文件则不会发送请求，返回本地服务器的文件
    //8080指当前服务器为8080
    axios.get('http://localhost:8080/students').then(
    	response =>{
            console.log(response.data)
        },
        error => {
            console.log(error.message)
        }
    )
}
```

写法2：

```javascript
//配置vue.config.js文件
module.exports = {
    devServe:{
        proxy:{
            '/api1':{								//匹配所有以 '/api1' 开头的请求路径
                target:'http//localhost:5000',		//目标服务器路径
                pathRewrite:{'^/api1':''},			//重写请求路径
                ws: true,							// 用于支持WebSocket
                changeOrigin:true,					// 为true返回当前服务器URL(8080)，false返回目标服务器路径(5000)
            },
            '/api2':{
                target:'http//localhost:5001',
                pathRewrite:{'^/api2':''},
                ws: true,
                changeOrigin:true,
            }
        }
    }
}
```

```javascript
getStudents(){
    //向代理服务器请求数据，请求目标服务器student下的数据，地址需要代理服务器重写
    axios.get('http://localhost:8080/api1/students').then(
    	response =>{
            console.log(response.data)
        },
        error => {
            console.log(error.message)
        }
    )
}
```

### vue-resource插件

```javascript
npm i vue-resource
```

```javascript
import vueResource from 'vue-resource'

Vue.use(vueResource)

this.$http.get('URL').then(
	response => {
        console.log(response.data)
    },
    error => {
        console.log(error.message)
    }
)
```

## 插槽

让父组件可以向子组件的指定位置插入html结构

样式可以写在组件自身或使用者上

```html
<!-- 父组件 -->
<Category>
    <!-- 插入的结构 -->
    <div slot="Category"></div>
</Category>

<!-- Category组件 -->
<template>
    <div>
        <!-- 插入位置 -->
        <slot name="Category"></slot>
    </div>
</template>
```

插入多个兄弟结构时可以用template标签包裹，指令名改为v-slot:slotName，该指令仅限template标签使用

```html
<!-- 父组件 -->
<Category>
    <!-- 插入的多个结构 -->
    <template v-slot:Category>
    	<div>分类</div>
	    <div>商品</div>    
    </template>
</Category>

<!-- Category组件 -->
<template>
    <div>
        <!-- 插入位置 -->
        <slot name="Category"></slot>
    </div>
</template>
```

### 作用域插槽

数据在组件自身，但是根据数据生成的结构需要组件的使用者来决定

```html
<!-- 父组件 -->
<Category>
    <!-- 写法1.接受的数据放在scopeData中 -->
    <template v-slot:Category scope="scopeData">
        <ul>
            <li v-for="(item,index) in scopeData.items" :key="index">{{item}}</li>
        </ul>
    </template>
    <!-- 写法2.scope可以写成slot-scope,值可以写成接受的对象 -->
    <template v-slot:Category slot-scope="{items}">
        <ul>
            <li v-for="(item,index) in items" :key="index">{{item}}</li>
        </ul>
    </template>
</Category>

<!-- Category组件 -->
<template>
    <div>
        <!-- 传入数据 -->
        <slot :items="items" name="Category"></slot>
    </div>
</template>

<script>
    <!-- 数据在组件自身 -->
	data(){
        items:['111','222','333']
    }    
</script>
```

## Vuex

集中式状态（数据）管理的一个插件，对Vue中多个组件共享的状态（数据）进行集中式管理，适用于任意组件间通信

### **工作原理图**

![](https://vuex.vuejs.org/vuex.png)

### 环境搭建

 1.   npm i vuex@3		(Vue2对应Vuex3，Vue3对应Vuex4)

 2.   创建Vuex中的核心store对象

      ```javascript
      //	src/store/index.js
      
      import Vue from "vue";
      import Vuex from "vuex"
      
      Vue.use(Vuex)
      
      //准备actions--用于相应组件中的操作
      const actions = {
          actionName(context, val){
      		context.commit('mutationName', val)        //context上下文
          }
      }
      
      //准备mutations--用于操作数据	函数名字一般大写
      const mutations = {
          mutationName(state, val){
              state.val = val
          }
      }
      
      //准备state--用于储存数据(状态)
      const state = {
          val:0
      }
      
      //类似计算属性--用于加工储存的数据
      const getters = {  
          bigVal(){
              return state.val * 10
          }
      }
      
      export default new Vuex.Store({
          actions,
          mutations,
          state,
          getters
      })
      ```

 3.   在main.js中引入store配置项

      ```javascript
      import Vue from 'vue'
      import App from './App.vue'
      
      import store from './store/index'		//引入store
      
      Vue.config.productionTip = false
      
      new Vue({
        el:'#app',
        render: h => h(App),
        store,							//使用store
        beforeCreate(){
          Vue.prototype.$bus = this
        }
      })
      ```

### Vuex使用

```javascript
//组件中通过this.$store.dispatch/commit提交对数据的操作请求名和数据
//数据可以不通过Action阶段直接进入Mutation阶段

this.$store.dispatch(ActionName, params)		
this.$store.commit(MutationName, params)
```

### mapState,mapGetters

为了简化页面调用state中数据的方式，从this.$store.state.data -> data，利用了计算属性

**注意引号中的名字为store中的数据**

```javascript
import {mapGetters,mapActions,mapMutations,mapState} from 'vuex'
computed:{
    //传对象
    ...mapState({sum:'sum'}),
    ...mapGetters({bigSum:'bigSum'}),
    
    //传数组
    ...mapState(['sum']),
    ...mapGetters(['bigSum']),
}
```

### mapActions,mapMutations

为了简化仅调用action，mutation中方法的回调的写法

简化这种写法：handleClick(){this.$store.dispatch/commit(fucName,params)}

**注意模板绑定回调时要传递参数，引号中的名字为store中的回调，一般用对象法**

```javascript
import {mapGetters,mapActions,mapMutations,mapState} from 'vuex'
methods:{
    //传对象
    ...mapActions({increamentOdd:'increamentOdd',increamentWait:'increamentWait'}),
    ...mapMutations({increament:'INCREAMENT',decreament:'DECREAMENT'})
    
    //传数组		注意页面中回调名字要和引号中相同
    ...mapActions(['increamentOdd','increamentWait']),
    ...mapMutations(['INCREAMENT','DECREAMENT'])
}
```

### 模块化

将store对象分割成模块，每个模块拥有自己的state，mutation，action，getter

借助命名空间读取不同模块的数据

```javascript
//store/moduleC    C.js
export default {
  namespaced: true,		//开启命名空间
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
```

```javascript
//store/index.js
import moduleC from './C'

const moduleA = {
  namespaced: true,		//开启命名空间
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  namespaced: true,		//开启命名空间
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB,
    moduleC,			//外部导入
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

```javascript
//State
this.$store.state.a.dataName
...mapState('a', ['data1','data2','data3'])

//Getter
this.$store.getters['a/bigNum']
...mapState('a', ['data1','data2','data3'])

//Action
this.$store.dispatch('a/add', num)
...mapActions('a', {add:'add'})

//Mutation
this.$store.commit('B/ADD', num)
...mapMutations('B', {add:'ADD'})
```

## Vue Router

路由概念：指key-value的对应关系，前端中指URL地址（路径）和页面内容（component）的对应关系，后端中指地址和不同的数据的关系

vue-router：vue插件，专门用来实现单页Web应用（SPA：只有一个完整页面，导航链接不会刷新页面，只会局部更新，数据需要ajax请求获取）

