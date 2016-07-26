/// <reference path="./../node_modules/@types/es6-promise/index.d.ts" />

// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

declare class MetaWeblog {
    constructor(options: string | any);
    getUsersBlogs(appKey: string, username: string, password: string) : Promise<MetaWeblog.BlogInfo[]>;
}

declare namespace MetaWeblog {
    export interface BlogInfo {
        blogid: string;
        url: string;
        blogName: string;
    }
}