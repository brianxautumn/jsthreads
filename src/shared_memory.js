
function float64(){
    
    var sharedMemory = new SharedArrayBuffer(8);
    var interface = new Float64Array(sharedMemory);
    
    Object.defineProperty(sharedMemory, 'value',{
        get : function(){
            return interface[0];
        },
        set : function(x){
            interface[0] = x;
        }
    });
    
    return sharedMemory;
}

function float64Array(length){
    
    var sharedMemory = new SharedArrayBuffer(length * 8);
    var interface = new Float64Array(sharedMemory);
    
    
    return interface;
}

module.exports = {};
module.exports.float64 = float64;
module.exports.float64Array = float64Array;