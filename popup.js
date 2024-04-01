// Create an Audio object and load the audio file
var audio = new Audio('rain.mp3');

// Get the slider element
var slider = document.getElementById('rain-volume');

// Function to play the audio
function playAudio() {
  audio.play(); // Start playing the audioa
}

// Function to pause the audio
function pauseAudio() {
  audio.pause(); // Pause the audio playback
}

// Function to adjust the volume of the audio
function setVolume(volume) {
  console.log("setting voolume: " + volume);
  audio.volume = volume; // Set the volume of the audio (0 to 1)
}

// Event listener to handle changes in the slider value
slider.addEventListener('input', function() {
  var volume = slider.value / 100; // Convert slider value to a range between 0 and 1
  setVolume(volume); // Set the volume of the audio

  if (volume == 0) {
    pauseAudio(); // pause audio if volume is 0 
  }

  // Send message to background script to update audio volume
  chrome.runtime.sendMessage({ action: 'updateVolume', volume: volume });
});


// Send message to background script to play audio when the content script is loaded
chrome.runtime.sendMessage({ action: 'play' });



// JavaScript for fading in elements
window.onload = function() {
    var popup = document.querySelector('.popup');
    fadeIn(popup, 1000); // Fade in the popup over 1 second (1000 milliseconds)
  };
  
  function fadeIn(element, duration) {
    var interval = 20; // Duration of each step in milliseconds
    var steps = duration / interval; // Number of steps
    var opacityStep = 1 / steps; // Amount of opacity change per step
  
    var currentStep = 0;
    var timer = setInterval(function() {
      currentStep++;
      element.style.opacity = currentStep * opacityStep;
      if (currentStep >= steps) {
        clearInterval(timer);
        element.style.opacity = 1; // Ensure the opacity is set to 1 at the end
      }
    }, interval);
  }