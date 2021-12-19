/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
console.log("hello word");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered:", registration);
      })
      .catch((registrationError) => {
        console.log("SW registered failed:", registrationError);
      });
  });
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL3B3YS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLmxvZyhcImhlbGxvIHdvcmRcIik7XG5cbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlclxuICAgICAgLnJlZ2lzdGVyKFwiL3NlcnZpY2Utd29ya2VyLmpzXCIpXG4gICAgICAudGhlbigocmVnaXN0cmF0aW9uKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU1cgcmVnaXN0ZXJlZDpcIiwgcmVnaXN0cmF0aW9uKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlZ2lzdHJhdGlvbkVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU1cgcmVnaXN0ZXJlZCBmYWlsZWQ6XCIsIHJlZ2lzdHJhdGlvbkVycm9yKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==