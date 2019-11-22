
client -> nginx LB -> kong -> gateway -> server

restful -> grpc

Consul DNS need to modify the DNS setting of host machine, so it's not implemented. Currently using coding to handle service registry.
