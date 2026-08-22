# 编译过程

## 展开#开头的预处理指令

preprocesser

仅编译.cpp文件

生成.obj文件 汇编输出 assembler output

通过linker链接obj 多个cpp文件通过linker关联起来，找不到函数的实现一般就会报linker错误

生成exe文件

# 变量

bool为什么是1个字节

sizeof  返回多少个字节

# 头文件

简单理解就是只包含了函数的定义，将定义和实现分离

#program onece和#ifndef

# 调试

step into f11 进入函数内部

step over f10 执行下一步

step out shift f11 执行完当前所在函数，返回上一个函数

查看内存的操作

跳过函数内多段语句的方法，在对应语句出打断点然后按f5 continue 就会直接执行到下一个断点处

# vs项目设置

中间文件输出路径设置    

- $(SolutionDir)bin\intermediate\$(Platform)\$(Configuration)

生成文件输出路径设置

项目结构解析

# Static关键字

翻译单元

extern

类和结构体中的static

单例模式

# 虚函数和纯虚函数

override

接口

# Const关键字

指针常量和常量指针

- 指向的位置不变
- 指向的变量不变

Const参数和Const函数和mutable变量

- 表示该函数不会改变对象的内容

# mutable关键字

lambda表达式

# 成员初始值列表Member Initializer

用法

为什么

顺序

# New运算符

new和malloc   

- 区别仅仅是new会调用构造函数

delete和free

- 区别同上

new的时候还可以指定地址

# 隐式类型转换和explicit关键字

# 运算符重载

# this指针

# 在堆或者栈上创建对象   new delete

# 三种智能指针

# 对象的复制

深拷贝浅拷贝

- 区别
- 什么时候深拷贝
- 当一个对象内部存在指针类型的成员变量时，在复制该对象的时候，复制的仅仅是指针，意味着这两个对象成员变量中的指针指向同一个地址，在析构时就会释放两次该地址的内存，程序就会崩溃

拷贝构造函数

# 箭头运算符

从智能指针中理解箭头运算符的作用

利用指针运算符获取成员变量在内存中的偏移

- 指针去取地址

# 动态数组

标准库的vector容器

# 静态链接

include 

- 定义

.lib xxx_mt.lib

- 库文件   实现

创建和使用库

- 多项目的解决方案将项目作为静态库
  - 设置编译为静态库
  - 设置头文件包含
  - 设置链接
    - Add reference
  - \#include<>和""

# 动态链接

动态链接所需要的文件

dll

- 一般存放在和exe文件同级目录

xxxdll.lib

# 函数返回多个参数的处理办法

数组[]

容器类

- Vector
- Array
- tuple make_pair
  - std::get<0>(source tuple)
- pair
  - std::get<0>(source tuple)

结构体

# 模板

# 宏

# 静态数组

std::array

# 函数指针

# lambda

# namespace

# 线程

创建线程

- 传一个函数指针或者地址

join

- 等待该线程完成后继续执行后面的代码

让工人一直working直到按下enter键

# 计时器

利用chrono库计算函数执行所需时间

Timer

# std::sort排序

# 类型双关(Type Punning)

# 联合体Union

# 虚析构函数

什么时候用

为什么用

- 防止子类的析构未调用造成内存泄漏

# 类型转换

C语言风格的转换

- (int)x

C++的转换方法

- static_cast
- dynamic_cast
- const_cast
- reinterpret_cast

# 断点的条件判断和操作(Debug)

# 预编译头文件(pch.h)

为什么用

- 因为每次include的头文件都要重新编译成

怎么用

- 设置预编译头文件
  - 默认是stdafx.h
- 项目中启用预编译头文件

将翻译单元中引用最多的不会变的头文件预编译

查看编译时间的方法

- tools-build timing

可能造成依赖库不明确

# 运行速度基准测试

__breakpoint();

测试的代码块可能会被编译器优化

确保在release模式测试

# 结构化绑定(C++17)

处理多返回值

需要设置项目使用C++17标准

对比使用结构体返回的话，可能可以减少一种不必要的结构体类型

# option对象(C++17)

处理存在也可能不存在的数据

value_or

例子：读取文件，文件可能不存在

# variant对象(C++17)

存放多种类型的数据

和union不同，类似结构体，包含了所有可能的类型，sizeof = int +float + string....

例子：读取文件，返回文件内容String 或者是错误代码

get_if

# any对象(C++17)

# 三元运算符 ternary operators