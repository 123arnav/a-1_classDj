
song="";
leftWristY="";
leftWristX="";
rightWristY="";
rightWristX="";
Lscore="";
Rscore="";
function preload(){
song=loadSound("music.mp3")
};

function setup(){
canvas=createCanvas(600,500);
canvas.position(500,270)
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelLoaded);
console.log(ml5.version);
posenet.on("pose", getposes);
};

function modelLoaded(){
console.log("loaded")
};

function getposes(result){
    if(result.length>0){
        console.log(result);
        leftWristY=result[0].pose.leftWrist.y;
        leftWristX=result[0].pose.leftWrist.x;
        console.log(leftWristY);
        console.log(leftWristX);
        rightWristY=result[0].pose.rightWrist.y;
        rightWristX=result[0].pose.rightWrist.x;
        console.log(rightWristY);
        console.log(rightWristX);
        Lscore=result[0].pose.keypoints[9].score;
        Rscore=result[0].pose.keypoints[10].score;
        console.log(Lscore);
        console.log(Rscore);
        
        //score
    }
    //right
}
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
if (Lscore>0.2){
    fill("purple")
    circle(leftWristX,leftWristY,50);
    volumeVal=Number(leftWristY);
    volumeVal=floor(volumeVal);
    volumeVal=volumeVal/500;
    console.log(volumeVal);
    song.setVolume(volumeVal);
    document.getElementById("volume_value").innerHTML=volumeVal;
    document.getElementById("instruct").innerHTML="NOTE:Move your left-hand wrist up and down for increasing and decreasing the volume move your right-hand wrist up and down for increasing and decreasing the speed";
}
if(Lscore<0.2){
    document.getElementById("instruct").innerHTML="please keep a two feet distance and show your wrists to the camera";
};
};