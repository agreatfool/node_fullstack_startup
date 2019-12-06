
client -> nginx LB -> kong -> gateway -> server

restful -> grpc

Consul DNS need to modify the DNS setting of host machine, so it's not implemented. Currently using coding to handle service registry.

启动集群：./bash/compose.sh start 之后，需要在全部启动（fullstack_consul_template生成真正的nginx配置之后）之后，重启nginx：./bash/compose.sh nginx_reload
如果nginx要和consul-template联动的话，就需要将nginx和consul-template做在同一个容器内，当template生成之后，自动触发nginx的reload；跨容器的情况下，自动reload是做不到的，这里为了简便，就没有定制这个镜像

镜像制作：
1. node构建用基础镜像（非运行时，无依赖）：bash/docker_builder.sh
2. node运行时基础镜像（无依赖）：bash/docker_runner.sh
3. node通用包镜像（依赖builder）：common/bash/docker.sh
4. node网关镜像（依赖common和runner）：gateway/bash/docker.sh
5. node服务器镜像（依赖common和runner）：server/bash/docker.sh

gitea默认创建的，用户：root，密码：Abcd1234_
默认的组织：fullstack，下属无项目
token：fullstack，752e305de4936a769d2ed962b3e019f8866e510a
端口13000，122

jenkins默认创建的，用户：admin，密码：abc123_
端口18080，50000
