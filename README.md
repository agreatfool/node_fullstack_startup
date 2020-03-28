node_fullstack_startup
======================

## 1. 项目目标
制作一个构建基于node.js的分布式微服务项目用的脚手架项目。

## 2. 文件夹解释
```
node_fullstack_startup /
                       | bash /                     # 脚本位置
                       |      | app.sh              # 使用 docker-compose 命令启动并运行整个项目的脚本
                       |      | consul.sh           # 使用 docker-compose 命令启动开发时使用的单例 consul
                       |      | docker_auth_gen.sh  # 用来生成 registry 秘钥的脚本
                       |      | docker_builder.sh   # 用来制作 node app 构建时使用的基础镜像的脚本
                       |      | docker_runner.sh    # 用来制作 node app 运行时使用的镜像的脚本
                       |      | git.sh              # 用来操作 gitea 的脚本，将 common、gateway、server 项目提交到 gitea
                       |      | gitea.sh            # 用来初始化和清理 gitea 内 common、gateway、server 项目
                       |      | local_build.sh      # 使用 docker-compose 命令启动开发和运行时使用的一些基础设施
                       |      | registry.sh         # 操作 docker registry 的一些命令，类似抓取项目库的 tags 等
                       | client     # client项目
                       | common     # 几个项目共享的同构代码
                       | gateway    # gateway项目
                       | logs       # 日志的输出文件夹
                       | pm2        # PM2的日志输出文件夹
                       | server     # server项目
                       | vendor /
                       |        | consul / nginx                    # consul 自动生成用的 nginx 配置模板
                       |        | docker /
                       |        |        | compose-app.yml          # 被 bash/app.sh 脚本使用的完整容器内运行配置，包含了应用和所有的组件
                       |        |        | compose-consul.yml       # 被 bash/consul.sh 脚本使用，开发时使用的单 consul 实例
                       |        |        | compose-local-build.yml  # 被 bash/local_build.sh 脚本使用，内含 gitea、drone、registry 的设置
                       |        | drone /                           # drone 自动化构建工具
                       |        |       | data / database.sqlite    # drone 的数据库
                       |        | gitea /                           # gitea 本地代码仓库
                       |        |       | git                       # gitea 管理下的 git，实际的项目代码都是存放在这里的
                       |        |       | gitea /                   # gitea 自身的数据
                       |        |       |       | gitea.db          # gitea 的数据库
                       |        |       | ssh                       # gitea 的一些秘钥
                       |        | mysql                             # mysql 的一些相关资源
                       |        | nginx                             # nginx 的配置文件
                       |        | registry /                        # docker registry 的文件夹
                       |        |          | data                   # docker 镜像的数据
                       | Dockerfile_builder     # 用来构建 node app 构建时使用的基础镜像的 dockerfile
                       | Dockerfile_runner      # 用来构建 node app 运行时使用的镜像的 dockerfile
                       | fullstack.yml          # node app 使用的配置文件
                       | README.md
```

## 3. 使用到的技术

* 应用：node.js
* 代码管理：gitea
* CI：drone
* 镜像管理：docker registry
* 服务发现：consul
* gRPC：微服务通讯
* Swagger：restful API 定义

## 4. 项目详解
### 4.1 基础镜像

* 通过 ./bash/docker_builder.sh 与 ./Dockerfile_builder 构建 fullstack/builder 镜像，并推送到自建的 docker registry 中，后续所有的 node app 的镜像构建都需要依赖这个镜像；这个镜像里会持有很多在运行时不需要的类库和工具，因此单独做成一个镜像，以减少运行时镜像的体积
* 通过 ./bash/docker_runner.sh 与 ./Dockerfile_runner 构建 fullstack/runner 镜像，并推送到自建的 docker registry 中，后续所有的 node app 的运行时镜像都依赖这个镜像；这个镜像里只包含 node app 在运行时需要的工具库，比如 PM2

### 4.2 common
所有 node.js app 共用代码的仓库，使用 src/index.ts 这个入口进行代码暴露。并在依赖的项目中，使用 yarn add file:../common 这样的相对路径命令进行代码更新。

* 通过 ./bash/docker.sh 及 ./Dockerfile 构建 fullstack/common 镜像，并推送到自建的 docker registry 中，该镜像是后续 gateway 和 server 镜像构建时的依赖镜像（它们不会直接依赖 fullstack/builder），因为里面含有同构部分的代码，其他两个 app 对其有依赖
* 所有项目使用到的 protobuf 原型都在这个代码库中管理，位于 ./proto 中，并通过 ./bash/proto.sh 生成对应 stub 代码
* 有范例单元测试代码，位于 ./test/**/*.spec.ts，使用 ./bash/unit.sh 进行测试

### 4.3 client
基本上没有内容，仅只是简单调用接口访问 gateway，且使用的 API 代码为自动生成的，来自于 ../gateway/bash/swagger.sh

### 4.4 gateway
客户端直接访问的后台应用程序入口，依赖 common 代码库作为同构代码的提供者。使用 jsDoc 进行 Swagger 定义的编写，并使用工具暴露在内网，此外通过第三方工具，根据 Swagger Spec 直接生成客户端可以用的 API 代码，加速开发。

* 通过 ./bash/docker.sh 及 ./Dockerfile 构建 fullstack/gateway 镜像，并推送到自建的 docker registry 中
* 通过 ./bash/swagger.sh 生成客户端使用的 API 代码
* app 启动后会向 consul 注册自身，并在退出的时候会从 consul 中清理掉自己的注册信息
* app 对 server 服务的访问是通过 consul 进行服务发现来获得地址的

### 4.5 server
微服务的后台程序，用来处理业务逻辑，依赖 common 代码库作为同构代码的提供者。

* 通过 ./bash/docker.sh 及 ./Dockerfile 构建 fullstack/server 镜像，并推送到自建的 docker registry 中
* app 启动后会向 consul 注册自身，并在退出的时候会从 consul 中清理掉自己的注册信息
* app 对 gateway 服务的访问是通过 consul 进行服务发现来获得地址的

### 4.6 同构以及代码简化

* gateway 与 server 之间使用 gRPC 通讯，定义在 common 库中的 proto 文件中，通过工具生成 stub 代码
* gateway 与 client 之间使用 restful 通讯，定义在 gateway 的 jsDoc 里，使用工具自动生成 Swagger，再通过工具根据 Swagger 生成实际使用的 API 代码

### 4.7 应用架构范例
在 ./vendor/docker/compose-app.yml 中描述了完整的应用程序架构。

* fullstack_mysql 和 fullstack_redis 第一时间启动，没有依赖
* fullstack_consul_server1 第一时间启动，没有依赖
* fullstack_consul_server2 和 fullstack_consul_server3 等1号健康后启动，加入集群
* fullstack_consul_client1 和2在所有的 server 都健康后启动，加入集群
* fullstack_server1 在 consul 都启动完成后启动，注册到 consul
* fullstack_server2 和3在 server1 健康后启动，注册到 consul
* fullstack_gateway1 和2及3在 server 都健康后启动，读取 consul，并连接到 server
* fullstack_consul_template 在 gateway 都健康后启动，并生成 nginx 的配置文件
* fullstack_nginx 启动，读取 template 生成的配置文件，开始对外服务

## 5. 一些运行时组件

* consul：
    * 独立运行：
        * 127.0.0.1:18510
        * 于 ./vendor/docker/compose-consul.yml 进行管理
    * 与app一起在docker内启动：
        * 127.0.0.1:18500
        * 于 ./vendor/docker/compose-app.yml 进行管理
* registry：
    * 127.0.0.1:15000
    * user：test
    * password：abc123_
    * 于 ./vendor/docker/compose-local-build.yml 进行管理
* gitea：
    * 127.0.0.1:13000
    * user：root
    * password：Abcd1234_
    * token：752e305de4936a769d2ed962b3e019f8866e510a
    * 于 ./vendor/docker/compose-local-build.yml 进行管理
* drone：
    * 127.0.0.1:18980
    * 于 ./vendor/docker/compose-local-build.yml 进行管理
* mysql：
    * 外部无法访问，仅在 docker 内部
    * user：root
    * password：abc123_

需要将测试用的registry放到本机docker的daemon配置中：~/.docker/daemon.json，并重启docker后登入

```json
{
  "insecure-registries" : [
    "127.0.0.1:15000"
  ]
}
```
```bash
$ docker login 127.0.0.1:15000
```

此外，需要将 host.docker.internal 这个地址放到 /etc/hosts 里，解析为 127.0.0.1

## 6. CI
Drone 和 gitea 已经设置完成，并将其完成的代码库放在了 vendor 文件夹中，启动及使用是不会有问题的，全部都是通过镜像组织的。

代码管理使用 gitea（git）进行，实际上当前的整个项目都是放在 github 上进行管理的。gitea 只是用来模拟在办公室内部协作时候的情况，仅管理 common、gateway、server 三个子文件夹。gitea 中这三个项目的代码库创建及清理需要使用脚本 ./bash/gitea.sh，全部都做成了脚本。

当 common、gateway、server 三个代码库中的代码需要发生变化的时候，使用 ./bash/git.sh 脚本进行代码提交，脚本会将 tag 做好，并提交到gitea。

drone 和 gitea 的联结需要使用 Oauth2，需要做额外的配置。配置完成后访问 drone 的首页即可以看到对应的账户信息，然后可以同步代码库，drone 就可以访问这些代码库的变化了。

然后上述三个代码库变动就会触发对应的镜像制作及推送的事件。drone 对应的工作的配置存放在上述三个项目的根目录下的 .drone.yml 文件中。

## 7. 项目运行
### 7.1 基础设施
gitea、drone、registry 三个基础设施通过 ./bash/local_build.sh 及 ./vendor/docker/compose-local-build.yml 进行管理。本地开发和测试的时候一般不需要启动，但涉及到完整的 app 开发流程，有用到 CI 部分的时候，就需要启动。

如果仅只是在本地进行开发和测试的话，consul 只需要使用 ./bash/consul.sh 及 ./vendor/docker/compose-consul.yml 进行启动即可。如果是进行完整的 app 流程的话，则该 consul 可不用启动，在 ./vendor/docker/compose-app.yml 中已经有 consul 定义了。

### 7.2 本地开发和测试运行

* 启动 ./bash/local_build.sh
* 启动本地的 mysql 和 redis
* 启动 ./bash/consul.sh
* 在 common 中编写代码
* 通过 ./common/bash/proto.sh 生成 protobuf 的 stub 代码
* 在 gateway 和 server 中，通过 ./bash/update_common.sh 更新 common 依赖
* 在 gateway 和 server 中编写代码
* 运行 ./server/bash/run.sh
* 运行 ./gateway/bash/run.sh

### 7.3 容器内运行

* 启动 ./bash/local_build.sh
* 通过 ./bash/docker_builder.sh 制作 builder 镜像
* 通过 ./bash/docker_runner.sh 制作 runner 镜像
* 通过 ./bash/gitea.sh 创建 gitea 中的代码库
* 通过 gitea 的 Oauth2 设置，在 drone 中做好代码库联结
* 在 drone 中配置好这三个代码库的事件
* 在 common、gateway、server 中编写代码
* 通过 ./bash/git.sh 提交代码，触发 drone 事件
* drone 构建镜像，并推送到 registry
* 通过 ./bash/app.sh 启动整个 app 系统
