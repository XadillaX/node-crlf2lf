#! /usr/bin/env node

/**
 * XadillaX created at 2015-04-18 21:58:25 With ♥
 *
 * Copyright (c) 2015 Huaban.com, all rights
 * reserved.
 */
var cwd = process.cwd();
var path = require("path");
var fs = require("fs");
var opts = require("nomnom")
    .script("crlf2lf")
    .option("DIR", {
        position: 0,
        required: true,
        help: "the directory to be CRLF2LFed.",

        callback: function(DIR) {
            var dir = path.resolve(cwd, DIR);

            try {
                var stat = fs.statSync(dir);
                if(!stat.isDirectory()) {
                    return "The <DIR> is not a directory.";
                }
            } catch(e) {
                return "Directory may not existing: " + e.message;
            }
        }
    }).option("recur", {
        abbr: "r",
        flag: true,
        help: "whether the directory should be recurred."
    }).parse();

var crlf2lf = require("../lib/crlf2lf");
var dir = path.resolve(cwd, opts.DIR);

crlf2lf(dir, opts.recur);

console.log("done.");

