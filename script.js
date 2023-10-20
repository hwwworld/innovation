if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const startRecording = document.getElementById('startRecording');
    const stopRecording = document.getElementById('stopRecording');
    const output = document.getElementById('output');

    recognition.continuous = true; // Continuous listening

    recognition.onresult = function(event) {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;

        output.textContent = text;
    };

    recognition.onstart = function() {
        startRecording.textContent = 'Recording...';
        stopRecording.disabled = false;
    };

    recognition.onend = function() {
        startRecording.textContent = 'Start Recording';
        stopRecording.disabled = true;
    };

    startRecording.addEventListener('click', function() {
        recognition.start();
    });

    stopRecording.addEventListener('click', function() {
        recognition.stop();
    });
} else {
    output.textContent = 'Speech recognition is not supported in this browser.';
}
