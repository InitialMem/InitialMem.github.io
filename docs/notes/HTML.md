# HTML

------

## 结构 

```html
<!-- 文档类型声明 -->
<!DOCTYPE html>
<!-- 文档显示语言 -->
<html lang="en">
<head>
    <!-- 字符集 -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 页面标题 -->
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

------

## 标签

#### 标题标签

```html
<h1>标题标签</h1>
<h1>标题一共六级选,</h1>
<h2>文字加粗一行显。</h2>
<h3>由大到小依次减，</h3>
<h4>从重到轻随之变。</h4>
<h5>语法规范书写后，</h5>
<h6>具体效果刷新见。</h6>
```

#### 段落标签

```html
<p>段落标签</p>
<!-- 根据浏览器窗口大小自动换行，段落间有空隙 -->
```

#### 换行标签

```html
<br/>
```

#### 文本格式化标签

```html
<strong>加粗</strong><b></b>
<em>斜体</em><i></i>
<del>删除线</del><s></s>
<ins>下划线</ins><u></u>
```

#### div和span标签

```html
<div>占用一行</div>
<span>一行可以放多个</span>
```

#### 图像标签

```html
<img src="url" alt="替换文本" title="提示文本" />
<!-- 
    注意绝对路径和相对路径 
    下一级路径	/		位于 HTML 文件上一级
    上一级路径	../		位于 HTML 文件下一级
-->
```

#### 超链接标签

```html
<a href="跳转url" target="弹出方式">文本或者图像</a>
<!--
    target _self为默认，_blank为新窗口打开
    #空链接
	href="javascript:;"不跳转
-->
```

#### 注释和特殊符号

```html
<!--注释-->
&nbsp;空格
&lt; <
&gt; >
&copy; ©
```

#### 表格

```html
不是用来布局的，而是用来展示数据的

<table>
    <thead>表示表格头部区域
        <tr>行
            <th>自带加粗居中效果的单元格，一般放在第一行</th>
        </tr>
    </thead>
    <tbody>表示表格主体区域
        <tr>
            <td>普通单元格</td>
        </tr>
    </tbody>
</table>

<!--
    单元格的合并
    1.确定跨行or跨列
    2.找到最左上角的目标单元格，写rowspan，colspan
    3.删除多余的单元格
-->
```

#### 列表

```html
<!-- 无序列表,只能包含<li></li>,<li></li>中可以有其他项 -->
<ul>
    <li></li>
</ul>

<!-- 有序列表,只能包含<li></li>,<li></li>中可以有其他项 -->
<ol>
    <li></li>
</ol>

<!-- 自定义列表,dl 里面只能包含 dt 和 dd。 -->
<dl>
    <dt>名词1</dt>
    <dd>名词1解释</dd>
    <dt>名词2</dt>
    <dd>名词2解释</dd>
</dl>
```

#### 表单

```html
表单用于收集用户信息，和用户交互

<!-- 表单域，form 标签会将它范围内的表单元素信息提交给服务器。 -->
<form action="url" method="提交方式" name="表单域名称"> 
    
    <!--
        表单元素，必须在表单域中，通过不同的属性值表示不同的控件
        type		常用属性
        button		定义可点击按钮,结合js使用
        checkbox	复选框
        file		定义输入字段和“浏览”按钮，供文件上传
        hidden		定义隐藏的输入字段
        image		定义图像形式的提交按钮
        password	定义密码字段。字符被掩码。
        radio		定义单选按钮，
        reset		定义重置按钮，清除表单所有数据。
        submit		定义提交按钮。重置按钮会清除表单所有数据。
        text		定义输入字段。用户可输入文本，默认宽度为 20 个字符。
	-->
    <input type="属性值" name="单选框和复选框的name要相同" value="" checked="checked" maxlength="20">
	
	<!--label标签用于内容和表单控件绑定，提升用户体验-->
    <label for="和id对应">文本</label>
    
    <!-- 
        select下拉表单元素 
        1.select 中至少包含一对 option。
        2.在 option 中定义属性selected=selected，当前项即为默认选项。
	-->
    <select>
    	<option>选项1</option>
    	<option>选项2</option>
    	<option>选项3</option>
	</select>

    <!--输入内容较多时使用，文本域表单元素-->
    <textarea row="显示的行数" cols="每行字符数">
        文本内容
    </textarea>
    
</form>

```

## HTML5新特性

新增语义化标签

```html
<header>头部标签</header>
<nav>导航标签</nav>
<article>内容标签</article>
<section>定义文档区域</section>
<asider>侧边栏标签</asider>
<footer>尾部标签</footer>
<vedio>视频标签</vedio>
<audio>音频标签</audio>
```

新增表单元素，表单属性

```html
type="email"
type="url"
type="date"
type="time"
type="month"
type="week"
type="number"
type="tel"
type="search"
type="color"
required	内容
placeholder	提示文本
autofocus	聚焦
```



