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
    console.error("Error fetching username:", error);
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
      const openCommenterModal = document.createElement("button");
      openCommenterModal.classList.add("open-modal");
      /* Modal */
      openCommenterModal.dataset.userid = userId;
      fetchUserName(userId)
        .then(username => {
          openCommenterModal.textContent = username;
        })

      openCommenterModal.addEventListener("click", (event) => {
        const id = event.currentTarget.dataset.userid;
        addUserInfo(id);
      });
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
            const openCommenterModal = document.createElement("button");
            openCommenterModal.textContent = comment.user.username;
            openCommenterModal.classList.add("open-modal");
            // Modal
            const commenterId = comment.user.id;
            openCommenterModal.dataset.userid = commenterId;
            fetchUserName(commenterId)
              .then(username => {
                openCommenterModal.textContent = username;
              })

            openCommenterModal.addEventListener("click", (event) => {
              const id = event.currentTarget.dataset.userid;
              addUserInfo(id);
            });
            /* Comment reactions */
            const commentReactionsElement = document.createElement("p"); /* Comment element */
            commentReactionsElement.textContent = `👍${comment.likes}`;
            commentReactionsElement.classList.add("comment-reactions");
            /* Appending to comments div */
            commentDiv.appendChild(openCommenterModal); /* Username */
            commentDiv.appendChild(commentsElement); /* Comment text */
            commentDiv.appendChild(commentReactionsElement); /* Reactions */
            commentsDiv.appendChild(commentDiv);
          })
        });
      

      /* Appending to the object div */
      divElement.appendChild(titleElement);
      divElement.appendChild(bodyElement);
      divElement.appendChild(openCommenterModal);
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

/* Modal */

async function addUserInfo(userId) {
  try {
    const modalContainer = document.getElementsByClassName("modal")[0];
    const profileObject = await fetchUser(userId);

    // 🧹 Remove old modal content if any (DOM-safe way)
    while (modalContainer.firstChild) {
      modalContainer.removeChild(modalContainer.firstChild);
    }

    // Create inner modal content box
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Image
    const imageElement = document.createElement("img");
    imageElement.src = profileObject.image;
    imageElement.alt = "Cannot display user image";
    modalContent.appendChild(imageElement);

    // Name
    const nameElement = document.createElement("p");
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("modal-properties")
    nameSpan.textContent = "Name:";
    nameElement.appendChild(nameSpan);
    nameElement.append(` ${profileObject.firstName} ${profileObject.maidenName} ${profileObject.lastName}`)
    modalContent.appendChild(nameElement);

    // Email
    const emailElement = document.createElement("p");
    const emailSpan = document.createElement("span");
    emailSpan.classList.add("modal-properties")
    emailSpan.textContent = "Email:"
    emailElement.appendChild(emailSpan);
    emailElement.append(` ${profileObject.email}`)
    modalContent.appendChild(emailElement);

    // Phone
    const phoneElement = document.createElement("p");
    const phoneSpan = document.createElement("span");
    phoneSpan.textContent = "Phone:"
    phoneSpan.classList.add("modal-properties");
    phoneElement.appendChild(phoneSpan);
    phoneElement.append(` ${profileObject.phone}`);
    modalContent.appendChild(phoneElement);

    // Address
    const addressElement = document.createElement("p");
    const addressSpan = document.createElement("span");
    addressSpan.textContent = "Address:";
    addressSpan.classList.add("modal-properties");
    addressElement.appendChild(addressSpan);
    addressElement.append(` ${profileObject.address.address}, ${profileObject.address.city}, ${profileObject.address.stateCode}, ${profileObject.address.postalCode}`);
    modalContent.appendChild(addressElement);

    // Additional info - birthday
    const birthdayElement = document.createElement("p"); 
    const birthdaySpan = document.createElement("span")
    birthdaySpan.classList.add("modal-properties");
    birthdaySpan.textContent = "Birthday:";
    birthdayElement.appendChild(birthdaySpan);
    birthdayElement.append( ` ${profileObject.birthDate}`);
    modalContent.appendChild(birthdayElement);

    // Additional info - University
    const uniElement = document.createElement("p"); 
    const uniSpan = document.createElement("span")
    uniSpan.classList.add("modal-properties");
    uniSpan.textContent = "University:";
    uniElement.appendChild(uniSpan);
    uniElement.append( ` ${profileObject.university}`);
    modalContent.appendChild(uniElement);

    // Add modal content to container
    modalContainer.appendChild(modalContent);

    // Show the modal (remove hidden class)
    modalContainer.classList.remove("modal-hidden");

  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}


async function profileModal(userId) {
  try {
    /* Where the content will go in html */
    const modalContainer = document.getElementsByClassName("modal")[0];
    /* Add user infor */
    const userInfo = await addUserInfo(userId);     
  } catch (error) {
    
  }
  

}


allPostsHtml();

// Close modal when clicking outside the box
document.addEventListener("click", (event) => {
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");

  if (
    modal &&
    !modal.classList.contains("modal-hidden") &&
    modal.contains(event.target) &&
    !modalContent.contains(event.target)
  ) {
    modal.classList.add("modal-hidden");
  }
});








