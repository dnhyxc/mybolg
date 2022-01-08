const child = document.querySelector("#child");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  child.contentWindow.postMessage("来了老弟", "http://localhost:8081/");
});
