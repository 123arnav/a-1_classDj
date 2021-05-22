
song="";

function preload(){
song=loadSound("music.mp3")
};

function setup(){
canvas=createCanvas(600,500);
canvas.position(500,270)
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelLoaded);


};

function modelLoaded(){
console.log("loaded")
};

function play(){
    song.setVolume(1);
    song.rate(1.5);
song.play();
};
function stop(){
    song.stop();
    };

function draw(){
image(video, 0, 0, 600, 500)
};