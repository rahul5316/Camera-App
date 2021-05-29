let db;

let dbOpenRequest = indexedDB.open("Gallery");

dbOpenRequest.onupgradeneeded = function(e) {


  db = e.target.result;
  db.createObjectStore("Media", {keyPath:"mid"});
}


dbOpenRequest.onsuccess = function(e) {

  db = e.target.result;
}


function saveMedia(mediaType, mediaSource) {

  let txn = db.transaction("Media", "readwrite"); // reads and writes file

  let mediaStore = txn.objectStore("Media");

  let mediaFile = {
    mid: Date.now(),
       mediaType,
        mediaSource

  }

  mediaStore.add(mediaFile);
}