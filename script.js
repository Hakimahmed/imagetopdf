// Select DOM elements
const uploadBox = document.getElementById('uploadBox');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const convertBtn = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');
const downloadBtn = document.getElementById('downloadBtn');

// Event listener for file upload
imageInput.addEventListener('change', handleFileUpload);
uploadBox.addEventListener('click', () => imageInput.click());

// Handle file upload and image preview
function handleFileUpload(event) {
    const files = event.target.files;
    imagePreview.innerHTML = '';  // Clear any previous previews

    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imagePreview.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        });
        convertBtn.disabled = false;  // Enable convert button
    }
}

// Convert images to PDF and enable download link
convertBtn.addEventListener('click', function() {
    const images = document.querySelectorAll('.preview img');
    const pdf = new jsPDF();

    images.forEach((img, index) => {
        const imgData = img.src;
        if (index > 0) {
            pdf.addPage();
        }
        pdf.addImage(imgData, 'JPEG', 10, 10, 180, 160);  // Adjust image size as necessary
    });

    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Show download button
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'converted_images.pdf';
        link.click();
    });

    // Show download link
    downloadLink.style.display = 'block';
});
