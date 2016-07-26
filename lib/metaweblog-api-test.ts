/// <reference path="metaweblog-api.d.ts" />

var metaWeblog = new MetaWeblog('');
metaWeblog
    .getUsersBlogs('', '', '')
    .then(blogInfos => console.log(blogInfos[0].blogName))
    .catch(error => console.error(error));