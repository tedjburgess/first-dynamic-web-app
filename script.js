
// Highlights active link automatically
function highlightActive() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-bar a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

}
// Adds header to each page
function addHeader() {
  const spot = document.getElementsByTagName('header');
  const getHeader = spot[0];
  // Title element
  const titleElement = document.createElement("div");
  titleElement.textContent = "Burgess Media";
  getHeader.appendChild(titleElement);
  // Navigation element
  const navElement = document.createElement("nav");
  getHeader.appendChild(navElement);
  // Navigation list
  const navList = document.createElement("ul");
  navList.classList.add("nav-bar");
  navElement.appendChild(navList);
  // Navigation items - home
  const navHome = document.createElement("a");
  navHome.href = "home.html";
  navHome.textContent = "Home";
  navList.appendChild(navHome);
  // Navigation items - posts
  const navPosts = document.createElement("a");
  navPosts.href = "posts.html";
  navPosts.textContent = "Posts";
  navList.appendChild(navPosts);
  // Navigation items - contact
  const navContact = document.createElement("a");
  navContact.href = "contact.html";
  navContact.textContent = "Contact";
  navList.appendChild(navContact);
}

function addFooter() {
  const spot = document.getElementsByTagName("footer");
  const getFooter = spot[0];
  // Copyright info
  const copyright = document.createElement("p");
  copyright.textContent = "Copyright © 2025 Burgess Enterprises";
  getFooter.appendChild(copyright);
  // Rights info
  const rights = document.createElement("p");
  rights.textContent = "All rights reserved";
  getFooter.appendChild(rights);

}

addHeader();
addFooter();
highlightActive();

