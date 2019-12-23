
client -> nginx LB -> kong -> gateway -> server

restful -> grpc

-
Consul DNS need to modify the DNS setting of host machine, so it's not implemented. Currently using coding to handle service registry.

启动集群：./bash/compose.sh start 之后，需要在全部启动（fullstack_consul_template生成真正的nginx配置之后）之后，重启nginx：./bash/compose.sh nginx_reload
如果nginx要和consul-template联动的话，就需要将nginx和consul-template做在同一个容器内，当template生成之后，自动触发nginx的reload；跨容器的情况下，自动reload是做不到的，这里为了简便，就没有定制这个镜像

-
镜像制作：
1. node构建用基础镜像（非运行时，无依赖）：bash/docker_builder.sh
2. node运行时基础镜像（无依赖）：bash/docker_runner.sh
3. node通用包镜像（依赖builder）：common/bash/docker.sh
4. node网关镜像（依赖common和runner）：gateway/bash/docker.sh
5. node服务器镜像（依赖common和runner）：server/bash/docker.sh

-
drone的env要求提供gitea和自身应用的HOST，这里提供127.0.0.1就有问题了
因为drone是运行在容器中的，它在连接gitea的时候使用loopback地址的话就找不到gitea了
而在主机的浏览器中访问的时候，又只能使用loopback
最后只能用到了 host.docker.internal，可能部分操作系统有兼容性问题
mac系统也需要在 /etc/hosts 中添加 `127.0.0.1 host.docker.internal`
这样容器内和容器外就可以使用 host.docker.internal 来统一进行访问了
drone的env列表：https://docs.drone.io/installation/reference/

-
gitea默认创建的，用户：root，密码：Abcd1234_
默认的组织：fullstack，下属无项目
token：fullstack，752e305de4936a769d2ed962b3e019f8866e510a
端口13000，122
使用脚本`./bash/gitea.sh init|clear`来创建初始仓库和销毁仓库

jenkins默认创建的，用户：admin，密码：abc123_
端口18080，50000

需要将测试用的registry放到本机docker的daemon配置中：~/.docker/daemon.json，并重启docker后登入
用户：test，密码：abc123_

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

-
drone ci只负责common、gateway、server这三者，而构建这三者镜像需要用到的builder和runner镜像就不在CI管理之内了，需要预先制作好
因为之前开发基本上已经把所有的制作脚本都写全了，所以用drone的时候就只使用了exec pipeline，实际上为了可移植性和可携带型，在镜像中运行是最好的选择
根据使用者的物理主机不同，exec pipeline可能需要修改平台配置，参见：https://exec-runner.docs.drone.io/configuration/platform/
除了复用代码之外，因为docker pipeline运行在容器中，如果使用127.0.0.1:15000作为registry的地址的话，pipeline会直接失败，所以只能使用exec

为了让drone能够访问你的私有registry，需要将 dockerconfigjson 放到 .drone.yml 同一层位置

```json
{
    "auths": {
        "http://host.docker.internal:15000": {
            "test": "$2y$05$7aAJWG8xh7Hdsus0ZUmpa.PGLsuopqcqv3NJDAIitePeJ8TyinHcO"
        }
    }
}
```

项目在gitea创建完之后，需要在drone进行sync，才能显示在drone的ui上，并需要单独进行activate
runner需要单独安装：
https://docs.drone.io/installation/runners/exec/
https://exec-runner.docs.drone.io/installation/osx/
并需要在 /etc/drone-runner-exec/config 或 ~/.drone-runner-exec/config 创建一个配置文件
日志文件在 ~/.drone-runner-exec/log.txt
runner配置文件项：https://exec-runner.docs.drone.io/installation/reference/
runner在执行构建任务的时候，会以启动runner的用户来作为构建的用户来执行，因此只要用户正确，就无需额外设置`DRONE_RUNNER_PATH`
如果有类似于dart等第三方的一些PATH，就需要单独在`DRONE_RUNNER_PATH`中指明
exec pipeline可用的env：https://exec-runner.docs.drone.io/configuration/variables/

```bash
$ drone-runner-exec service install
$ drone-runner-exec service start
```

有一篇runner的指引，不错：[Builds are Stuck in Pending Status](https://discourse.drone.io/t/builds-are-stuck-in-pending-status/4437)

多runner之间的协作，任务的组合：https://docs.drone.io/configure/pipeline/multiple/

drone中的每一个step都是完全独立的，会单独启一个镜像或一个本机的context

drone webhook:
https://discourse.drone.io/t/how-to-use-global-webhooks/3755
http://plugins.drone.io/drone-plugins/drone-webhook/

drone cli安装https://docs.drone.io/cli/install/
drone的deployment可以通过cli命令触发，在某个build的最后一步，制作deploy的触发，然后另做一个task来进行deploy
docker pull drone/cli:1.2.0

插件downstream可以直接触发：http://plugins.drone.io/drone-plugins/drone-downstream/
插件需要的token是账号的token，也就是 http://host.docker.internal:18980/account 页面的，而不是服务器启动时设定的RPC TOKEN
结果插件step一直是pending，不好用；单独镜像命令测试，发现这货的功能和我想象中不太一样，可能是根据某个已经存在的build，进行XXX
看了下源码，果然如此，其实downstream就是对drone API的一个封装（drone命令行工具也是如此）
而我查了下官方API手册：https://docs.drone.io/api/overview/，并没有开始一个新的build的方法
有一个issue，但实际上也没实现，参见：https://github.com/drone/drone/issues/2679#issue-435262568
解决方案最后只可能是webhook了，尴尬
```bash
$ docker run --rm \
        -e PLUGIN_REPOSITORIES=fullstack/gateway@master \
        -e PLUGIN_TOKEN=K5i8g6PMlLM3tWaPDRagigPkBrl1YKGu \
        -e PLUGIN_SERVER=host.docker.internal:18980 \
        -e PLUGIN_PROTO=http \
        -e PLUGIN_DEPLOY=production \
        -e PLUGIN_LAST_SUCCESSFUL=true \
    plugins/downstream:latest
time="2019-12-20T09:27:09Z" level=fatal msg="Error: unable to get build list for fullstack/gateway@master"

$ docker run --rm \
        -e PLUGIN_REPOSITORIES=fullstack/gateway@master \
        -e PLUGIN_TOKEN=K5i8g6PMlLM3tWaPDRagigPkBrl1YKGu \
        -e PLUGIN_SERVER=host.docker.internal:18980 \
        -e PLUGIN_PROTO=http \
        -e PLUGIN_DEPLOY=production \
    plugins/downstream:latest
time="2019-12-20T09:24:45Z" level=fatal msg="Error: for deploy build no must be numeric only  or for branch deploy last_successful should be true, format repository@build/branch"
```

关于secret和ssh，可以看：https://segmentfault.com/a/1190000018459195
