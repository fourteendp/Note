---
title: Linux 实例 SWAP 分区的配置和常见问题如何处理 - 阿里云帮助中心
description: 免责声明： 本文档可能包含第三方产品信息，该信息仅供参考。
uid: 20240220114759470
aliases: []
categories: []
tags:
  - 计算机/Linux
archive: false
draft: false
todo: false
originalUrl: https://help.aliyun.com/zh/ecs/how-do-i-configure-a-swap-partition-on-a-linux-instance-and-resolve-frequently-asked-questions
createTime: 2024-02-20 19:47:59
updateTime: 2024-08-02 13:59:54
---

**免责声明：** 本文档可能包含第三方产品信息，该信息仅供参考。阿里云对第三方产品的性能、可靠性以及操
作可能带来的潜在影响，不做任何暗示或其他形式的承诺。

## 概述

本文介绍在 Linux 实例中，如何配置 SWAP 分区和常见问题处理。

## 详细描述

### SWAP 分区介绍

在 Linux 系统中的 SWAP（交换分区），类似于 Windows 系统的虚拟内存。系统会把一部分硬盘空间虚拟成内存

使用，将系统内非活动内存换页到 SWAP，以提高系统可用内存。

注：如果您使用普通云盘，不建议使用 SWAP 分区。如果是高效云盘或 SSD 云盘，可以根据实际情况使用 SWAP

分区。详情请参考参文档

[ECS 实例使用须知。](https://help.aliyun.com/zh/ecs/product-overview/usage-notes)

### SWAP 配置介绍

1. 以 root 用户身份，通
    过 [远程连接](https://help.aliyun.com/zh/ecs/user-guide/connect-to-a-linux-instance-by-using-a-password-1) 登
    录 Linux 实例，执行以下命令，创建用于交换分区的文件。

    ```
    dd if=/dev/zero of=/mnt/swap bs=block_size count=number_of_block

    ```

    注：`block_size`、`number_of_block` 大小可以自定义，比如 `bs=1M count=1024` 代表设置 1G 大小 SWAP

    分区。

2. 执行以下命令，设置交换分区文件。

    ```
    mkswap /mnt/swap

    ```

    ![](https://img.alicdn.com/tfscom/TB1IY7CKXXXXXavaXXXXXXXXXXX#alt=)

3. 执行以下命令，启用交换分区文件。

    ```
    swapon /mnt/swap

    ```

    ![](https://img.alicdn.com/tfscom/TB1pmRcKpXXXXanXXXXXXXXXXXX#alt=)

    ![](https://onekb.oss-cn-zhangjiakou.aliyuncs.com/1264794/c3db9091-ff0a-4d30-b1b6-1148596e8dc0.png)

    注：如果在 `/etc/rc.local` 中有 `swapoff -a` 需要修改为 `swapon -a`。

4. 设置开机时自启用 SWAP 分区，需要修改文件 `/etc/fstab` 中的 SWAP 行，添加以下代码。

    ```
    /mnt/swap swap swap defaults 0 0

    ```

    ![](https://img.alicdn.com/tfscom/TB1ecwBKXXXXXczaXXXXXXXXXXX#alt=)

    注：`/mnt/swap` 路径可以修改，可以根据创建的 SWAP 分区文件具体路径来配置。

5. 执行以下命令，临时修改 `swappiness` 参数值，此处以空闲内存少于 10% 时才使用 SWAP 分区为例。 **提
    示：**在 Linux 系统中，可以通过查看 `/proc/sys/vm/swappiness` 内容的值来确定系统对 SWAP 分区的使用
    原则。当 `swappiness` 内容的值为 `0` 时，表示最大限度地使用物理内存，物理内存使用完毕后，才会使用
    SWAP 分区。当 `swappiness` 内容的值为 `100` 时，表示积极地使用 SWAP 分区，并且把内存中的数据及时地置
    换到 SWAP 分区。查看修改前为 `0`，需要在物理内存使用完毕后才会使用 SWAP 分区。

    ```
    echo 10 >/proc/sys/vm/swappiness

    ```

    ![](https://img.alicdn.com/tfscom/TB13LA1KXXXXXczXpXXXXXXXXXX#alt=)

6. 若需要永久修改此配置，在系统重启之后也生效的话，通过 vim 命令编辑 `/etc/sysctl.conf` 文件，并增加
    以下内容。

    ```
    vm.swappiness = 10

    ```

7. 执行以下命令，验证添加成功。

    ```
    sysctl -p

    ```

### 关闭 SWAP 分区

当系统出现内存不足时，开启 SWAP 可能会因频繁换页操作，导致 IO 性能下降，可以采用以下方法，关闭 SWAP

分区。

1. 执行以下命令，查询 SWAP 分区设置。

    ```
    free -m

    ```

    系统显示类似如下。

    ![](https://img.alicdn.com/tfscom/TB1nT3WKXXXXXaoXFXXXXXXXXXX#alt=)

2. 执行以下命令，关闭 SWAP 分区。

    ```
    swapoff [$SWAP_File]

    ```

    注：[$SWAP_File]SWAP 分区标识。 系统显示类似如下。

    ![](https://img.alicdn.com/tfscom/TB1XcMLKXXXXXb5XVXXXXXXXXXX#alt=)

3. 通过 `vim` 命令，修改 `/etc/fstab` 文件，删除或注释相关配置，取消 SWAP 的自动挂载，系统显示类似如
    下。

    ![](https://img.alicdn.com/tfscom/TB1IPVeKpXXXXXyXXXXXXXXXXXX#alt=)

4. 执行以下命令，确认 SWAP 分区已经关闭。

    ```
    free -m

    ```

    系统显示类似如下。

    ![](https://img.alicdn.com/tfscom/TB1jj3OKXXXXXXEXVXXXXXXXXXX#alt=)

5. 执行以下命令，临时修改 swappiness 参数值。此处以空闲内存为 0% 为例。

    ```
    echo 0 >/proc/sys/vm/swappiness   

    ```

6. 若需要永久修改此配置，在系统重启之后也生效的话，通过 vim 命令编辑 `/etc/sysctl.conf` 文件，并增加
    以下内容。

    ```
    vm.swappiness = 0

    ```

7. 执行以下命令，验证添加成功。

    ```
    sysctl -p

    ```

### 常见问题处理

#### 常见问题描述

使用 mkswap 创建 SWAP 时出现类似如下报错信息：

```
mkswap: error: swap area needs to be at least 40 KiB

```

![](https://img.alicdn.com/tfscom/TB1DCsCKXXXXXcaaXXXXXXXXXXX#alt=)

#### 问题原因

指定的 SWAP 分区文件太小，SWAP 分区文件至少应该大于 40KB。

#### 解决方法

重新生成更大的文件格式化为 SWAP 即可。

## 适用于

- 云服务器 ECS
