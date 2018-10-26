var testsContext = require.context('../__tests__/', true, /\.js$/);
testsContext.keys().forEach(testsContext);
