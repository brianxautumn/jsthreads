const path = require('path');

//console.log(env.USE_BENCHMARK);

var TEST_1_MAIN = {
    entry: [
        path.join(__dirname, 'test',  'test1', 'src', 'main.js')
    ],
    output: {
        path: path.join(__dirname, 'test', 'test1'),
        filename: 'main.js'
    }
};

var TEST_1_THREAD = {
    entry: [
        path.join(__dirname, 'test',  'test1', 'src', 'thread.js')
    ],
    output: {
        path: path.join(__dirname, 'test', 'test1'),
        filename: 'thread.js'
    }
};

if (process.env) {
    if (process.env.TESTS === "true") {
        module.exports = [TEST_1_MAIN, TEST_1_THREAD];
    } else {
       
    }
}