---
title: 工程化 - Git Submodule 命令使用与详细教程
uid: 20240203222235210
aliases: []
categories: []
tags:
  - 计算机/工程化/Git
  - 计算机/项目管理/Git
archive: false
draft: false
todo: false
originalUrl: https://juejin.cn/post/6948251963133788196
createTime: 2024-02-04 06:22:35
updateTime: 2024-09-12 08:13:17
---

欢迎任何形式的转载，转载请保留原文链

接：[juejin.cn/post/694825…](https://juejin.cn/post/6948251963133788196/ "https://juejin.cn/post/6948251963133788196/")

## 前言

为啥要用 git submodule，以及为啥不使用 git 仓库直接嵌套的形式 ？

1. 当子项目是公有项目时，为了方便引用，子项目会单领出一个仓库来。这样就牵扯到多仓库的问题，即主项目
   是一个仓库，子项目是另外一个仓库，这里就存在仓库嵌套管理的问题了
2. 如果直接使用仓库嵌套的方式，那么就存在以下几个问题与预期
   - 希望通过主项目本身，就能知道子项目的地址，而不是额外记录
   - 希望主项目能够关联子项目的提交版本，以便主项目切换不同分支时，保证对应的子项目提交版本正确，避
     免切换分支后无法运行，以及子项目更新后，能够正常运行
   - 希望主项目能够关联子项目的提交分支：额，这点仔细考虑后，有待磋商
3. 如果使用仓库直接嵌套的方式，那么就必须额外记录上述提到的子项目仓库地址以及提交版本信息
4. 而使用 git submodule，则主项目仓库本身就记录了上述信息，这也是为啥要用的原因

本文主要讲解 git submodule 使用与教程，目的有以下几点：

1. 为方便日常查阅，收集常用操作以及对应命令
2. 总结仓库如何记录 submodule 信息，以及得出的使用结论与注意事项
3. 使用详细教程：一方面提供教程，另一方面为上述总结与命令使用提供实践支撑，同时也是本人做上述总结的
   过程

注：为了方便查阅常用操作以及对应命令，文章章节顺序非友好的学习顺序，其中教程巨长放到最后了，如果教程

之前的内容看不明白，建议过一遍教程

## 目录

- 前言
- 常用操作以及对应命令
- 删除 submodule
- 重命名 submodule
- 更改 submodule 远程仓库地址
- 关于仓库相关总结
- submodule 相关文件说明
- 使用教程
- 参考文献与版本同步

## 常用操作以及对应命令

```
# 查看 submodules
# 结果的 hash 前不带符号说明该 module 正常且提交版本同步（提交版本同步指主项目记录提交版本与子模块当前提交版本一致）
# 结果的 hash 前带 - 号说明该 module 未初始化
# 结果的 hash 前带 + 号说明该 module 版本未同步
git submodule
git submodule status

# 初始化 modules，重复初始化无影响，例子中后跟 rxjava 为指定初始化某个 module 的名称（下同）
git submodule init
git submodule init rxjava

# 版本未同步时，检出 modules，保证检出的版本与主项目匹配，但子 module 会创建临时分支
git submodule update
git submodule update rxjava

# 添加 submodule，例子中后跟 rxjava 为该 module 名称与目录名
git submodule add https://github.com/ReactiveX/RxJava.git
git submodule add https://github.com/ReactiveX/RxJava.git rxjava

# 强制添加 submodule（仅用于 git submodule 没有正确的显示某个 module）
git submodule add --force --name rxjava https://github.com/ReactiveX/RxJava.git

# 遍历所有 submodule 执行指定命令
# git submodule foreach 其他命令，如：
git submodule foreach git pull
git submodule foreach ls -l


```

复合命令

```
# 重新 clone 项目（含 clone 所有子项目）方式一
git clone --recursive https://github.com/ReactiveX/RxJava.git

# 重新 clone 项目（含 clone 所有子项目）方式二，依次执行以下命令
git clone https://github.com/ReactiveX/RxJava.git
git submodule init
git submodule update

# pull 项目，并检出新增 submodule
git pull
git submodule init
git submodule update [submodule 名称]

# pull 项目，并移除废弃 submodule
# 建议重新 clone 项目

# pull 项目，并重命名 submodule
# 建议重新 clone 项目


```

其他说明：

- 远程仓库添加 submodule 前后，除了提交记录与 HEAD 指针外，其他文件并未发生变化，所以主项目的
  submodule 记录仅来源于主项目下的【.gitmodules】文件
- 子项目更新，直接使用 `git pull` 即可。如果想让提交版本同步，主项目使用
  `git submodule update rxjava`
- 未初始化的，要先初始化，然后才能检出。所以上述不带选项的 `git clone`（方式二）要先初始化，再检出，
  这样才能正常使用
- 关于 submodule 嵌套 submodule：没啥问题，相关文件方面除了【.gitmodules】文件，其他相关文件还是在最
  外层的主项目的【.git】目录里
- 新增 submodule 部分 IDE 工具需要新打开主项目才行，包括 IDEA

## 删除 submodule

废弃本地仓库的做法（推荐）

1. 修改【.gitmodules】文件内容：去除被删除的 submodule 内容
2. 提交修改并推送到远程仓库
3. 重新 clone 仓库

不废弃本地仓库的做法（不推荐），假设 submodule 名称为 subA

- 非必须步骤不做也行，但日后重复添加相同名称的 submodule 时，可能存在问题
- 如果想反悔（不删了）的话，`git reset --hard HEAD` 即可，再次强调所有修改都已提交再操作

```
# 1. 缓存清理：`git rm -r --cached subA`
# 	- 执行前请保证所有修改都已提交
# 	- 验证上述步骤是否成功：`git submodule` 的结果没有 subA
# 	- 这个必须第一个执行，后续的操作则无所谓顺序了
# 2. 删除对应目录：`rm -rf subA/`
# 3. 修改【.gitmodules】文件内容：去除被删除的 submodule 内容
# 	- 修改后，就可以提交修改并推送远程仓库了
# 4. 非必须，修改【.git/config】文件内容：去除被删除的 submodule 内容
# 5. 非必须，删除【.git/modules】目录下对应 submodule 目录


```

其他合作伙伴更新

- 建议重新 clone 项目
- 如果不想废弃本地仓库的话，和上述做法一致，就是没有修改【.gitmodules】这一步了

## 重命名 submodule

实际就是重命名 submodule 对应的目录名称

废弃本地仓库的做法（推荐）

1. 修改【.gitmodules】文件内容：修改名称与路径
2. 提交修改并推送到远程仓库
3. 重新 clone 仓库

不废弃本地仓库的做法（不推荐）

- 没有好办法，所有的方法，本质都是先删除，再重新添加
- 之所以说本质，是因为都要执行 `git rm -r --cached subA` 命令，以及 `git submodule add` 命令
- 以下操作是错误的：
  - 直接修改【.gitmodules】、【.git/config】内容
  - 直接删除【.git/modules】目录下对应 submodule 目录

其他合作伙伴更新

- 建议重新 clone 项目
- 如果不想废弃本地仓库的话，和上述做法一致，就是没有修改【.gitmodules】这一步了

## 更改 submodule 远程仓库地址

这里说的是修改只修改远程仓库地址，不修改子模块名称的情况

发起人

1. 修改【.gitmodules】文件对应仓库地址，并推送到远程仓库：影响远程仓库，影响 clone 结果，影响浏览器
   指向
2. 修改【.git/config】文件对应仓库地址：额，改不改无所谓
3. 进入子模块，使用 `git remote` 命令，更新远程仓库地址

其他合作伙伴更新

- 和发起人做法一样，就是没有修改【.gitmodules】这一步了
- 当然如果重新 clone 项目就更好了

## 关于仓库相关总结

关于远程仓库

- 远程仓库添加 submodule 前后，除了提交记录与 HEAD 指针外，其他文件并未发生变化，所以主项目的
  submodule 记录仅来源于主项目下的【.gitmodules】文件
- 所以在不考虑本地仓库的情况下，删除 submodule，修改 submodule 名称与仓库地址，都只要修改
  【.gitmodules】文件内容即可
- 如果远程仓库使用的是真实的远程仓库，则使用浏览器访问主项目时，就可以发现主项目存在 submodule 目
  录，并点击该目录可以跳转到 submodule 对应的远程仓库

关于本地仓库

- 主项目并不会记录子模块的对应的分支，只记录子模块的提交版本
- 所以 `git submodule update` 检出时，保证检出的版本与主项目匹配，但子 module 会创建临时分支
- 主项目切换分支时，多余的子模块并不会被删除（原因是删除目录失败），这点在提交时会体现，需要注意。此
  时
  - 【.gitmodules】文件正确，没有多余的子模块信息
  - 【.git/config】文件、【.git/modules】依然保留另一个子模块信息。一方面说明这种切换分支不影响本地
    仓库，另一方也提高切换这种分支时的效率
- 一般建议添加 submodule 时不另指定名字，这个是为了起到以下作用
  - 切换分支后，误把多余子模块上传时，重新添加相同 submodule 时，报目录已存在错误

## submodule 相关文件说明

最主要的是主项目的【.gitmodules】文件，内容如下，以为比较简单就不解释了

- 影响远程仓库的也就只有这个文件了

```
[submodule "subA"]
	path = subA
	url = /cygdrive/e/submodule/repo/subA.git
[submodule "subB"]
	path = subB
	url = /cygdrive/e/submodule/repo/subB.git


```

关于本地仓库，对比添加 submodule 前后：

1. 根目录多出一个【.gitmodules】文件
2. 子模块文件夹多出一个【.git】文件，内容指向子模块本地仓库路劲
3. 主项目【.git/config】文件多出 submodule 块，这个是 `git submodule init` 后更新
4. 主项目【.git】目录多出【modules】目录，里面是子模块原【.git】目录内容，这个是
   `git submodule update` 后出现

```
# 【子模块/.git】文件
gitdir: ../.git/modules/subA


```

```
# 【.git/config】文件，下列[submodule "subA"]块是多出来的
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
[remote "origin"]
	url = /cygdrive/e/submodule/repo/main.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[submodule "subA"]
	active = true
	url = /cygdrive/e/submodule/repo/subA.git
[submodule "subB"]
	active = true
	url = /cygdrive/e/submodule/repo/subB.git


```

```
$ ll .git/modules/
总用量 8
drwxrwxr-x+ 1 Administrator None 0 4月   2 15:41 subA/
drwxrwxr-x+ 1 Administrator None 0 4月   2 15:41 subB/


```

## 使用教程

以下是 git submodule 详细使用教程

- 一来介绍 git submodule 相关使用
- 二来介绍各个阶段本地仓库与远程仓库的变化

### 测试环境搭建

为方便验证与测试，这里提供测试环境搭建过程

- 以 【#】开头，后续跟注释，下同
- 以 【$】开头，后续跟命令，下同
- 其他为命令结果，下同

创建（本地性质的）远程仓库

```
# 创建（本地性质的）远程仓库与本地仓库目录
$ mkdir repo
$ mkdir project

# 进入远程仓库目录，建立主项目远程仓库(main.git)以及，若干个子模块远程仓库(subA.git)
$ cd repo
$ git --git-dir=main.git init --bare
$ git --git-dir=subA.git init --bare
$ git --git-dir=subB.git init --bare

$ ll
总用量 16
drwxrwxr-x+ 1 Administrator None 0 4月   2 14:53 main.git/
drwxrwxr-x+ 1 Administrator None 0 4月   2 14:53 subA.git/
drwxrwxr-x+ 1 Administrator None 0 4月   2 14:53 subB.git/

# 获取远程仓库地址，用来 clone 项目
$ cd main.git
$ pwd
/cygdrive/e/submodule/repo/main.git

# 同理其他子模块远程仓库地址
/cygdrive/e/submodule/repo/subA.git
/cygdrive/e/submodule/repo/subB.git


```

远程仓库初始提交，目的为了让每个远程仓库都有分支，以及提交记录

```
# 在 repo 目录下 clone 代码
$ cd ../
$ pwd
/cygdrive/e/submodule/repo

$ git clone main.git
$ ll
总用量 16
drwxrwxr-x+ 1 Administrator None 0 4月   2 15:21 main/
drwxrwxr-x+ 1 Administrator None 0 4月   2 14:53 main.git/
drwxrwxr-x+ 1 Administrator None 0 4月   2 14:53 subA.git/
drwxrwxr-x+ 1 Administrator None 0 4月   2 14:53 subB.git/

# 创建任意文件，并做初始化提交，并推送到远程
$ cd main
$ touch init
$ git add .
$ git commit -m "main init"
$ git push
$ git branch
* master

$ git log --oneline
468894f (HEAD -> master, origin/master) main init

# 到这里上述 main.git 远程仓库就有一个 master 分支，以及一个提交记录了

# 既然已近做好推送了，就可以删除这个用来做初始化的临时本地仓库了
$ cd ..
$ rm -rf main

# 其他远程仓库，按上述同操作即可，以下为各个远程仓库首次提交
468894f (HEAD -> master, origin/master) main init
5ae8df5 (HEAD -> master, origin/master) subA init
6bf24b8 (HEAD -> master, origin/master) subB init


```

复制主项目远程仓库，用来对比添加 submodule 前后，远程仓库的变化

### 添加 submodule

从远程仓库 clone 到项目目录下的本地仓库

```
# 主项目 clone，多 clone 一个是为了对比
$ cd ../project
$ git clone /cygdrive/e/submodule/repo/main.git
$ git clone /cygdrive/e/submodule/repo/main.git main_copy


```

添加子 module（以下简称子模块）

```
# 往主项目里添加 submodule，注：一个一个来，以便分开 commit，方便后续演示
$ cd main
$ git submodule add /cygdrive/e/submodule/repo/subA.git
正克隆到 '/cygdrive/e/submodule/project/main/subA'...
完成。
warning: .gitmodules 中的 LF 将被 CRLF 替换。
在工作区中该文件仍保持原有的换行符

# 添加后结果
$ ll
总用量 0
-rw-rw-r--+ 1 Administrator None 0 4月   2 15:37 init
drwxrwxr-x+ 1 Administrator None 0 4月   2 15:37 subA/

$ git status
位于分支 master
您的分支与上游分支 'origin/master' 一致。

要提交的变更：
  （使用 "git reset HEAD <文件>..." 以取消暂存）

        新文件：   .gitmodules
        新文件：   subA

$ ll -a subA/
总用量 1
drwxrwxr-x+ 1 Administrator None  0 4月   2 15:37 ./
drwxrwxr-x+ 1 Administrator None  0 4月   2 15:38 ../
-rw-rw-r--+ 1 Administrator None 29 4月   2 15:37 .git
-rw-rw-r--+ 1 Administrator None  0 4月   2 15:37 init

# 主项目提交本次添加 submodule 的结果
$ git add .
$ git commit -m "添加 submodule：subA"
[master 7ada136] 添加 submodule：subA
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 subA

# 同理添加另一个 submodule，最后提交记录与 submodule 记录如下
$ git log --oneline
31287e4 (HEAD -> master) 添加 submodule：subB
7ada136 添加 submodule：subA
468894f (origin/master, origin/HEAD) main init

$ git submodule
 5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd subA (heads/master)
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB (heads/master)


```

对比 main 和 main_copy（没有 submodule）可知

1. 根目录多出一个【.gitmodules】文件
2. 子模块文件夹多出一个【.git】文件，内容指向子模块本地仓库路劲
3. 主项目【.git/config】文件多出 submodule 块，这个是 `git submodule init` 后更新
4. 主项目【.git】目录多出【modules】目录，里面是子模块原【.git】目录内容，这个是
   `git submodule update` 后出现

```
$ cat .gitmodules
[submodule "subA"]
        path = subA
        url = /cygdrive/e/submodule/repo/subA.git
[submodule "subB"]
        path = subB
        url = /cygdrive/e/submodule/repo/subB.git

$ cat subA/.git
gitdir: ../.git/modules/subA

$ cat .git/config
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
[remote "origin"]
        url = /cygdrive/e/submodule/repo/main.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
[submodule "subA"]
        url = /cygdrive/e/submodule/repo/subA.git
        active = true
[submodule "subB"]
        url = /cygdrive/e/submodule/repo/subB.git
        active = true

$ ll .git/modules/
总用量 8
drwxrwxr-x+ 1 Administrator None 0 4月   2 15:41 subA/
drwxrwxr-x+ 1 Administrator None 0 4月   2 15:41 subB/


```

如果远程仓库使用的是真实的远程仓库，则使用浏览器访问主项目时，就可以发现主项目存在 submodule 目录，

并点击该目录可以跳转到 submodule 对应的远程仓库

到此对比远程仓库添加 submodule 前后，可以发现除了提交记录与 HEAD 指证外，其他文件并未发生变化，所以

主项目的 submodule 记录仅取决于主项目下的【.gitmodules】文件内容

### 删除 submodule

删除 submodule 的方式有两种

1. 只修改【.gitmodules】文件，然后推送远程仓库，再重新 clone，原本地仓库不要了
2. 本地仓库正常删除 submodule，然后推送远程仓库，原本地仓库依然可以使用，但其他人的本地仓库是基本完
   蛋了

方式一：只修改【.gitmodules】文件，然后推送远程仓库，再重新 clone，原本地仓库不要了

- 解释：因为从添加 submodule 的结果可知，远程仓库的 submodule 记录仅取决于【.gitmodules】文件内容，
  与其他无关，所以该方式可行
- 步骤：
  1. 修改【.gitmodules】文件内容：去除被删除的 submodule 内容
  2. 删除对应 submodule 文件夹，这个是防止重新 clone 时多出一个空文件夹
  3. 重新提交并推送远程仓库
  4. 使用 `git clone` 新开一个本地仓库

```
# 原【.gitmodules】内容
[submodule "subA"]
	path = subA
	url = /cygdrive/e/submodule/repo/subA.git
[submodule "subB"]
	path = subB
	url = /cygdrive/e/submodule/repo/subB.git

# 删除后【.gitmodules】内容
[submodule "subA"]
	path = subA
	url = /cygdrive/e/submodule/repo/subA.git


```

方式二：本地仓库正常删除 submodule，然后推送远程仓库，原本地仓库依然可以使用

- 本地仓库按以下 5 个步骤执行，完成后推送到远程仓库即可
  - 注：除了第 1 步必须先执行，后续步骤随意

1. 必须，清除 submodule 缓存记录

   - **执行前需要保证所有修改都已提交**（这也是必须第一个执行该步骤的原因，同时也是其他人的本地仓库
     基本完蛋的原因）
   - 执行该命令不影响任何文件内容
   - 不想删除，还原可以使用 `git reset --hard HEAD` 命令，再次强调所有修改都已提交再操作
   - 该步骤成功的验证方式：`git submodule` 结果没有要删除的

   ```
   $ git rm -r --cached subA
   rm 'subA'

   # 上述命令结果验证
   $ git submodule
    5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd subA (heads/master)


   ```

2. 必须，删除 submodule 文件夹，即 subA 文件夹，对应命令如下，不过建议手动删除

   ```
   $ rm -rf subA/


   ```

3. 必须，修改【.gitmodules】文件内容：去除被删除的 submodule 内容

   ```
   # 原内容
   [submodule "subA"]
   	path = subA
   	url = /cygdrive/e/submodule/repo/subA.git
   [submodule "subB"]
   	path = subB
   	url = /cygdrive/e/submodule/repo/subB.git

   # 删除后内容
   [submodule "subA"]
   	path = subA
   	url = /cygdrive/e/submodule/repo/subA.git


   ```

4. 非必须，修改【.git/config】文件内容：去除被删除的 submodule 内容

   - 不删除也行，只影响本地，不影响远程仓库。也就在重复添加相同 submodule 时，可能存在问题

   ```
   # 原内容
   [core]
   	repositoryformatversion = 0
   	filemode = true
   	bare = false
   	logallrefupdates = true
   	ignorecase = true
   [submodule]
   	active = .
   [remote "origin"]
   	url = /cygdrive/e/submodule/repo/main.git
   	fetch = +refs/heads/*:refs/remotes/origin/*
   [branch "master"]
   	remote = origin
   	merge = refs/heads/master
   [submodule "subA"]
   	url = /cygdrive/e/submodule/repo/subA.git
   [submodule "subB"]
   	url = /cygdrive/e/submodule/repo/subB.git

   # 删除后内容
   [core]
   	repositoryformatversion = 0
   	filemode = true
   	bare = false
   	logallrefupdates = true
   	ignorecase = true
   [submodule]
   	active = .
   [remote "origin"]
   	url = /cygdrive/e/submodule/repo/main.git
   	fetch = +refs/heads/*:refs/remotes/origin/*
   [branch "master"]
   	remote = origin
   	merge = refs/heads/master
   [submodule "subA"]
   	url = /cygdrive/e/submodule/repo/subA.git


   ```

5. 非必须，删除【.git/modules】目录下对应 submodule 目录

   - 不删除也行，只影响本地，不影响远程仓库。也就在重复添加相同 submodule 时，可能存在问题

### 重命名 submodule 文件夹

没有好办法，所有的方法，本质都是先删除，再重新添加

- 之所以说本质，是因为都要执行 `git rm -r --cached subA` 命令，以及 `git submodule add` 命令

以下操作是错误的：

- 直接修改【.gitmodules】、【.git/config】内容
- 直接删除【.git/modules】目录下对应 submodule 目录

### 更改 submodule 远程仓库地址

这里说的是修改只修改远程仓库地址，不修改子模块名称的情况

背景：原来的 `/cygdrive/e/submodule/repo/subA.git` 远程仓库迁移到 `/cygdrive/e/submodule/subA.git`

更改步骤说明

- 第一个步骤只影响重新 clone 的结果
- 其他人的本地仓库除了主项目更新外，还需要做第二步和第三步操作

```
# 1. 修改【.gitmodules】文件对应仓库地址：只影响远程仓库
# 2. 修改【.git/config】文件对应仓库地址：额，改不改无所谓
# 3. 进入子模块，使用 `git remote` 命令，更新远程仓库地址


```

### 另一个主项目（未添加 submodule）更新

这里演示多人共同开发主项目时，其中一人添加了 submodule

1. 其他人如何更新
2. 其他人如何重新 clone 整个项目

#### 1. 已有项目时，其他人如何更新

pull 主项目，并查看日志

```
$ cd main_copy
$ git pull
$ git log --oneline
31287e4 (HEAD -> master, origin/master, origin/HEAD) 添加 submodule：subB
7ada136 添加 submodule：subA
468894f main init


```

查看 submodule 记录、子模块内容、【.gitmodules】文件、【.git/config】文件、【.git/modules】目录、子

模块日志

```
$ git submodule
-5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd subA
-6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB

$ ll -a subA subB
subA:
总用量 0
drwxrwxr-x+ 1 Administrator None 0 4月   2 17:36 ./
drwxrwxr-x+ 1 Administrator None 0 4月   2 17:36 ../

subB:
总用量 0
drwxrwxr-x+ 1 Administrator None 0 4月   2 17:36 ./
drwxrwxr-x+ 1 Administrator None 0 4月   2 17:36 ../

$ cat .gitmodules
[submodule "subA"]
        path = subA
        url = /cygdrive/e/submodule/repo/subA.git
[submodule "subB"]
        path = subB
        url = /cygdrive/e/submodule/repo/subB.git

$ cat .git/config
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
[remote "origin"]
        url = /cygdrive/e/submodule/repo/main.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master

$ ll .git/modules
/bin/ls: 无法访问'.git/modules': No such file or directory

$ cd subA
$ git log --oneline
31287e4 (HEAD -> master, origin/master, origin/HEAD) 添加 submodule：subB
7ada136 添加 submodule：subA
468894f main init
$ cd ..


```

如上，发现以下几个问题

- `git submodule` 的结果前面带 [-] 号
- 【.gitmodules】文件正常
- 【.git/config】文件、【.git/modules】目录并没有 submodule 信息
- 子模块日志不正确，显示的是主项目日志

这些问题都是因为子模块并没有初始化、检出导致的

- `git submodule` 的结果前面带 [-] 号就是表示该 submodule 未初始化

```
# 初始化全部 submodule，重复初始化无反应
$ git submodule init
子模组 'subA'（/cygdrive/e/submodule/repo/subA.git）已对路径 'subA' 注册
子模组 'subB'（/cygdrive/e/submodule/repo/subB.git）已对路径 'subB' 注册

$ git submodule init
$ git submodule init subA
$ git submodule
 5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd subA
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB

# 检出所有 submodule，重复检出无反应
$ git submodule update
正克隆到 '/cygdrive/e/submodule/project/main_copy/subA'...
完成。
正克隆到 '/cygdrive/e/submodule/project/main_copy/subB'...
完成。
Submodule path 'subA': checked out '5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd'
Submodule path 'subB': checked out '6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638'

$ git submodule update
$ git submodule update subA
$ git submodule
 5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd subA
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB

$ cd subA
$ git log --oneline
5ae8df5 (HEAD, origin/master, origin/HEAD, master) subA init

cd ..


```

经过初始化和检出，子模块就可以正常使用了

- 初始化只会更新【.git/config】。【.git/modules】目录并没有更新，所以子模块的日志还是不对的，必须检
  出才能用
- 初始化后 `git submodule` 的结果前面就不带任何符号了

#### 2. 如何重新 clone 整个项目

两种方式，一种是是直接 clone 项目，然后初始化、检出

```
$ git clone /cygdrive/e/submodule/repo/main.git main_new
正克隆到 'main_new'...
完成。

$ git submodule init
子模组 'subA'（/cygdrive/e/submodule/repo/subA.git）已对路径 'subA' 注册
子模组 'subB'（/cygdrive/e/submodule/repo/subB.git）已对路径 'subB' 注册

$ git submodule update
正克隆到 '/cygdrive/e/submodule/project/main_new/subA'...
完成。
正克隆到 '/cygdrive/e/submodule/project/main_new/subB'...
完成。
Submodule path 'subA': checked out '5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd'
Submodule path 'subB': checked out '6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638'


```

另外一种是 clone 时添加 `--recursive` 选项直接一步到位

```
$ git clone --recursive /cygdrive/e/submodule/repo/main.git main_new_02
正克隆到 'main_new'...
完成。
子模组 'subA'（/cygdrive/e/submodule/repo/subA.git）已对路径 'subA' 注册
子模组 'subB'（/cygdrive/e/submodule/repo/subB.git）已对路径 'subB' 注册
正克隆到 '/cygdrive/e/submodule/project/main_new/subA'...
完成。
正克隆到 '/cygdrive/e/submodule/project/main_new/subB'...
完成。
Submodule path 'subA': checked out '5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd'
Submodule path 'subB': checked out '6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638'


```

### 误操作：误把子模块文件夹删除了

初始化，以及检出之后，误把子模块删除。这里先说下结论

- 此时缺失子模块，并不会对主项目造成影响，包括 diff 等
- 此时想要恢复，不能手动创建文件夹再手动 pull 代码。只能重新检出，也就是执行
  `git submodule update`，但这种检出会创建一个临时分支
- 从结果可知，主项目并不会记录子模块的对应的分支，只记录子模块的提交版本

```
# 缺失子模块，不影响主项目 diff
$ rm -rf subB/
$ git status
位于分支 master
您的分支与上游分支 'origin/master' 一致。

无文件要提交，干净的工作区

# 缺失子模块，同样不影响主项目 submodule 记录
$ git submodule
 d8346a82a2ba13077d7f25124239ac0d3db5920c subA (heads/master)
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB

# 缺失子模块，重复初始化不起作用
$ git submodule init

$ ll
总用量 0
-rw-rw-r--+ 1 Administrator None 0 4月   2 17:04 init
drwxrwxr-x+ 1 Administrator None 0 4月   2 17:26 subA/

# 缺失子模块，无效且错误做法：新建对应文件夹，然后在对应文件夹里 pull，从结果可以看出日志并不是子模块的日志
$ mkdir subB
$ cd subB/

$ gitlog
* 0e3354b 2021-04-02 18:42:00 |  (HEAD -> other, origin/master, origin/HEAD, master)submodule subA 提交记录更更新  <jefshi>
* 31287e4 2021-04-02 17:10:54 | 添加 submodule：subB  <jefshi>
* 7ada136 2021-04-02 17:05:20 | 添加 submodule：subA  <jefshi>
* 468894f 2021-04-02 15:24:36 | main init  <jefshi>

# 缺失子模块，重新检出，但子模块是创建一个临时分支
$ git submodule update
Submodule path 'subB': checked out '6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638'

$ ll
总用量 0
-rw-rw-r--+ 1 Administrator None 0 4月   2 17:04 init
drwxrwxr-x+ 1 Administrator None 0 4月   2 17:26 subA/
drwxrwxr-x+ 1 Administrator None 0 4月   2 20:50 subB/

$ cd subB
$ git branch
  master
* （头指针分离于 6bf24b8）

$ cd ..


```

### 子模块单分支情况下修改更新

进入子模块目录进行修改并提交

```
$ cd main/subA
$ touch first
$ git add .
$ git commit -m "subA：第一次修改"
$ git push

$ git log --oneline
d8346a8 (HEAD -> master) subA：第一次修改
5ae8df5 (origin/master, origin/HEAD) subA init


```

主项目查看差异，提交并查看 submodule。这里先说下结论

- 主项目的 `git submodule` 的结果前面带 [+] 号，表示主项目记录的提交版本与对应 submodule 的提交记录
  不一致
- 提交版本未同步，则主项目存在差异，可以重新提交来同步提交版本。如果已近同步，则不需要重新提交（也没
  法提交）

```
# 子模块提交记录同步前
$ git submodule
+d8346a82a2ba13077d7f25124239ac0d3db5920c subA (heads/master)
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB (heads/master)

$ cd ..
$ git status
位于分支 master
您的分支与上游分支 'origin/master' 一致。

尚未暂存以备提交的变更：
  （使用 "git add <文件>..." 更新要提交的内容）
  （使用 "git checkout -- <文件>..." 丢弃工作区的改动）

        修改：     subA (新提交)

$ git add .
$ git commit -m "submodule subA 提交记录更更新"
[master 0e3354b] submodule subA 提交记录更更新
 1 file changed, 1 insertion(+), 1 deletion(-)

$ git submodule
 d8346a82a2ba13077d7f25124239ac0d3db5920c subA (heads/master)
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB (heads/master)

$ git push


```

另一个主项目（main_copy）从远程仓库更新上述操作。这里先说下结论

- 主项目下 `git pull` 只会更新主项目，不会更新子模块，反过来也是如此
- 更新子模块方式一：`git submodule update`
  - 说明：遍历子模块，依次检出
  - 优点：子模块的提交版本是正确的
  - 缺点：子模块创建临时分支，不影响子模块原有分支
- 更新子模块方式二：`git submodule foreach git pull`
  - 说明：遍历子模块，依次执行 `git pull` 操作
  - 优点：子模块不会创建临时分支
  - 缺点：只会更新到最新，导致子模块的版本不一定与主项目使用的版本一致
- 一般来讲，子模块是单分支，使用方式二，多分支，看情况吧
- 造成上述结果的原因在于主项目只记录子模块的提交版本，不记录子模块的提交分支

```
# 更新前，主项目是无感知的
cd ../main_copy
$ git submodule
 5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd subA (heads/master)
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB (heads/master)

# 更新后，可以看到提交版本不一致
$ git pull
$ git log --oneline
0e3354b (HEAD -> master, origin/master, origin/HEAD) submodule subA 提交记录更更新
31287e4 添加 submodule：subB
7ada136 添加 submodule：subA
468894f main init

$ git submodule
+5ae8df5a1fd55d31b0fc7e8bdf7d02fb7591f4bd subA (heads/master)
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB (heads/master)

# 更新子模块方式一
$ git submodule update
Submodule path 'subA': checked out 'd8346a82a2ba13077d7f25124239ac0d3db5920c'

$ cd subA
$ git branch
  master
* （头指针分离于 d8346a8）

# 子模块还原
$ git checkout master
$ git reset --hard HEAD
$ cd ..

# 更新子模块方式二
$ git submodule foreach git pull
进入 'subA'
更新 5ae8df5..d8346a8
Fast-forward
 first | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 first
进入 'subB'
来自 /cygdrive/e/submodule/repo/subB
 + 4f6ad1c...6bf24b8 master     -> origin/master  (强制更新)
已经是最新的。

$ cd subA
$ git log --oneline
d8346a8 (HEAD -> master, origin/master, origin/HEAD) subA：第一次修改
5ae8df5 subA init

cd ..


```

关于主项目记录的提交版本与子模块不一致讨论，不一致有以下几种

- 主项目记录的提交版本落后于子模块：这个就是子模块提交，主项目未提交场景
- 主项目记录的提交版本，高于子模块：这个就是主项目更新，子模块未更新场景
- 主项目记录的提交版本，以及子模块的提交版本，均落后于子模块的远程分支的提交版本：这个就是另一个本地
  仓库未更更新场景

### 主项目多分支，且不同分支间 submodule 有差异

新建一个分支，使 master 分支含有两个 submodule，另一个分支只含有一个

```
$ git branch
* master

$ git log --oneline
0e3354b (HEAD -> master, origin/master, origin/HEAD) submodule subA 提交记录更更新
31287e4 添加 submodule：subB
7ada136 (onlySubA) 添加 submodule：subA
468894f main init

$ git submodule
 d8346a82a2ba13077d7f25124239ac0d3db5920c subA (heads/master)
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB (heads/master)

$ git checkout -b onlySubA 7ada136
$ git log --oneline
7ada136 (HEAD -> onlySubA) 添加 submodule：subA
468894f main init

$ git branch
  master
* onlySubA

$ git submodule
+d8346a82a2ba13077d7f25124239ac0d3db5920c subA (heads/master)


```

这里 master 有两个 submodule，onlySubA 分支只有一个 submodule。接下来看下 onlySubA 分支的提交差异，

以及一些相关文件。

这里先说下结论，可以看出在 onlySubA 分支上

- 从 master 切到 onlySubA 分支上时，多余的子模块文件夹并不会自动删除（看切换分支时的提示是删除文件夹
  失败导致）。这点和不是使用 submodule，单纯使用两个 git 仓库嵌套相同
- 提交时，因为多余的子模块并没有被删除，所以依然会显示多余的子模块文件夹，这个需要注意
- 【.gitmodules】文件正确，没有多余的子模块信息
- 【.git/config】文件、【.git/modules】依然保留另一个子模块信息。一方面说明这种切换分支不影响本地仓
  库，另一方也提高切换这种分支时的效率

```
$ git branch
  master
* onlySubA

$ git status
位于分支 onlySubA
尚未暂存以备提交的变更：
  （使用 "git add <文件>..." 更新要提交的内容）
  （使用 "git checkout -- <文件>..." 丢弃工作区的改动）

        修改：     subA (新提交)

未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）

        subB/

$ cat .gitmodules
[submodule "subA"]
        path = subA
        url = /cygdrive/e/submodule/repo/subA.git

$ cat .git/config
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
[remote "origin"]
        url = /cygdrive/e/submodule/repo/main.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
[submodule "subA"]
        url = /cygdrive/e/submodule/repo/subA.git
        active = true
[submodule "subB"]
        url = /cygdrive/e/submodule/repo/subB.git
        active = true

$ ll .git/modules/
总用量 8
drwxrwxr-x+ 1 Administrator None 0 4月   2 20:35 subA/
drwxrwxr-x+ 1 Administrator None 0 4月   2 20:33 subB/


```

由于切分支时多余的子模块文件夹并不会被删除。如果此时误操作把多余的子模块文件夹给提交了，分析下之后重

新添加相同子模块的 submodule 的结果。这里先说下结论

- 误把不需要的子模块提交后，添加相同子模块的 submodule 操作失败（因为文件夹已存在）
- 因为操作失败的原因是文件夹重名，所以一般建议添加 submodule 时不另指定名字

```
# 背景
$ git status
位于分支 onlySubA
未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）

        subB/

# 误操作
$ git add .
$ git commit -m "误把不需要的子模块提交"

$ git status
位于分支 onlySubA
无文件要提交，干净的工作区

# 添加相同的子模块失败
$ git submodule add /cygdrive/e/submodule/repo/subB.git
'subB' already exists in the index


```

### 主项目和子模块都是多分支，主项目切分支对子模块分支的影响

背景：

- 主项目两个分支：master、other
- 子模块 subA 两个分支：master、subOther
- 子模块的两个分支指向不同的提交版本
- 主项目分支对应
  - master 对应子模块的 master
  - other 对应子模块的 subOther

```
# 背景：主项目两个分支，以及分支指向的提交记录（other 指向 31287e4）
$ git branch
* master
  other

$ git log --oneline
0e3354b (HEAD -> master, origin/master, origin/HEAD) submodule subA 提交记录更更新
31287e4 (other) 添加 submodule：subB
7ada136 添加 submodule：subA
468894f main init

# 背景：子模块 subA 两个分支，以及分支指向的提交记录
$ cd subA
$ git branch
* master
  subOther

$ git log --oneline
d8346a8 (HEAD -> master, origin/master, origin/HEAD) subA：第一次修改
5ae8df5 (subOther) subA init

$ cd ..


```

上述主项目和子模块都是 master 分支，现在主项目切换到 other 分支，观察子模块分支情况，这里先说下结论

- 主项目切分支操作影响不到子模块
- 同样的，子模块切分支也影响不到子模块，这个自行测试

```
# 主项目切分支
$ git branch
* master
  other

$ git checkout other
M       subA
切换到分支 'other'

$ git submodule
+d8346a82a2ba13077d7f25124239ac0d3db5920c subA (heads/master)
 6bf24b87a83ee2621e9b9aaf93b6d0f4f2b81638 subB (heads/master)

# 主项目切分支后，子模块分支情况
$ cd subA/
$ git branch
* master
  subOther


```

## 参考文献与版本同步

参考文献：

- Git Submodule 使用完整教
  程：[yq.aliyun.com/articles/27…](https://link.juejin.cn?target=https%3A%2F%2Fyq.aliyun.com%2Farticles%2F27002 "https://yq.aliyun.com/articles/27002")

博客同步版本：

- 2021-04-07：首发博客
- 2022-04-28：优化 submodule 删除、重命名、修改远程地址的说明
