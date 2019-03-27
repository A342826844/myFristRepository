git:
官网：git-scm.com

安装：
https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git

初次运行的配置
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com


检查配置信息
如果想要检查你的配置，可以使用 git config --list 命令来列出所有 Git 当时能找到的配置。
$ git config --list

别名
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
$ git config --global alias.ps push

git status  =>  git st

github(gayhub)不是git, 它只是一个git平台
gitee.com
coding.net

gitlab: 开源的git项目，用于部署私有的git平台  192.168.1.90/projectname  http://110.79.222.217:8080/projectname


"密钥对" 保存位置
用户目录/.ssh/

$ ssh-keygen 只需要通过这个命令回答问题的方式，就可以生成密钥对。 读法： ssh-key   gen => generator
  别看其它的方法了，这个方法最简单。

Generating public/private rsa key pair.
Enter file in which to save the key (/Users/Leo/.ssh/id_rsa):  这里一定是写带路径的名字/Users/Leo/.ssh/id_rsa_coding
在ssh目录下就会出现这样的
id_rsa_coding     id_rsa_coding.pub 公钥，用于放在coding上的

可以添加公钥到git平台

新建一个  (这里没有点)config(这里没有扩展名)  文件， 这个文件关联服务器和密钥对

Host git.dev.tencent.com（这里的地址是你的git地址）
User Leo （这里的名字随便写，别把我的名字也拷贝过去，虽然不犯法）
PreferredAuthentications publickey （注意一个字母都不能少，而且区分大小写）
IdentityFile ~/.ssh/id_rsa_coding (这个就是你要使用哪一个密钥对)





git init: 初始化一个git仓库，如果做错了，显示隐藏文件，删除.git目录
git status: 查看状态

git add 文件名: 添加某个文件
git add .(-A): 添加所有修改
git commit -m '写你的消息'


git log 查看提交历史  按字母 q（uit）退出
git diff(erence) 可以查看没add的不同

git remote add origin (git@git.dev.tencent.com:leochow/renzaoge.git 仓库地址)

git clone: 克隆远程仓库到本地

git branch 查看本地分支

git branch -r 查看远程分支

git branch -D 分支名 删除某个分支

git checkout 分支名： 切换到已有的分支

git checkout -b 分支名: 新建一个分支，并且切换到该分支

git push origin 远程分支名: 如果远程已经存在同名分支，则会有冲突或者合并，如果没有，就会创建一个远程分支，并且和当前分支是关联的

pull request(pr), 新建 合并请求

git rebase 基准分支： 变基到最新的那个基准分支


git多人修改同一文件，冲突问题（无法合并分支）解决：

    pre-1: 在基准分支（dev）上接取最新的代码 git pull origin dev
    pre-2: 切换到自己的分支上 git checkout lubing/home

    1. git rebase dev
    2. 解决冲突
    3. git add -A
    4. git rebase --continue
    5. 重复2，3，4
    6. 至到reabase完成

    7. 有可能本地自己的分支和远程分支还有冲突，这时候需要git pull ……  之后，解决冲突再push


vue demo地址： https://dev.tencent.com/u/leochow/p/renzaoge