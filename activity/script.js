
//The below function is promisified function. it takes constraints
//constraints means you can ask for audio, video etc

let videoPlayer = document.querySelector("video");

let recordedButton = document.querySelector("#record-video");

let photoButton = document.querySelector("#capture-photo");

let zoomIn = document.querySelector("#in");
let zoomOut = document.querySelector("#out");

let recordingState = false;


let constraints = { video: true };

let recordedData;
let mediaRecorder;

let maxZoom = 3;
let minZoom = 1;
let currZoom = 1;

(async function () {

  //let devices =  await navigator.mediaDevices.enumerateDevices();
  // the above function gives the number of devices connected to the device

  //console.log(devices);
  // let mediastream = await navigator.mediaDevices.getUserMedia(constraints);
  // console.log(mediastream);

  // videoPlayer.srcObject = mediastream;
  // //finds the video camera


  let mediastream = await navigator.mediaDevices.getUserMedia(constraints);

  videoPlayer.srcObject = mediastream;

  mediaRecorder = new MediaRecorder(mediastream);

  mediaRecorder.onstop = function (e) {

    console.log("Inside on stop");
    console.log(e);
  }


  mediaRecorder.onstart = function (e) {
    console.log("Inside on start");

    console.log(e);
  }


  mediaRecorder.ondataavailable = function (e) {

    console.log("Inside on data available");

    recordedData = e.data;

    saveVideoToFs();


  }

  console.log(mediaRecorder);

  recordedButton.addEventListener("click", function () {

    if (recordingState) {

      mediaRecorder.stop();

      recordedButton.querySelector("div").classList.remove("record-animate");
    }
    else {

      mediaRecorder.start();

      recordedButton.querySelector("div").classList.add("record-animate");
    }

    recordingState = !recordingState;


  })


  photoButton.addEventListener("click", capturePhotos);

  zoomIn.addEventListener("click", function(){
            
    if(currZoom +0.1<= maxZoom) {

      currZoom+=0.1;

      videoPlayer.style.transform = `scale(${currZoom})`;
    }

  });


  zoomOut.addEventListener("click", function(){

    if(currZoom - 0.1 >= minZoom){
      currZoom -= 0.1;
      videoPlayer.style.transform = `scale(${currZoom})`;
    }

  });



})();


function saveVideoToFs() {

  console.log("Saving Video");

  let videoUrl = URL.createObjectURL(recordedData); //converts blob data to Url

  let iv = setInterval (function(){

    if(db) {
      saveMedia("Video",videoUrl);
      clearInterval(iv);
    }
  },100);

 // console.log(videoUrl);

  // let aTag = document.createElement("a");

  // aTag.download = "video.mp4";

  // aTag.href = videoUrl;

  // aTag.click();
  // aTag.remove();
}


function capturePhotos() {

  photoButton.querySelector("div").classList.add("capture-animate");

  setTimeout(function(){

    photoButton.querySelector("div").classList.remove("capture-animate")
  }, 1000);




  let canvas = document.createElement("canvas");

  canvas.height = videoPlayer.videoHeight;

  canvas.width = videoPlayer.videoWidth;

  let ctx = canvas.getContext("2d");

    // canvas is scaled according to currZoom
    if(currZoom != 1){
      ctx.translate(canvas.width/2 , canvas.height/2);
      ctx.scale(currZoom , currZoom);
      ctx.translate(-canvas.width/2 , -canvas.height/2)
    }

  ctx.drawImage(videoPlayer, 0, 0);

  let imageUrl = canvas.toDataURL("image/jpg");
  //canvas object => file url string


  let iv = setInterval(function() {

    if(db) {
      saveMedia("image", imageUrl);
      clearInterval(iv);
    }
  },100);

  //skip downloading part
  // let aTag = document.createElement("a");

  // aTag.download = "photo,jpg";
  // aTag.href = imageUrl;
  // aTag.click();
}


