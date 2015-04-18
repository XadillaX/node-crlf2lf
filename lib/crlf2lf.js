/**
 * XadillaX created at 2015-04-18 22:12:18 With ♥
 *
 * Copyright (c) 2015 Huaban.com, all rights
 * reserved.
 */
var path = require("path");
var fs = require("fs");

function _isBinary(buf) {
    for(var i = 0; i < buf.length; i++) {
        if(buf[i] <= 8) return true;
    }
    return false;
}

function _processFile(filename) {
    try {
        var buf = fs.readFileSync(filename);
        if(_isBinary(buf)) return;

        console.log("processing file:", filename);

        var res = new Buffer(buf.length);
        var resLen = 0;
        for(var i = 0; i < buf.length; i++) {
            if(buf[i] === 13) {
                if(i < buf.length - 1 && buf[i + 1] === 10) {
                    continue;
                }

                if(i > 0 && buf[i - 1] === 10) {
                    continue;
                }
            }

            res[resLen++] = buf[i];
        }

        fs.writeFileSync(filename, res.slice(0, resLen));
    } catch(e) {
        console.error("failed to process", filename + ":", e.message);
    }
}

var crlf2lf = module.exports = function(dir, recur) {
    try {
        var files = fs.readdirSync(dir);
        for(var i = 0; i < files.length; i++) {
            var filename = path.resolve(dir, files[i]);
            var stat = fs.statSync(filename);

            if(stat.isDirectory() && recur) {
                crlf2lf(filename, recur);
                continue;
            }

            if(stat.isFile()) {
                _processFile(filename);
            }
        }
    } catch(e) {
        console.error("Failed.", e.message);
    }
};

