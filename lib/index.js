"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToNumber = convertToNumber;
exports.convertToText = convertToText;
exports["default"] = void 0;
var _converttonumber = _interopRequireDefault(require("./converttonumber.js"));
var _converttotext = _interopRequireDefault(require("./converttotext.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function convertToNumber(text, optionals) {
  return _converttonumber["default"].convertNumber(text, optionals);
}
function convertToText(text) {
  return _converttotext["default"].convertNumbersToText(text);
}
var _default = exports["default"] = {
  convertToNumber: convertToNumber,
  convertToText: convertToText
};