import * as requests from "./jsRequests.mjs";
import getPostsFromUser from "./jsEventListeners.js";

requests.default.getUsers();

getPostsFromUser();
