---
title: Visual Studio 完全重置的方法
uid: 20240307094351796
aliases: []
categories: []
tags: []
archive: false
draft: false
todo: false
originalUrl: https://www.cnblogs.com/purvis/p/15137565.html
createTime: 2024-03-07 17:43:51
updateTime: 2024-08-02 13:59:52
---

vs2015 不知道怎么回事 智能提示 无法显示出函数或属性的说明，如下图

![](https://img2020.cnblogs.com/blog/1159953/202108/1159953-20210813151759287-340473281.png)

想着 应该是设置的问题 然后再工具 -》选项 -》里面找了好久都没有找到，不得已只能重置开发环境了，然后度

娘了一下，在一个贴吧里找到了重置方法 VS2015 重置方法如下：

开始菜单 –> 所有程序–>Visual Studio 2015 文件夹 –> Visual Studio Tools –> Developer Command Prompt

for VS2015 输入 DOS 命令: CD Common7/IDE 进入到该工具下的子文件夹中输入：devenv.exe /setup

/resetuserdata /resetsettings，重置 Visual Studio 即可执行工作之后，重新打开 VS 会出现安装 VS 之后，

第一次加载的页面，大家已经很熟悉了，不再截图。成功之后

![](https://img2020.cnblogs.com/blog/1159953/202108/1159953-20210813151811378-1089871099.png)

话说 没有这个提示写代码真不舒服啊 找回来的感觉真爽。离开了 VS 的智能提示 都不会写代码了。注意：此命

令会将 VS 重置到安装后第一次打开的状态，即之前安装的插件之类的都没有了，只能重新安装。这次还有一个意

外的收获，那就是发现了一个好用的插件，名字是：Indent Guides ，在扩展更新里面下载之后重启 VS 效果如

下：

![](https://img2020.cnblogs.com/blog/1159953/202108/1159953-20210813151840635-1934176574.png)

折腾了半天终于搞好了 一不小心也发现了 VS 为啥没有说明提示，原来是因为我安装的番茄小助手这个插件的原

因，由于我安装的是破解版的 可能会有什么问题吧 禁用之后 就正常了
