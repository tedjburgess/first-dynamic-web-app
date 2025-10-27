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

// Adds footer to every page
function addFooter() {
  const spot = document.getElementsByTagName("footer");
  const getFooter = spot[0];
  // Copyright info
  const copyright = document.createElement("p");
  copyright.textContent = "Copyright © 2025 Burgess Enterprises";
  getFooter.appendChild(copyright);
  // Rights info
  const rights = document.createElement("p");
  rights.textContent = "All rights reserved.";
  getFooter.appendChild(rights);

}
function formHandling() {
  // Selecting elements from contact.html
  const form = document.querySelector('form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const confirmCheckbox = document.getElementById('confirm');
  const sendButton = document.getElementById('sendBtn');

  if (confirmCheckbox) {
    confirmCheckbox.addEventListener('change', () => {
      sendButton.disabled = !confirmCheckbox.checked;
    });
  }
  // Making sure the page doesn't refresh before inputs are validated
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Trimming inputs of whitespace
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    // Name validation - Doesn't contain numbers
    if (/\d/.test(nameValue)) {
      alert('Name must not contain numbers');
      return;
    }
    // Email validation - Includes @ and .
    if (!emailValue.includes('@') || !emailValue.includes('.')) {
      alert('Please enter a valid email address.');
      return;
    }
    // Checkbox validation - Box must be checked
    if (!confirmCheckbox.checked) {
    alert('Please confirm to send.');
    return;
    }
    // Everything is valid
    alert('Form submitted successfully!');

    // Reset form
    form.reset();
    sendButton.disabled = true;
  })
  

}

addHeader();
addFooter();
highlightActive();
formHandling();

