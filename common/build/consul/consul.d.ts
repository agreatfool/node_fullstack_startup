export interface IResHealthService {
    Node: IResNode;
    Service: IResService;
    Checks: IResCheck[];
}
export interface IResNode {
    ID: string;
    Node: string;
    Address: string;
    Datacenter: string;
    TaggedAddresses: {
        lan: string;
        wan: string;
    };
    Meta: {
        [key: string]: string;
    };
    CreateIndex: number;
    ModifyIndex: number;
}
export interface IResService {
    ID: string;
    Service: string;
    Tags: string[];
    Address: string;
    Meta: {
        [key: string]: string;
    };
    Port: number;
    Weights: {
        Passing: number;
        Warning: number;
    };
    EnableTagOverride: boolean;
    Proxy: {
        "MeshGateway": {};
    };
    Connect: {};
    CreateIndex: number;
    ModifyIndex: number;
}
export interface IResCheck {
    Node: string;
    CheckID: string;
    Name: string;
    Status: string;
    Notes: string;
    Output: string;
    ServiceID: string;
    ServiceName: string;
    ServiceTags: string[];
    Definition: {};
    CreateIndex: number;
    ModifyIndex: number;
}
