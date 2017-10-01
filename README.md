# 传统多页应用webpack配置

### [构建过程](https://segmentfault.com/a/1190000011193690)

### 推荐目录结构
      build
      config
      src
       |———— views
       |       |———— index
       |       |       |————— index.html
       |       |       |————— index.css
       |       |       |————— index.js
       |       |
       |       |———— index2
       |               |————— index.html
       |               |————— index.css
       |               |————— index.js
       |———— static      // 存放静态资源
       |———— lib         // 存放第三方库

### 解释
*  为什么要使用这种目录结构？
>  因为`entry`, `HtmlWebpackPlugin`的配置都比较麻烦，需要自己手动配置。但是如果固定了`index.html`, `index.js`,`index.css`这些文件名，将会比较方便使用代码自动生成这些配置。

>  再者，个人觉得这种模块化的目录结构更利于项目的管理，并且更加清晰

>  如果你还是想要更改这些文件的名字，那每次添加新的页面你都必须在webpack中去配置一遍，想想都觉得烦，是吧？所以还是不推荐更改这些文件的名字

>  如果你按不作更改的话，那么你可以使用我提供的[懒人指令](#cli)
      
### 一些说明
1.  这个配置来源于`vue-cli`， 对其进行一些更改，令其能够适用于传统多页项目
2.  默认在生产的时候关闭`sourceMap`
3.  生产时开启了`gzip`
4.  已自带`dev-server`，以及代理转发功能
5.  已集成`babel`，放心使用`es6`语法
6.  `build/pages.json`为页面的配置文件， 其中`root`为页面的目录，默认为`src`，你可以自行更改为自己的。`paegs`的话无需更改(除了删除)。后面会有说明

### 使用方法
    npm install 安装完依赖
    npm run dev 开发
    npm run build 打包
    npm run build --report 打包并生产分析表格

### 代理转发的配置
    在`config/index.js`中更改
    proxyTable: {
      '/api': {
        target: '',       // 接口域名
        changeOrigin: true,
      }
    }
  
它会把代码中以`api`开头的接口地址转发到`target`域名下，举个例子
接口地址为`api/getList`，其域名为`http://www.abc.com` 当你

    $.ajax({
      url: 'api/getList',
      ..........
    })

发送请求的时候，实际上是请求`http://www.abc.com/api/getList`

<span id="cli"></span>
### 指令
`npm run create filename`       `filename` 为页面名/目录名

>  运行指令后，会根据`build/pages.json`中的`root`路径，在其中创建一个目录， 目录中包含`index.html`,`index.css`, `index.js`这三个默认的初始文件。

> 并且它会自动的为`build/pages.json`中的`pages`增添新的页面，无需自己手动配置

这样每次创建新页面的时候就不用自己手动创建一个目录，再创建三个文件。

**需要注意的是**当在删除一个目录的时候，需要自己手动删除`pages`中相应的内容


    