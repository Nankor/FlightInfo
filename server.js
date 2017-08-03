/**
 * Created by osman on 6/12/2017.
 */

let jsonFileHandler = require('./handlers/jsonFilesHandles');
let express = require('express');

// default http responce callback function
function jsonResCallbackFunc(res, err, data) {
    if (err) {
        res.status(500).json(err);
    } else {
        res.json(data);
    }
}
// express configuration
let app = new express();

app.use(express.static(__dirname + "/public"));
// routings
app.get('/carriers', function (req, res) {
    jsonFileHandler.loadFolderList(jsonResCallbackFunc.bind(this, res));
});

app.get('/:folder', function (req, res) {
    let folderName = req.params.folder;
    jsonFileHandler.loadJsonFileList(folderName, jsonResCallbackFunc.bind(this, res));
});

app.get('/:folder/flightInfo', function (req, res) {
    let folderName = req.params.folder;
    jsonFileHandler.loadAllJsonContents(folderName, jsonResCallbackFunc.bind(this, res));
});

app.get('/:folder/:jsonFile', function (req, res) {
    let folderName = req.params.folder;
    let jsonFile = req.params.jsonFile;
    jsonFileHandler.loadJsonContent(folderName, jsonFile, jsonResCallbackFunc.bind(this, res));
});
// start the server
app.listen(8090);