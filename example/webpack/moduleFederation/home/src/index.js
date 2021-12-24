import HomeList from "./HomeList";

import("nav/Header").then((Header) => {
  const div = document.createElement("div");
  div.appendChild(Header.default());
  document.body.appendChild(div);
  document.body.innerHTML += HomeList(5);
});
