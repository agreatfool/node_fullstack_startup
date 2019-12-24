
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
gitea默认创建的，用户：root，密码：Abcd1234_
默认的组织：fullstack，下属无项目
token：fullstack，752e305de4936a769d2ed962b3e019f8866e510a
端口13000，122
使用脚本`./bash/gitea.sh init|clear`来创建初始仓库和销毁仓库

drone使用OAuth2读取gitea的用户和仓库信息，端口18980

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
