// Getting users and print them to page, then getting the posts after each click on any user
getUsers().then(() => getPostsFromUser());

// Event Listener for clicking on users
function getPostsFromUser() {
  document.getElementById("usersContainer").addEventListener("click", (event) => {
    let currentUser;
    let userIsClicked = false;
    let sameUserClicked = false;

    const users = document.getElementsByClassName("user");
    for (let user of users) {
      if (user.contains(event.target)) {
        userIsClicked = true;
        currentUser = user;
      }
    }

    const activeUser = document.querySelector(".active");
    if (userIsClicked) {
      toggleActiveClass({ activeUser, currentUser });
    }
  });
}

// Get users
function getUsers() {
  let request = axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      let users = response.data;

      // Print users to screen
      printUsers(users);
    })
    .catch((error) => console.error(error));

  return request;
}

// Get Posts
function getPosts(userId) {
  axios
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {
      let posts = response.data;

      // Print posts based on the user clicked
      printPosts(posts);
    })
    .catch((error) => console.error(error));
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
function toggleActiveClass({ activeUser, currentUser }) {
  activeUser?.classList.remove("active");

  // if the same user got clicked, then remove the class + posts and return
  if (currentUser === activeUser) {
    activeUser.classList.remove("active");
    document.getElementById("postsContainer").innerHTML = "";

    return;
  }

  currentUser.classList.add("active");
  getPosts(currentUser.id);
}
