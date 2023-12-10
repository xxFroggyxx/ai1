/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var CHANGE_STYLE_ID = '#change-style';
var DYNAMIC_STYLE_ID = '#dynamic-style';
var availableStyles = {
  "default": 'css/style.css',
  alternative: 'css/style2.css'
};
var styleLink = {
  id: DYNAMIC_STYLE_ID,
  hrefs: availableStyles
};
window.addEventListener('load', function () {
  var changeStyleLink = document.querySelector(CHANGE_STYLE_ID);
  changeStyleLink === null || changeStyleLink === void 0 ? void 0 : changeStyleLink.addEventListener('click', function (e) {
    e.preventDefault();
    toggleStyle();
  });
});
var toggleStyle = function toggleStyle() {
  var linkElement = document.querySelector(styleLink.id);
  if (linkElement) {
    linkElement.href = getNextStyle(linkElement.href);
  }
};
var getNextStyle = function getNextStyle(currentHref) {
  var currentFilename = currentHref.split('/').pop();
  var currentKey = Object.keys(styleLink.hrefs).find(function (key) {
    return styleLink.hrefs[key].split('/').pop() === currentFilename;
  });
  if (!currentKey) {
    return styleLink.hrefs[Object.keys(styleLink.hrefs)[0]];
  }
  var keys = Object.keys(styleLink.hrefs);
  var nextIndex = (keys.indexOf(currentKey) + 1) % keys.length;
  return styleLink.hrefs[keys[nextIndex]];
};
/******/ })()
;