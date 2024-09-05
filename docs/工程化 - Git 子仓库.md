---
title: Git 子仓库
uid: 20240123112806924
aliases: []
categories: []
tags:
  - 计算机/工程化/Git
  - 计算机/项目管理/Git
archive: false
draft: false
todo: false
publishUrl:
  - "https://juejin.cn/post/7230656452497965117"
createTime: 2023-05-14 18:40:09
updateTime: 2024-08-15 18:42:23
---

> [!note]
> 在进行项目开发和管理的过程中，您可能会遇到这种情况：您自己的 A 项目需要引用另一个 B 项目中的内容，直接将 B 项目中的文件克隆合并到 A 项目中显得臃肿，不能保证两者的独立性；此外，直接克隆合并的方法也无法记录对于 B 项目的改动信息。
>
> Tips: 其他项目管理方式
>
> - 将子项目上传至 npm 库或者上传至私有 npm 库
> - Monorepo 模式

## 总结

- `git submodule`：好使推荐使用，子项目完全独立，有完整的子项目信息，独立管理，权限独立，GUI 工具支持较好
- `git subtree`：项目复杂度高的项目使用或许有不错的效果，和操作分支那样但是操作复杂，但是无子项目信息，不独立管理，GUI 工具支持较差，命令复杂
  - 比较灵活，需要较好的项目管理能力，手动维护子项目信息
  - 建议写个脚本，自动维护子项目信息

简单的来说，`git submodule` 是引用，`git subtree` 是复制

目前个人没有使用 `git subtree` 的场景，所以不太清楚 `git subtree` 对比 `git submodule` 的优势在哪里

## 目前 Git 添加子仓库的方式有两种

- [Git Submodule](https://link.juejin.cn?target=http%3A%2F%2Fgit-scm.com%2Fdocs%2Fgit-submodule "http://git-scm.com/docs/git-submodule")：
- [Git Subtree](https://medium.com/@porteneuve/mastering-git-Subtrees-943d29a798ec)：
  从 [GIT 1.5.2](https://lwn.net/Articles/235109/) 新增

![[Pasted image 20230204210622.png]]

![[submodule和subtree区别.excalidraw.svg]]

## `git submodule`

- 子项目作为一个独立的仓库，可以单独提交，但是不会被包含在父项目的仓库中，只是作为一个引用
  - 会在父项目的 `.gitmodules` 文件中记录子项目的信息
  - 会在 `.git/config` 文件中记录子项目的信息
  - 会在父项目的 `.git/modules` 目录下创建子项目的仓库
  - 使用 `git clone --recursive <父项目仓库 url>` 可以递归克隆子项目
  - 使用 `git add <url> <path>` 可以克隆添加子项目
  - 使用 `git submodule update --init` 可以更新子项目
  - 使用 `git submodule update --init --recursive` 可以递归更新子项目
  - 使用 `git submodule update --remote` 可以更新子项目到最新版本
  - 如何删除子 `git submodule`：
    - 删除 `.gitmodules` 文件中的子项目信息
    - 删除 `.git/config` 文件中的子项目信息
    - 删除 `.git/modules` 目录下的子项目仓库
    - 删除父项目中的子项目目录

```shell
# 添加子仓库
git submodule add <url> <path>
# 添加子仓库并指定分支
git submodule add -b <branch> <url> <path>
# 更新子仓库
git submodule update --init --recursive
# 删除子仓库
git submodule deinit <path>
git rm <path>
# 删除 .gitmodules 文件中的子仓库信息
git config -f .gitmodules --remove-section submodule.<path>
```

## `git subtree`

- 不像 `git submodule`，子项目不是一个独立的仓库，而是作为父项目的一个目录
- 添加子项目时，会将子项目作为一个分支添加到父项目中
- 完全像拉取一个分支一样，合并子项目到父项目中
- 没有 `.gitmodules` 文件，记录子项目信息，完全不知道子项目的存在
- 使用
  - 使用 `git subtree add --prefix <path> <url> <branch> --squash` 可以添加子项目
  - `--squash` 可选参数：表示将子库的所有提交合并为一个提交，这样可以避免子库的提交历史污染主库
  - 使用 `git subtree pull --prefix <path> <url> <branch> --squash` 可以从子项目更新父项目
  - 使用 `git subtree push --prefix <path> <url> <branch>` 可以从父项目更新子项目
  - 使用 `git subtree split --prefix <path> -b <branch>` 可以将子项目分离出来作为一个独立的仓库
  - 使用 `git subtree merge --prefix <path> <branch>` 可以将分离出来的子项目合并到父项目中
- 如何删除 `git subtree`：
  - 删除父项目中的子项目目录
  - 删除父项目中的子项目分支

```shell
# 添加子仓库
git subtree add --prefix <path> <url> <branch> --squash
# 更新子仓库
git subtree pull --prefix <path> <url> <branch> --squash
# 更新父仓库
git subtree push --prefix <path> <url> <branch>
# 分离子仓库
git subtree split --prefix <path> -b <branch>
# 合并子仓库
git subtree merge --prefix <path> <branch>
```

## 参考

- [用 Git Subtree 在多个 Git 项目间双向同步子项目 - 掘金](https://juejin.cn/post/6844903762176262157)
- [Git子库：submodule与subtree](https://juejin.cn/post/7077775905888124941)
- [详解Git 分区、配置与日志 - 掘金](https://juejin.cn/post/7075716719917924388)
- [git subtree教程 - 简书](https://www.jianshu.com/p/d42d330bfead)
