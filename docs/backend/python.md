# python

## 查看已安装的python版本

1. cmd

```bash
py -0p

py -3.11 -m pip install requests
```

2. 使用uv切换版本

```
uv python install 3.10
```

## 数据类型

```python
"""字符串格式化输出 """

name = "Alice"
age = 30

# 使用 +号
print(name + " , " + str(object=age))

# 使用占位符拼接
print("%s , %d" % (name, age))

# 使用format拼接
print(f"{name} , {age}")

# 转义字符
print("Hello\nWorld")

# NoneType类型，如果不知道是什么可以先写None
print(type(None))
def func():
    return None
```

## 循环

```python
"""循环"""

# 使用for遍历range指定的范围
for i in range(1, 10):
    for j in range(1, i + 1):
        print(f"{j} * {i} = {i * j}", end = "\t")
    print("\n")

# 使用for遍历字符串
str = "hello world"
for char in str:
    print(char)

# 字符串加密程序
text = input("请输入要加密的文本：")
secret = ''
for char in text:
    unicode = ord(char)
    secret += chr(unicode + 1)

print(f"加密后的文本为:{secret}")

# 字符串解密程序
secret_text = input("请输入要解密的文本：")
text = ''
for char in secret_text:
    unicode = ord(char)
    text += chr(unicode - 1)

print(f"解密后的文本为:{text}")
```

## 函数

```python
"""函数的位置参数和关键字参数"""

# a和b是位置参数，调用函数时必须按照定义的顺序传入参数值。
def func(a, b):
    print(f"a: {a}, b: {b}")

func(1, 2)

# a和b是关键字参数，调用函数时可以按照任意顺序传入参数值，但必须使用参数名进行指定。
def func2(a, b):
    print(f"a: {a}, b: {b}")

func2(b = 2, a = 1)

# 限制传参的方式 /的前面只能用位置参数，*的后面只能用关键字参数, /和*之间的参数既可以用位置参数也可以用关键字参数。
def func3(a, /, b, *, c):
    print(f"a: {a}, b: {b}, c: {c}")

func3(1, 2, c = 3)

# 函数参数的默认值, 没有默认值的参数必须在有默认值的参数前面定义。
def func4(a , b = 2):
    print(f"a: {a}, b: {b}")

func4(1)

# 可变位置参数，提供的参数会被收集到一个元组中，函数内部可以通过遍历这个元组来访问这些参数。
def func5(*args):
    print(f"args: {args}")

func5(1, 2, 3)

# 可变关键字参数，提供的参数会被收集到一个字典中，函数内部可以通过访问这个字典来获取这些参数的值。
def func6(**kwargs):
    print(f"kwargs: {kwargs}")

func6(name = "Alice", age = 30)

# 可变位置参数和可变关键字参数可以同时使用，但必须按照顺序定义：先定义可变位置参数，再定义可变关键字参数。
def func7(*args, **kwargs):
    print(f"args: {args}, kwargs: {kwargs}")

func7(1, 2, name = "Alice", age = 30)
```

## 递归

```python
"""递归"""

def print_numbers(n):
    """打印从0-n的数字

    Args:
        n (int): 打印截至的数字
    """
    if n > 0:
        print(n)
        print_numbers(n - 1)

print_numbers(5)

def factorial(n):
    """计算阶乘

    Args:
        n (int): 需要计算的阶乘

    Returns:
        int: n的阶乘
    """
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

print(factorial(5))

def fibonacci(n):
    """计算斐波那契数列的第n项

    Args:
        n (int): 要计算的项数

    Returns:
        int: 斐波那契数列的第n项
    """
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(5))
```

## 作用域

```python
"""作用域"""

# global关键字

x = 5  # 全局变量
def func():
    # 这里的global关键字用于声明x是一个全局变量，这样在函数内部对x的修改会影响到全局变量x的值。
    global x
    x = 10
func()

print(x)
```

## 列表

```python
"""列表是一个有序的集合，可以包含任意类型的元素"""

list1 = [1, 2, 3, 'a', 'b', 'c']

# 新增元素
list1.append(4) # 在列表末尾添加一个元素
list1.insert(0, 0) # 在列表的指定位置插入一个元素
list1.extend([5, 6]) # 在列表末尾一次性添加多个元素

# 删除元素
list1.pop(0) # 删除列表中指定位置的元素，并返回该元素的值
list1.remove(6) # 从列表中删除第一个匹配的元素
list1.clear() # 删除列表中的所有元素
del list1[0] # 删除列表中指定位置的元素

# 修改元素
list1[0] = 10 # 修改列表中指定位置的元素

# 查询元素
print(list1[0]) # 通过索引访问列表中的元素

# 列表中的方法
list1.index(0) # 返回列表中第一个匹配的元素的索引
list1.count('0') # 返回列表中指定元素的数量
list1.reverse() # 将列表中的元素反转
list1.sort() # 将列表中的元素排序
```

## 元组

```python
"""元组，不可变的有序集合，使用小括号定义"""

tuple1 = (1, 2, 3, 4, 5)
```

## 序列

```python
"""序列，可以是列表、元组等有序集合"""

# 序列的切片操作
list1 = [1, 2, 3, 4, 5]
print(list1[0:3:2]) # 切片，返回列表中从索引0到索引3（不包括3）之间的元素，步长为2
```

## 集合

```python
"""集合，是无序且不重复的元素集合，使用大括号定义"""

set1 = {1, 2, 3, 4, 5}
frozen_set1 = frozenset({1, 2, 3, 4, 5}) # 冻结集合，不可变的集合
```

## 字典

```python
"""字典，是无序的键值对集合，使用大括号定义"""

dict1 = {'name': 'Alice', 'age': 30, 'city': 'New York'}
```

## 类

```python
"""类，是面向对象编程的基本单位，使用class关键字定义"""

from dataclasses import dataclass
from datetime import datetime

class Person:

    planet = "Earth" # 类属性，属于类的属性，所有对象共享同一个类属性

    # 初始化方法，创建对象时会自动调用
    def __init__(self, name, age):
        # 实例属性，属于对象的属性，每个对象都有自己的实例属性
        self.name = name
        self.age = age

    # 实例方法，属于对象的方法，可以通过对象调用
    def say_hello(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")

    # 类方法，属于类的方法，可以通过类名调用，也可以通过对象调用，但必须使用@classmethod装饰器进行修饰。
    @classmethod
    def change_planet(cls, new_planet):
        cls.planet = new_planet

    # 工厂方法，属于类的方法，可以通过类名调用，也可以通过对象调用，但必须使用@classmethod装饰器进行修饰。
    @classmethod
    def create(cls, info_str):
        name, year = info_str.split("-")
        age = datetime.now().year - int(year)
        return cls(name, age)

    # 静态方法，通常用于定义与类相关但不依赖于类或实例的函数，可以通过类名调用，也可以通过对象调用，但必须使用@staticmethod装饰器进行修饰。
    # 例如工具方法，验证方法等。
    @staticmethod
    def is_adult(age):
        return age >= 18

# 类的继承，子类可以继承父类的属性和方法，并且可以添加自己的属性和方法。
class Student(Person):

    # 使用可变位置参数和可变关键字参数来继承父类的属性和方法
    def __init__(self, student_id, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.student_id = student_id # 学生特有的属性


# 使用@dataclass装饰器来简化类的定义，自动生成__init__方法和其他常用方法，如__repr__、__eq__等。
@dataclass 
class Teacher(Person):
    subject: str # 教师特有的属性


# 创建Person类的实例对象
person1 = Person("Alice", 30)
# 查看person1的属性和方法
print(person1.__dict__)
# 查看Person类的属性和方法
print(Person.__dict__)

print(person1.planet)
print(Person.planet)

# 给person1对象添加一个新的实例属性maxage，这个属性只属于person1对象，其他对象无法访问。
person1.maxAge = 120 # type: ignore
print(person1.maxAge) # type: ignore
```

## 权限控制

```python
"""类中的权限控制"""

class Person:

    def __init__(self, name, age, ssn):
        self.name = name # 公有属性，外部可以直接访问
        self._age = age # 受保护属性，外部可以访问，但不建议直接访问，通常用于子类访问
        self.__ssn = ssn # 私有属性，外部无法直接访问，通常用于类内部使用

    # 注册ssn的getter方法，用于获取私有属性__ssn的值
    @property
    def ssn(self):
        return self.__ssn

    # 注册ssn的setter方法，用于设置私有属性__ssn的值
    @ssn.setter
    def ssn(self, value):
        self.__ssn = value
```

## 魔法方法

```python
"""魔法方法，也称为特殊方法，是以双下划线开头和结尾的方法，用于实现类的特殊行为和操作。"""

class Person:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    # 在类中定义__str__方法，可以自定义对象的字符串表示，当使用print函数打印对象时会调用该方法。
    def __str__(self):
        return f"Person(name={self.name}, age={self.age})"


p1 = Person("Alice", 30)
print(dir(p1)) # 查看p1对象的属性和方法
```

## 抽象类

```python
"""抽象类"""

from abc import ABC, abstractmethod

# 抽象类是一种不能被实例化的类，它只能被继承。抽象类通常用来定义接口，子类必须实现这些接口才能被实例化。

class MustRun(ABC):

    @abstractmethod
    def run(self):
        pass

class Person(MustRun):

    def __init__(self, name):
        self.name = name

    def run(self):
        print(f"{self.name} is running.")
```

## 可变对象和不可变对象

```python
"""可变对象和不可变对象"""

# 可变对象：列表、字典、集合等，可以修改对象的内容。
list1 = [1, 2, 3]
list1[0] = 10 # 修改列表中的元素，不会修改list1的内存地址
print(list1) # 输出：[10, 2, 3]


# 不可变对象：整数、浮点数、字符串、元组等，不能修改对象的内容。
a = 1
b = a # b指向a的内存地址
print(id(a))
print(id(b)) # a和b指向同一个内存地址

a += 1 # 修改a的值，会创建一个新的整数对象，并将a指向新的内存地址
print(id(a)) 
print(id(b)) # a和b指向不同的内存地址
```

## 函数对象

```python
"""函数本身也是一个对象，函数对象可以赋值给变量，也可以作为参数传递给另一个函数，还可以作为另一个函数的返回值。"""

# 1.函数也是对象，可以赋值给变量
def greet(msg):
    print(msg)

print_msg = greet # 将函数对象赋值给变量
print_msg("Hello, World!") # 输出：Hello, World!

# 2.函数可以像对象一样添加属性
greet.version = "1.0" # type:ignore
print(greet.version) # type: ignore

# 3.函数中的不可变参数
def change_value(value):
    value += 1 

value1 = 1
change_value(value1)  # 修改不可变对象，会创建一个新的对象
print(value1) # 还是输出：1

# 4.函数中的可变参数
def change_list(lst):
    lst.append(4) # 修改可变对象，会修改原来的对象

list1 = [1, 2, 3]
change_list(list1) # 修改可变对象，会修改原来的对象
print(list1) # 输出：[1, 2, 3, 4]

# 5.函数作为参数传递
def run_func(func, param):
    func(param)

def print_msg(msg):
    print(msg)

run_func(print_msg, "Hello, World!") # 输出：Hello, World!

# 6.函数作为返回值
def return_func():
    def inner_func():
        print("这是一个内部函数d")
    return inner_func

return_func()() # 输出：这是一个内部函数d
```

## 函数参数的打包和解包

```python
"""函数参数的打包和解包"""

# 打包接收参数
def show_params(*args, **kwargs):
    print("args:", args)
    print("kwargs:", kwargs)

# 解包传递参数
list1 = [1, 2, 3]
dict1 = {"name": "Alice", "age": 30}

show_params(*list1, **dict1)
```

## 匿名函数

```python
"""匿名函数"""

# 只能写一行代码
# 冒号右边只能写一个表达式

lambda x: x + 1

lambda x, y: x + y

isadult = lambda age: "adult" if age >= 18 else "child"
```

## 数据处理函数

```python
"""数据处理函数"""

"map函数：对可迭代对象中的每个元素执行指定的函数，并返回一个新的可迭代对象。"

nums = [1, 2, 3]
# map函数的返回值是一个迭代器对象，可以使用list()函数将其转换为列表。
doubled = map(lambda x: x * 2, nums)
print(list(doubled))

"filter函数：对可迭代对象中的每个元素执行指定的函数，并返回一个新的可迭代对象，其中包含所有使函数返回True的元素。"
nums = [1, 2, 3, 4, 5]
# filter函数的返回值也是一个迭代器对象，可以使用list()函数将其转换为列表。
odds = filter(lambda x: x % 2 != 0, nums)
print(list(odds))

"sorted函数：对可迭代对象中的元素进行排序，并返回一个新的列表。"
# 按照数字从小到大排序一个数字列表，可以使用sorted函数。
nums = [3, 1, 4, 2]
sorted_nums = sorted(nums)
print(sorted_nums)

# 按照字符串长度从长到短排序一个字符串列表，可以使用sorted函数和lambda表达式作为key参数。
strs = ["banana", "apple", "cherry"]
sorted_strs = sorted(strs, key=len, reverse=True)
print(sorted_strs)

# 按照年龄从大到小排序一个包含字典的列表，可以使用sorted函数和lambda表达式作为key参数。
persons = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]
sorted_persons = sorted(persons, key=lambda x: x["age"], reverse=True)
print(sorted_persons)

"reduce函数：对可迭代对象中的元素进行累积操作，并返回一个单一的值。 需要导入functools模块。"
from functools import reduce

nums = [1, 2, 3, 4]
sum = reduce(lambda x, y: x + y, nums, 0) # 0是初始值
print(sum) # 输出：10

strs = ["Hello", " ", "World", "!"]
result = reduce(lambda x, y: f"{x}{y}", strs)
print(result) # 输出：Hello World!
```

## 列表推导式

```python
"""列表推导式"""

nums = [1, 2, 3, 4, 5]
doubled_nums = [num * 2 for num in nums]
print(doubled_nums)  # 输出: [2, 4, 6, 8, 10]

# 带条件的列表推导式
doubled_odd_nums = [num * 2 for num in nums if num % 2 != 0]
print(doubled_odd_nums)  # 输出: [2, 6, 10]

# 字典推导式
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 90, 95]
name_score_dict = {names[i]: scores[i] for i in range(len(names))}

# 集合推导式
names = ['Alice', 'Bob', 'Charlie', 'Alice']
result = {f"{name}!" for name in names}

# 没有元组推导式，但可以使用生成器表达式来创建一个生成器对象：
```

## 深拷贝和浅拷贝

```python
"""
深拷贝和浅拷贝的区别就是复制的时候遇到可变对象深拷贝会递归复制一份，不可变对象直接复制引用，而浅拷贝无论可变对象还是不可变对象都直接复制引用。
"""

import copy

a = [1, 2, [3, 4]]

b = a
c = copy.copy(a)  # 浅拷贝
d = copy.deepcopy(a)  # 深拷贝

print("a:", a)  # 输出: [1, 2, [3, 4]]
print("b:", b)  # 输出: [1, 2, [3, 4]]
print("c:", c)  # 输出: [1, 2, [3, 4]]
print("d:", d)  # 输出: [1, 2, [3, 4]]
```

## 闭包

```python
"""
    闭包
    闭包是由函数创建出来的函数
    它可以记住创建时外部作用域中的变量，即使外部函数已经返回了，闭包仍然可以访问这些变量
    它只会记住它需要的变量，而不是整个外部函数的作用域
    闭包的作用：
    1. 可以用来创建工厂函数，生成特定功能的函数
    2. 可以用来实现装饰器，增强函数的功能
    3. 可以用来实现数据封装，隐藏内部细节
    4. 可以用来实现迭代器，生成器等高级功能
"""



def outer():
    a = 1
    def inner():
        nonlocal a  # 声明a为nonlocal，表示在内层函数中使用外层函数的变量
        a += 1
        print(a)
        return a
    return inner

# 工厂函数
def add_by(x):
    def add(y):
        return x + y
    return add

closure_add_5 = add_by(5)
closure_add_10 = add_by(10)
```

## 装饰器

```python
"""装饰器"""

def log(func):
    def wrapper(*args, **kwargs):
        print(f"call function {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

def hello_world():
    print("Hello, World!")

# 自动装饰
@log 
def say_hello():
    print("Hello!")

# 手动装饰
hello_world = log(hello_world)
hello_world()

# 带参数的函数装饰器
def log_with_args(prefix):
    def wrapper(func):
        def inner(*args, **kwargs):
            print(f"call {prefix} function {func.__name__}")
            return func(*args, **kwargs)
        return inner
    return wrapper

# 多个装饰器一起使用
def decorator_one(func):
    def wrapper(*args, **kwargs):
        print("generated by decorator one")
        return func(*args, **kwargs)
    return wrapper

def decorator_two(func):
    def wrapper(*args, **kwargs):
        print("generated by decorator two")
        return func(*args, **kwargs)
    return wrapper

# 顺序不同，输出结果不同
@decorator_one
@decorator_two
def say_hi():
    print("Hi!")

say_hi()
```

## 类装饰器

```python
"""包含__call__方法的类就是类装饰器"""

class log:

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            print(f"call function {func.__name__}")
            return func(*args, **kwargs)
        return wrapper

# 自动装饰
@log()
def hello_world():
    print("Hello, World!")

# 手动装饰
hello_world = log()(hello_world)
hello_world()

# 带参数的类装饰器
class log_with_args:

    def __init__(self, prefix):
        self.prefix = prefix

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            print(f"call {self.prefix} function {func.__name__}")
            return func(*args, **kwargs)
        return wrapper
```

## 类型注释

```python
"""类型注解"""

# 给函数或者变量加上类型约束

num: int = 10
list1: list = [1, 2]
tuple1: tuple = (1, 2)
set1: set = {1, 2}
dict1: dict = {"a": 1, "b": 2}


def add(x: int, y: int) -> int:
    return x + y
```

## 异常处理

```python
"""代码中逻辑可能出错，导致程序崩溃，异常处理可以捕获错误，继续执行程序"""

try:
    print(1 / 0)  # 这里会抛出ZeroDivisionError异常
    raise ValueError("This is a custom error")  # 这里会抛出ValueError异常
except ZeroDivisionError as e:
    print(f"Caught an exception: {e}")
except ValueError as e:
    print(f"Caught an exception: {e}")
else:
    print("No exceptions occurred.")    
finally:
    print("This block will always execute.")
```

## 模块

```python
import module1

import module1 as m1

from . import module1

"通过 __all__ 来控制from 模块 import *能导入哪些内容"
from module1 import *
```

## 包

```python
"""包就是一个包含了模块和__init__文件的文件夹"""

from package import pay

pay.pay()
```

## 迭代器

```python
"""可迭代对象和迭代器"""

# 能被for循环遍历的对象就是可迭代对象,可迭代对象都有__iter__方法
nums = [1, 2, 3]

# __iter__方法返回一个迭代器
iter1 = nums.__iter__()

# 迭代器拥有__next()__方法，每次调用都会根据当前状态返回下一个元素
print(iter1.__next__())
print(iter1.__next__())
print(iter1.__next__())
# 如果所有元素都取出后再调用会抛出异常
try:
    print(iter1.__next__())
except(StopIteration):
    print("没有其他元素可以迭代了")

# iter() 如果一个对象时可迭代对象，那么iter(obj)就返回一个迭代器
iter2 = iter(nums)

# __next__()等价于next(iter)
print(next(iter2))
print(next(iter2))
print(next(iter2))

# 迭代器的__iter__()返回迭代器自身，目的是为了让for循环也能遍历迭代器
iter3 = iter(nums)

for item in iter3:
    print(item)

# 迭代器的应用
# 让for循环可以遍历person实例对象

# 实现方式1
class Person:
    def __init__(self, name, age) -> None:
        self.name = name 
        self.age = age

    def __iter__(self):
        return PersonIterator(self)

class PersonIterator:
    def __init__(self, person) -> None:
        # 将要迭代的对象保存下来
        self.person = person
        # 设置迭代器的初始化状态，指针的位置
        self.index = 0
        # 配置要遍历的内容
        self.attrs = [person.name, person.age]

    def __iter__(self):
        return self

    def __next__(self):
        # 如果指针的位置超出范围就抛出异常
        if self.index >= len(self.attrs):
            raise StopIteration
        value = self.attrs[self.index]
        self.index += 1
        return value

# p1 = Person("Alice", 18)
# for prop in p1:
#     print(prop)


# 实现方式2
class Person2:

    def __init__(self, name, age) -> None:
        self.name = name
        self.age = age

        self.__index = 0
        self.__attrs = [name, age]

    def __iter__(self):
        self.__index = 0
        return self

    def __next__(self):
        if self.__index >= len(self.__attrs):
            raise StopIteration
        value = self.__attrs
        self.__index += 1
        return value

# 下面的p2既是可迭代对象又是迭代器，每次迭代的都是同一个对象
# p2 = Person2("Alice", 18)
# for prop in p2:
#     print(prop)

# 斐波那契数列
class Fibo:
    def __init__(self, total) -> None:
        self.total = total
        self.index = 0
        self.pre = 1
        self.cur = 1

    def __iter__(self):
        return self

    def __next__(self):
        if self.index >= self.total:
            raise StopIteration
        if self.index < 2:
            value = 1
        else:
            value = self.pre + self.cur
            self.pre = self.cur
            self.cur = value

        self.index += 1
        return value

# f1 = Fibo(10)
# for item in f1:
#     print(item)

def fibo(total):
    if total <= 0:
        return []
    if total <= 1:
        return [1]
    nums = [1, 1]
    for i in range(2, total):
        nums.append(nums[-2] + nums[-1])
    return nums

import tracemalloc

# 看内存占用
tracemalloc.start()
f1 = Fibo(10000)
m1 = tracemalloc.get_traced_memory()[1]
print(m1 / 1024 / 1024)

tracemalloc.start()
f2 = fibo(10000)
m2 = tracemalloc.get_traced_memory()[1]
print(m2 / 1024 / 1024)
```

## 生成器

```python
"""生成器"""

"1.生成器函数"
"2.生成器对象"

# def f1():
#     print("f1 function start:")
#     yield
#     print("f1 function end")

# g1 = f1()
# print(g1)
# g1.__next__()
# g1.__next__()

"yield也可以写在循环里"

def create_car(total):
    for index in range(1, total + 1):
        yield f'我是第{index}台车'

cars = create_car(10)
c1 = next(cars)
print(c1)
c2 = next(cars)
print(c2)
```

## 文件

```python
"""文件的分类"""

"纯文本文件，需要遵循某种字符编码，进行编码和解码，最终以二进制文件存储"

"二进制文件，按照某种文件格式规范把内容转化为二进制进行存储，需要特定软件解析"

"python中操作文件的标准流程"

"1.创建文件对象"

"2.操纵文件（写入或者读取）"
# file：文件的路径
# mode：文件打开模式
# encoding：字符编码

"3.关闭文件"

# ---------------------------- 操作文件的标准流程（Start） ----------------------------
# region

# 如果直接点击vscode右上角的运行，默认是在工作区根目录执行，而不是在当前文件执行
# 所以他会去找工作区目录下的文件，所以找不到a.txt
# 使用以下代码查看当前的工作区根目录
import os
print(os.getcwd())

# 使用绝对路径读取文件
from pathlib import Path
file_path = Path(__file__).parent / "a.txt"
print(file_path)
# 使用不会被转义的正斜杠
# file_path = "e:/Code/learn-python/案例/a.txt"
# 使用双反斜杠转义
# file_path = "e:\\Code\\learn-python\\案例\\a.txt"

file = open(file_path, "rt", encoding="utf-8")
result = file.read()
print(result)

file.close()

# endregion
# ---------------------------- 操作文件的标准流程（End）   ----------------------------

# ---------------------------- read方法的参数注意事项（Start） ----------------------------
# region
# 使用的文本模式来读取的话，read参数表示的是字符数，所以读取2个汉字
file2 = open(file_path, "rt", encoding="utf-8")
result2 = file2.read(2)
print(result2)

file2.close()

# 使用二进制来读取的话，read参数表示的是字节数，一个汉字在utf-8编码下通常为3个字节,所以读取2个字节
file3 = open(file_path, "rb")
result3 = file3.read(3)
print(result3)

file3.close()
# endregion
# ---------------------------- read方法的参数注意事项（End）   ----------------------------

# ---------------------------- readline方法（Start） ----------------------------
#region

file = open("案例/a.txt", "rt", encoding="utf-8")
"readline的参数和read一样，文本模式为读取当前行的字符，二进制模式为读取当前行的字节"
result = file.readline()
result = file.readline()
print(result)
file.close()

#endregion
# ---------------------------- readline方法（End）   ----------------------------

# ---------------------------- for循环可以直接遍历文件对象（Start） ----------------------------
#region

# 逐行遍历
file = open("案例/a.txt", "rt", encoding="utf-8")
for line in file:
    print(line, end="")
file.close()

#endregion
# ---------------------------- for循环可以直接遍历文件对象（End）   ----------------------------

# ---------------------------- readlines按行读取完，返回一个列表（Start） ----------------------------
# region

file = open("案例/a.txt", "rt", encoding="utf-8")
result = file.readlines()
print(result)
file.close()

# endregion
# ---------------------------- readlines按行读取完，返回一个列表（End）   ----------------------------

# ---------------------------- 使用with，结合for循环，按行读取文件（Start） ----------------------------
#region

"实现自动关闭文件资源"
with open("案例/a.txt", "rt", encoding="utf-8") as file:
    for line in file:
        print(line, end="")

#endregion
# ---------------------------- 使用with，结合for循环，按行读取文件（End）   ----------------------------
```

## with关键字

```python
"""with关键字，用于管理程序中需要成对出现的操作"""
"让编码者只关心具体要做的事，进入和离开的事情由python自动处理"

class Person:

    def __init__(self, name) -> None:
        self.name = name

    def speak(self):
        pass

    def __enter__(self):
        print("进入时执行的代码")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("-----我是离开的逻辑-----")
        # exc_type  : 异常类型
        # exc_val   : 异常对象
        # exc_tb    : 异常追踪信息
        if exc_type:
            print(f"异常类型：{exc_type}")
            print(f"异常对象：{exc_val}")
            print(f"异常追踪信息：{exc_tb}")
        return True

# 1.计算 with 后面的表达式，得到一个『上下文管理器』。
# 2.调用『上下文管理器』的 __enter__() 方法，并将其返回值赋给 as 后面的变量。
# 3.执行 with 所管理的代码。
# 4.无论代 with 中的代码，是正常结束，还是发生异常，都会自动调用『上下文管理器』的 __exit__ 方法。
with Person("alice") as p1:
    p1.speak()
open("", "")
```

## 写入文件

```python
"""写入文件"""

# ---------------------------- 写入模式（Start） ----------------------------
# region

# w模式，写入前会清空文件内容
# x模式，排它性创建，如果文件存在就会创建失败，抛出异常
# a模式，再文件末尾增加内容
with open("案例/a.txt", "wt", encoding="utf-8") as file1:
    file1.write("hello world")

# endregion
# ---------------------------- 写入模式（End）   ----------------------------

# ---------------------------- flush方法（Start） ----------------------------
#region

with open("案例/a.txt", "at", encoding="utf-8") as file2:
    file2.write("hello")
    file2.write("hello")
    # 把缓冲区的内容立即写入文件
    file2.flush()
    file2.write("hello")

#endregion
# ---------------------------- flush方法（End）   ----------------------------

# ---------------------------- 组合模式（Start） ----------------------------
# region

with open("案例/a.txt", "rt+", encoding="utf-8") as file3:
    # seek(offset, whence)方法：用于改变文件对象指针的位置，参数说明如下：
    #   offset：偏移量，要移动多少距离
    #   whence：参考点，从哪里开始计算偏移，有三种取值：
    #       0：从文件开头计算（默认值）
    #       1：从当前位置计算
    #       2：从文件末尾计算
    #  注意：在文本模式下，不要随意去定位中文字符位置，否则可能破坏文件编码。
    #  utf-8编码下中文字符占3个字节，offset是按字节来的
    file3.seek(0, 2)
    file3.write("你好")

# endregion
# ---------------------------- 组合模式（End）   ----------------------------
```

## 目录操作

```python
"""目录操作"""

import os
import shutil

# 1️⃣os.mkdir(path)：创建“单级”目录（如果目录已经存在，则会抛出异常）
os.mkdir("D:/demo")

# 2️⃣os.makedirs(path)：创建“多级”目录（如果路径中的所有目录都已经存在，则会抛出异常）
os.makedirs("D:/demo/aa/bb")

# 3️⃣os.rmdir(path)：删除空目录（如果目录不存在，或目录非空，都会抛出异常）
os.rmdir("D:/demo/aa/bb")

# 4️⃣os.removedirs(path)：递归删除空目录，在成功删除末尾一级目录后，会“向上”尝试把父级目录也删除
# （直到父目录不是空目录）
os.removedirs("D:/demo/aa/bb")

# 5️⃣os.path.exists(path)：判断路径是否存在（文件/目录都算）
result = os.path.exists("D:/demo/aa/bb")
print(result)

# 6️⃣os.path.isdir(path)：用于判断路径，具体规则如下：
#   1.路径不存在 ==================> 返回 False
#   2.路径存在，但指向的是文件 =====> 返回 False
#   3.路径存在，并且是目录 =======> 返回 True
result = os.path.isdir("D:/demo/aa/bb")
print(result)

# 7️⃣os.path.isfile(path)：判断是否为文件
result = os.path.isfile("D:/demo/aa/bb")
print(result)

# 8️⃣os.scandir(path)：扫描指定目录
result = os.scandir("D:/demo")
for item in result:
    print("目录" if item.is_dir() else "文件", item.name)

# 9️⃣os.walk(path)：按层级，递归地遍历指定目录下，所有的子目录和文件
result = os.walk("D:/demo")
for item in result:
    print(item)

# ⚠️危险操作：删除有内容的目录
# shutil.rmtree("D:/demo")
```

## 使用process创建进程

```python
"""Process"""
from multiprocessing import Process
import time
import os

def speak():
    for index in range(10):
        print(f"hello, I'm {os.getpid()}, my parent is {os.getppid()}")
        time.sleep(1)

def study():
    for index in range(10):
        print(f"studying, I'm {os.getpid()}, my parent is {os.getppid()}")
        time.sleep(1)

# 在启动新的进程的时候，会找到传递的函数的定义所在的模块，执行该模块，所以，如果不加__name__ == 'main' 那么就会出现无限递归的情况
if __name__ == '__main__':
    print("这是主进程的第一行")

    # 🔸group： 默认值为None（应当始终为None）。
    # 🔸target：子进程要执行的可调用对象，默认值为 None。
    # 🔸name： 进程名称，默认为 None ，如果设置为 None，Python 会自动分配名字。
    # 🔸args： 给 target 传的位置参数（元组）
    # 🔸kwargs：给 target 传的关键字参数（字典）。
    # 🔸daemon：标记进程是否为守护进程，取值为布尔值（默认为 None，表示从创建方继承）。

    # 只是在申请资源，还未真正创建该进程
    p1 = Process(target=speak)
    p2 = Process(target=study)

    # 不一定先执行p1
    p1.start()
    p2.start()
    # 这是异步的，在主进程中直接执行
    print("这是主进程的最后一行")
```

## 进程锁

```python
"""进程锁，给多个进程同一个锁，只有获得锁的进程才能执行之后的代码"""

from multiprocessing import Process, Lock, RLock
import time

def echo_num(lock):
    for i in range(10):
        # 上锁：尝试获取锁，如果获取到，则执行后面的代码，如果别人拿着，就阻塞等待
        lock.acquire()
        print(0,end='')
        print(1, end="")
        print(2, end="")
        print(3,end='')
        print(4)
        # 释放锁：
        lock.release()
        time.sleep(1)

def echo_num2(lock):
    for i in range(8):
        # 进入时自动上锁，离开后自动释放锁，如果发生异常也能释放锁，避免卡死
        with lock:
            print(5,end='')
            print(6,end='')
            print(7,end='')
            print(8,end='')
            print(9,end='')
            print(10)
        time.sleep(1)

if __name__ == '__main__':
    # lock不会记录上锁的次数，如果重复上锁就会造成死锁，不会判断是否为同一线程，进程会卡死，互斥锁，性能较快
    lock = Lock()
    # rlock会记录上锁的次数，几次加锁就需要几次解锁操作，适用于进程内有嵌套加锁的情况，可重入锁，性能较lock慢一点
    rlock = RLock()

    p1 = Process(target=echo_num, args=(lock,))
    p2 = Process(target=echo_num2, args=(lock,))

    p1.start()
    p2.start()
```

## join方法

```python
"""join方法让调用它的进程等待，等待结束后再继续执行后面的代码"""
from multiprocessing import Process
import time

def speak():
    for index in range(5):
        print(index+1)
        time.sleep(1)

if __name__ == '__main__':

    print("主进程开始")

    p1 = Process(target=speak)

    p1.start()

    # 等待p1执行3s后，再继续执行后面的代码
    p1.join(3)

    print("主进程结束")
```

## terminate

```python
"""terminate方法用于终止进程，终止后finally代码块也不会执行"""

import os
import time
from multiprocessing import Process


def speak():
    try:
        for index in range(10):
            print(
                f"我在说话{index}, 进程pid是:{os.getpid()}, 我的父进程是:{os.getppid()}"
            )
            time.sleep(1)
    # 注意：使用 terminate 终止进程，不会引起 finally 执行！
    finally:
        print("我是finally里的逻辑")


def study():
    for index in range(15):
        print(f"我在学习{index}, 进程pid是:{os.getpid()}, 我的父进程是:{os.getppid()}")
        time.sleep(1)


if __name__ == "__main__":
    print("我是主进程中的【第一行】打印")
    p1 = Process(target=speak)
    p2 = Process(target=study)
    p1.start()
    p2.start()

    time.sleep(3)
    print("我是主进程，我准备强制终止p1进程........")
    # 向操作系统申请强制终止p1进程
    p1.terminate()
    # 等操作系统彻底终止掉了p1进程
    p1.join()
    # 看一下p1进程是否“活着”
    print(p1.is_alive())

    print("我是主进程中的【最后一行】打印")
```

## 守护进程Daemon

```python
"""守护进程就是依附于主进程的子进程，主进程终止，守护进程也会跟着终止"""

import os
import time
from multiprocessing import Process

def monitor():
    # 守护进程中不能再继续创建子进程
    while True:
        try:
            with open("案例/log.txt", "r", encoding='utf-8') as file:
                lines = sum(1 for _ in file)
        except FileNotFoundError:
            lines = 0

        print(f'我是守护进程，监控到log文件共有{lines}行')
        time.sleep(1)

def testProcess():
    for index in range(8):
        print(f"测试进程运行中:pid={os.getpid()}")
        time.sleep(1)


if __name__ == '__main__':
    print(f'主进程开始执行')

    # "设置p1为主进程的守护进程，必须在start之前设置"
    p1 = Process(target=monitor, daemon=True)
    p2 = Process(target=testProcess)    

    p1.start()
    p2.start()

    with open("案例/log.txt", "at", encoding="utf-8") as file:
        for index in range(5):
            file.write(f"测试行{index+1}\n")
            file.flush()
            time.sleep(1)

    print(f'主进程结束')
```

## 进程之间不共享变量

```python
"""进程之间不共享变量"""

from multiprocessing import Process
import time
import os

var1 = 10
var2 = [1, 2, 3]

def testp1():
    global var1, var2
    var1 += 1 
    var2.append(4)
    print(f"我是进程{os.getpid()}，{var1}, {var2}")

def testp2():
    global var1, var2
    var1 -= 1 
    var2.remove(3)
    print(f"我是进程{os.getpid()}，{var1}, {var2}")

def testp3(var1, var2):
    var1 += 1
    var2.append(4)
    print(f"我是进程{os.getpid()}, {var1}, {var2}")

def testp4(var1, var2):
    var1 -= 1
    var2.remove(3)
    print(f"我是进程{os.getpid()}, {var1}, {var2}")

if __name__ == '__main__':

    print("主进程开始")

    p1 = Process(target=testp1)
    p2 = Process(target=testp2)

    p1.start()
    p2.start()

    p3 = Process(target=testp3, args=(var1, var2))
    p4 = Process(target=testp4, args=(var1, var2))

    p3.start()
    p4.start()

    print("主进程结束")
```
