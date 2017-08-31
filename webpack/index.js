
 (function(modules) { 
    var installedModules = {};
    function __webpack_require__(moduleId) {

        // Check if module is in cache
        // 避免重复加载&执行模块
        if(installedModules[moduleId])
            return installedModules[moduleId].exports;

        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.loaded = true;

        // Return the exports of the module
        return module.exports;
    }

    // Load entry module and return exports
    return __webpack_require__(0);
 })([
    function(module, exports, require) {
        var module1Data = require(1);
        var module2Data = require(2);
        console.log(module1Data.a, module1Data.default);
        console.log(module2Data.a, module2Data.default);
    },

    function(module, exports, require){
        var module2Data = require(2);

        // right
        exports.default = '1.default';
        exports.a = '1';

        // right
        // module.exports = {
        //  default: 'default',
        //  a: 1
        // };

        // error
        // exports = {
        //  default: 'default',
        //  a: 1
        // }
        
    },
    function(module, exports, require) {
        alert('执行模块2')
        exports.default = '2.default';
        exports.a = '2';
    }
 ])
