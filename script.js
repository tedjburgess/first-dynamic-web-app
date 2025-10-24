
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
function addNavigation() {
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

addNavigation();
highlightActive();

