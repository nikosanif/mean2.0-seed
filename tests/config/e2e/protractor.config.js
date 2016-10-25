
exports.config = {
    baseUrl: 'http://localhost:8000',
    framework: 'jasmine2',
    specs: [
        '../../e2e/**/*.js'
    ],
    multiCapabilities: [
        {
            browserName: 'chrome'
        },
        /*{
          browserName: 'firefox'
        }*/
    ],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    //or include the app root explicitly with:
    //rootElement: 'my-app'
    useAllAngular2AppRoots: true
};



