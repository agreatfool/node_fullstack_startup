
client -> nginx LB -> kong -> gateway -> server

restful -> grpc

Consul DNS need to modify the DNS setting of host machine, so it's not implemented. Currently using coding to handle service registry.

启动集群：./bash/compose.sh start 之后，需要在全部启动（fullstack_consul_template生成真正的nginx配置之后）之后，重启nginx：./bash/compose.sh nginx_reload
如果nginx要和consul-template联动的话，就需要将nginx和consul-template做在同一个容器内，当template生成之后，自动触发nginx的reload；跨容器的情况下，自动reload是做不到的，这里为了简便，就没有定制这个镜像
