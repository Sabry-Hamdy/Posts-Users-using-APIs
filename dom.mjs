function printUsers(users) {
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

function printPosts(posts) {
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

function emptyParent(parentElement) {
  while (parentElement.lastChild) {
    parentElement.lastChild.remove();
  }
}

function clearActiveClass(users) {
  for (let user of users) {
    user.classList.remove("active");
  }
  // console.log(user);
}

export default { printUsers, printPosts, emptyParent, clearActiveClass };
