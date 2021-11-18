---
title: git
date: 2020-03-06 20:09:10
tags: git
toc: true
categories:
  - 代码托管
  - git
---

#### git 生成 ssh

1，查看是否设置用户名及邮箱：

```js
git config user.name  // 查看用户名

git config user.email // 查看邮箱
```

2，设置用户名及邮箱：

```js
git config --global user.name "xxxxx" // 设置用户名

git config --global user.email "xxxxx" // 设置邮箱
```

<!-- more -->

3，查看是否配置过 ssh 文件：

```js
cd ~/.ssh
```

> 如果存在就能进入，说明已经创建过 ssh key 了，就不需要进行下面的步骤生成 ssh key 了。否则就不存在就说明还没有生成 ssh，使用如下步骤生成。

4，生成 ssh key：

```js
ssh-keygen -t rsa -C "你的邮箱地址"
```

> 此处会提示 Enter file in which to save the key (/Users/shutong/.ssh/id_rsa): 这样一段内容，让我们输入文件名，如果第 3 步的 ssh 文件存在的话最好在这里修改一下文件名以防覆盖之前的内容，如果第 3 步的 ssh 文件不存在的话则直接按 enter 键就好了。
>
> 之后会有提示你是否需要设置密码，如果设置了每次使用 Git 都会用到密码，一般都是直接不写为空，直接 enter 就好了。

5，查看生成的 ssh 公钥：

```js
cat ~/.ssh/id_rsa.pub
```

#### git 删除远程分支

1，使用如下命令查看远程分支：

```js
git branch -r
```

2，使用如下命令删除查到的远程分支：

```js
git push origin --delete [branch_name]
```

#### github 没有提交记录解决方式

1，出现问题的原因：本地 ssh 生成的邮箱与 github 上的邮箱不一致导致。

2，处理方式：

- 在需要提交到 github 的项目中使用 **git config user.name '用户名'** 生成局部用户名。使用 **git config user.email '邮箱'** 生成局部邮箱。

- 再使用 **ssh-keygen -t rsa -C "刚设置的邮箱地址"** 生成 ssh 公钥，生成的公钥最好改一下名称，否则会覆盖原来的。

3，最后将生成的 ssh 公钥设置到 github 中，或者将全局的 ssh 公钥中处于公钥最后位置的邮箱地址修改为刚刚设置的局部邮箱地址也能达到相同的目的。

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDCfmlAt2plCVbeObPxuWawsQovYcoanwwRZKVnA5O/oMnGsyzjUWl+4dLOnSHmOo6dtEa9TDTZO7eWXtkVjMSLHyGTm5QvzrX31r/kbkhC0E23ZUqB4uA8Re0fPnDWC8O1sFVvD1QGd1qjs+hQS/sM0b+prwE0vWueM0zhuKpffjqSsbac9+6TkaCvGcaVvFIMNUWhGkhNWA4OjjhXTJEuDCwH+hT0orxzO/mW9Si3aHJtXi0xptiX3zzTNFFO9gYmnH80KGgwwlMrbRC+SPlFBzGQybniN9quhzs7VYwOffY3jcCM81NRrdR+K9sJF+A6/F2xV3VP+WAIjh1TQtVck2FF3k/BdqMuVI4yo2JBHrhUG7apSwTN7vwasou3CGL4wygQatt+tdsGSDGyuQvVkImqPgBvS54fWzGb36pq4vI9Ix/eLbVaunOwy+NnZGm1NU0oj1w203GS6OfO7yguxuoheeGoESn/tiTmgcjkHbxNnl6oeCok= xxx@xx.com
```

- 即将上述 ssh 公钥中的邮箱：**xxx@xx.com** 换成刚刚设置邮箱地址即可设置到 github 中生效。

#### git 合并分支

1、git rebase -i HEAD~「需要合并的数量」进行合并：

```js
// 方式一：指定合并条数
git rebase -i HEAD~10

// 方式二：选中最近的
git rebase -i HEAD^^
```

- 当使用 git rebase -i HEAD~「需要合并的数量」命令时，会进入 vim 编辑界面，将内容更改为如下形式，只保留第一个 pick，之后所有 pick 改为 s，具体如下：

```js
pick dsa123ws 更改xxx

s sdsad211 xxxxx

s sdsad211 xxxxx

s sdsad211 xxxxx

...
```

2、git rebase --abort 撤销合并。

3、当有冲突时的操作：

- 首先使用 git add .，之后使用 git rebase --continue 保存：

```js
git add .

git rebase --continue
```

#### 获取指定的 commit

1、使用 **git cherry-pick** 可以获取指定的 commit。 可以理解为 "挑拣" 提交，和 merge 合并一个分支的所有提交不同的是，它会获取某一个分支的单笔提交，并作为一个新的提交引入到你当前分支上。当需要在本地合入其他分支的提交时，如果不想对整个分支进行合并，而是只想将某一次提交合入到本地当前分支上，那么就要使用 git cherry-pick 了。

2、cherry-pick 语法为：**git cherry-pick commit_id**。

3、当执行 `git cherry-pick commit_id` 过程中出现冲突冲突，解决完冲突后，依次执行 `git add`、`git cherry-pick --continue`即可完成本次提交的挑拣。

#### git 版本回退

1、**git reset --hard commit_id**：该命令会把要回退版本之后提交的修改都删除掉，如在 master 分支上，有以下提交记录:

```
42eae13 (HEAD -> master) 第四次修改
97ea0f9 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改
```

- 当发现，在第四次修改有错误，需要回滚到第三次修改时，就可以用 reset 命令来回退。此时执行 `git reset --hard 97ea0f9` 命令，git 提交记录就会变为：

```
97ea0f9 (HEAD -> master) 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改
```

- 执行 git reset 命令之后，42eae13（第四次修改）将消失在历史提交记录中，此时想要再次回退到第四次修改时，需要使用 **git reflog** 获取操作记录，根据操作记录中显示的第四次修改的 commit_id 进行回退，完整操作过程如下：

```
git reflog

git reset --hard 42eae13
```

- 当发现第三次修改有错误，想要回到第三次修改，但同时要保留第四次修改时，就需要使用 **git revert -n 97ea0f9** 进行回退了。完整操作如下：

```
git revert -n 97ea0f9
git commit -m "恢复第三次修改"
```

> -n 等价于 --no-commit，表示 revert 之后不自动进行 commit，而是需要自己手动进行 commit 提交。

- 执行上述命令之后，git 提交记录会变成：

```
33b8b30 (HEAD -> master) Revert "恢复第三次修改"
42eae13 第四次修改
97ea0f9 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改
```

> 实际上，git 把第三次修改从提交中剔除（还原）了，还保留了第四次修改，并且产生了新的 commit_id。

2、**git revert**：

- `git revert commit_id`：表示回退到指定 commit_id 的版本。

- `git revert --no-commit HEAD~number^..HEAD`：表示从 HEAD 开始回退到 HEAD~number^。

```
git revert --no-commit HEAD~2^..HEAD

等价于

git revert --no-commit HEAD~3..HEAD

等价于

git revert --no-commit HEAD HEAD~1 HEAD~2
```

- 在 master 分支上有如下提交记录时：

```
A1 ---> A2 ---> A3 ---> A4 ---> A5 ---> A6
```

- 上述提交记录需要 revert A4 到 A6，此时范围表示为 HEAD~2^..HEAD 或者 HEAD~3..HEAD。当执行完 `git revert --no-commit HEAD~2^..HEAD` 时，commit 提交记录将变为：

```
A1 ---> A2 ---> A3 ---> A4 ---> A5 ---> A6 ---> A3'
```

> 此时 A4，A5，A6 依然在历史里，新的 A3' commit 就是 revert 掉 A4，A5，A6 之后的结果，其实就是 A3 的状态，但历史都保留了。

3、假如现在有三个提交，但很不巧的是，那个错误的提交刚好位于中间。如下图示：

![版本回退](git1.png)

- 上图中可以看出，B 是错误提交，而 C 提交是没问题的，此时就需要先把 B、C 都使用 revert 进行回退掉，在使用 `git cherry-pick C` 命令将 C 重新再生成一个新的提交 C''，这样就实现了将 B 提交回退，而保留 C 提交的需求了。完整过程如下图：

![版本回退](git2.png)

4、git reset 与 git revert 的区别：

- git revert 是用一次新的 commit 来回滚到之前的 commit，而 git reset 是直接删除指定的 commit。

- 在回滚这一操作上看，这两者效果差不多。但是在之后继续 merge 以前的老版本时有区别。因为 git revert 是用一次逆向的 commit 中和之前的提交，因此之后合并老的 branch 时，这部分改变不会再次出现，可以减少冲突。但是 git reset 是之间把某些 commit 在某个 branch 上删除，因而和老的 branch 再次 merge 时，这些被回滚的 commit 应该还会被引入，会产生很多冲突。、

- git reset 是把 HEAD 向后移动了一下，而 git revert 是 HEAD 继续前进，只是新的 commit 的内容和要 revert 的内容正好相反，能够抵消要被 revert 的内容。

#### git 打 tag

1、使用 `git tag` 命令可以列出已有的 tag。

2、使用 `git tag v1.1.0` 进行新建 tag。

3、使用 `git push origin v1.1.0` 将新建的 tag 推送到远程服务器。

4、使用 `git tag -d v1.1.0` 删除本地某个 tag。

5、使用 `git push origin :refs/tags/v1.1.0` 删除远程某个 tag。

#### vim 命令相关

1、多选：v + 上下键。

2、更改每行开头的指定内容：

- 首先输入英文模式下的「：」。

- 之后输入「起始行数,终止行数」s/^pick/s（如：2，10 s/^pick/s 则表示将 2 到 10 行开头的 pick 全部改为 s）：

```js
:2,10 s/^pick/s
```
