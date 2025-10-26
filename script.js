
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

  getHeader.innerHTML = `<div>Burgess Media</div>
    <nav>
        <ul class='nav-bar'>
            <a href='index.html'>Home</a>
            <a href='posts.html'>Posts</a>
            <a href='contact.html'>Contact</a>
        </ul>
    </nav>`;
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

