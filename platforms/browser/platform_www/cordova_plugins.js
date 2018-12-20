cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "id": "es6-promise-plugin.Promise",
        "pluginId": "es6-promise-plugin",
        "runs": true
    },
    {
        "file": "plugins/aerogear-cordova-oauth2/www/oauth2.js",
        "id": "aerogear-cordova-oauth2.oauth2",
        "pluginId": "aerogear-cordova-oauth2",
        "clobbers": [
            "oauth2"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "es6-promise-plugin": "4.2.2",
    "aerogear-cordova-oauth2": "1.0.5",
    "cordova-plugin-geolocation": "4.0.1"
}
// BOTTOM OF METADATA
});