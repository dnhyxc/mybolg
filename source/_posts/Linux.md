---
title: Linux
date: 2021-10-24 21:59:38
tags: Linux
toc: true
declare: true
categories:
  - 操作系统
---

### Linux 简介

#### Linux 系统内核与 Linux 发行套件的区别

1、Linux 系统内核指的是由 Linus Torvalds 负责维护，提供硬件抽象层、硬盘及文件系统控制及多任务功能的系统核心程序。

2、Linux 发行套件系统是我们常说的 Linux 操作系统，也即是由 Linux 内核与各种常用软件的集合产品。

3、**总结**：真正的 Linux 指的是系统内核，而我们常说的 Linux 指的是“发行版完整的包含一些基础软件的操作系统”。

#### Linux 对比 Windows

1、稳定且有效率。

2、免费（或少许费用）。

3、漏洞少且快速修补。

<!-- more -->

4、多任务多用户。

5、更加安全的用户与文件权限策略。

6、适合小内核程序的嵌入系统。

7、相对不耗资源。

#### Linux 系统种类

1、红帽企业版 Linux：RHEL 是全世界内使用最广泛的 Linux 系统。它具有极强的性能与稳定性，是众多生成环境中使用的（收费的）系统。

2、CentOS：通过把 RHEL 系统重新编译并发布给用户免费使用的 Linux 系统，具有广泛的使用人群。

3、Ubuntu：是一款派生自 Debian 的操作系统，对新款硬件具有极强的兼容能力。 Ubuntu 与 Fedora 都是极其出色的 Linux 桌面系统，而且 Ubuntu 也可用于服务器领域。

4、Debian：稳定性、安全性强，提供了免费的基础支持，在国外拥有很高的认可度和使用率。

5、Deepin：中国发行，对优秀的开源成品进行集成和配置。

6、Fedora：由红帽公司发布的桌面版系统套件，用户可以免费体验到最新的技术或工具，这些技术或工具在成熟后会被加入到 RHEL 系统中，因此 Fedora 也成为 RHEL 系统的试验版本。

#### Linux 快捷方式

1、通过上下方向键可以调取过往执行过的命令。

2、命令或参数仅需输入前几位就可以使用 Tab 键自动补全。

3、ctrl + R：用于查找使用过的命令（history 命令用于列出之前使用过的所有命令，然后输入 `!` 命令加上编号如 `!2` 就可以执行该历史命令）。

4、ctrl + l：清除屏幕并将当前行移动到页面顶部。

5、ctrl + c：终止当前正在执行的命令。

6、ctrl + u：从光标位置剪切到行首。

7、ctrl + k：从光标位置剪切到行尾。

8、ctrl + w：剪切光标左侧的一个单词。

9、ctrl + y：粘贴剪切的内容。

10、ctrl + a：光标跳到命令行的开头。

11、ctrl + d：关闭 shell 会话。

### 文件及目录

#### 常见目录说明

1、**bin**：存放二进制可执行文件(ls,cat,mkdir 等)，常用命令一般都在这里。

2、**etc**：存放系统管理和配置文件。

3、**home**：存放所有用户文件的根目录，是用户主目录的基点，比如用户 user 的主目录就是/home/user，可以用~user 表示。

4、**usr**：用于存放系统应用程序。

5、**opt**：额外安装的可选应用程序包所放置的位置。一般情况下，我们可以把 tomcat 等都安装到这里。

6、**proc**：虚拟文件系统目录，是系统内存的映射。可直接访问这个目录来获取系统信息。

7、**root**：超级用户（系统管理员）的主目录，即 root 用户的家目录。

8、**sbin**：存放二进制可执行文件，只有 root 才能访问。这里存放的是系统管理员使用的系统级别的管理命令和程序。如 ifconfig 等。

9、**dev**：主要用于存放外接设备，例如：盘、其它的光盘等。在其中的外接设备是不能直接被使用的需要挂载（类型 windows 下的分配盘符）。

10、**mnt**：系统管理员安装临时文件系统的安装点，系统提供这个目录是让用户临时挂载其他的文件系统。

11、**boot**：存放用于系统引导时使用的各种文件。

12、**lib**：存放着和系统运行相关的库文件。

13、**tmp**：用于存放各种临时文件，是公用的临时文件存储点。

14、**var**：用于存放运行时需要改变数据的文件，也是某些大文件的溢出区，比方说各种服务的日志文件（系统启动日志等。）等。

15、**lost+found**：这个目录平时是空的，系统非正常关机而留下“无家可归”的文件就在这里。

#### 查看路径

##### pwd

1、该命令用于显示当前目录的路径。

##### which

1、查看命令的可执行文件所在路径， 在 Linux 下，每一条命令其实都对应一个可执行程序，在终端中输入命令，按回车的时候，就是执行了对应的那个程序， which 命令本身对应的程序也存在于 Linux 中。总的来说一个命令就是一个可执行程序。

```js
[root@dnhyxc ~]# which node
/usr/local/bin/node
```

#### 浏览和切换目录

##### ls

1、该命令用于列出文件和目录。

2、常用参数：

- -a：显示所有文件和目录包括隐藏的文件或目录。

- -l：显示详细列表。

- -h：显示适合人类阅读的格式。

- -t：按文件最近一次修改时间排序。

- -i：显示文件的 inode（inode 是问价内容的标识）。

##### cd

1、cd 是英文 change directory 的缩写，表示切换目录。

```js
cd /  // 跳转到根目录

cd ~  //  跳转到家目录

cd .. // 跳转到上级目录

cd ./home // 跳转到当前目录的home目录下

cd /home/lion // 跳转到根目录下的home目录下的lion目录
cd  // 不添加任何参数，也是回到家目录
```

> 输入 cd /ho + 单次 tab 键会自动补全路径，+ 两次 tab 键会列出所有可能的目录列表。

##### du

1、该命令用于列举目录大小信息。

2、常用参数：

- -h：适合人类阅读的格式。

- -a：同时列举出目录下文件的大小信息。

- -s：只显示总计大小，不显示具体信息。

#### 浏览和创建文件

##### cat

1、一次性显示文件的所有内容，适合查看比较小的文件。

2、常用参数：

- -n：显示行号。

```js
cat cloud-init.log
```

##### less

1、分页显示文件内容，更适合查看大的文件。

```js
less cloud-init.log
```

2、快捷操作：

- 空格键：前进一页（一个屏幕）。

- b 键：后退一页。

- 回车键：前进一页。

- y 键：后退一行。

- 上下键：回退或前进一行。

- d 键：前进半页。

- u 键：后退半页。

- q 键：停止读取文件，终止 less 命令。

- = 键：显示当前页面的内容是文件中的第几行到第几行以及一些其它关于本页内容的详细信息。

- h 键：显示帮助文档。

- / 键：进入搜索模式后，按 n 键跳到一个符合项目，按 N 键跳到上一个符合项目，同时也可以输入正则表达式进行匹配。

##### head

1、显示文件的开头几行（默认是 10 行）。

2、常用参数：

- -n：用于指定行数 `head cloud-init.log -n 2`。

##### tail

1、用于显示文件的结尾几行（默认是 10 行）。

2、常用参数：

- -n：用于指定行数 `tail cloud-init.log -n 2`。

- -f：每过 1 秒检查文件是否有更新内容，也可以用 -s 参数指定间隔时间 `tail -f -s 4 xxx.log`。

##### touch

1、用于创建一个文件。

```js
touch new_file
```

##### mkdir

1、用于创建一个目录。

```js
mkdir new_folder
```

2、常用参数：

- -p：递归的创建目录结构 `mkdir -p one/two/three`。

#### 文件的复制和移动

##### cp

1、用于拷贝文件和目录。

2、常用参数：

- -r：递归的拷贝，常用来拷贝整个目录。

```js
cp file file_copy // file 是目标文件，file_copy 是拷贝出来的文件

cp file one // 把 file 文件拷贝到 one 目录下，并且文件名依然为 file

cp file one/file_copy // 把 file 文件拷贝到 one 目录下，文件名为file_copy

cp *.txt folder // 把当前目录下所有 txt 文件拷贝到 folder 目录下
```

##### mv

1、用于移动（重命名）文件或目录，与 cp 命令用法相似。

```js
mv file one // 将 file 文件移动到 one 目录下

mv new_folder one // 将 new_folder 文件夹移动到one目录下
mv *.txt folder // 把当前目录下所有 txt 文件移动到 folder 目录下
mv file new_file  // file 文件重命名为 new_file
```

#### 文件的删除和链接

##### rm

1、用于删除文件和目录，由于 Linux 下没有回收站，一旦删除非常难恢复，因此需要谨慎操作。

2、常用参数：

- -i：向用户确认是否删除。

- -f：文件强制删除。

- -r：递归删除文件夹，著名的删除操作 `rm -rf`。

```js
rm new_file // 删除 new_file 文件
rm f1 f2 f3 // 同时删除 f1 f2 f3 3个文件
```

##### ln

1、link 的缩写，表示创建链接。

2、常用参数：

- -s：用于创建软链接。

#### Linux 存储文件的方式

1、Linux 文件的存储方式分为 3 个部分，文件名、文件内容以及权限，其中文件名的列表是存储在硬盘中的，和文件内容是分开的，每个文件名通过 **inode** 标识绑定文件内容。

2、Linux 两种链接方式：

- **硬链接**：使链接的两个文件共享同样文件内容，就是同样的 inode，一旦文件 1 和文件 2 之间有了硬链接，那么修改任何一个文件，修改的都是同一块内容，它的缺点是，只能创建指向文件的硬链接，而如果要创建指向目录的链接就很复杂。而软链接既可以创建指向文件的链接，也可以创建指向目录的链接。因此软连接使用更加广泛。

```
ln file1 file2  创建 file2 为 file1 的硬链接

文件1 -----------------> inode 标识
                          10100110
                          10100110
                          10100110
                            ⬆
                            |
                            |
文件2 ---------------------->
```

> 如上图所示，如果用 rm file1 删除 file1，对 file2 没什么影响，对于硬链接来说，删除任意一方文件，共同指向的文件内容并不会从硬盘中删除，只有同时删除了 file1 和 file2 后，它们共同指向的文件内容才会消失。

- **软连接**：软链接就类似于 windows 中创建的快捷方式。

```
ln -s file1 file2

文件1 ---------------------->  inode 标识
  ⬆                             10100110
  |                             10100110
  |                             10100110
  |
文件2
```

- 此时执行 `ls -l` 命令查看当前目录下的文件具体信息如下：

```
total 0
-rw-r--r-- 1 root root 0 Jan 14 06:29 file1
lrwxrwxrwx 1 root root 5 Jan 14 06:42 file2 -> file1  # 表示file2 指向 file1
```

> 其实 file2 只是 file1 的一个快捷方式，它指向的是 file1，所以显示的是 file1 的内容，但其实 file2 的 inode 与 file1 并不相同。如果删除了 file2 的话，file1 不会受到影响，但如果删除了 file1 的话，file2 就会变成死链接，因为指向的文件不见了。

#### 查找文件

##### locate

1、搜索包含关键字的所有文件和目录，后面接上需要查找的文件名，也可以用正则表达式。

2、安装 locate：

```js
yum -y install mlocate  // 安装包
updatedb  // 更新数据库

locate file.txt
locate fil*.txt
```

> **注意**：locate 命令会去文件数据库中查找，而不是全盘查找，而刚创建的文件并不会更新到数据库中，所以无法被查到，可以执行 **updatedb** 命令去更新数据库。

##### find

1、用于查找文件、它回去遍历实际的硬盘进行查找，而且它允许对每个找到的文件进行后续操作，功能非常强大。

```
find <何处> <何物> <做什么>
```

- 何处：指定在哪个目录查找，此目录的所有子目录也会被查找。

- 何物：查找什么，可以根据文件的名字来查找，也可以根据其大小来查找，还可以根据其最近访问时间来查找。

- 做什么：找到文件后，可以进行后续处理，如果不指定这个参数，find 命令只会显示找到的文件。

2、根据文件名查找：

```js
find -name "file.txt" // 当前目录以及子目录下通过名称查找文件

find . -name "syslog" // 当前目录以及子目录下通过名称查找文件

find / -name "syslog" // 整个硬盘下查找syslog

find /var/log -name "syslog"  // 在指定的目录/var/log下查找syslog文件

find /var/log -name "syslog*" // 查找syslog1、syslog2 ... 等文件，通配符表示所有

find /var/log -name "*syslog*"  // 查找包含syslog的文件
```

3、根据文件大小查找：

```js
find /var -size +10M  // /var 目录下查找文件大小超过 10M 的文件

find /var -size -50k  // /var 目录下查找文件大小小于 50k 的文件

find /var -size +1G // /var 目录下查找文件大小查过 1G 的文件

find /var -size 1M  // /var 目录下查找文件大小等于 1M 的文件
```

4、根据文件最近访问时间查找：

```js
find -name "*.txt" -atime -7  // 近 7天内访问过的.txt结尾的文件
```

5、仅查找目录或文件：

```js
find . -name "file" -type f // 只查找当前目录下的file文件

find . -name "file" -type d // 只查找当前目录下的file目录
```

6、操作查找结果：

```js
find -name "*.txt" -printf "%p - %u\n"  // 找出所有后缀为txt的文件，并按照 %p - %u\n 格式打印，其中%p=文件名，%u=文件所有者

find -name "*.jpg" -delete  // 删除当前目录以及子目录下所有.jpg为后缀的文件，不会有删除提示，因此要慎用

find -name "*.c" -exec chmod 600 {} \;  // 对每个.c结尾的文件，都进行 -exec 参数指定的操作，{} 会被查找到的文件替代，\; 是必须的结尾

find -name "*.c" -ok chmod 600 {} \;  // 和上面的功能一样，会多一个确认提示
```

### 用户与权限

#### 用户

1、Linux 是一个多用户的操作系统。在 Linux 中，理论上来说，我们可以创建无数个用户，但是这些用户是被划分到不同的群组里面的，有一个用户，名叫 root ，是一个很特殊的用户，它是超级用户，拥有最高权限。

2、自己创建的用户是有限权限的用户，这样大大提高了 Linux 系统的安全性，有效防止误操作或是病毒攻击，但是我们执行的某些命令需要更高权限时可以使用 **sudo** 命令。

##### sudo

1、使用该命令可使自己创建的用户以 root 身份运行命令。

```js
sudo shutdown   // 关机
```

##### useradd 与 passwd

1、useradd：用于添加新用户。

2、passwd：用于修改用户密码。

```js
sudo useradd dnhyxc // 添加一个lion用户，添加完之后在 /home 路径下可以查看
sudo passwd dnhyxc  // 修改lion用户的密码
```

> 说明：这两个命令需要 root 用户权限才能执行成功。

##### userdel

1、userdel：用于删除用户，需要 root 用户权限。

```js
userdel dnhyxc	// 只会删除用户名，不会从/home中删除对应文件夹
userdel dnhyxc -r	// 会同时删除/home下的对应文件夹
```

##### su

1、用于切换用户，需要 root 用户权限。

```js
sudo su   // 切换为root用户（exit 命令或 CTRL + D 快捷键都可以使普通用户切换为 root 用户）
su dnhyxc   // 切换为普通用户
su -	// 切换为root用户
```

#### 群组管理

1、Linux 中每个用户都属于一个特定的群组，如果你不设置用户的群组，默认会创建一个和它的用户名一样的群组，并且把用户划归到这个群组。

##### groupadd

1、groupadd：用于创建群组，用法和 useradd 类似。

```js
groupadd friends  // 创建friends群组
```

##### groupdel

1、groupdel：用于删除一个已存在的群组。

```js
groupdel friends 	// 删除foo群组
```

##### groups

1、groups：用于查看用户所在群组。

```js
groups dnhyxc   // 查看 lion 用户所在的群组
```

##### usermod

1、usermod：用于修改用户的账户。

2、常用参数：

- `-l`：对用户重命名。需要注意的是 /home 中的用户家目录的名字不会改变，需要手动修改。

- `-g`：修改用户所在的群组，例如 `usermod -g friends dnhyxc` 修改 dnhyxc 用户的群组为 friends 。

- `-G`：一次性让用户添加多个群组，例如 `usermod -G friends,foo,bar dnhyxc` 。

- `-a -G`：会让你离开原先的群组，如果你不想这样做的话，就得再添加 -a 参数，意味着 append 追加的意思。

##### chgrp

1、用于修改文件的群组。

```js
chgrp bar file.txt	// file.txt文件的群组修改为bar
```

##### chown

1、用于改变文件的所有者，需要 root 身份才能运行。

```js
chown dnhyxc file.txt	  // 把其它用户创建的file.txt转让给dnhyxc用户
chown dnhyxc:bar file.txt	  // 把file.txt的用户改为dnhyxc，群组改为bar
```

2、常用参数：

- `-R`：递归设置子目录和子文件， `chown -R dnhyxc:dnhyxc /home/frank` 把 frank 文件夹的用户和群组都改为 dnhyxc 。

#### 文件权限管理

##### chmod

1、chmod：用于修改访问权限。

```js
chmod 740 file.txt
```

2、常用参数：

- `-R`：可以递归地修改文件访问权限，例如 chmod -R 777 /home/dnhyxc。

##### Linux 的文件权限

1、以下方记录为例，**drwxr-xr-x** 表示文件或目录的权限。

```js
[root@dnhyxc ~]# ls -l
drwxr-xr-x 5 root root 4096 Apr 13  2020 climb
lrwxrwxrwx 1 root root    7 Jan 14 06:41 hello2.c -> hello.c
-rw-r--r-- 1 root root  149 Jan 13 06:14 hello.c
```

2、具体说明如下：

- d：表示目录，就是说这是一个目录，普通文件是 `-` ，链接是 `l` 。

- r：read 表示文件可读。

- w：write 表示文件可写，一般有写的权限，就有删除的权限。

- x：execute 表示文件可执行。

- -：表示没有相应权限。

3、数字分配权限：

- r：对应 4。

- w：对应 2。

- x：对应 1。

4、可以使用 **chmod** 进行权限修改，该命令不是 root 用户也能执行，只要是此文件的所有者就可以用 chmod 来修改文件的访问权限了。具体操作如下：

```html
chmod 640 hello.txt # 分析 6 = 4 + 2 + 0 表示所有者具有 rw 权限 4 = 4 + 0 + 0
表示群组用户具有 r 权限 0 = 0 + 0 + 0 表示其它用户没有权限
对应文字权限为：-rw-r-----
```

5、字母所代表权限含义：

- u：user 的缩写，表示所有者。

- g：group 的缩写，表示群组用户。

- o：other 的缩写，表示其他用户。

- +：加号，表示添加权限。

- -：减号，表示去除权限。

- =：等号，表示分配权限。

6、用字母分配权限具体做法如下：

```js
chmod u+rx file // 文件file的所有者增加读和运行的权限

chmod g+r file  // 文件file的群组用户增加读的权限

chmod o-r file  // 文件file的其它用户移除读的权限

chmod g+r o-r file  // 文件file的群组用户增加读的权限，其它用户移除读的权限

chmod go-r file // 文件file的群组和其他用户移除读的权限

chmod +x file // 文件file的所有用户增加运行的权限

chmod u=rwx,g=r,o=- file  // 文件file的所有者分配读写和执行的权限，群组其它用户分配读的权限，其他用户没有任何权限
```

### 软件仓库

#### 软件仓库概述

1、Linux 下软件是以包的形式存在的，一个软件包其实就是软件的所有文件的压缩包，是二进制的形式，包含了安装软件的所有指令。`Red Hat` 家族的软件包后缀名一般为 `.rpm`，`Debian` 家族的软件包后缀是 `.deb`。

2、Linux 的包都存在一个仓库，叫做软件仓库，它可以使用 **yum** 来管理软件包，yum 是 CentOS 中默认的包管理工具，适用于 `Red Hat` 一族。可以理解成 nodejs 的 npm。

#### yum 常用命令

1、**yum update | yum updrade**：用于更新软件包。

2、**yum search xxx**：用于搜索相应的软件包。

3、**yum install xxx**：用于安装软件包。

4、**yum remove xxx**：用于删除软件包。

#### 切换 CentOS 软件源

1、有时候 CentOS 默认的 yum 源不一定是国内镜像，导致 yum 在线安装及更新速度不是很理想，这时候需要将 yum 源设置为国内镜像站点。国内主要开源的镜像站点是网易和阿里云。

2、具体操作过程如下：

- 首先备份系统自带的 yum 源文件 `mv /etc/yum.repos.d/entOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup`：

```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

- 下载阿里云的 yum 源配置文件到 `/etc/yum.repos.d/CentOS7`：

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

- 最后生成缓存：

```
yum makecache
```

### 阅读手册

#### Linux 命令查找

1、Linux 命令种类繁杂，我们凭借记忆不可能全部记住，可以通过 **man** 指令查找相关命令的用法。

#### man 手册种类

1、可执行程序或 Shell  命令。

2、系统调用（ Linux  内核提供的函数）。

3、库调用（程序库中的函数）。

4、文件（例如 /etc/passwd ）。

5、特殊文件（通常在 /dev  下）。

6、游戏。

7、杂项（ man(7) ，groff(7) ）。

8、系统管理命令（通常只能被 root  用户使用）。

9、内核子程序。

#### man + 数字 + 命令

1、输入 man + 数字 + 命令/函数，可以查找相关的命令和函数，若不加数字，man 默认从数字较小的手册中寻找相关命令和函数。

```js
man 3 rand  // 表示在手册的第三部分查找 rand 函数
man ls  // 查找 ls 用法手册
```

2、man 手册核心区域解析（以 man pwd 为例）：

```
NAME # 命令名称和简单描述
     pwd -- return working directory name

SYNOPSIS # 使用此命令的所有方法
     pwd [-L | -P]

DESCRIPTION # 包括所有参数以及用法
     The pwd utility writes the absolute pathname of the current working directory to the standard output.

     Some shells may provide a builtin pwd command which is similar or identical to this utility.  Consult the builtin(1) manual page.

     The options are as follows:

     -L      Display the logical current working directory.

     -P      Display the physical current working directory (all symbolic links resolved).

     If no options are specified, the -L option is assumed.

SEE ALSO # 扩展阅读相关命令
     builtin(1), cd(1), csh(1), sh(1), getcwd(3)

```

#### help

1、man 命令像新华词典一样可以查询到命令或函数的详细信息，但其实我们还有更加快捷的方式去查询， command --help 或 command -h ，它没有 man 命令显示的那么详细，但是它更加易于阅读。

### Linux 高级

#### 文本操作

##### grep

1、全局搜索一个正则表达式，并且打印到屏幕。简单来说就是在文件中查找关键字，并显示关键字所在行。

2、基础用法：

```
grep text file # text代表要搜索的文本，file代表供搜索的文件

# 实例
[root@dnhyxc ~]# grep path /etc/profile
pathmunge () {
    pathmunge /usr/sbin
    pathmunge /usr/local/sbin
    pathmunge /usr/local/sbin after
    pathmunge /usr/sbin after
unset -f pathmunge
```

3、常用参数：

- -i：忽略大小写 `grep -i path /etc/profile`。

- -n：显示行号 `grep -n path /etc/profile`。

- -v：只显示搜索文本不在的那些行 `grep -v path /etc/profile`。

- -r：递归查找 `grep -r hello /etc` ，Linux 中还有一个 **rgrep** 命令，作用相当于 `grep -r`。

4、高级用法：

- grep 可以配合正则表达式使用：

```js
grep -E path /etc/profile // 完全匹配path
grep -E ^path /etc/profile  // 匹配path开头的字符串
grep -E [Pp]ath /etc/profile  // 匹配path或Path
```

### 
