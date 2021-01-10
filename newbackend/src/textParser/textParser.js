const EasyDocx = require('node-easy-docx');

function checkBold(item) {
    if (item != null && item.format != null && item.format.bold == true) {
        return true;
    } else {
        return false;
    }
}

function checkItalic(item) {
    if (item != null && item.format != null && item.format.italic == true) {
        return true;
    } else {
        return false;
    }
}

function checkUnderline(item) {
    if (item != null && item.format != null && item.format.underline != null) {
        return true;
    } else {
        return false;
    }
}

async function parseDoc(path, formatUsed) {
    let checkFormatting;
    if (formatUsed == 'bold') {
        console.log('using bold')
        checkFormatting = checkBold;
    } else if (formatUsed == 'italic') {
        console.log('using italic')
        checkFormatting = checkItalic;
    } else if (formatUsed == 'underline') {
        console.log('using underline')
        checkFormatting = checkUnderline;
    } else {
        console.log(`${formatUsed} is not supported`);
        return [];
    }

    const doc = new EasyDocx({
        path: path
    });
    const data = await doc.parseDocx();

    console.log(JSON.stringify(data));

    var parsingTerm = false;
    var term = "";
    var def = "";
    var resultsArr = [];

    for (var i = 0; i < data.length; i++) {
        const obj = data[i];

        if (obj.lineBreak == true) {
            parsingTerm = false;
            continue;
        } else if (obj.items != null) {
            // find if there is a bold run, and start collecting definition afterwards
            for (item of obj.items) {
                if (checkFormatting(item)) {
                    console.log(`${item.text} is bold`);
                    term = item.text;
                    parsingTerm = true;
                } else if (parsingTerm == true) {
                    if (item.text != null) {
                        def = def.concat(item.text);
                    }
                }
            }

            if (parsingTerm == true) {
                console.log(`Adding ${term}: ${def}`)
                resultsArr.push({
                    term: term,
                    def: def
                });

                // reset
                term = "";
                def = "";
            }
            parsingTerm = false;
        }
    }

    console.log(resultsArr);
    return resultsArr;
}

module.exports = parseDoc;