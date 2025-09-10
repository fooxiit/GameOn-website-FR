export function editNav() {
  const topnavIcon = document.getElementById("topnav-icon");
  const x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
  topnavIcon.classList.toggle("active");
}