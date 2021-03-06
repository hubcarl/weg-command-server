var _ = module.exports;

var defaultHostname = (function() {
  var ip = false;
  var net = require('os').networkInterfaces();

  Object.keys(net).every(function(key) {
    var detail = net[key];
    Object.keys(detail).every(function(i) {
      var address = String(detail[i].address).trim();
      if (address && /^\d+(?:\.\d+){3}$/.test(address) && address !== '127.0.0.1') {
        ip = address;
      }
      return !ip; // 找到了，则跳出循环
    });
    return !ip; // 找到了，则跳出循环
  });
  return ip || 'unknown';
})();

_.hostname = defaultHostname;

_.open = function(path, callback) {
    var child_process = require('child_process');
    //fis.log.notice('browse ' + path.yellow.bold + '\n');
    var cmd = fis.util.escapeShellArg(path);
    if(fis.util.isWin()){
        cmd = 'start "" ' + cmd;
    } else {
        if(process.env['XDG_SESSION_COOKIE']){
            cmd = 'xdg-open ' + cmd;
        } else if(process.env['GNOME_DESKTOP_SESSION_ID']){
            cmd = 'gnome-open ' + cmd;
        } else {
            cmd = 'open ' + cmd;
        }
    }
    child_process.exec(cmd, callback);
};

_.matchVersion = function(str) {
    var version = false;
    var reg = /\b\d+(\.\d+){2}/;
    var match = str.match(reg);
    if(match){
        version = match[0];
    }
    return version;
};

_.printObject = function(o, prefix) {
    prefix = prefix || '';
    for(var key in o){
        if(o.hasOwnProperty(key)){
            if(typeof o[key] === 'object'){
                _.printObject(o[key], prefix + key + '.');
            } else {
                console.log(prefix + key + '=' + o[key]);
            }
        }
    }
};

/**
 * parse args
 * @sample
 * `parseArgs('--root /home/fis/.fis-tmp --port 8888');`
 *  =>
 * `{'root': '/home/fis/.fis-tmp', 'port': 8888}`
 *
 * @param argv
 * @returns {Object}
 */
_.parseArgs = function(argv) {
    var argv_array = {};
    if (Object.prototype.toString.apply(argv) == '[object Array]') {
        argv = argv.join('|');
    }
    argv.replace(/--([^\|]+)\|([^\|]+)/g, function($0, $1, $2) {
        if ($0) {
            argv_array[$1] = $2;
        }
    });
    return argv_array;
};


_.getRCFile = function() {
    return fis.project.getTempPath('server/conf.json');
};

_.getPidFile = function() {
    return fis.project.getTempPath('server/pid');
};
