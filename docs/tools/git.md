# Git

## Bitwarden代理ssh后git推送问题

确保git调用的ssh环境和现在使用的环境相同

```bash
:: 先查看当前系统的使用的ssh
where ssh

::  配置git使用系统的ssh，猜测默认调用Git\usr\bin下的ssh
git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"
```

## git不区分文件名大小写的问题

默认git不区分文件名大小写，git config core.ignorecase -> true
先查看git跟踪了哪个文件，防止中途没有使用git mv修改文件名后，导致追踪的文件丢失的问题
```bash
git ls-files
```

正确的做法是用临时文件名进行大小写重命名
```bash
git mv Header.tsx temp.tsx
git mv temp.tsx header.tsx
```


## 将当前提交追加到上一个提交中

```bash
REM 添加到暂存区
git add .

REM 如果需要更改message，那么不需要--no-edit参数
git commit --amend --no-edit
```

```bash
REM 修改后会改变commitID，推送时需要加--force-with-lease
git push --force-with-lease
```