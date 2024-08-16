---
title: 生成SSH Key
uid: 1722580246080
aliases: 
categories: 
tags: 
archive: false
draft: false
todo: false
createTime: 2024-08-02 14:30:46
updateTime: 2024-08-02 14:35:16
---

粘贴以下文本，将示例中使用的电子邮件替换为 GitHub 电子邮件地址。

```shell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

---
> [!warning]
> Contents 注意：如果你使用的是不支持 Ed25519 算法的旧系统，请使用以下命令：

```shell
 ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

## 参考

- [生成新的 SSH 密钥并将其添加到 ssh-agent - GitHub 文档](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
