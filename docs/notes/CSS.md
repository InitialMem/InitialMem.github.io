# CSS

------

## 结构

CSS语句由两个部分组成：选择器和一条或者多条声明

1.选择器

根据需求把相应的标签选出来

2.声明

根据声明改变标签的样式

------

## 选择器

#### 标签选择器

```html
<!-- 按标签选择 -->
div {
    color: red;
}

<div>
    标签选择器
</div>
```

#### 类选择器

```html
<!-- 按类选择标签 -->
.nav {
    color: red;
}

<div class="nav">
    类选择器
</div>
```

#### id选择器

```html
<!-- 
    选择标有指定id的标签 
    id选择器只能被一个标签调用
-->

#nav {
	color: red;
}

<div id="nav">
    id选择器
</div>
```

#### 通配符选择器

```html
<!-- 选择所有标签 -->
* {
	margin: 0;
	padding: 0;
}
```

#### 属性选择器

```html
<!--
    E[att]		选择具有att属性的E元素
    E[att:val	选择具有att属性且属性值等于val的E元素 
    E[att^=val]	匹配具有att属性且值以val开头的E元素
    E[att$=val]	匹配具有att属性且值以val结尾的E元素
    E[att*=val]	匹配具有att属性且值中含有val的E元素
-->
input[type=text]{
	color: red;
}

<input type="text">
```

#### 结构伪类选择器

```html
<!--
	根据网页结构选择，E元素里的第几个
	E:first-child
	E:last-child
	E:nth-child(n)(第n个子元素，同时还要是E类型)
	
	E:first-of-type(第一个E类型的元素)
	E:nth-of-type(n)(第n个E类型的元素)

	n可以是数字或者关键字：even/odd
	n可以是公式：n从0开始计算
	例子:n+5,-n+5
-->

ul li:first-child{
	color: red;
}

ol li:nth-of-type(1){
	color: blue;
}
```

#### 伪元素选择器

```html
<!--
	在选择的元素内部的前面或者后面创建一个HTML标签，并为这个标签指定样式
	默认创建为行内元素，双冒号
-->
div::before{
	content=''
}
div::after{
	content=''
}

<!--
	伪元素字体图标，遮罩层，清除浮动
-->
```



------

## 属性

#### 字体属性

```html
body {
	font: font-style font-weight font-size/line-height font-family;
	<!--
        font-size	字号		 单位是 px
        font-family	字体		 按照团队约定来写
        font-weight	字体粗细	400=normal，700=bold
        font-style	字体样式	italic，normal，常用 normal
        属性连写，顺序不能变，字体和字号属性必须有 
	-->
}
```

#### 文本属性

```html
body {
	<!--
		color			文本颜色	通常十六进制缩写
		text-align		文本对齐	对图像也适用，常用图像居中
		text-indent		文本缩进	2em，2个字符大小;
		text-decoration	文本装饰	underline，none，line-through，overline
		line-height				   行高=文字大小+上下间距，行高和盒子高度相等时实现垂直居中
	-->
	<!-- 
		/* 文字阴影 offset-x | offset-y | blur-radius | color */
		text-shadow: 1px 1px 2px black;
	-->
}
```

#### 背景属性

```html
<!-- 定义了元素的背景样式 -->
body {
	background-color: red;
	background-image: transparent url repeat attachment position;
	<!-- 背景图片一般用作logo小图标或者大背景，方便定位 -->
}
```

#### 列表属性

```html
ul li {
	list-style: none; <!-- 去除列表项前的特殊符号 -->
}
```

#### 边框属性

```html
table {
	border-collapse: collapse;<!-- 决定表格的边框是分开的还是合并的 -->
	border-radius: 30px<!-- 用圆和边框的交集形成圆角效果 -->
}

.box1 {		<!-- CSS三角形 -->
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-left-color: black;
	<!-- 兼容性 -->
	line-height: 0;
	font-size: 0;
}
```

#### 盒子属性

```html
div {
	box-shadow: h-shadow v-shadow blur spread color inset;<!-- 盒子阴影 -->
}
```

#### 鼠标样式

```html
div {
	cursor: default / pointer / move / text / not-allowed;
}
```

#### 表单属性

```
input {
	outline: none; <!-- 表单轮廓 -->
}

textarea {
	outline: none;
	resize: none; <!-- 文本域缩放 -->
}
```

#### 垂直对齐属性

```html
img {
<!-- 图片底侧会有一个空白缝隙，原因是行内块元素默认和文字的基线对齐。 -->
	vertical-align: middle;
}
```

#### 渐变属性

```html
div {
	background: linear-gradient(direction, color1, color2);
}
```

#### 过渡属性

```html
div {
    width: 200px;
    height: 100px;
    background-color: pink;
    /* transition: width .5s, height .5s; */
    transition: all .5s;
}
div:hover {
    width: 400px;
    height: 200px;
    background-color: skyblue;
}
```

#### Transform

```html
<!-- 移动 -->
transform: translate(x, y);		<!-- x和y为百分比时，移动盒子自身的宽度或高度 -->
<!-- 盒子水平垂直居中 -->
div {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

<!-- 旋转 -->
transform: rotate(45deg);	

<!-- 缩放 -->
transform: scale(x, y);

<!-- 变换枢轴 -->
transform-origin: x y;
<!-- 
	x y 默认转换的中心点是元素的中心点（50% 50%）
	还可以给 x y 设置像素或者方位名词（top bottom left right center）
-->

<!-- 综合写法 -->
transform: translate(), rotate() scale()
```

#### Animation

```css
/* 1.定义动画 */
@keyframes move {
            0%{
                transform: translateX(0px);
            }
            100%{
                transform: translateX(100px);
            }
        }
/* 2.动画调用 */
div {
    width: 100px;
    height: 100px;
    background-color: red;
    animation: move 1s linear;
}

/*  常用属性
    keyframes					规定动画。
    animation					所有动画属性的简写属性,除了animation-play-state属性。
    animation-name				规定@keyframes动画的名称。(必须的)
    animation-duration			规定动画完成一个周期所花费的秒或毫秒，默认是0。（必须的)
    animation-timing-function	规定动画的速度曲线，默认是“ease” .
    animation-delay				规定动画何时开始，默认是0.
    animation-iteration-count	规定动画被播放的次数，默认是1，还有infinite
    animation-direction			规定动画是否在下一周期逆向播放，默认是 "normal",alternate逆播放
    animation-play-state		规定动画是否正在运行或暂停。默认是"running",还有"paused".
    animation-fill-mode			规定动画结束后状态,保持forwards回到起始backwards
*/

/*  简写
	animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画起始或者结束的状态;
	animation: myfirst 5s linear 2s infinite alternate;

    简写属性里面不包含 animation-play-state
    暂停动画: animation-play-state: puased;
    经常和鼠标经过等其他配合使用想要动画走回来，而不是直接跳回来: animation-direction: alternate
    盒子动画结束后，停在结束位置:  animation-fill-mode: forwards
*/
```

#### 3D属性

```css
/* 1.父级必须设置perspective属性 */
body {
    perspective: 100px;		/* 眼睛到屏幕的距离 */
    transform-style: preserve-3d;	/* 父级里有多个子物体时需要设置保持开启3D */
}

div {
    margin: 100px auto;
    width: 100px;
    height: 100px;
    background-color: red;
    
    transform: translateZ(100px);	/* 物体距离屏幕的距离，数值越大离眼睛越近 */
}

ul {
    /* 3D变换 */
    transform: translate3d(), rotate3d(), scale3d();
}
```



## 引用方式

#### 内部样式表

将 CSS 代码写在 HTML 页面内部，单独放在一个 `<style>` 标签中。

- `<style>` 理论上可以放在 HTML 文档中任何一个地方，一般放在 `<head>` 标签中。
- 方便控制整个页面中的元素样式。

#### 行内样式表

```html
<div style="color: red; font-size: 12px">行内样式表</div>
```

#### 外部样式表

```html
<link rel="stylesheet" href="css文件路径" />
```

------

## Emmet语法

提高Html、CSS编写速度，简写

```html
1.标签名/属性名+tab		 
2.多个标签			 div*3
3.父子级关系			ul>li
4.并列关系			 div+p
5.标签带类名			div.demo（类名)
6.标签带id			 div#demo（id名)
7.标签带内容			div{内容}
8.自增			  div.demo$*5
```

## 复合选择器

由基础选择器构成

#### 后代选择器

```html
<!-- 选择父元素里面所有的子元素 -->
div p {
	
}
```

#### 子代选择器

```html
<!-- 选择最近一级的子元素，选亲儿子 -->
div > p {

}
```

#### 并集选择器

```html
<!-- 选择多组标签 -->
div，p {

}
```

#### 伪类选择器

对于不同的标签，标签可能有多种状态，选择不同状态下的标签就需要伪类选择器来选择。

```html
<!--
	链接伪类选择器
	链接标签有不同的状态
	1.确保样式生效，要按照 LVHA 的顺序声明：link,visited,hover, active
	2.a链接在浏览器中有默认样式，所以实际开发都需要给链接单独指定样式
-->
a:link {

}
a:visited {

}
a:hover {

}
a:active {

}

<!-- 
	focus伪类选择器
	input标签有不同的状态
-->
input:focus {

}
```

---

## 元素显示模式

#### 块元素

常见的块元素有 `h1-h6`、`p`、`div`、`ul`、`ol`、`li`等。 

块级元素的特点：

1. 独占一行。
2. 高度、宽度、外边距以及内边距都可以控制。
3. 宽度默认是容器（父级宽度）的 100%。
4. 是一个容器及盒子，里面可以方行内或块级元素。

​	文字类的标签内不能放块级元素。

​	文字类元素有 `p`，`h1-h6`，尤其不能放 `div` 元素。

#### 行内元素

常见行内元素：`a`、`span`，行内元素也叫内联元素。

行内元素的特点：

1. 一行可以显示多个，之间存在空白缝隙。
2. 高、宽、外边距以及内边距设置是无效的。
3. 默认宽度就是它本身内容宽度。
4. 行内元素只能容纳文本或其他行内元素。

​		a 链接里面不能放链接

​		特殊情况链接 a 里面可以放块级元素，但是给 a 转换一下块级模式最安全。

#### 行内块元素

在行内元素中有几个特殊标签——`img`, `input`、`td`，它们同时具有块元素和行内元素的特点。

有些资料称为行内块元素。

行内块元素的特点：

1. 一行可以显示多个，之间存在空白缝隙。（行元素特点）
2. 默认宽度是本身内容宽度。（行元素特点）
3. 高度、行高、外边距、内边距都可以控制。（块级元素特点）

#### 显示模式转化

```html
a {
	/* block, inline, inline-block */
	display: block;
}
```

---



## CSS三大特性

#### 层叠性

相同选择器设置相同的样式，此时一个样式就会覆盖另一个冲突的样式。层叠性主要解决样式冲突的问题。

层叠性原则：

- 样式冲突：遵循的原则是就近原则，哪个样式离结构近，就执行哪个样式
- 样式不冲突，不会层叠

#### 继承性

CSS 中子标签会继承父标签的某些样式，如文本颜色和字号。

- 恰当使用继承可以简化代码，降低 CSS 的复杂性

- 子元素可以继承父元素的样式（text-, font-, line-这些元素开头的可以继承，以及 color 属性）

- 行高的继承

  ```html
  body {
    font: 12px/1.5 Microsoft Yahei;
  }
  <!-- 
      如果子元素没有设置行高，则会继承父元素的行高为 1.5，此时子元素的行高是：当前子元素的文字大小*1.5
      行高可以跟单位也可以不跟，不带单位的写法，子元素可以根据文字大小自动调整行高
  -->
  ```

#### 优先性

当多个选择器选择同一元素时会有一定的优先级产生

选择器相同（选择器名字相同），就近原则

名字不同时，比较复合选择器的权重值

| 基础选择器                       | 对应的权重 |
| -------------------------------- | ---------- |
| 继承或者`*`                      | `0,0,0,0`  |
| 元素选择器，伪元素选择器         | `0,0,0,1`  |
| 类选择器，伪类选择器，属性选择器 | `0,0,1,0`  |
| ID 选择器                        | `0,1,0,0`  |
| 行内样式 `style=""`              | `1,0,0,0`  |
| `!important`                     | ∞ 无穷大   |

继承的权重为 0，即使加了 important 权重也还是 0。

a 链接，浏览器默认指定了一个样式，蓝色，下划线，不会继承父级样式

权重可以叠加，需要计算权重，但是没有进位。

---

## 盒子模型

CSS 盒子模型本质上是一个盒子，封装周围的 HTML 元素，包括：边框、外边距、内边距和实际内容。

![](https://s3.ax1x.com/2021/01/29/yilgJO.gif)

盒子=标签+外边距+边框+内边距+内容区

```html
<div
     margin: 10;
     border: 5px solid black;
     padding: 10px;>
</div>
```

#### 盒子的实际大小

内外边距和边框也会影响盒子的大小，因为是盒子的组成部分。

box-sizing解决方案：

​	box-sizing: border-box/content-box;

​	width和height说的是内容区的大小，box-sizing指的是将border和padding也加入到内容区的大小计算中

​	padding和border不会影响盒子大小，前提是两者不超出width

#### 外边距合并

1. 相邻元素垂直外边距的合并：若上面的元素有下外边距，下面的元素有上外边距，则他们之间的垂直间距不是 `margin-bottotm` 与 `margin-top` 之和。取两个值中的较大者这种现象被称为相邻元素垂直外边距的合并。

2. 嵌套块元素垂直外边距的塌陷：

   对于两个嵌套关系的块元素，父元素有上外边距同时子元素也有上外边距，此时父元素会塌陷较大的外边距值。

   解决方案：

   1. 为父元素定义上边框
   2. 为父元素定义上内边距
   3. 为父元素添加 `overflow:hidden`

## 布局方式

#### 标准流

按照标签的默认显示模式排列，块级元素占一行，行内元素遇到父元素边缘自动换行

1. 块级元素会独占一行，从上到下顺序排列 常用元素：div、hr、p、h1-h6、ul、ol、dl、form、table
2. 行内元素会按照顺序，从左到右顺序排列，碰到父元素边缘则自动换行。 常用元素：span、a、i、em

#### 浮动

为元素创建浮动框，使元素浮动到父级边缘或者另一个浮动框边缘

1. 浮动元素自动转化为行内块元素，一行可以有多个
2. 浮动元素不再占有原来的位置，脱离标准流
3. 浮动的盒子只会影响浮动盒子后面的标准流，不会影响前面的标准流。

##### 清除浮动的影响

父级元素一般不设置高度，让子元素撑开父级，但是子元素浮动后又不占有位置，所以需要清除浮动的影响，避免对下面的盒子产生影响

1. 额外标签法

   ```html
   .clear {
   	clear: both;
   }
   
   <div>
       <div style="float=left;">
           浮动元素
       </div>
       <div class="clear"></div><!-- 额外标签 -->
   </div>
   ```

2. 可以给父级添加 `overflow` 属性，将其属性设置为 `hidden`、`auto`或`scroll`，注意，无法显示溢出部分

3. ::after伪元素法（也算是额外标签法）

   ```html
   .clearfix::after {
     content: "";
     display: block;
     height: 0;
     clear: both;
     visibility: hidden;
   }
   .clearfix {
     /*IE6、7专有*/
     *zoom: 1;
   }
   ```

4. 双伪元素法

   ```html
   .clearfix::before,
   .clearfix::after {
     content: "";
     display: table;
   }
   .clearfix::after {
     clear: both;
   }
   .clearfix {
     *zoom: 1;
   }
   ```

#### 定位

让盒子在某个盒子内移动位置或者固定在屏幕中的某个位置，并且可以压住其他盒子

定位=定位模式+边偏移

##### 定位模式

```html
div {
	position: 定位模式
}
```

**静态定位 static**

默认模式，无定位，按照标准摆放位置

**相对定位 relative**

移动的参照点是自己原来的位置

移动后保留原来标准流的位置，后面的盒子仍然以标准流的方式对待他

**绝对定位 absolute**

移动的参照点是父级的定位模式，如果上级都没有定位模式，则以浏览器为准定位。如果上级有定位模式，则以最近一级的元素为参考点移动位置

移动后不再占有原来的位置

**固定定位 fixed**

固定元素在浏览器的可视区范围内，以浏览器的可视窗口为参照点移动元素。

和父元素无关

脱离标准流，不占有位置

**粘性定位 sticky**

相对定位和固定定位的结合，以浏览器的可视窗口为参照点移动元素。

占有原先的位置

兼容性较差，IE不支持

##### 定位的叠放次序

```html
div {
	z-index: 1;
}
```

定位的盒子才有的属性，没有单位，数值越大越靠上。

##### 定位的扩展

1. 绝对定位的盒子居中，定位的盒子不能通过margin居中。

2. 脱标的盒子不会触发外边距塌陷
3. 绝对定位和固定定位的盒子会完全压住下面的盒子的内容

## 元素的显示和隐藏

类似网站广告，当我们点击关闭就不见了，但是我们重新刷新页面会重新出现，本质就是元素的显示和隐藏。

1. display属性，none就是隐藏，隐藏后不占有位置，block就是显示
2. visibility属性，visible和hidden控制，隐藏后继续占有位置
3. overflow属性，对溢出的内容显示和隐藏，visible默认，hidden隐藏超过的部分，scroll显示滚动条，auto自动。

## CSS高级

#### CSS精灵图Sprites

网页中图片过多时，可以把小图片拼合成一张背景图片，结合background-position来显示以提高页面的加载速度。

#### 字体图标

使用精灵图技术还是有不足，比如图片较大，缩放会失真，修改麻烦。

对应解决方法就是使用字体图标，字体图标本身属于字体，所以体积较小且只需加载字体即可，遇到简单的小图标使用字体图标即可。

**IconMoon字体图标的使用**

1. 选择字体并下载

2. 将下载文件中的 fonts 文件夹复制到项目根目录下

3. 字体声明，将 `style.css` 文件中的开头的字体声明代码赋值到 html 中

4. 给span声明字体：

   ```css
span {
     font-family: "icomoon";
   }
   ```

5. 打开 `demo.html`，复制页面中的方框图标到 html 代码中即可。

更新/添加字体图标

上传 `selections.json`，添加字体图标，重新生成。下载，更换 `@font-face` 内容。

#### 溢出文字省略号显示

```html
<!-- 1.先强制一行内显示文本，默认normal，自动换行 -->
white-space: nowrap;
<!-- 2.超出的部分隐藏 -->
overflow: hidden;
<!-- 3.文字用省略号替代超出的部分 -->
text-overflow: ellipsis;
```

