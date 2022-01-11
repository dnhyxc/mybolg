const btn = document.querySelector(".btn");
const count = document.querySelector(".count");

btn.addEventListener("click", () => {
  let sum = 0;
  sum++;
  count.innerHTML = sum * 1 + count.innerHTML * 1;
});
