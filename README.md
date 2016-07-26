# MetaWeblog API for node.js

The **MetaWeblog API** is a programming interface that enables weblog entries to be written, edited, and deleted using [XML-PRC](https://en.wikipedia.org/wiki/XML-RPC) web services. Please refer to [Wiki](https://en.wikipedia.org/wiki/MetaWeblog) for more information.

**MetaWeblog API for node.js** is a node module which implements the API, and provides you full features of the API with well documented functions.

## Installation

```bash
npm install metaweblog-api
```

## API Documentation

http://uhavemyword.github.io/metaweblog-api/MetaWeblog.html

## Usage

```javascript
var MetaWeblog = require('metaweblog-api');
var apiUrl = 'http://localhost:3000/'; // use your blog API instead
var metaWeblog = new MetaWeblog(apiUrl);

// getUsersBlogs
metaWeblog.getUsersBlogs(appKey, username, password)
  .then(blogInfo => {
    // handle the blog information here
  });
  .catch(error => {
    console.log(error);
  });
```

Please check tests\test.js for more examples.

## Features

All method calls will return a `Promise` object which enables you to handle response async.

## Tests
To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
```

## License

[MIT](LICENSE)

**Enjoy!**
