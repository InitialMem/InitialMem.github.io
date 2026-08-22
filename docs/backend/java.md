# Nginx托管网站

## 查找占用的端口号

```bash
netstat -ano | findstr :8080
```

看的是local address 代表PID为xxxx的这个程序正在监听8080端口，当我们要启动springboot服务器时就需要让tomcat去监听这个端口

```bash
tasklist | findstr PID
```

# Maven

## 配置maven环境

local respository本地仓库

mirrors远程仓库

## 在idea中全局配置本地的maven

设置maven路径

设置maven Java版本

## 导入、排除依赖

## 依赖的作用范围

## maven构建项目的生命周期

junit,clean,defalut,site

# HTTP协议

HTTP协议是无状态。一次请求对应一次响应。面对需要登录业务的情况来说，就需要其他技术的协助。

## 请求

请求头

请求行

请求体(Get请求没有请求体)

## 响应

响应行

响应头

响应体

# Tomcat

直接处理和解析HTTP协议非常麻烦，但是HTTP的请求和响应格式是统一的，所以我们可以封装这一系列操作使得程序员不必直接操作协议，让开发更加便捷

spring boot内置了tomcat，tomcat封装了HTTP的一系列操作，我们可以将程序打包好在部署到tomcat容器中进行运行然后客户端直接访问tomcat服务器就好了

# Spring框架

spring框架是一个Java基本框架， spring框架的基础上衍生出了spring boot，spring cloud等一系列框架，可以在这些框架的基础上快速开发你想要的程序，其中spring boot框架就是为Java web应用所开发的

# 接口测试工具

postman

apifox

apipost

# spring boot框架

## 创建springboot项目

1. https://start.spring.io/
2. idea自带的创建方法，其实和第一种相同

### 在vscode中创建

## 获取请求参数

1. 使用原始的httpservletrequest接收参数

2. 接收简单参数

请求参数对应不上的时候使用@requestparam注释

3. 接收pojo对象

pojo对象不用@requestparam

4. 接收数组参数

通过数组

通过集合（通过集合接收需要加上@requestParam）

5. 接收日期参数

使用@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")格式化

6. 接收json参数

一般json参数来自请求体，所以需要加上@requestbody代表将请求体中的json对象绑定到pojo对象中

7. 接收路径参数

使用@PathVariable接收，可以传递多个，通过{}分割每层的路径

## 设置响应参数

### @responsebody

代表将响应的字符串，对象，集合通过json格式封装到响应体中

### 统一响应结果

### 案例

使用dom4j解析xml文件

将xml文件解析为pojo对象响应给前端页面展示

## IOC和DI和Bean

IOC就是让spring框架去管理和实例化你的类，不用自己手动去new对象，相当于交给了IOC容器去管理

运用起来就是通过@Component、@Controller、@Service、@Repository注解去标记这些类的作用，同时将这些类交给IOC容器托管

DI就是当你的类依赖其他类时，spring框架会在程序运行时自动从IOC容器中寻找对应的类(Bean)自动注入，不用自己手动指定

对应的就是@Autowired，代表该类的实例是来自IOC容器的，是自动注入的

这些由IOC容器管理的对象我们就叫做Bean，容器在启动时创建，按需懒加载

### Bean组件扫描

只有被扫描到的类才会变成Bean，默认的扫描范围是启动类所在的包及其子包

### 依赖注入时出现同类型的Bean的情况如何解决

@Primary指定优先级

@Qualifier("Bean的名称")+@Autowired

@Resource(name = "Bean的名称")

#### @Resource和@Autowired的区别

提供方不同，一个是spring一个是jdk

Autowired是依据类型，Resource是依据名称

##### Bean的名称默认是类名但是首字符小写

# MySQL

安装

配置环境变量

初始化

登录

## 数据库操作

## DDL(定义)

### 数据库操作

查看数据库

```mysql
show databases;
```

查看当前选择的数据库

```mysql
select database();
```

创建数据库

```mysql
create database db01;
```

删除数据库

```mysql
drop database db01;
```

使用数据库

```mysql
use db01;
```

### 表操作

#### 创建表

```mysql
create table 表名(
	字段1 字段类型 [约束] [comment 注释]
    字段2 字段类型 [约束] [comment 注释]
    字段3 字段类型 [约束] [comment 注释]
)[comment 注释]
```

##### 约束

限制表字段的数据

| 类型 |      |
| ---- | ---- |
| 非空 |      |
| 唯一 |      |
| 主键 |      |
| 默认 |      |
| 外键 |      |

##### 数据类型

| 类型   |      |
| ------ | ---- |
| 数值   |      |
| 字符串 |      |
| 日期   |      |

查看所有表

```mysql
show tables;
```

查询表结构

```mysql
desc 表名;
```

查询建表语句

```mysql
show create table 表名;
```

#### 修改表

添加字段

```mysql
alter table 表名 add 字段名 类型(长度) [comment 注释] [约束];
```

修改字段类型

```mysql
alter table 表名 modify 字段名 新的数据类型(长度);
```

修改字段名和字段类型

```mysql
alter table 表名 change 旧字段名 新字段名 类型(长度) [comment 注释] [约束];
```

删除字段

```mysql
alter table 表名 drop column 字段名;
```

修改表名

```mysql
rename table 表名 to 新表名;
```

#### 删除表

删除表

```mysql
drop table if exists 表名;
```

## DML(修改)

### 插入数据

```mysql
insert into 表名(字段名1,字段名2,create_time,update_time) 
	   values(值1,值2,now(),now()),(值1,值2,date(),date());
```

字段和数据都可以批量插入，或者指定插入

日期和字符串都需要包含在''中

### 更新数据

```mysql
update 表名 set 字段名1 = 'xxx',字段名2 = 'xxx',update_time = now() [where 条件];
```

### 删除数据

```mysql
delete from 表名 [where 条件];
```

## DQL(查询)

### 基本查询

```mysql
select 字段名 from 表名;
```

通配符

```mysql
select * from 表名;
```

起别名

```mysql
select 字段名1 别名1 字段名2 别名2 from 表名;
```

去重

```mysql
select distinct 字段名 from 表名;
```

### 条件查询

#### where子句

#### 比较运算符

| 符号                | 功能                           |
| ------------------- | ------------------------------ |
| <> 或者 !=          | 不等于                         |
| between ... and ... | 介于最小值和最大值(包含)       |
| in (...)            | 多选一                         |
| like 占位符         | _代表一个字符，%代表任意个字符 |
| is null             | 为空                           |

如果判断null值，需要用 is null 不能用 = null

#### 逻辑运算符

and,or,not

### 聚合函数

将一列数据作为一个整体进行纵向计算

| 函数  | 功能                          |
| ----- | ----------------------------- |
| count | 计算数量（空字段不算）推荐用* |
| max   | 最大值                        |
| min   | 最小值                        |
| avg   | 平均值                        |
| sum   | 求和                          |

```mysql
select 聚合函数(字段列表) from 表名;
```

### 分组查询

```mysql
select 字段名 from 表名 [where 条件] group by 分组字段名 [having 分组后的过滤条件]; 
```

where是对分组前的数据进行过滤的，不满足条件的数据不会参与分组， having是对分组后的数据进行过滤的可以对聚合函数进行过滤。

### 排序查询

对查询结果进行排序，默认是升序asc，可以按顺序多次排序

```mysql
select * from 表名 order by 字段1 desc;
```

### 分页查询

```mysql
select * from 表名 limit 起始索引（第几条开始）,查询记录数(往后多少条)
```

表达式

```mysql
if(表达式,tvalue,fvalue)
```

```mysql
(case 表达式 when value1 then result1[when value2 then value2 ...][else result] end)
```

### 约束

#### 外键

表示该字段的值来自另一张表的字段

```mysql
-- 创建表时指定
[constraint] [约束名称] foreign key(外键字段) references 表名(字段名);
```

**物理外键和逻辑外键**

利用外键设计：一对多，多对多，一对一的关系

| 关系   | 设计                                                         |
| ------ | ------------------------------------------------------------ |
| 一对多 | 在多的表添加外键，关联另一张表的主键                         |
| 一对一 | 单表拆分，例如用户基本信息和用户身份信息，在任意一方加入外键，关联另一方的主键，并且设置为UNIQUE |
| 多对多 | 需要利用第三张表，添加2个主键，分别关联双方主键              |

## 多表查询

**笛卡尔积**

多表查询的数据数量会以笛卡尔积的形式出现，最终结果为两个表的数据乘积，所以我们需要添加条件消除无效的笛卡尔积

### 连接查询

#### 内连接

查询表之间相交的数据集，A∩B

```mysql
-- 显示内连接
select 表1.字段名,表2.字段名 from 表1,表2 where 表1.id = 表2.id;

-- 隐式内连接
select 表1.字段名,表2.字段名 from 表1 [inner] join 表2 on [表1.id = 表2.id];

-- 给表起别名
select e.字段名,d.字段名 from 表1 e,表2 d where e.id = d.id;
```

#### 外连接

分为左外连接和右外连接，查询保留左表/右表全部的数据，同时包含他们相交的部分

```mysql
-- 左外连接 包含表1所有数据和表1和表2相交的数据
select 表1.字段名,表2.字段名 from 表1 left [outer] join 表2 on 表1.id = 表2.id;

-- 右外连接 包含表2所有数据和表2和表1相交的数据
select 表1.字段名,表2.字段名 from 表2 right [outer] join 表1 on 表1.id = 表2.id;
```

## 子查询

就是在查询中嵌套查询

根据子查询返回的结果可以分为标量子查询，列子查询，行子查询，表子查询

**标量子查询**

```mysql
-- 子查询返回的是一个标量，一般作为单个判断条件
select * from 表名1 where 字段名 = (select 字段名 from 表名2 where 条件);
```

**列子查询**

```mysql
-- 子查询返回的是一列数据，一般和in配合
select * from 表名1 where 字段名 in (select 字段名 from 表名2 where 条件)
```

**行子查询**

```mysql
-- 子查询返回的是一行数据但是不限多少列，和标量子查询类似，一般作为多个条件
-- 多个条件需要同时满足时的写法
select * from 表名1 where (字段名1，字段名2) = (select 字段名1，字段名2 from 表名2)
```

**表子查询**

```mysql
-- 返回的是一个表，所以一般是多表查询
select * from 表名1 a,(select * from 表名2) b where 条件;
```



**总结**

写SQL语句时首先需要考虑查询涉及几张表

是否需要连接查询

是否需要消除笛卡尔积



## 事务

事务就是多条SQL语句的集合，这些SQL语句都成功执行的条件下才算完成了这个事务，如果有操作失败我们就需要回滚

一般涉及修改数据的SQL命令我们都会将其封装成一项事务

```mysql
-- 开始执行一项事务
start transaction; / begin;
-- 这项事务对应的一些SQL语句
xxxxx
-- 如果成功则执行commit提交事务命令
commit;
-- 如果有一条失败则执行rollback回滚命令
rollback;
```

## 索引

索引是帮助数据库高速获取数据的数据结构， MySQL的索引的数据结构是B+Tree，查找方式类似二分查找

```mysql
-- 创建索引
create [unique] index 索引名 on 表名(字段名,...);

-- 查看索引
show index from 表名;

-- 删除索引
drop index 索引名 from 表名;
```

# Mybatis

Mybatis是一个持久层的框架用于操作数据库简化传统的JDBC操作

## 配置

为项目添加Mybatis依赖：

1. 在pom.xml文件中，添加Mybatis依赖（有两个）和数据库依赖（connector)

   ```xml
   <!-- https://mvnrepository.com/artifact/com.mysql/mysql-connector-j -->
   <dependency>
       <groupId>com.mysql</groupId>
       <artifactId>mysql-connector-j</artifactId>
       <version>9.4.0</version>
   </dependency>
   
   <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
   <dependency>
       <groupId>org.mybatis</groupId>
       <artifactId>mybatis</artifactId>
       <version>3.5.19</version>
   </dependency>
   
   <dependency>
       <groupId>org.mybatis.spring.boot</groupId>
       <artifactId>mybatis-spring-boot-starter</artifactId>
       <version>3.0.3</version> <!-- 或合适版本 -->
   </dependency>
   ```

2. 在application.properties中配置数据库连接信息

   ```properties
   #数据库配置信息 - 四要素
   #驱动类名称
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   #数据库连接的url
   spring.datasource.url=jdbc:mysql://localhost:3306/db01
   #连接数据库的用户名
   spring.datasource.username=root
   #连接数据库的密码
   spring.datasource.password=123456
   ```

3. 编写Mapper接口，通过@Mapper注释让Spring在运行时自动生成该接口的实现类对象（代理对象），并将对象交由IOC容器管理

   ```java
   @Mapper
   public interface TestUserMapper {
   
   //    查询全部用户信息
       @Select("select * from user")
       public List<TestUser> list();
   }
   ```

### 在idea中添加sql语句提示

右键sql语句选择context actions，继续选择language injection settings，选择对应的sql语句

**注意需要让idea连接上该数据库后才能联想对应表或者字段的信息**

## 数据库连接池

数据库连接池就是一个容器用来管理和分配数据库连接

## 使用lombok简化pojo对象代码，主要是get、set和构造器方法

```xml
<!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
<!-- 不需要指定版本spring boot已经集成，已经管理了版本 -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

```java
@Data
@NoArgsConstructor //无参构造方法 
@AllArgsConstructor //全参构造方法
public class TestUser {
    private Integer id;
    private String name;
    private Integer age;
    private Integer gender;
    private String phone;
}
```

老版本的idea还需要查看lombok插件是否安装（如果出现get/set方法标红的情况）

## mybatis框架基础操作（增删改）

### 删除操作

```java
@Delete("delete from user where id = #{id}")
    public void delete(Integer id);
```

#### 预编译SQL

使用#{}来拼接参数，生成的是预编译的sql语句，执行时会将#{}内的字段替换为实际的值，不会存在sql注入的问题，且使用的是定义好的模板sql，经过优化，性能更好

使用${}，生成的是拼接的sql语句，执行时会直接拼接字段，整条sql需要重新解析，性能差，且会存在sql注入的问题

### 新增操作

参数可以直接写对象，sql语句中的#{}内容为属性名，而非数据库的字段名

```java
@Insert("insert into user(name,age,gender,phone) " +
            "value(#{name},#{age},#{gender},#{phone})")
    public void insert(TestUser testUser);
```

#### 获取新增操作返回的主键值

```java
//    获取返回的主键值，将值赋值给对象的id属性
@Options(useGeneratedKeys = true,keyProperty = "id")
```

### 更新操作

```java
@Update("update user set name = #{name}, age = #{age}, gender = #{gender}, phone = #{phone} where id = #{id}")
    public void update(TestUser testUser);
```

### 查询操作

#### 根据id查询

```java
@Select("select * from user where id = #{id}")
    public TestUser getById(Integer id);
```

#### 返回结果封装到对象

只有属性名和数据库的字段名相同的情况下，mybatis才会将结果封装到对象的属性值中

但是要将数据库中带有下划线的字段也需要封装到属性中时，我们有三种解决方法

1. 在查询语句中给字段起别名
2. 利用@Results注解和@Result注解映射
3. 打开mybatis的映射开关

#### 根据条件查询

```java
// {}会被？代替变成'%?%'就无法插入值了所以只能用${}拼接
@Select("select * from user where name like '%${name}%'")
    public List<TestUser> getByName(String name);
```

#### Mapper接口中的@Param注解

早期的springboot编译的成字节码文件的时候会把形参的变量名忽略，改成var1，var2

所以sql语句拼接的时候会找不到对应的形参名，所以需要在形参前用@Param修饰

```java
@Select("select * from user where name like '%${name}%'")
    public List<TestUser> getByName(@Param("name")String name);
```

#### 使用sql语句中的concat拼接字符串改造条件查询

```java
@Select("select * from user where name like concat('%', #{name}, '%') ")
    public List<TestUser> getByName(String name);
```

### XML映射SQL文件

xml映射文件和使用注解的方式来编写sql，各有优劣，简单语句用注解的方式，复杂语句用xml的方式

配置方法

1. xml文件的包路径和接口的**包路径一致**，文件名和接口**名相同**

2. mapper的namespace属性值为接口的**全限定类名**（类名+包名）

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE mapper
           PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <!--    namespace属性和接口所在的包同名   -->
   <mapper namespace="com.example.mapper.TestUserMapper">
   </mapper>
   ```

3. id字段对应接口的方法名，resultType为**单条记录的映射类型**

   ```xml
   <select id="getByName" resultType="com.example.pojo.TestUser">
       select * from user where name like concat('%', #{name}, '%')
   </select>
   ```

#### mybatisx插件

安装插件后可以快速定位接口方法对应的xml文件中的sql语句

### 动态SQL

根据条件动态生成SQL语句

#### if标签

如果test属性条件成立则拼接此段SQL

在做多条件查询的时候，借助if标签可以实现，不需要提供全部条件的情况下也可以实现查询

#### where标签

用于处理动态生成SQL时where子句存在多余关键字的情况

```xml
<select id="selectByCondition" resultType="com.example.pojo.TestUser">
    select *
    from user
    <where>
        <if test="name != null">
            name = #{name}
        </if>
        <if test="age != null">
            and age = #{age}
        </if>
        <if test="gender != null">
            and gender = #{gender}
        </if>
        <if test="phone != null">
            and phone = #{phone}
        </if>
    </where>
</select>
```

#### set标签

用于处理动态生成SQL时set子句存在多余关键字的情况

```xml
<update id="update2">
    update user
    <set>
        <if test="name != null">
            name = #{name},
        </if>
        <if test=" age != null">
            age = #{age},
        </if>
        <if test=" gender != null">
            gender = #{gender},
        </if>
        <if test="phone != null">
            phone = #{phone}
        </if>
    </set>
    where id = #{id};
</update>
```

#### foreach标签

```xml
<!--    遍历集合生成动态SQL-->
<delete id="deleteByIds">
    delete from user where id in
    <foreach collection="ids" item="id" separator="," open="(" close=")">
        #{id}
    </foreach>
</delete>
```

#### sql和include标签

```xml
<!--    拆分sql语句用于复用 -->
<sql id="commonSelect">
    select id, name, age, gender, phone from user
</sql>

<select id="getByName" resultType="com.example.pojo.TestUser">
    <include refid="commonSelect"/>
    where name like concat('%', #{name}, '%')
</select>
```

# 案例

## rest风格的请求

用url表示资源，http方法动词表示操作

url的参数要包含完成该操作的所有信息

### Spring中的Rest风格接口匹配方式

使用@GetMapping、@PostMapping....

## 使用@Slf4j注解自动生成logger对象记录日志

```java
@Slf4j
@RestController
public class DeptController {
```

## 提取接口的共有前缀路径

在controller类定义前加上@RequestMapping

```java
@Slf4j
@RestController
@RequestMapping("/depts")
public class DeptController {
```

## PageHelper分页插件

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.6</version>
</dependency>
```

## 文件上传

前端页面需要的三要素

### 表单项选择 file

提交方式选择 post

enctype选择 multipart/form-data

### 后端接收

类型选择MultipartFile

### 存储方式

#### 本地存储

#### OSS云存储

利用阿里云的oss服务存储图片数据，再将图片的url存入本地的数据库，利用url访问图片

### 利用@Value注解从配置文件注入参数

### yml/yaml格式的配置文件

### 利用@ConfigurationProperties将配置属性注入到Bean对象上

# 登录功能

核心功能是让服务端知道你是谁，以便于提供特定功能和存储个性化数据

## 会话技术

会话技术就是用来识别同一用户多次请求，并且能让服务端记住你技术

常见的实现会话技术的方式有cookie，session和token

### Cookie

cookie是由服务端响应时添加到响应头中的，客户端接收到响应后会将响应头中的cookie保存下来，在下次请求的时候自动添加到请求头中

优点是这是http协议中支持的技术

缺点是客户端可以禁用cookie功能就会失效，移动端APP无法使用该技术，不安全客户端可以篡改， cookie不能跨域

### Session

session其实也是基于cookie的，

1.客户端第一次请求服务端时，服务端会生成一个新的session对象

2.在session对象中保存键值对，记录用户信息

3.通过响应头返回cookie，在cookie中保存sessionid

4.客户端下次请求时请求头会自动带上cookie，这样通过cookie中的session id就能从会话表中找到用户信息

5.除非退出登录或者服务端删除或者session过期失效，才会被当作未登录

缺点除了cookie的缺点外，还不支持负载均衡也就是如果有多个服务端那么服务端间无法同步用户状态



### Token令牌技术

#### JWT令牌

JWT令牌本质就是字符串包含三个部分：

头部（加密算法、类型、base64编码）

负载（json格式、base64编码、不加密）

签名（依据头部和负载生成的二进制摘要，再base64编码生成字符串）

保存位置为localStorage、sessionStorage 或 HttpOnly Cookie

##### 运行步骤

1. 编写JWT工具类用于生成JWT令牌和解析JWT令牌
2. 在用户第一次登录后调用JWT工具类生成令牌，并在令牌中写入需要的负载，并返回给前端
3. 用户请求时从请求头中获取token并校验

# 过滤器Filter

一个请求通常会经过两次过滤器，请求前一次请求后也会走一遍过滤器

使用方式

1. 定义Filter类，实现Filter接口

2. 实现init，dofilter，destroy方法

3. 配置拦截的url

   ```java
   @WebFilter("/*")
   public class DemoFilter implements Filter {
   ```

4. dofilter中一定要有放行操作

   ```java
   @Override
   public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
       filterChain.doFilter(servletRequest, servletResponse);
   }
   ```

5. 因为filter是JavaWeb三大组件spring中并不包含所以需要让spring应用在启动时扫描filter类型的组件才能注入成功（或者使用spring提供的注册方式）

   ```java
   @ServletComponentScan
   @SpringBootApplication
   public class PracticeApplication {
   ```

多个过滤器按照过滤器类名的字母排序来顺序执行

## 利用过滤器实现登录校验

1. 根据请求的URL判断是否需要放行，如果请求的是登录页面就直接放行
2. 如果请求未携带token，那么跳转到登录页面
3. 如果携带token，那么验证token，如果解析失败跳转到登录页面
4. 如果token解析成功则放行

由于不是RestController，我们需要

1. 手动将Java对象序列化成JSON格式的字符串。ps:序列化就是把内存中的对象转化成可存储可传输的格式的过程
2. 再手动添加到响应体中，

这里利用了阿里巴巴的fastjson库

# 拦截器Interceptor

拦截器的配置方法

拦截器之前会先经过过滤器拦截器是spring提供的只有在进入到spring服务后才会走拦截器

过滤器适合做全局的、与 Spring MVC 无关的处理（如日志、跨域、XSS 过滤）

拦截器适合做针对 Controller 的处理（如权限校验、统计接口耗时、处理特定业务逻辑）

# 全局异常处理器

如果没有异常处理，异常会一级一级向上抛最终到controller层，再由全局异常处理器处理

```java
@RestControllerAdvice
public class GlocalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public Result exceptionHandler(Exception e) throws Exception {
        e.printStackTrace();
        return Result.error("请求异常，请联系管理员");
    }
}
```

# 事务管理

事务就是一系列事情的组合只有这些事情全部完成事务才算完成

对应到spring中就是service层中的服务可能涉及多个操作如果其中一个失败就会影响数据的一致性，比如解散部门操作，部门解散后还需要移除该部门下的所有员工信息

在类上、方法上、接口上可以添加@Transactional注释，将该方法标记为一个事务，交由spring管理，一般加载业务层需要增删改查的方法上

## rollbackFor属性

一般的只有事务执行中抛出RuntimeException时才会执行回滚操作，如果需要在抛出其他异常时，也执行回滚操作时就需要rollbackfor属性

```java
@Transactional(rollbackFor = Exception.class)
void delete(Integer id);
```

## propagation属性

如果在执行的事务中还包括其他事务时，利用propagation属性可以将其中的事务标记为新事务或者加入到当前的事务中

例如无论是成功还是失败，删除部门这个事务都需要执行记录日志的事务，此时如果删除失败，那么所有操作都会回滚，也就无法执行记录日志操作，所以需要将记录日志这个事务单独标记为另一项事务

# AOP

面向方法编程，例如在原始方法开始前执行操作，针对特定方法执行，底层是根据动态代理实现

实例：方法计时器

## 核心概念

### 连接点

对于@Around类型的通知，获取连接点的信息只能使用ProceedingJoinPoint

其他四种用JoinPoint

### 切入点

哪些方法会执行通知

#### 切入点表达式

利用@Pointcut抽取切入点表达式

##### @execution()

根据方法的全类名来匹配

##### @annotation()

根据有特定注解的方法来匹配

### 通知

就是一个具体的方法

#### 通知类型

@Around、@Before.....利用注释标注该通知方法在目标方法的XX时执行

#### 通知的执行顺序

利用@Order(数字)，在切面类上加上来表示顺序，默认按类名字母

### 切面

### 目标对象

## 案例

利用AOP实现将增删改查的操作日志记录到数据库表中

准备：引入AOP依赖，准备好对应的数据库表结构，并引入相应的实体类

编码：编写切面类，利用自定义注释切入，完成记录操作日志的逻辑

# 配置属性的方式和优先级

## 类型

配置文件：properties，yml，yaml

java系统属性   -Dserver.port=9000

命令行参数  --server.port=10010

打包成jar包后，通过 java 系统属性 jar 命令行参数

优先级是 命令行参数>系统属性>properties>yml
