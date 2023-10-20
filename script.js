if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const startRecording = document.getElementById('startRecording');
    const generatePDF = document.getElementById('generatePDF');
    const output = document.getElementById('output');
    const pdfContainer = document.getElementById('pdfContainer');
    
    let convertedText = '';

    recognition.continuous = true; // Continuous listening

    recognition.onresult = function(event) {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;
        
        convertedText += text;
        output.textContent = convertedText;
    };

    recognition.onstart = function() {
        startRecording.textContent = 'Recording...';
        generatePDF.disabled = true;
    };

    recognition.onend = function() {
        startRecording.textContent = 'Start Recording';
        generatePDF.disabled = false;
    };

    startRecording.addEventListener('click', function() {
        recognition.start();
    });

    generatePDF.addEventListener('click', function() {
        generateFormattedPDF(convertedText);
    });

    function generateFormattedPDF(text) {
        // You can use a PDF generation library like pdf-lib to create a PDF from the text.
        // This is a simplified example, and you may need to configure the PDF layout and styling as needed.
        const { PDFDocument, rgb } = PDFLib;

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([400, 600]);
        const { width, height } = page.getSize();
        const contentStream = pdfDoc.register(
          page.drawText(text, {
            x: 10,
            y: height - 30,
            size: 12,
            color: rgb(0, 0, 0),
          })
        );

        page.drawText('Voice-to-Text PDF', {
          x: 10,
          y: height - 10,
          size: 18,
          color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();

        const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));

        // Display the PDF in a container
        pdfContainer.innerHTML = `<embed src="${pdfUrl}" width="400" height="600" />`;
    }
} else {
    output.textContent = 'Speech recognition is not supported in this browser.';
}
