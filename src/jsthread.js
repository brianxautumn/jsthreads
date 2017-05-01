var shared_memory = require('./shared_memory.js');

var functions = {};

function jsthread_create(script, args) {
    //var worker = new Worker(script);
    //console.log(thread);
    var blob = new Blob([
        "onmessage = " + script
        
    ], {type: "text/javascript"});
    
    var thread;
    var sharedMemory = new SharedArrayBuffer(4);
    var sharedInterface = new Uint8Array(sharedMemory);
    
    args = sharedMemory;
    
    let url = (window.URL || window.webkitURL || window || {}).createObjectURL(blob);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == 200) {
            var url = (window.URL || window.webkitURL || window || {}).createObjectURL(xhr.response);
            thread = new Worker(url);
            thread.postMessage(args);
        }
    };
    xhr.send();

    console.log("Threads Called");
    
    return {
        thread: thread,
        sharedMemory: sharedMemory,
        sharedInterface: sharedInterface
    };
    
}

function jsthread_join(threadStruct) {
    setTimeout(function(){ _join(threadStruct); }, 100);
}

function _join(threadStruct){
    var test = new Uint8Array(threadStruct.sharedMemory);
    
    waitOn(test, 0 , 1);
    console.warn("Joined");
}


function waitOn(buffer, index, value) {
    for (;; ) {

        var status = Atomics.load(buffer, index);
        console.log(status);
        if (status === value) { //done
            return;
        }
        busySpinWait(1000);
    }
}

function busySpinWait(msecs) {
    var t = performance.now() + msecs;
    while (performance.now() < t) {

    }
}

class ThreadContext{
    constructor(){
        this.threads = [];
    }
}

function run(routine){
    window.routine = routine;
    var context = new ThreadContext();
    routine();
}

function register_function(func){
    if(!functions.hasOwnProperty(func.name)){
        
        
    }
}

module.exports = {};
module.exports.jsthread_create = jsthread_create;
module.exports.jsthread_join = jsthread_join;
module.exports.shared_memory = shared_memory;
module.exports.run = run;
