
//The below function is promisified function. it takes constraints
//constraints means you can ask for audio, video etc

let videoPlayer = document.querySelector("video");

let constraints = {video:true};

(async function(){

 //let devices =  await navigator.mediaDevices.enumerateDevices();
 // the above function gives the number of devices connected to the device

 //console.log(devices);
  let mediastream = await navigator.mediaDevices.getUserMedia(constraints);
  console.log(mediastream);

  videoPlayer.srcObject = mediastream;
  //finds the video camera


})();


