let currentSkip = 0;
const limit = 10;

function loadMorePosts() {
  currentSkip += limit;
  allPostsHtml();
}

document.getElementById("load-more").addEventListener("click", loadMorePosts);

async function fetchPost(postId) {
  try {
    // Use template literals instead of concat()
    const url = `https://dummyjson.com/posts/${postId}`;

    const response = await fetch(url);   // fetch waits for the response
    const data = await response.json();  // parse JSON

    console.log(data);                   // display the post in console
    return data;                         // optionally return it for later use
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

async function fetchAllPosts(limit = 10, skip = 0) {
  try {
    const url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}&select=title,reactions,userId,body`; /*change back if needed 'https://dummyjson.com/posts'*/

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function fetchComments(postId) {
  try {
    const url = `https://dummyjson.com/comments/post/${postId}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching comment:", error);
  }
}

async function fetchAllComments() {
  try {
    const url = `https://dummyjson.com/comments`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

async function fetchUser(userId) {
  try {
    const url = `https://dummyjson.com/users/${userId}`;

    const response = await fetch(url);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching specified user", error);
  }
}

async function fetchUserName(userId) {
  try {
    const userObject = await fetchUser(userId);
    
    const userName = userObject.username;
    const data = userName;
    
    return data;
  } catch (error) {
    console.error("Error fetching name:", error);
  }
}

async function fetchPostInfo(postId) {
  try {
    const postObject = await fetchPost(postId);
    
    return {
      title: postObject.title,
      body: postObject.body,
      tags: postObject.tags,
      reactions: postObject.reactions
    };
  } catch (error) {
    console.error("Error fetching name:", error);
  }
}


async function allPostsHtml() {
  try {
    const allPostsObject = await fetchAllPosts(limit, currentSkip);
    const postsArray = allPostsObject.posts;

    const mainContainer = document.getElementsByClassName("posts-main")[0];

    postsArray.forEach(element => {
      /* Creates a div for each post object */
      const divElement = document.createElement("div");
      divElement.classList.add("post");
      /* Title of post */
      const titleElement = document.createElement("h2");
      titleElement.textContent = element.title;
      /* Body of post */
      const bodyElement = document.createElement("p");
      bodyElement.textContent = element.body;
      /* Username */
      const userId = element.userId;
      const userNameElement = document.createElement("p");
      userNameElement.classList.add("username");
      fetchUserName(userId)
        .then(username => {
          userNameElement.textContent = username;
        })
      /* Reactions */
      const reactionsDiv = document.createElement("div");
      reactionsDiv.classList.add("reactions")
      const likesElement = document.createElement("span");
      const dislikesElement = document.createElement("span");
      likesElement.textContent = `👍${element.reactions.likes}`;
      dislikesElement.textContent = `👎${element.reactions.dislikes}`;
      reactionsDiv.appendChild(likesElement);
      reactionsDiv.appendChild(dislikesElement);
      /* Comments */
      const commentsSection = document.createElement("h3");
      const postId = element.id;
      /* Comment section div */
      const commentsDiv = document.createElement("div");
      commentsDiv.classList.add("comments-section");
      commentsDiv.textContent = `Comments:`
      fetchComments(postId)
        .then(commentObject => {
          commentObject.comments.forEach(comment => {
            /* Comment div */
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            /* Comment text */
            const commentsElement = document.createElement("p");
            commentsElement.textContent = comment.body;
            /* Username */
            const commenterElement = document.createElement("p");
            commenterElement.textContent = comment.user.username;
            /* Comment reactions */
            const commentReactionsElement = document.createElement("p"); /* Comment element */
            commentReactionsElement.textContent = `👍${comment.likes}`;
            commentReactionsElement.classList.add("comment-reactions");
            /* Appending to comments div */
            commentDiv.appendChild(commenterElement); /* Username */
            commentDiv.appendChild(commentsElement); /* Comment text */
            commentDiv.appendChild(commentReactionsElement); /* Reactions */
            commentsDiv.appendChild(commentDiv);
          })
        });
      

      /* Appending to the object div */
      divElement.appendChild(titleElement);
      divElement.appendChild(bodyElement);
      divElement.appendChild(userNameElement);
      divElement.appendChild(reactionsDiv);
      divElement.appendChild(commentsSection);
      divElement.appendChild(commentsDiv); /* Comments div */
      /* Appending ojbect div to main */
      mainContainer.appendChild(divElement);
 
    });

  } catch (error) {
    console.error("Error displaying posts:", error);
  }
}


allPostsHtml();







