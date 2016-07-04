# MetaWeblog API for node.js

The **MetaWeblog API** is a programming interface that enables weblog entries to be written, edited, and deleted using [XML-PRC](https://en.wikipedia.org/wiki/XML-RPC) web services. Please refer to [Wiki](https://en.wikipedia.org/wiki/MetaWeblog) for more information.

**MetaWeblog API for node.js** is a node module which implements the API, and provides you full features of the API with well documented functions.

## Features

All method calls will return a `Promise` object which enables you to handle response async.

## Requirements

- [xmlrpc](https://www.npmjs.com/package/xmlrpc) package

## Install

TODO: will publish to npm soon.

## Usage

```javascript
var MetaWeblog = require('./lib/metaWeblog');
var metaWeblog = new MetaWeblog(apiUri);

// getUsersBlogs
metaWeblog.getUsersBlogs(appKey, username, password)
  .then(blogInfo => {
      // handle the blog information here
  });
```

Please check tests\test.js for more examples.

## API Documentation

TODO:

## License

MIT

**Enjoy!**