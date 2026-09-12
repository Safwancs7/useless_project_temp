const predictBtn =
    document.getElementById("predictBtn");

const progress =
    document.getElementById("progress");

const percentage =
    document.getElementById("percentage");

const progressText =
    document.getElementById("progressText");

const terminal =
    document.getElementById("terminal");

const result =
    document.getElementById("result");

const buttonLabel =
    document.getElementById("buttonLabel");

const dayInput =
    document.getElementById("dayInput");

const resultTitle =
    document.getElementById("resultTitle");

const resultDescription =
    document.getElementById("resultDescription");


/* TELEMETRY */

const altitude =
    document.getElementById("altitude");

const velocity =
    document.getElementById("velocity");

const pressure =
    document.getElementById("pressure");

const solar =
    document.getElementById("solar");

const rotation =
    document.getElementById("rotation");


/* FAKE SYSTEM MESSAGES */

const messages = [

    "Checking tomorrow...",

    "Tomorrow is still loading.",

    "Asking the satellites.",

    "The satellites said 'maybe.'",

    "Consulting absolutely nobody.",

    "Scanning for useful information.",

    "No useful information found.",

    "Blaming the calendar.",

    "Calculating your regret.",

    "The future refused to elaborate.",

    "Rechecking the obvious answer.",

    "Still thinking. Impressive.",

    "This could have been instant.",

    "Pretending this is advanced.",

    "Asking tomorrow to wait outside.",

    "Almost done doing nothing.",

    "Your patience has been detected.",

    "Rewarding patience with uncertainty.",

    "One last unnecessary calculation.",

    "Preparing a questionable answer.",

    "The answer is probably obvious.",

    "Making the answer sound scientific.",

    "Please continue waiting for no reason.",

    "Finalizing the audacity.",

    "Tomorrow located. Unfortunately."

];


let messageIndex = 0;

const dayPredictions = {
    monday: [
        "Noki irikkathe ollu.",
        "Ahh ini poyi kidann urangikkoo.",
        "Vella panikkum po."
    ],
    tuesday: [
        "Noki irikkathe ollu.",
        "Ahh ini poyi kidann urangikkoo.",
        "Vella panikkum po."
    ],
    wednesday: [
        "Noki irikkathe ollu.",
        "Ahh ini poyi kidann urangikkoo.",
        "Vella panikkum po."
    ],
    thursday: [
        "Noki irikkathe ollu.",
        "Ahh ini poyi kidann urangikkoo.",
        "Vella panikkum po."
    ],
    friday: [
        "Noki irikkathe ollu.",
        "Ahh ini poyi kidann urangikkoo.",
        "Vella panikkum po."
    ],
    saturday: [
        "Noki irikkathe ollu.",
        "Ahh ini poyi kidann urangikkoo.",
        "Vella panikkum po."
    ],
    sunday: [
        "Noki irikkathe ollu.",
        "Ahh ini poyi kidann urangikkoo.",
        "Vella panikkum po."
    ]
};

let lastPrediction = "";

function getDayPrediction(dayName) {
    const predictions = dayPredictions[dayName];
    let prediction;

    do {
        prediction = predictions[
            Math.floor(Math.random() * predictions.length)
        ];
    } while (predictions.length > 1 && prediction === lastPrediction);

    lastPrediction = prediction;

    return prediction;
}


/* ADD TERMINAL MESSAGE */

function addMessage(text, type = "") {

    const p =
        document.createElement("p");

    p.textContent = "> " + text;

    if (type) {
        p.classList.add(type);
    }

    terminal.appendChild(p);


    /* Keep only latest messages */

    while (terminal.children.length > 8) {

        terminal.removeChild(
            terminal.firstChild
        );

    }

    terminal.scrollTop =
        terminal.scrollHeight;
}


/* RANDOM TELEMETRY */

function updateTelemetry() {

    altitude.textContent =
        (540 + Math.random() * 8)
        .toFixed(1) + " KM";

    velocity.textContent =
        (7.5 + Math.random() * 0.3)
        .toFixed(2) + " KM/S";

    pressure.textContent =
        (1010 + Math.random() * 7)
        .toFixed(1) + " HPA";

    rotation.textContent =
        (0.004 + Math.random() * 0.001)
        .toFixed(5) + "°/S";


    const solarStates = [

        "NORMAL",
        "STABLE",
        "ELEVATED",
        "VERY NORMAL",
        "SUSPICIOUS"

    ];

    solar.textContent =
        solarStates[
            Math.floor(
                Math.random() *
                solarStates.length
            )
        ];
}


/* START PREDICTION */

predictBtn.addEventListener(
    "click",
    startPrediction
);


function startPrediction() {

    const dayName = dayInput.value.trim();

    const normalizedDayName =
        dayName.trim().toLowerCase();

    if (!dayPredictions[normalizedDayName]) {
        window.alert(
            "Please enter today's day name from Monday to Sunday."
        );

        dayInput.focus();
        return;
    }

    const prediction =
        getDayPrediction(normalizedDayName);

    predictBtn.disabled = true;

    predictBtn.classList.add("scanning");

    buttonLabel.textContent =
        "READING THE HORIZON...";

    result.classList.remove("show");

    terminal.innerHTML = "";

    progress.style.width = "0%";

    percentage.textContent = "0%";

    progressText.textContent =
        "INITIALIZING SYSTEM";


    messageIndex = 0;

    let currentProgress = 0;


    /* TELEMETRY LOOP */

    const telemetryInterval =
        setInterval(
            updateTelemetry,
            300
        );


    /* PREDICTION LOOP */

    const predictionInterval =
        setInterval(() => {

            currentProgress +=
                Math.random() * 1.8;


            if (currentProgress >= 100) {

                currentProgress = 100;

                clearInterval(
                    predictionInterval
                );

                clearInterval(
                    telemetryInterval
                );


                progress.style.width =
                    "100%";

                percentage.textContent =
                    "100%";

                progressText.textContent =
                    "PREDICTION COMPLETE";

                buttonLabel.textContent =
                    "TOMORROW PREDICTED";


                addMessage(
                    "Prediction successfully generated.",
                    "active"
                );

                resultTitle.textContent =
                    prediction;

                resultDescription.textContent =
                    "Random tomorrow prediction generated for " +
                    dayName.trim() + ".";


                setTimeout(() => {

                    result.classList.add(
                        "show"
                    );

                    result.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    predictBtn.disabled =
                        false;

                    predictBtn.classList.remove("scanning");

                    buttonLabel.textContent =
                        "PREDICT NEXT DAY";

                }, 1700);


                return;
            }


            /* UPDATE PROGRESS */

            progress.style.width =
                currentProgress + "%";

            percentage.textContent =
                Math.floor(
                    currentProgress
                ) + "%";


            /* UPDATE STATUS */

            if (currentProgress < 15) {

                progressText.textContent =
                    "ESTABLISHING SATELLITE LINK";

            }

            else if (currentProgress < 30) {

                progressText.textContent =
                    "RECEIVING ORBITAL DATA";

            }

            else if (currentProgress < 50) {

                progressText.textContent =
                    "ANALYZING ATMOSPHERIC DATA";

            }

            else if (currentProgress < 70) {

                progressText.textContent =
                    "PROCESSING PLANETARY VARIABLES";

            }

            else if (currentProgress < 85) {

                progressText.textContent =
                    "ACCESSING TEMPORAL DATABASE";

            }

            else {

                progressText.textContent =
                    "CALCULATING TOMORROW";

            }


            /* ADD MESSAGES */

            if (
                messageIndex <
                messages.length &&
                Math.random() > 0.55
            ) {

                addMessage(
                    messages[messageIndex]
                );

                messageIndex++;

            }

        }, 140);

}