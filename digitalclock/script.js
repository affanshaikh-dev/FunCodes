function displayTime() {
    let dateTime = new Date();
    let hrs = dateTime.getHours();
    let min = dateTime.getMinutes();
    let sec = dateTime.getSeconds();
    let sess = document.getElementById("sess");

    if (hrs >= 12) {
        sess.innerHTML = "PM";
    }else {
        sess.innerHTML = "AM";
    }

    document.getElementById("hrs").innerHTML = hrs;
    document.getElementById("min").innerHTML = min;
    document.getElementById("sec").innerHTML = sec;

    if(min < 10) {
    document.getElementById("min").innerHTML ="0" + min;
    }else {
    document.getElementById("min").innerHTML = min;
    }

    if(sec < 10) {
    document.getElementById("sec").innerHTML ="0" + sec;
    }else {
    document.getElementById("sec").innerHTML = sec;
    }

}

setInterval(displayTime, 50)