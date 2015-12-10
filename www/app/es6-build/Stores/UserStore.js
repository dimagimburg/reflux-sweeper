"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ActionsActions = require('./../Actions/Actions');

var _ActionsActions2 = _interopRequireDefault(_ActionsActions);

var Store = Reflux.createStore({
    listenables: _ActionsActions2["default"],

    init: function init() {
        this.user = {
            username: "dimagimburg"
        };
    }

});

exports["default"] = Store;
module.exports = exports["default"];
//# sourceMappingURL=UserStore.js.map
