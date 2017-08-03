/**
 * Created by osman on 6/13/2017.
 */
let async = require('async');
let fs = require('fs');
let path = require('path');

function loadFolderList(callback) {
    fs.readdir("myFiles/",
        function (err, folderNames) {
            if (err) {
                callback(err, null);
            } else {
                async.filter(folderNames, function (folderName, callbackAsyncFilter) {
                    fs.stat(path.join("myFiles", folderName), function (err, folderStat) {
                        if (err) {
                            callbackAsyncFilter(err, false);
                        } else {
                            callbackAsyncFilter(null, folderStat.isDirectory());
                        }
                    })
                }, function (err, files) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, files);
                    }
                });
            }
        }
    )
}

function loadJsonFileList(folderName, callback) {
    fs.readdir(path.join("myFiles", folderName),
        function (err, fileNames) {
            if (err) {
                callback(err, null);
            } else {
                async.filter(fileNames, function (filename, callbackAsyncFilter) {
                    // check each file is they are really a file
                    fs.stat(path.join("myFiles", folderName, filename), function (err, fileStat) {
                        if (err) {
                            callbackAsyncFilter(err, false);
                        } else {
                            callbackAsyncFilter(null, fileStat.isFile());
                        }
                    })
                }, function (err, fileNames) {
                    if (err) {
                        callback(err, null);
                    } else {
                        // check the extension of files
                        let jsonFiles = fileNames.filter(function (fileName) {
                            return path.extname(fileName) === '.json'
                        });
                        callback(null, jsonFiles);
                    }
                });
            }
        }
    )
}

function loadAllJsonContents(folderName, callback) {
    loadJsonFileList(folderName, function (err, fileNames) {
            if (err) {
                callback(err, null);
            } else {
                let jsonContents = {};
                async.each(fileNames, function (fileName, callbackAsyncEach) {
                    fs.readFile(path.join('myFiles', folderName, fileName), 'utf8', function (err, data) {
                        if (err) {
                            callbackAsyncEach(err);
                        } else {
                            jsonContents = Object.assign(jsonContents, JSON.parse(reapairJsonText(data)));
                            callbackAsyncEach();
                        }
                    })
                }, function (err) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, jsonContents);
                    }
                })
            }
        }
    )
}

function loadJsonContent(folderName, fileName, callback) {
    fs.readFile(path.join('myFiles', folderName, fileName), 'utf8', function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, JSON.parse(reapairJsonText(data)));
        }
    });
}

function reapairJsonText(data){
    // some files have extra commas, need to remove them
    data = trim(data.trim(), ',');
    // some files does not start with { or ends with }
    if (!data.startsWith('{')) {
        data = '{' + data;
    }
    if (!data.endsWith('}')) {
        data += "}";
    }
    return data;
}

function trim(s, mask) {
    while (~mask.indexOf(s[0])) {
        s = s.slice(1);
    }
    while (~mask.indexOf(s[s.length - 1])) {
        s = s.slice(0, -1);
    }
    return s;
}

module.exports.loadFolderList = loadFolderList;
module.exports.loadJsonFileList = loadJsonFileList;
module.exports.loadAllJsonContents = loadAllJsonContents;
module.exports.loadJsonContent = loadJsonContent;

