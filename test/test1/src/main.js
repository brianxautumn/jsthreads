(function () {
    var jsthreads = require('../../../src/jsthread.js');

    window.x = jsthreads.shared_memory.float64();
    window.y = jsthreads.shared_memory.float64();
    array = jsthreads.shared_memory.float64Array(10);

    for (var i = 0; i < 10; i++) {
        array[i] = i;
    }

    function add(args) {
        console.warn("Message Recieved");
        var sharedInterface = new Uint8Array(args.data);
        //
        /*
         var total = 0;
         var start = args.data.start;
         var stop = args.data.stop;
         var array = args.data.values;
         for(var i = start; i < stop; i ++){
         total += array[i];
         }
         
         args.data.output.value = total;
         */
        console.log('thread working');


        Atomics.store(sharedInterface, 0, 1);
        //console.log("done");
        //console.log(args.data.control[0]);
    }

    var args1 = {
        start: 0,
        stop: 5,
        values: array,
        output: x
    };

    var args2 = {
        start: 5,
        stop: 10,
        values: array,
        output: y
    };



    jsthreads.run(function () {
        window.thread1 = jsthreads.jsthread_create(add, args1);
        window.thread2 = jsthreads.jsthread_create(add, args2);

        jsthreads.jsthread_join(thread1);
        jsthreads.jsthread_join(thread2);
        //var total = x.value + y.value;
        console.warn("DONE");
    });




})();


