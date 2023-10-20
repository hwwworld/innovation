if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const startRecording = document.getElementById('startRecording');
    const stopRecording = document.getElementById('stopRecording');
    const output = document.getElementById('output');
    const speakButton = document.getElementById('speakButton');
    
    recognition.continuous = true; // Continuous listening
    recognition.interimResults = true; // Capture interim results

    let currentText = '';
    let recognitionActive = false;

    recognition.onresult = function(event) {
        const interimTranscript = event.results[event.results.length - 1][0].transcript;

        // Update the displayed text
        currentText += interimTranscript;
        output.textContent = currentText;
    };

    recognition.onstart = function() {
        recognitionActive = true;
        startRecording.textContent = 'Recording...';
        stopRecording.disabled = false;
    };

    recognition.onend = function() {
        recognitionActive = false;
        startRecording.textContent = 'Start Recording';
        stopRecording.disabled = true;
    };

    startRecording.addEventListener('click', function() {
        currentText = ''; // Clear previous text
        output.textContent = '';
        recognition.start();
    });

    stopRecording.addEventListener('click', function() {
        recognition.stop();
    });

    speakButton.addEventListener('click', function() {
        if (recognitionActive) {
            speakFinnish(output.textContent);
        }
    });
} else {
    output.textContent = 'Speech recognition is not supported in this browser.';
}

function speakFinnish(text) {
    // Use a text-to-speech API or service to produce speech output in Finnish.
    // This code will depend on the specific API or service you choose to use.
    // For example, using the Web Speech API for speech synthesis:
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fi-FI'; // Set the language to Finnish
    synth.speak(utterance);
    // Other APIs or services may have different methods and settings.
}
