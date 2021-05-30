
song="";
leftWristY="";
leftWristX="";
rightWristY="";
rightWristX="";
Lscore="";
Rscore="";
status="";
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
        

    }
    
}




function stop(){
    status=song.isPlaying();
    console.log(status);
    if (status=="false"){
        song.setVolume(1);
        song.rate(1.5);
    song.play();
    document.getElementById("b1").innerHTML="stop";
    }
    else if(status=="true"){
        song.stop();
        document.getElementById("b1").innerHTML="play";
    }
    };

function draw(){
image(video, 0, 0, 600, 500)
if (Lscore>0.2){
    fill("purple")
    circle(leftWristX,leftWristY,50);
    volumeVal=Number(leftWristY);
    volumeVal=floor(volumeVal);
    volumeVal=volumeVal/500;

    song.setVolume(volumeVal);
    document.getElementById("volume_value").innerHTML=volumeVal;
    document.getElementById("instruct").innerHTML="NOTE:Move your left-hand wrist up and down for increasing and decreasing the volume move your right-hand wrist up and down for increasing and decreasing the speed";
}
if(Lscore<0.2){
    document.getElementById("instruct").innerHTML="please keep a two feet distance and show your wrists to the camera";
};
if (Rscore>0.2){
    fill("purple")
    circle(rightWristX,rightWristY,50);
    if(rightWristY>0 && rightWristY<=100){
        song.rate(0.5);
        document.getElementById("speed_val").innerHTML="0.5x";
    };
    if(rightWristY>100 && rightWristY<=200){
        song.rate(1);
        document.getElementById("speed_val").innerHTML="1x";
    }
    if(rightWristY>200 && rightWristY<=300){
        song.rate(1.5);
        document.getElementById("speed_val").innerHTML="1.5x";
    }
    if(rightWristY>300 && rightWristY<=400){
        song.rate(2);  
        document.getElementById("speed_val").innerHTML="2x";
    }
    if(rightWristY>400 && rightWristY<=500){
        song.rate(2.5); 
        document.getElementById("speed_val").innerHTML="2.5x"; 
    }
}
if(Rscore<0.2){
    document.getElementById("instruct").innerHTML="please keep a two feet distance and show your wrists to the camera";
};
};