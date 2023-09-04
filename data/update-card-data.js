const fs = require("fs");

// Function to read a JSON file
function readJSONFile(filename) {
    const rawData = fs.readFileSync(filename, "utf-8");
    return JSON.parse(rawData);
}

// Function to write data to a JSON file
function writeJSONFile(filename, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData, "utf-8");
}

// Function to make changes to the data
function modifyData(data) {
    if (!Array.isArray(data)) {
        throw new Error("Data is not an array");
    }

    for (let i = 0; i < data.length; i++) {
        const name = data[i].name.toLowerCase().replace(/\s/g, "-");
        data[i].imgName = `${name}/${name}_128x128.png`;
    }

    return data;
}

function removeWhiteSpace(str) {
    return str.replace(/\s/g, "");
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Main function
function main() {
    const inputFilename = "data/base-cards.json";
    const outputFilename = "data/ucd.json";

    const data = readJSONFile(inputFilename);
    const modifiedData = modifyData(data);
    writeJSONFile(outputFilename, modifiedData);

    console.log(`Modified data written to ${outputFilename}`);
}

main();
