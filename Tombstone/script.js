// Function to handle file upload
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display upload status
        generateQRCode(); // Generate QR code after upload
    })
    .catch(error => console.error('Error:', error));
});

// Function to generate QR code
function generateQRCode() {
    const qrDiv = document.getElementById('qr-code');
    const url = window.location.href;
    qrDiv.innerHTML = ''; // Clear previous QR code if exists
    new QRCode(qrDiv, url);
}

// Function to display uploaded pictures and videos
function displayUploadedContent() {
    fetch('get_uploads.php')
    .then(response => response.json())
    .then(data => {
        const uploadedContentDiv = document.getElementById('uploaded-content');
        uploadedContentDiv.innerHTML = ''; // Clear previous content
        data.forEach(item => {
            if (item.image_path) {
                const img = document.createElement('img');
                img.src = item.image_path;
                uploadedContentDiv.appendChild(img);
            }
            if (item.video_path) {
                const video = document.createElement('video');
                video.src = item.video_path;
                video.controls = true;
                uploadedContentDiv.appendChild(video);
            }
        });
    })
    .catch(error => console.error('Error:', error));
}

// Call displayUploadedContent function to show uploaded content initially
displayUploadedContent();
