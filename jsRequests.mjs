import * as dom from "./dom.mjs";

function getUsers() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.send();
  request.onload = function () {
    if (this.status >= 200 && this.status < 300) {
      let users = this.response;
      dom.default.printUsers(users);
    }
  };
}

function getPosts(userId) {
  let request = new XMLHttpRequest();
  const postsContainer = document.getElementById("postsContainer");

  request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    // Empty the parent from the last posts
    dom.default.emptyParent(postsContainer);

    // Printing Posts for specific user
    dom.default.printPosts(this.response);
  };
}

export default { getUsers, getPosts };
