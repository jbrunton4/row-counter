let rows = 0;
let lastClicked = new Date();

function onLoad() {

    // update every second
    setInterval(update, 1000);

    // get the current cookies from the browser
    const allCookies = getObjectFromCookies(document.cookie);
    console.log(allCookies);

    // set the initial values of rows and lastClicked
    rows = allCookies.rows;
    lastClicked = allCookies.lastClicked;

    if (rows === undefined) rows = 0;
    if (lastClicked === undefined) lastClicked = "Never";

    // update the elements on screen
    update();
}

function getObjectFromCookies(str) {
    /*
    * Takes a string like document.cookie,
    * which looks something like "cookie1=value1; cookie2=value2"
    * and returns an object with keys and values. Kind of like
    * a dictionary, if JavaScript was in any way logical.
    *
    * Thanks to Alexia on Stack Overflow
    * https://stackoverflow.com/users/492203/alexia
    * https://stackoverflow.com/questions/5047346/converting-strings-like-document-cookie-to-objects
    */

    str = str.split('; ');
    var result = {};
    for (var i = 0; i < str.length; i++) {
        var cur = str[i].split('=');
        result[cur[0]] = cur[1];
    }
    return result;
}

function calculateElapsedTimeSince(x) {
    var currentTime = new Date(); // Get the current time
    var timeDifference = currentTime - x; // Calculate the difference in milliseconds

    // Calculate the individual time components
    var seconds = Math.floor(timeDifference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(months / 12);

    // Calculate the remaining time values after subtracting years, months, days, hours, and minutes
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    days %= 30;
    months %= 12;

    // Construct the elapsed time message
    var elapsedTime = "";
    if (years > 0) {
        elapsedTime += years + " year" + (years > 1 ? "s" : "") + " ";
    }
    if (months > 0) {
        elapsedTime += months + " month" + (months > 1 ? "s" : "") + " ";
    }
    if (days > 0) {
        elapsedTime += days + " day" + (days > 1 ? "s" : "") + " ";
    }
    if (hours > 0) {
        elapsedTime += hours + " hour" + (hours > 1 ? "s" : "") + " ";
    }
    if (minutes > 0) {
        elapsedTime += minutes + " minute" + (minutes > 1 ? "s" : "") + " ";
    }
    elapsedTime += seconds + " second" + (seconds > 1 ? "s" : "") + " ago";

    return elapsedTime;
}

function update() {
    // set the cookies
    document.cookie = `rows=${rows}; SameSite=None; Secure`;
    document.cookie = `lastClicked=${lastClicked}; SameSite=None; Secure`;

    // update the elements on screen
    try {
        document.getElementById("rowCounter").innerHTML = rows;
        if (calculateElapsedTimeSince(new Date(lastClicked)) == "NaN second ago") {
        document.getElementById("lastPressed").innerHTML = "Never"
        } else {
            document.getElementById("lastPressed").innerHTML = calculateElapsedTimeSince(new Date(lastClicked));
         }
    } catch (err) {}

}

function increment() {
    // increment the counter
    rows++;
    lastClicked = new Date();
    update();
}

function decrement() {
    // do not allow past 0
    if (rows <= 0) {
        rows = 0;
        return;
    }

    // decrement the counter
    rows--;
    lastClicked = new Date();
    update();
}

function setRows() {
    rows = document.getElementById("rowCountInput").value;
    update();
    alert(`Set rows to ${rows}.`)
}

function setTime() {
    lastClicked = new Date(document.getElementById("dateInput").value);
    update();
    alert(`Set last updated to ${calculateElapsedTimeSince(new Date(lastClicked))}.`)
}

function resetData() {
    var confirmation = confirm("Delete data? This will erase your count and last changed time!");

    if (confirmation) {
        // reset data
        rows = 0;
        lastClicked = undefined;
        update();

          // alert the user
          alert("Data reset.");
    } else {
        alert("Cancelled — your data is still here.")
    }
}

onLoad();