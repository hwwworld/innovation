if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const startRecording = document.getElementById('startRecording');
    const stopRecording = document.getElementById('stopRecording');
    const output = document.getElementById('output');
    
    recognition.continuous = true; // Continuous listening
    recognition.interimResults = true; // Capture interim results

    let currentText = '';

    recognition.onresult = function(event) {
        const interimTranscript = event.results[event.results.length - 1][0].transcript;

        // Update the displayed text
        currentText += interimTranscript + '<br>';
        output.innerHTML = currentText;
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
        currentText = ''; // Clear previous text
        output.innerHTML = '';
        recognition.start();
    });

    stopRecording.addEventListener('click', function() {
        recognition.stop();
    });
} else {
    output.textContent = 'Speech recognition is not supported in this browser.';
}
