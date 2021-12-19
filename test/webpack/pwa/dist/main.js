/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
console.log("hello word");
console.log(navigator);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL3B3YS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLmxvZyhcImhlbGxvIHdvcmRcIik7XHJcbmNvbnNvbGUubG9nKG5hdmlnYXRvcik7XHJcblxyXG5pZiAoXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yKSB7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyXHJcbiAgICAgIC5yZWdpc3RlcihcIi9zZXJ2aWNlLXdvcmtlci5qc1wiKVxyXG4gICAgICAudGhlbigocmVnaXN0cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTVyByZWdpc3RlcmVkOlwiLCByZWdpc3RyYXRpb24pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKHJlZ2lzdHJhdGlvbkVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTVyByZWdpc3RlcmVkIGZhaWxlZDpcIiwgcmVnaXN0cmF0aW9uRXJyb3IpO1xyXG4gICAgICB9KTtcclxuICB9KTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=