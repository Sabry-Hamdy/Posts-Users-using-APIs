// Getting users and print them to page, then getting the posts after each click on any user
getUsers().then(() => getPostsFromUser());

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
  let fetchUsers = fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      // Throw an error if there is a problem
      if (!response.ok) {
        throw "Something went wrong while getting users";
      }
      return response.json();
    })
    .then((users) => {
      printUsers(users);

      // getPostsFromUser();
    })
    .catch((error) => console.error(error));

  return fetchUsers;
}

// Get Posts
function getPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {
      // Throw an error if there is a problem
      if (!response.ok) {
        throw "Error while getting posts";
      }

      return response.json();
    })
    .then((posts) => printPosts(posts))
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
function clearActiveClass(users) {
  for (let user of users) {
    user.classList.remove("active");
  }
}
