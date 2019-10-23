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

export class CreateUserReq extends jspb.Message { 

    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): void;

    clearSkillsList(): void;
    getSkillsList(): Array<Skill>;
    setSkillsList(value: Array<Skill>): void;
    addSkills(value?: Skill, index?: number): Skill;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserReq.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserReq): CreateUserReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserReq;
    static deserializeBinaryFromReader(message: CreateUserReq, reader: jspb.BinaryReader): CreateUserReq;
}

export namespace CreateUserReq {
    export type AsObject = {
        user?: User.AsObject,
        skillsList: Array<Skill.AsObject>,
    }
}

export class GetUserWithSkillsRes extends jspb.Message { 

    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): void;

    clearSkillsList(): void;
    getSkillsList(): Array<Skill>;
    setSkillsList(value: Array<Skill>): void;
    addSkills(value?: Skill, index?: number): Skill;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserWithSkillsRes.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserWithSkillsRes): GetUserWithSkillsRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserWithSkillsRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserWithSkillsRes;
    static deserializeBinaryFromReader(message: GetUserWithSkillsRes, reader: jspb.BinaryReader): GetUserWithSkillsRes;
}

export namespace GetUserWithSkillsRes {
    export type AsObject = {
        user?: User.AsObject,
        skillsList: Array<Skill.AsObject>,
    }
}

export class GetSkillsReq extends jspb.Message { 
    getId(): number;
    setId(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSkillsReq.AsObject;
    static toObject(includeInstance: boolean, msg: GetSkillsReq): GetSkillsReq.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSkillsReq, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSkillsReq;
    static deserializeBinaryFromReader(message: GetSkillsReq, reader: jspb.BinaryReader): GetSkillsReq;
}

export namespace GetSkillsReq {
    export type AsObject = {
        id: number,
    }
}

export class GetSkillsRes extends jspb.Message { 
    clearSkillsList(): void;
    getSkillsList(): Array<Skill>;
    setSkillsList(value: Array<Skill>): void;
    addSkills(value?: Skill, index?: number): Skill;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSkillsRes.AsObject;
    static toObject(includeInstance: boolean, msg: GetSkillsRes): GetSkillsRes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSkillsRes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSkillsRes;
    static deserializeBinaryFromReader(message: GetSkillsRes, reader: jspb.BinaryReader): GetSkillsRes;
}

export namespace GetSkillsRes {
    export type AsObject = {
        skillsList: Array<Skill.AsObject>,
    }
}
