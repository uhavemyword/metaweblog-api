/// <reference path="./../node_modules/@types/es6-promise/index.d.ts" />

// Type definitions for metaweblog-api
// Project: https://github.com/uhavemyword/metaweblog-api
// Definitions by: Peng Chen <https://github.com/uhavemyword>

declare class MetaWeblog {
        constructor(uri: string);
        getUsersBlogs(appKey: string, username: string, password: string): Promise<MetaWeblog.BlogInfo[]>;
        getRecentPosts(blogid: string, username: string, password: string, numberOfPosts: number): Promise<MetaWeblog.Post[]>;
        getCategories(blogid: string, username: string, password: string): Promise<MetaWeblog.CategoryInfo[]>;
        getPost(postid: string, username: string, password: string): Promise<MetaWeblog.Post>;
        editPost(postid: string, username: string, password: string, post: MetaWeblog.Post, publish: boolean): Promise<boolean>;
        newPost(blogid: string, username: string, password: string, post: MetaWeblog.Post, publish: boolean): Promise<number>;
        deletePost(appKey: string, postid: string, username: string, password: string, publish: boolean): Promise<boolean>;
        newMediaObject(blogid: string, username: string, password: string, mediaObject: MetaWeblog.MediaObject): Promise<MetaWeblog.MediaObject>;
    }

declare namespace MetaWeblog {
    interface BlogInfo {
        blogid: string;
        url: string;
        blogName: string;
    }

    interface Post {
        description: string;
        title: string;
        categories?: string[];
        dateCreated?: Date;
        link?: string;
        permalink?: string;
        postid?: string;
        source?: Source;
        userid?: string;
    }

    interface CategoryInfo {
        description: string;
        htmlUrl: string;
        rssUrl: string;
        title: string;
        categoryid: string;
    }

    interface MediaObject {
        name: string;
        type: string;
        bits: Buffer;
    }

    interface Source {
        name?: string;
        url?: string;
    }

    interface Error {
        faultCode: string;
        faultString: string;
    }
}

export = MetaWeblog;
