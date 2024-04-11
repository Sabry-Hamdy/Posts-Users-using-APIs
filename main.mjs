getUsers();

getPostsFromUser();

// Functions

// Event Listener for clicking on users
function getPostsFromUser() {
  document.getElementById("usersContainer").addEventListener("click", (event) => {
    let user = event.target;
    let userIsClicked = false;
    const usersContainer = document.getElementById("usersContainer");

    if (user.className === "user") {
      userIsClicked = true;
    } else if (user.parentElement.className === "user") {
      user = user.parentElement;
      userIsClicked = true;
    } else if (user.parentElement.parentElement.className === "user") {
      user = user.parentElement.parentElement;
      userIsClicked = true;
    }

    if (userIsClicked === true) {
      getPosts(user.id);
      clearActiveClass(usersContainer.children);
      user.classList.add("active");
    }
  });
}

// Get users
function getUsers() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.send();
  request.onload = function () {
    if (this.status >= 200 && this.status < 300) {
      let users = this.response;
      printUsers(users);
    }
  };
}

// Get Posts
function getPosts(userId) {
  let request = new XMLHttpRequest();
  const postsContainer = document.getElementById("postsContainer");

  request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    // Printing Posts for specific user
    printPosts(this.response);
  };
}

// Print users using DOM
function printUsers(users) {
  document.getElementById("usersContainer").innerHTML = "";
  for (let user of users) {
    document.getElementById("usersContainer").innerHTML += `
          <div class="user" id="${user.id}">
              <div class="text">
                  <strong id="username">${user.name}</strong>
                  <span id="email">${user.email}</span>
              </div>
              <div class="icon">
                  <i class="fa-solid fa-arrow-right"></i>
              </div>
          </div>
          `;
  }
}

// Print Posts using DOM
function printPosts(posts) {
  document.getElementById("postsContainer").innerHTML = "";

  for (let post of posts) {
    document.getElementById("postsContainer").innerHTML += `
        <div class="post">
          <strong class="title">${post.title}</strong>
          <hr />
          <p class="body">${post.body}</p>
        </div>
        `;
  }
}

// Clear "active" Class from the users
function clearActiveClass(users) {
  for (let user of users) {
    user.classList.remove("active");
  }
}
