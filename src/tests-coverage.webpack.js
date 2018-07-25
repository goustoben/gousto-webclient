var testsContext = require.context('./app/assets/__tests__/', true, /-test\.js$/);
testsContext.keys().forEach(testsContext);

var sourceContext = require.context('./app/assets/js/signup/', true, /\.js$/);
sourceContext.keys().forEach(sourceContext);
