// Check if the Speech Recognition API is available in the browser
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const output = document.getElementById('output');
    const startRecording = document.getElementById('startRecording');

    recognition.continuous = true; // Continuous listening

    recognition.onresult = function(event) {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;

        output.textContent = text;
    };

    recognition.onstart = function() {
        startRecording.textContent = 'Recording...';
    };

    recognition.onend = function() {
        startRecording.textContent = 'Start Recording';
    };

    startRecording.addEventListener('click', function() {
        recognition.start();
    });
} else {
    output.textContent = 'Speech recognition is not supported in this browser.';
}
