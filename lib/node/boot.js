var fs = require('fs');
var path = require('path');
var util = require('../util.js');
var args = util.parseArgs(process.argv);
var cluster = require('./cluster.js');
var script = require.resolve(args.script);
var serverDir = args.serverDir;
var watchFiles = [script];

var walk = function(dir){
    var dirList = fs.readdirSync(dir);
    dirList.forEach(function(item){
        var filePath = path.join(dir, item);
        if(fs.statSync(filePath).isDirectory()){
            walk(filePath);
        }else{
            watchFiles.push(filePath);
        }
    });
};

var startCluster = function(){

    cluster({
        watchFiles: watchFiles,
        exec: script,
        args: args,
        respawn: true,
        workerCount:1
    });

}


fs.exists(serverDir, function (exists) {
    if(exists){
        walk(serverDir);
    }
    //console.log(watchFiles);
    startCluster();
});
