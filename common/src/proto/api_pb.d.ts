// package: com.api
// file: api.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class Skill extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getName(): string;
    setName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Skill.AsObject;
    static toObject(includeInstance: boolean, msg: Skill): Skill.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Skill, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Skill;
    static deserializeBinaryFromReader(message: Skill, reader: jspb.BinaryReader): Skill;
}

export namespace Skill {
    export type AsObject = {
        id: number,
        name: string,
    }
}

export class User extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getName(): string;
    setName(value: string): void;

    getAge(): number;
    setAge(value: number): void;

    getGender(): string;
    setGender(value: string): void;

    clearSkillsList(): void;
    getSkillsList(): Array<Skill>;
    setSkillsList(value: Array<Skill>): void;
    addSkills(value?: Skill, index?: number): Skill;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: number,
        name: string,
        age: number,
        gender: string,
        skillsList: Array<Skill.AsObject>,
    }
}

export class GetUserReq extends jspb.Message { 
    getId(): number;
    setId(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserReq): GetUserReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserReq;
    static deserializeBinaryFromReader(message: GetUserReq, reader: jspb.BinaryReader): GetUserReq;
}

export namespace GetUserReq {
    export type AsObject = {
        id: number,
    }
}
