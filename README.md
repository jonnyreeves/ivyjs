ivyjs
=====

Apache Ivy bindings for NodeJS.  Aim is to abstract `ivy.jar` and the XML congiuration away so we can interact with Ivy programatically via JavaScript.

### Proposed Programatic API
```js
var instance = ivyjs.create(settingsMap);

instance.retrieve(depMap, callback);
instance.publish(depMap, callback);
instance.install(depMap, callback);
```
