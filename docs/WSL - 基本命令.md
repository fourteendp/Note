---
title: WSL - 基本命令
uid: 20240123112807156
aliases: []
categories: []
tags:
  - 基本命令
  - 计算机/Linux/安装
  - 计算机/Linux/WSL
  - Linux发行版
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:20
---

以下 WSL 命令以 PowerShell 或 Windows 命令提示符支持的格式列出。若要通过 Bash/Linux 发行版命令行运行

这些命令，必须将 `wsl` 替换为 `wsl.exe`。

## WSL 基本命令

### 安装

PowerShell 复制

```
wsl --install
```

安装 WSL 和 Linux 的 Ubuntu 发行

版。 [了解详细信息](https://docs.microsoft.com/zh-cn/windows/wsl/install)。

### 安装特定的 Linux 发行版

PowerShell 复制

```
wsl --install --distribution <Distribution Name>
```

通过将 `<Distribution Name>` 替换为发行版名称，指定除默认发行版 (Ubuntu) 之外的 Linux 发行版进行安

装。此命令也可输入为：`wsl -d <Distribution Name>`。

### 列出可用的 Linux 发行版

PowerShell 复制

```
wsl --list --online
```

查看可通过在线商店获得的 Linux 发行版列表。此命令也可输入为：`wsl -l -o`。

### 列出已安装的 Linux 发行版

PowerShell 复制

```
wsl --list --verbose
```

查看安装在 Windows 计算机上的 Linux 发行版列表，其中包括状态（发行版是正在运行还是已停止）和运行发行

版的 WSL 版本（WSL 1 或 WSL

2）。 [比较 WSL 1 和 WSL 2](https://docs.microsoft.com/zh-cn/windows/wsl/compare-versions)。此命令也

可输入为：`wsl -l -v`。可与 list 命令一起使用的其他选项包括：`--all`（列出所有发行

版）、`--running`（仅列出当前正在运行的发行版）或 `--quiet`（仅显示发行版名称）。

### 将 WSL 版本设置为 1 或 2

PowerShell 复制

```
wsl --set-version <distribution name> <versionNumber>
```

若要指定运行 Linux 发行版的 WSL 版本（1 或 2），请将 `<distribution name>` 替换为发行版的名称，并将

 `<versionNumber>` 替换为 1 或

2。 [比较 WSL 1 和 WSL 2](https://docs.microsoft.com/zh-cn/windows/wsl/compare-versions)。

### 设置默认 WSL 版本

PowerShell 复制

```
wsl --set-default-version <Version>
```

若要将默认版本设置为 WSL 1 或 WSL 2，请将 `<Version>` 替换为数字 1 或 2，表示对于安装新的 Linux 发行

版，你希望默认使用哪个版本的 WSL。例

如，`wsl --set-default-version 2`。 [比较 WSL 1 和 WSL 2](https://docs.microsoft.com/zh-cn/windows/wsl/compare-versions)。

### 设置默认 Linux 发行版

PowerShell 复制

```
wsl --set-default <Distribution Name>
```

若要设置 WSL 命令将用于运行的默认 Linux 发行版，请将 `<Distribution Name>` 替换为你首选的 Linux 发行

版的名称。

### 将目录更改为主页

PowerShell 复制

```
wsl ~
```

`~` 可与 wsl 一起使用，以在用户的主目录中启动。若要在 WSL 命令提示符中从任何目录跳回到主目录，可使用

命令 `cd ~`。

### 通过 PowerShell 或 CMD 运行特定的 Linux 发行版

PowerShell 复制

```
wsl --distribution <Distribution Name> --user <User Name>
```

若要通过特定用户运行特定 Linux 发行版，请将 `<Distribution Name>` 替换为你首选的 Linux 发行版的名称

（例如 Debian），将 `<User Name>` 替换为现有用户的名称（例如 root）。如果 WSL 发行版中不存在该用户，

你将会收到一个错误。若要输出当前用户名，请使用 `whoami` 命令。

### 更新 WSL

PowerShell 复制

```
wsl --update
```

手动更新 WSL Linux 内核的版本。还可以使用 `wsl --update rollback` 命令回滚到 WSL Linux 内核的上一版

本。

### 检查 WSL 状态

PowerShell 复制

```
wsl --status
```

查看有关 WSL 配置的常规信息，例如默认发行版类型、默认发行版和内核版本。

### Help 命令

PowerShell 复制

```
wsl --help
```

查看 WSL 中可用的选项和命令列表。

### 以特定用户的身份运行

PowerShell 复制

```
wsl -u <Username>`, `wsl --user <Username>
```

若要以指定用户身份运行 WSL，请将 `<Username>` 替换为 WSL 发行版中存在的用户名。

### 更改发行版的默认用户

PowerShell 复制

```
<DistributionName> config --default-user <Username>
```

更改用于发行版登录的默认用户。用户必须已经存在于发行版中才能成为默认用户。

例如：`ubuntu config --default-user johndoe` 会将 Ubuntu 发行版的默认用户更改为 "johndoe" 用户。

备注

如果在确定发行版名称时遇到问题，请使用命令 `wsl -l`。

警告

此命令不适用于导入的发行版，因为这些发行版没有可执行启动器。可以改为使用 `/etc/wsl.conf` 文件来更改

导入的发行版的默认用户。请参阅

[高级设置配置](https://docs.microsoft.com/zh-cn/windows/wsl/wsl-config#user-settings) 文档中的 " 自

动装载 " 选项。

### 关闭

PowerShell 复制

```
wsl --shutdown
```

立即终止所有正在运行的发行版和 WSL 2 轻量级实用工具虚拟机。在需要重启 WSL 2 虚拟机环境的情形下，例如

[更改内存使用限制](https://docs.microsoft.com/zh-cn/windows/wsl/vhd-size) 或更改

 [.wslconfig 文件](https://docs.microsoft.com/zh-cn/windows/wsl/manage#)，可能必须使用此命令。

### Terminate

PowerShell 复制

```
wsl --terminate <Distribution Name>
```

若要终止指定的发行版或阻止其运行，请将 `<Distribution Name>` 替换为目标发行版的名称。

### 将发行版导出到 TAR 文件

PowerShell 复制

```
wsl --export <Distribution Name> <FileName>
```

将分发版导出到 tar 文件。在标准输出中，文件名可以是 -。

### 导入新发行版

PowerShell 复制

```
wsl --import <Distribution Name> <InstallLocation> <FileName>
```

导入指定的 tar 文件作为新的分发版。在标准输入中，文件名可以是 -。 `--version` 选项还可与此命令一起使

用，用于指定导入的发行版将在 WSL 1 还是 WSL 2 上运行。

### 注销或卸载 Linux 发行版

尽管可以通过 Microsoft Store 安装 Linux 发行版，但无法通过 Store 将其卸载。

注销并卸载 WSL 发行版：

PowerShell 复制

```
wsl --unregister <DistributionName>
```

如果将 `<DistributionName>` 替换为目标 Linux 发行版的名称，则将从 WSL 取消注册该发行版，以便可以重新

安装或清理它。 **警告：**取消注册后，与该分发版关联的所有数据、设置和软件将永久丢失。从 Store 重新安

装会安装分发版的干净副本。例如：`wsl --unregister Ubuntu` 将从可用于 WSL 的发行版中删除 Ubuntu。运行

 `wsl --list` 将会显示它不再列出。

还可以像卸载任何其他应用商店应用程序一样卸载 Windows 计算机上的 Linux 发行版应用。若要重新安装，请在

Microsoft Store 中找到该发行版，然后选择 " 启动 "。

### 装载磁盘或设备

PowerShell 复制

```
wsl --mount <DiskPath>
```

通过将 `<DiskPath>` 替换为物理磁盘所在的目录\文件路径，在所有 WSL2 发行版中附加和装载该磁盘。请参阅

[在 WSL 2 中装载 Linux 磁盘](https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-mount-disk)。选项包

括：

- `wsl --mount --bare`：将磁盘附加到 WSL2，但不进行装载。
- `wsl --mount --type <Filesystem>`：装载磁盘时使用的文件系统类型默认为 ext4（如果未指定）。此命令也
  可输入为：`wsl --mount -t <Filesystem>`。可以使用 `blkid <BlockDevice>` 命令检测文件系统类型，例
  如：`blkid <dev/sdb1>`。
- `wsl --mount --partition <Partition Number>`：要装载的分区的索引号默认为整个磁盘（如果未指定）。
- `wsl --mount --options <MountOptions>`：装载磁盘时，可以包括一些特定于文件系统的选项。例
  如，`wsl --mount -o "data-ordered"` 或 `wsl --mount -o "data=writeback` 之类的
   [ext4 装载选项](https://www.kernel.org/doc/Documentation/filesystems/ext4.txt)。但是，目前仅支持
  特定于文件系统的选项。不支持通用选项，例如 `ro`、`rw` 或 `noatime`。
- `wsl --unmount <DiskPath>`：从所有 WSL 2 发行版中卸载和分离磁盘。如果未包含 `<DiskPath>`，则此命令
  将卸载并分离所有装载的磁盘。

备注

如果你正在运行 32 位进程来访问 wsl.exe（一种 64 位工具），那么你可能需要按如下方式运行此命

令：`C:\Windows\Sysnative\wsl.exe --command`。

### 已弃用的 WSL 命令

PowerShell 复制

```
wslconfig.exe [Argument] [Options]
```

PowerShell 复制

```
bash [Options]
```

PowerShell 复制

```
lxrun /[Argument]
```

这些命令是用于配置随 WSL 安装的 Linux 发行版的原始 wsl 语法，但已替换为 `wsl` 或 `wsl.exe` 命令语

法。

#### 参考

- [WSL 的基本命令 | Microsoft Docs](https://docs.microsoft.com/zh-cn/windows/wsl/basic-commands#install-a-specific-linux-distribution)
