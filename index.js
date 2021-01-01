const prompt = require("prompt-sync")({ sigint: true });
const Configstore = require("configstore");
const packageJson = require("./package.json");

// Create a Configstore instance
const config = new Configstore(packageJson.name);

while (true) {
    console.log("\nEnter your choice :\n1.Create a Key-Value Pair\n2.Delete an Entry\n3.Read from JSON File\n4.Show Path of JSON File\n5.Exit the Program")
    const ch = prompt();
    switch (ch) {
        case "1":
            addkeyValue();
            break;
        case "2":
            deletekeyValue();
            break;
        case "3":
            displayKeyValue();
            break;
        case "4":
            console.log(config.path);
            break;
        case "5":
            return;

        default:
            console.log("Invalid choice");
    }
}

function addkeyValue() {
    console.log("Enter your choice\n1.Create Key Value\n2.Create JSON Object");
    const ch = prompt();
    if (ch == 1) {
        const key = prompt("Enter Key : ");
        if (config.has(key)) {
            console.log("Key Already Exists");
        } else {
            const value = prompt("Enter Value : ");
            config.set(key, value);
        }
    } else {
        const obj = prompt("Enter your object:");
        config.set(JSON.parse(obj));
    }
}

function deletekeyValue() {
    console.log("Enter your choice\n1.Delete all pairs\n2.Delete Specified Pair  ");
    const ch = prompt();

    if (ch == 1) {
        config.clear();
        console.log("Deleted all Pairs");
    } else if (ch == 2) {
        const key = prompt("Enter Key : ");
        if (config.has(key)) {
            config.delete(key);
            console.log("Key Deleted");
        } else {
            console.log("Key Does Not Exist");
        }
    } else {
        console.log("Invalid choice");
    }
}

function displayKeyValue() {
    console.log("Enter your choice\n1.Read a Specified Pair\n2.Read whole JSON File ");
    const ch = prompt();
    if (ch == 1) {
        const key = prompt();
        if (config.has(key)) {
            console.log("Key Value Pair is");
            console.log(key + ":" + config.get(key));
        } else {
            console.log("Key Does Not Exist");
        }
    } else if (ch == 2) {
        console.log(config.all);
    } else {
        console.log("Invalid choice");
    }
}