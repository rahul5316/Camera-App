
//The below function is promisified function. it takes constraints
//constraints means you can ask for audio, video etc

let videoPlayer = document.querySelector("video");

let recordedButton = document.querySelector("#record-video");

let photoButton = document.querySelector("#capture-photo");

let recordingState = false;


let constraints = { video: true };

let recordedData;
let mediaRecorder;

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



})();


function saveVideoToFs() {

  console.log("Saving Video");

  let videoUrl = URL.createObjectURL(recordedData); //converts blob data to Url

  console.log(videoUrl);

  let aTag = document.createElement("a");

  aTag.download = "video.mp4";

  aTag.href = videoUrl;

  aTag.click();
  aTag.remove();
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

  ctx.drawImage(videoPlayer, 0, 0);

  let imageUrl = canvas.toDataURL("image/jpg");
  //canvas object => file url string

  let aTag = document.createElement("a");

  aTag.download = "photo,jpg";
  aTag.href = imageUrl;
  aTag.click();
}


