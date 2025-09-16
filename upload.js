document.addEventListener('DOMContentLoaded', function() {
    const htmlFileInput = document.getElementById('htmlFile');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadedFiles = document.getElementById('uploadedFiles');
    const htmlPreview = document.getElementById('htmlPreview');
    const htmlSource = document.getElementById('htmlSource');
    
    // Store uploaded files
    const files = [];
    
    // Handle file selection
    htmlFileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            previewFile(file);
        }
    });
    
    // Handle upload button click
    uploadBtn.addEventListener('click', function() {
        const file = htmlFileInput.files[0];
        if (file) {
            uploadFile(file);
        } else {
            alert('Please select an HTML file first.');
        }
    });
    
    // Preview the selected file
    function previewFile(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const content = e.target.result;
            
            // Display HTML source
            htmlSource.textContent = content;
            
            // Display HTML preview
            htmlPreview.innerHTML = content;
        };
        
        reader.readAsText(file);
    }
    
    // Upload the file (in a real app, this would send to a server)
    function uploadFile(file) {
        // In a production environment, you would send this file to a server
        // For this demo, we'll just simulate a successful upload
        
        // Create a unique ID for the file
        const fileId = Date.now().toString();
        
        // Add to our files array
        files.push({
            id: fileId,
            name: file.name,
            content: htmlSource.textContent,
            date: new Date().toLocaleString()
        });
        
        // Update the UI
        updateFileList();
        
        // Clear the file input
        htmlFileInput.value = '';
        
        // Show success message
        alert(`File "${file.name}" uploaded successfully!`);
        
        // In a real application, you would use FormData and fetch API:
        /*
        const formData = new FormData();
        formData.append('htmlFile', file);
        
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('File uploaded successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading file.');
        });
        */
    }
    
    // Update the list of uploaded files
    function updateFileList() {
        uploadedFiles.innerHTML = '';
        
        if (files.length === 0) {
            uploadedFiles.innerHTML = '<p>No files uploaded yet.</p>';
            return;
        }
        
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileInfo = document.createElement('div');
            fileInfo.textContent = `${file.name} (uploaded on ${file.date})`;
            
            const viewBtn = document.createElement('button');
            viewBtn.textContent = 'View';
            viewBtn.className = 'btn';
            viewBtn.style.backgroundColor = '#2196F3';
            viewBtn.style.padding = '5px 10px';
            viewBtn.style.marginLeft = '10px';
            
            viewBtn.addEventListener('click', function() {
                htmlSource.textContent = file.content;
                htmlPreview.innerHTML = file.content;
            });
            
            fileItem.appendChild(fileInfo);
            fileItem.appendChild(viewBtn);
            uploadedFiles.appendChild(fileItem);
        });
    }
    
    // Initialize the file list
    updateFileList();
});
