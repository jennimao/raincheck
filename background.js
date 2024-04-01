// Background script for controlling audio playback in the background

// Function to play audio when the web app is opened

var audio = new Audio('rain.mp3'); // Load the rain audio file


function playAudio(volume) {
    audio.volume = volume; // Set the volume
    audio.loop = true; // Loop the audio playback
    audio.play(); // Start playing the audio
  }
  
  // Function to stop audio when the web app is closed
  function stopAudio() {
    // Check if the audio is currently playing
    if (typeof audio !== 'undefined' && audio.paused === false) {
      audio.pause(); // Pause the audio playback
    }
  }
  
  // Listen for messages from the content script
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Check if the message is to play or stop the audio
    if (message.action === 'play') {
      // Play the audio with saved volume if available
      chrome.storage.local.get('audioVolume', function(data) {
        var volume = data.audioVolume || 1; // Default volume to 1 if not saved
        playAudio(volume); // Play the audio with the retrieved volume
      });
    } else if (message.action === 'stop') {
      stopAudio(); // Stop the audio
    } else if (message.action === 'updateVolume') {
      // Update the volume of the audio
      audio.volume = message.volume;
      // Save the volume to Chrome storage
      chrome.storage.local.set({ 'audioVolume': message.volume });
    }
  });
  
  // Listen for when the extension is installed, updated, or enabled
  chrome.runtime.onInstalled.addListener(function(details) {
    // Check if the extension is enabled
    if (details.reason === 'install' || details.reason === 'update' || details.reason === 'chrome_update') {
      // Play the audio with default volume when the extension is installed, updated, or enabled
      playAudio(1); // Default volume is set to 1
    }
  });
  