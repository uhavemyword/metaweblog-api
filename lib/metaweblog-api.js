/**
 * @file MetaWeblog API Documentation
 * A Node.js implementaton of MetaWeblog API.
 * @author Peng Chen <peng-chen@live.com>
 */

'use strict';

const xmlrpc = require('xmlrpc');
const url = require('url');

/**
 * @constructs MetaWeblog
 * @param {String} uri - Server URI to make the HTTP request to.
 */
function MetaWeblog(uri) {
    var urlparts = url.parse(uri);
    var secure = urlparts.protocol == 'https:';
    var client;
    if (secure) {
        client = xmlrpc.createSecureClient(uri);
    }
    else {
        client = xmlrpc.createClient(uri);
    }

    /*
     * Makes an XML-RPC call to the server and returns a Promise.
     * @param {String} methodName - The method name.
     * @param {Array} params      - Params to send in the call.
     * @return {Promise<Object|Error>} 
     */
    function methodCall(methodName, params) {
        return new Promise(function (resolve, reject) {
            client.methodCall(methodName, params, function (error, data) {
                if (!error) {
                    resolve(data);
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Returns information on all the blogs of a given user.
     * @param {String} appKey
     * @param {String} username
     * @param {String} password
     * @return {Promise<BlogInfo[]|Error>}
     */
    this.getUsersBlogs = function (appKey, username, password) {
        return methodCall('blogger.getUsersBlogs', [appKey, username, password]);
    };

    /**
     * Retrieves a list of the most recent posts.
     * @param {String} blogid
     * @param {String} username
     * @param {String} password
     * @param {Number} numberOfPosts
     * @return {Promise<Post[]|Error>}
     */
    this.getRecentPosts = function (blogid, username, password, numberOfPosts) {
        return methodCall('metaWeblog.getRecentPosts', [blogid, username, password, numberOfPosts]);
    };

    /**
     * Retrieves a list of valid categories.
     * @param {String} blogid
     * @param {String} username
     * @param {String} password
     * @return {Promise<CategoryInfo[]|Error>}
     */
    this.getCategories = function (blogid, username, password) {
        return methodCall('metaWeblog.getCategories', [blogid, username, password]);
    };

    /**
     * Gets a post by id.
     * @param {String} postid
     * @param {String} username
     * @param {String} password
     * @return {Promise<Post|Error>}
     */
    this.getPost = function (postid, username, password) {
        return methodCall('metaWeblog.getPost', [postid, username, password]);
    };

    /**
     * Updates a post by id.
     * @param {String} postid
     * @param {String} username
     * @param {String} password
     * @param {Post} post
     * @param {Boolean} publish
     * @return {Promise<Boolean|Error>} success or error
     */
    this.editPost = function (postid, username, password, post, publish) {
        return methodCall('metaWeblog.editPost', [postid, username, password, post, publish]);
    };

    /**
     * Makes a new post.
     * @param {String} blogid
     * @param {String} username
     * @param {String} password
     * @param {Post} post
     * @param {Boolean} publish
     * @return {Promise<Number|Error>} post id or error
     */
    this.newPost = function (blogid, username, password, post, publish) {
        return methodCall('metaWeblog.newPost', [blogid, username, password, post, publish]);
    };

    /**
     * Deletes a post.
     * @param {String} appKey
     * @param {String} postid
     * @param {String} username
     * @param {String} password
     * @param {Boolean} publish
     * @return {Promise<Boolean|Error>} success or error
     */
    this.deletePost = function (appKey, postid, username, password, publish) {
        return methodCall('blogger.deletePost', [appKey, postid, username, password, publish]);
    };

    /**
     * Uploads a new file.
     * @param {String} blogid
     * @param {String} username
     * @param {String} password
     * @param {MediaObject} mediaObject
     * @return {Promise<MediaObject|Error>}
     */
    this.newMediaObject = function (blogid, username, password, mediaObject) {
        return methodCall('metaWeblog.newMediaObject', [blogid, username, password, mediaObject]);
    };
};

exports = module.exports = MetaWeblog;

/**
 * Struct BlogInfo
 * @typedef {Object} BlogInfo
 * @property {String} blogid
 * @property {String} url
 * @property {String} blogName
 */

/**
 * Struct Post
 * @typedef {Object} Post
 * @property {Date} dateCreated - Required when posting.
 * @property {String} description - Required when posting.
 * @property {String} title - Required when posting.
 * @property {String[]} [categories]
 * @property {String} [link]
 * @property {String} [permalink]
 * @property {String} [postid]
 * @property {Source} [source]
 * @property {String} [userid]
 * @property {any} [...] - other properties not listed in this doc.
 */

/**
 * Struct CategoryInfo
 * @typedef {Object} CategoryInfo
 * @property {String} description
 * @property {String} htmlUrl
 * @property {String} rssUrl
 * @property {String} title
 * @property {String} categoryid
 */

/**
 * Struct MediaObject
 * @typedef {Object} MediaObject
 * @property {String} name
 * @property {String} type
 * @property {base64} bits
 */

/**
 * Struct Source
 * @typedef {Object} Source
 * @property {String} [name]
 * @property {String} [url]
 */

/**
 * Struct UrlData
 * @typedef {Object} UrlData
 * @property {String} url
 */

/**
 * Struct Error
 * @typedef {Object} Error
 * @property {String} faultCode
 * @property {String} faultString
 */