# js-rss-renderer

JavaScript 写的 rss 渲染器

## 优势

完全兼容现代浏览器，只依赖一个外部库（fast-xml-parser）

## 技术栈

1. 获取 RSS 用的是 fetch
2. 解析 RSS 用的是 fast-xml-parser

## 使用方法

1. 先引入必要库

```html
<!-- fast-xml-parser必须引入，而且要在本库之前引入(这里从bootcdn引入) -->
<script src="https://cdn.bootcdn.net/ajax/libs/fast-xml-parser/3.19.0/parser.min.js"></script>
<!-- 引入本库(这里从jsdelivr引入) -->
<script src="https://cdn.jsdelivr.net/gh/dz-io/js-rss-renderer/rss-renderer.js"></script>
```

2. 配置 RSS link 标签

```html
<link href="rss.xml" type="application/rss+xml" title="RSS" />
```

> 推荐配置 RSS link 标签以方便专业阅读器,不过你也可以通过参数配置 rss 源位置  
> 如果您正在使用 VS Code 这类专业编辑器，那么您可以通过直接输入 `link:rss` 配置(类似 css 引入方式)

3. 执行渲染

```js
rssRenderer()
  .then((res) => {
    document.querySelector("div#rss").innerHTML = res.html;
  })
  .catch((err) => {
    throw err;
  });
```

> 这个是原生 js(es6)写法，本库依赖 fetch 和 promise，对于不支持的浏览器记得打补丁（polyfill）

## 高级用户

1. 函数执行后返回一个 promise 对象，请正确配置 then 和 catch
2. 返回值(例子中的 res)包含两个部分，`html`为 HTML 代码字符串，`rss`为 json 格式的 RSS 数据
3. 页面上的 RSS 优先
4. `rssRenderer()`支持两个参数，第一个是系统配置参数，第二个是 rss 地址
5. 系统配置参数说明(源码在（rss-renderer.js，2-8 行）)

```js
{
  proxy: "", // 不使用代理
  renderTitle: true, // 渲染页面标题
  renderTop: true, // 渲染页面顶部
}
```

> `proxy`为跨域代理，URL通过变量:u 传入，当请求跨域时需要  
> 页面标题就是浏览器里显示的标题，顶部就是页面顶部的大标题和小标题
