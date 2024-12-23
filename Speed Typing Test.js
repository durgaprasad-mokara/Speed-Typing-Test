let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let loading = document.getElementById("loading");
let timerid = null;

function getTheResult(jsonData) {
    loading.classList.remove("d-none");
    let count = 0;
    let time = setInterval(function() {
        count = count + 1;
        timer.textContent = count;
    }, 1000);
    timerid = time;
    let contentValue = jsonData.content;
    loading.classList.add("d-none");
    quoteDisplay.textContent = contentValue;
    submitBtn.addEventListener("click", function(event) {
        if (quoteInput.value === contentValue) {
            clearInterval(time);
            result.textContent = "Task Completed in " + count + " seconds";
            result.classList.remove("resultError");
            result.classList.add("resultSucesscss");
        } else {
            result.textContent = "Please enter Valid Credentils.";
            result.classList.add("resultError");
            result.classList.remove("resultSucesscss");
        }
    });
}

function updateValues(event) {
    loading.classList.remove("d-none");
    let option = {
        method: "GET"
    };

    fetch("https://apis.ccbp.in/random-quote", option)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            getTheResult(jsonData);
        });
}

resetBtn.addEventListener("click", function() {
    quoteInput.value = "";
    result.textContent = "";
    clearInterval(timerid);
    updateValues(event);
});

updateValues();