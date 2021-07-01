objects = [];
status = "";
video = "";
value = "";
synth = window.speechSynthesis;

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == value) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status_object_mention").innerHTML = value + " is found! :)";
                utterThis = new SpeechSynthesisUtterance(value + "is found!");
                synth.speak(utterThis);
            } else {
                document.getElementById("status_object_mention").innerHTML = value + " is not found :(";
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    value = document.getElementById("input_object").value;
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}