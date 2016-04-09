exports.name = 'server';
exports.desc = 'description of server';
exports.options = {
    '-h, --help': 'print this help message',
    '--files'   : 'some options.'
};

exports.run = function(argv, cli) {
    // 如果输入为 fis3 npm -h
    // 或者 fis3 npm --help
    // 则输出帮助信息。
    if (argv.h || argv.help) {
        return cli.help(exports.name, exports.options);
    }


    var exec = require('child_process').exec;

    var fisReleaseDir = fis.project.getTempPath('/www');
    //console.log('>>>app run dir:' + fisReleaseDir);

    var cmdRun = function(cmdRunStr){
        exec(cmdRunStr,  {cwd: fisReleaseDir}, function(err,stdout,stderr){
            if(err) {
                console.log('>>>'+cmdRunStr+' error:' + err);
            } else {
                console.log('>>>'+cmdRunStr+' success');
            }
        });
    };


    var safeRun = function(cmdRunStr){
        if(cmdRunStr.endsWith('.js')) {
            var command = cmdRunStr.split(' ')[1];
            has(fisReleaseDir + '/' + command).then(function (isExist) {
                if (isExist) {
                    cmdRun(cmdRunStr);
                } else {
                    console.log('>>>invalid file:' + command);
                }
            });
        }else{
            cmdRun(cmdRunStr);
        }
    }

    var has = function(path){
        return new Promise(function (resolve, reject) {
            fs.stat(path, function(err, stat) {
                if (err == null && stat.isDirectory()) {
                    resolve(true);
                }else if (err == null && stat.isFile()) {
                    resolve(true);
                }else{
                    resolve(false);
                }
            });
        });
    }

    var fs = require('fs');

    var params = argv ? argv['_']||[] : [];

    var entry = 'server.js';
    if(params.length >= 3 && params[2].endsWith('.js')){
        entry =  params[2];
    }
    console.log('>>>entry' + entry + ' params:' + JSON.stringify(params));
    has(fisReleaseDir + '/node_modules').then(function (installed) {
        //console.log('>>>' + installed);
        if (!installed) {
            safeRun('npm install');
        }
        safeRun('node '+entry);
    });



};