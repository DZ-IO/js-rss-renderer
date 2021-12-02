// rss-renderer.js By 大泽
// 仓库地址
// https://gitee.com/daze456/js-rss-renderer
// https://github.com/dz-io/js-rss-renderer
function rssRenderer(cfgs = {}, link = "") {
  // 默认配置
  const dcfg = {
    proxy: "", // 不使用代理
    renderTitle: true, // 渲染页面标题
    renderTop: true, // 渲染页面顶部
    ...cfgs,
  };
  // 页面上自带的RSS优先
  try {
    link = document.querySelector(
      'link[type="application/rss+xml"][title]'
    ).href;
  } finally {
    // 代理配置
    if (dcfg.proxy) {
      link = dcfg.proxy.replace(":u", link);
    }
    // 返回Promise
    return new Promise((resolve, reject) => {
      // 空连接报错逻辑
      if (!link) {
        reject(new Error("link is empty"));
      }
      // 一切无误开始请求
      fetch(link)
        .then((response) => {
          // HTTP报错逻辑
          if (!response.ok) {
            reject(new Error(response.statusText));
          } else {
            // 主渲染逻辑
            response.text().then((data) => {
              // rss解析，使用fast-xml-parser
              let rss = parser.parse(data).rss.channel;
              // 初始化
              let html = "";
              // 顶端渲染
              if (dcfg.renderTop) {
                html += `<h1>${rss.title}</h1>`;
                html += `<h3>${rss.description}</h3>`;
              }
              // 内容渲染
              // 空RSS报错
              if (!rss.item) {
                reject(new Error("Rss is Empty"));
              }
              try {
                // 多个项目按数组处理
                rss.item.forEach((e) => {
                  html += `<div>${rssRendererSolo(e)}</div>`;
                });
              } catch (error) {
                // 单个项目直接处理
                html += `<div>${rssRendererSolo(rss.item)}</div>`;
              }
              // 标题渲染
              if (dcfg.renderTitle) {
                document.querySelector("head>title").innerText = rss.title;
              }
              // 正常返回
              resolve({ html, rss });
            });
          }
        })
        // 异常抛出
        .catch((err) => {
          reject(err);
        });
    });
  }
}

function rssRendererSolo(e) {
  let div = "";
  div += `<div class="title"><a href="${e.link}">${e.title}</a></div>`;
  div += `${e.description}`;
  return div;
}
