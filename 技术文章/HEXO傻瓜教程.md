# HEXO傻瓜教程

> 别问为啥，问你就输了，老弟。
>
> ——尼古拉斯·广坤

## 准备工作

电脑需提前安装Node、Git。不做赘述。

## 安装Hexo并初始化

1. 安装Hexo：`npm i hexo-cli -g`

   安装完毕后验证：`hexo -v`

2. 初始化HEXO驱动并安装依赖：

```
hexo init
npm install
```

​		注意事项：**init命令必须在空文件夹下进行。init后方可进行将源代码上传至远程仓库的操作。**

## 安装Git自动化部署依赖

>  此处顺便做概念释疑：hexo驱动可以视为“博客框架”（类比Vue和React），最终的产出仅是静态前端资源。所以理论上，hexo的产出便是静态的博客网站，可以放在任何域名和环境发布。

```
npm i hexo-deployer-git // 自动化部署至git的依赖
```

5. hexo链接gitHub个人域名

> GitHub个人域名需额外配置。网上教程很多，[借助GitHub搭建个人静态网站](https://blog.csdn.net/weixin_39510813/article/details/80216552)

 现在请打开博客根目录下的`_config.yml`文件，这是博客的配置文件，在这里你可以修改与博客相关的各种信息。修改最后一行配置， repository修改为你自己的gitHub个人域名仓库的地址：

```
deploy:
  type: git
  repository: https://github.com/MaxWang17/MaxWang17.github.io.git
  branch: master // gitHub新建项目的主干已更名为main（master含奴隶主之意，2020年Black Lives Matter运动爆发后，gitHub修改了此词汇）。此处根据实际情况调整即可
```

## 自动化发布

进入根目录下的`.deploy_git`文件夹，执行下文命令，即可成功上传静态资源至Git，实现自动化部署

```
hexo d  # 上传静态资源到github
```

## hexo基础常用命令

```
hexo s  # 本地启动服务
hexo g  # 生成静态资源
```

恭喜你，截止目前，你已经拥有了一个借助于HEXO驱动，GitHub个人域名，可在公网浏览的静态博客啦。

但万里长征第一步，hexo的精髓不在其本身，而是缤纷各异的主题。本博客使用主题为Butterfly，其开发者已提供详细教程，[Butterfly 安裝文檔](https://butterfly.js.org/posts/21cfbf15/)，作者不打算拾人牙慧。

祝搭建顺利，我们下文再见。