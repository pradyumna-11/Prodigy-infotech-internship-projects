let ms = 0;
let s = 0;
let m = 0;
let lapsCount = 0;

let timeEl = document.getElementById("time");
let startButtonEl = document.getElementById("startButton");
let stopButtonEl = document.getElementById("stopButton");
let lapButtonEl = document.getElementById("lapButton");
let resetButtonEl = document.getElementById("resetButton");
let lapsItemsContainerEl = document.getElementById("lapsItemsContainer");
let intervalId;

let string = '00:00:00';
timeEl.textContent = string;

startButtonEl.onclick = () => {
    lapButtonEl.style.display = 'inline';
    intervalId = setInterval(function() {
        ms = ms + 1;
        if (ms > 100) {
            ms = ms % 100;
            s = s + 1;
        }
        if (s === 60) {
            s = s % 60;
            m += 1;
        }
        let mstext;
        if (ms < 10) {
            mstext = "0" + ms.toString();
        } else {
            mstext = ms.toString();
        }
        let stext;
        if (s < 10) {
            stext = "0" + s.toString();
        } else {
            stext = s.toString();
        }
        let mintext;
        if (m < 10) {
            mintext = "0" + m.toString();
        } else {
            mintext = m.toString();
        }
        string = mintext + " : " + stext + " : " + mstext;
        timeEl.textContent = string;

    }, 10);
};

stopButtonEl.onclick = function() {
    lapButtonEl.style.display = 'none';
    clearInterval(intervalId);
    timeEl.textContent = string;
};


resetButtonEl.onclick = function() {
    clearInterval(intervalId);
    ms = 0;
    s = 0;
    m = 0;
    string = '00:00:00';
    timeEl.textContent = string;
    if (lapsCount > 0) {
        for (let i = 1; i <= lapsCount; i++) {
            let deletingEl = document.getElementById("lap" + i);
            lapsItemsContainerEl.removeChild(deletingEl);
        }
        lapsCount = 0;
    }
    lapButtonEl.style.display = 'none';

};




lapButtonEl.onclick = function() {
    lapsCount = lapsCount + 1;
    let lapItem = document.createElement("li");
    lapItem.classList.add("lap-item");
    lapItem.id = "lap" + lapsCount;


    let lapCountEl = document.createElement("p");
    lapCountEl.textContent = "lap " + lapsCount;
    lapCountEl.id = "lapCount" + lapsCount;
    lapCountEl.classList.add("lap-count");
    lapItem.appendChild(lapCountEl);

    let lapTimeEl = document.createElement("p");
    lapTimeEl.id = "lapTime" + lapsCount;
    lapTimeEl.textContent = string;
    lapTimeEl.classList.add("lap-time");
    lapItem.appendChild(lapTimeEl);

    lapsItemsContainerEl.appendChild(lapItem);


}