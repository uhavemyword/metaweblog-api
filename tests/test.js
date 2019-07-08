
const appKey = '';
const username = 'MetaWeblog'; // use your username instead.
const password = 'Test_0123';

const MetaWeblog = require('./../lib/metaweblog-api');
const metaWeblog = new MetaWeblog('https://www.cnblogs.com/' + username + '/services/metaweblog.aspx');
var blogid, postid;

// getUsersBlogs
metaWeblog.getUsersBlogs(appKey, username, password)
  .then(blogInfos => {
    console.log('\n Method response for \'getUsersBlogs\': ');
    console.log(blogInfos);
    blogid = blogInfos[0].blogid;

    // getCategories
    metaWeblog.getCategories(blogid, username, password)
      .then(categories => {
        console.log('\n Method response[0] for \'getCategories\': ');
        console.log(categories[0]);
      });

    // getRecentPosts
    metaWeblog.getRecentPosts(blogid, username, password, 1)
      .then(posts => {
        console.log('\n Method response for \'getRecentPosts\': ');
        console.log(posts);
        postid = posts[0].postid;

        // getPost
        metaWeblog.getPost(postid, username, password)
          .then(post => {
            console.log('\n Method response for \'getPost\': ');
            console.log(post);

            // editPost
            post.description = 'Post updated by `MetaWeblog API` on ' + Date() + '<br />' + post.description;
            metaWeblog.editPost(postid, username, password, post, true)
              .then(success => {
                console.log('\n Method response for \'editPost\': ');
                console.log(success);
              });
          });
      });

    // newPost
    var post = {
      title: 'New Post',
      description: 'Post created by `MetaWeblog API` on ' + Date(),
      categories: ['[Markdown]']
    };
    metaWeblog.newPost(blogid, username, password, post, true)
      .then(newPostId => {
        console.log('\n Method response for \'newPost\': ');
        console.log(newPostId);

        // deletePost
        metaWeblog.deletePost(appKey, newPostId, username, password, true)
          .then(success => {
            console.log('\n Method response for \'deletePost\': ');
            console.log(success);
          });
      });

    // newMediaObject
    var fs = require("fs");
    var imageFile = fs.readFileSync('tests/test.jpg');
    var media = {
      name: 'test.jpg',
      type: 'image/jpg',
      bits: new Buffer(imageFile, 'binary')
    }
    metaWeblog.newMediaObject(blogid, username, password, media)
      .then(urlData => {
        console.log('\n Method response for \'newMediaObject\': ');
        console.log(urlData);
      });
  })
  .catch(error => {
    console.error(error);
  });