
//The below function is promisified function. it takes constraints
//constraints means you can ask for audio, video etc

let videoPlayer = document.querySelector("video");

let recordedButton = document.querySelector("#record-video");

let photoButton = document.querySelector("#capture-photo");

let recordingState = false;
 

let constraints ={video:true};

let recordedData;
let mediaRecorder;

(async function(){

 //let devices =  await navigator.mediaDevices.enumerateDevices();
 // the above function gives the number of devices connected to the device

 //console.log(devices);
  // let mediastream = await navigator.mediaDevices.getUserMedia(constraints);
  // console.log(mediastream);

  // videoPlayer.srcObject = mediastream;
  // //finds the video camera

try{
   let mediastream = await navigator.mediaDevices.getUserMedia(constraints);

   videoPlayer.srcObject = mediastream;

   mediaRecorder = new MediaRecorder(mediastream);

   mediaRecorder.onstop = function(e){

    console.log("Inside on stop");
    console.log(e);
   }


   mediaRecorder.onstart = function(e) {
     console.log("Inside on start");

     console.log(e);
   }


   mediaRecorder.ondataavailable = function(e) {

    console.log("Inside on data available");

    recordedData = e.data;


   }

   console.log(mediaRecorder);

   recordedButton.addEventListener("click", function(){
     
    if(recordingState) {

      mediaRecorder.stop();

      recordedButton.innerHTML = "Record";
    }
    else {

      mediaRecorder.start();

      recordedButton.innerHTML = "Recording";
    }

    recordingState = !recordedButton;


   })




}

catch(error){

}








})();


