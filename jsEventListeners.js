import * as requests from "./jsRequests.mjs";
import * as dom from "./dom.mjs";

export default function getPostsFromUser() {
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
      requests.default.getPosts(user.id);
      dom.default.clearActiveClass(usersContainer.children);
      user.classList.add("active");
    }
  });
}
