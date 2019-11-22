export interface IResHealthService {
    Node: IResNode;
    Service: IResService;
    Checks: IResCheck[];
}

export interface IResNode {
    ID: string; // 3657b6a9-f962-7b1e-5101-c0d0aa52720e
    Node: string; // consul-server1
    Address: string; // 172.20.0.2
    Datacenter: string; // dc1
    TaggedAddresses: {
        lan: string, // 172.20.0.2
        wan: string, // 172.20.0.2
    };
    Meta: { [key: string]: string };
    CreateIndex: number; // 5
    ModifyIndex: number; // 6
}

export interface IResService {
    ID: string; // 3t71gomk38hi3b8
    Service: string; // server
    Tags: string[];
    Address: string; // 192.168.3.15
    Meta: { [key: string]: string };
    Port: number; // 50051
    Weights: {
        Passing: number, // 1
        Warning: number, // 1
    };
    EnableTagOverride: boolean; // false
    Proxy: {
        "MeshGateway": {},
    };
    Connect: {};
    CreateIndex: number; // 955
    ModifyIndex: number; // 955
}

export interface IResCheck {
    Node: string; // consul-server1
    CheckID: string; // service:3t71gomk38hi3b8
    Name: string; // Service 'server' check
    Status: string; // critical | passing | ...
    Notes: string; // ""
    // Failed: Get http://192.168.3.15:50052/health: dial tcp 192.168.3.15:50052: connect: connection refused
    // Succeeded: HTTP GET http://192.168.3.15:50052/health: 200 OK Output: OK
    Output: string;
    ServiceID: string; // 3t71gomk38hi3b8
    ServiceName: string; // server
    ServiceTags: string[];
    Definition: {};
    CreateIndex: number; // 955
    ModifyIndex: number; // 962
}
