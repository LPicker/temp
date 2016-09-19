# ECMAScript 6 简介

### 背景介绍

由于最近新项目需要一些 ` ECMAScript 6 ` 的新特性，所以用了一周学习了 ` ECMAScript 6 ` 的基本特性，现做一个学习总结。
本文内容适合对JavaScript有一定功底，最好了解 ` ECMAScript 5 `，但不了解 ` ECMAScript 6 ` 的同行。
文字功底欠佳，希望读者谅解并欢迎提出批评意见，先行谢过。

### ECMAScript 6 简介

` ECMAScript 6 ` 于2015年正式发布，所以又称为 “`ECMAScript 2015`”。

```
注：` ECMAScript 6 `大家都叫她` es6 `，本文下面也简称` es6 `。
```

以 js 的数据类型来看，可以这么几种分类：

- [新增的let和const变量声明](#letconst)
- [变量的解构赋值](#destructuring)
- [字符串的扩展](#string)
- [正则的扩展](#regex)
- [数值的扩展](#number)
- [数组的扩展](#array)
- [函数的扩展](#function)
- [对象的扩展](#object)
- [Symbol](#symbol)
- [Proxy和Reflect](#proxy)
- [二进制数组](#arraybuffer)
- [Set和Map数据结构](#set-map)
- [Iterator和for...of循环](#iterator)
- [Generator函数](#generator)
- [Promise对象](#promise)
- [异步操作和Async函数](#async)
- [Class](#class)
- [Decorator](#decorator)
- [Module](#module)

### 新增的let和const变量声明

#### let

我们知道，`es6`之前，js中没有块级作用域的说法，往往稍不注意就可能造成全局变量污染，从而引发不可预知的问题。

例如：
```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = i;
}
console.log(i);
```
变量 `i` 在for循环之外依然可以访问。

在支持 `es6` 语法的环境中，用 `let` 替换 for 循环中的 `var` 即可。
```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = i;
}
console.log(i);		// Uncaught ReferenceError: i is not defined
```

#### const

`const` 声明代表该变量是个常量，一旦声明，在其整个生命周期内不可改变，如果尝试赋值会抛出异常：
```
Uncaught TypeError: Assignment to constant variable.
```
#### 说明：
`let`和`const`这两个新的变量声明完善了js中变量声明的方式，需要说明的是：
`let`和`const`跟`var`有一个重要的区别，它们两个不存在`var`的变量声明提升，同时不允许在相同的作用域内，重复声明同一个变量。

```javascript
function () {
  let a = 10;
  var a = 1;
}
// Uncaught SyntaxError: Identifier 'a' has already been declared

function () {
  let a = 10;
  let a = 1;
}
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

### destructuring 变量的解构赋值
#### 基本用法

我们之前这样初始化变量
```javascript
var a = 1;
var b = 2;
var c = 3;
```
在`es6`环境中，可以这样
```javascript
var [a, b, c] = [1, 2, 3];
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

如果解构（或者说对应不成功），则变量的值为`undefined`。

```javascript
var [x] = [];
var [x, y] = [1];
```
#### 默认值
解构赋值可以指定默认值
```javascipt
var [foo = true] = [];
```

### 字符串的扩展
### 正则的扩展
### 数值的扩展
### 数组的扩展
### 函数的扩展
### 对象的扩展
### Symbol
### Proxy和Reflect
### 二进制数组
### Set和Map数据结构
### Iterator和for...of循环
### Generator函数
### Promise对象
### 异步操作和Async函数
### Class
### Decorator
### Module







《ECMAScript 6入门》是一本开源的JavaScript语言教程，全面介绍 ` ECMAScript 6 ` 新引入的语法特性。

[![cover](images/cover_thumbnail.jpg)](images/cover-2nd.jpg)

本书覆盖 ES6/ES7 与 ES5 的所有不同之处，对涉及的语法知识给予详细介绍，并给出大量简洁易懂的示例代码。

本书为中级难度，适合已经掌握 ES5 的读者，用来了解这门语言的最新发展；也可当作参考手册，查寻新增的语法点。

全书已由电子工业出版社出版，目前是第二版，书名为《ES6 标准入门》。纸版是基于网站内容排版印刷的。

感谢张春雨编辑支持我将全书开源的做法。如果您认可这本书，建议购买纸版。这样可以使出版社不因出版开源书籍而亏钱，进而鼓励更多的作者开源自己的书籍。

- [京东](http://item.jd.com/11849235.html)
- [当当](http://product.dangdang.com/23840431.html)
- [亚马逊](http://www.amazon.cn/ES6-%E6%A0%87%E5%87%86%E5%85%A5%E9%97%A8-%E9%98%AE%E4%B8%80%E5%B3%B0/dp/B01A18WWAG/)
- [China-pub](http://product.china-pub.com/4904712)

### 版权许可

本书采用“保持署名—非商用”创意共享4.0许可证。

只要保持原作者署名和非商用，您可以自由地阅读、分享、修改本书。

详细的法律条文请参见[创意共享](http://creativecommons.org/licenses/by-nc/4.0/)网站。
