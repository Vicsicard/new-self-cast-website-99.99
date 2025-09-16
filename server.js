const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/images'));
    },
    filename: function (req, file, cb) {
        // Create unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}).fields([
    { name: 'images', maxCount: 10 }
]);

// Handle image uploads
app.post('/upload', upload, (req, res) => {
    try {
        if (!req.files || !req.files.images || req.files.images.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        const uploadedFiles = req.files.images.map(file => ({
            name: file.originalname,
            size: file.size,
            path: `/public/images/${file.filename}`
        }));

        res.json({ success: true, files: uploadedFiles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get list of uploaded images
app.get('/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'public/images');
    
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to read images directory' });
        }
        
        // Filter out non-image files and get file stats
        const imagePromises = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
            .map(file => {
                return new Promise((resolve, reject) => {
                    const filePath = path.join(imagesDir, file);
                    fs.stat(filePath, (err, stats) => {
                        if (err) reject(err);
                        else {
                            resolve({
                                name: file,
                                path: `/public/images/${file}`,
                                size: stats.size,
                                created: stats.birthtime
                            });
                        }
                    });
                });
            });
            
        Promise.all(imagePromises)
            .then(images => {
                // Sort by creation date (newest first)
                images.sort((a, b) => new Date(b.created) - new Date(a.created));
                res.json({ success: true, images });
            })
            .catch(err => {
                res.status(500).json({ success: false, message: err.message });
            });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Image uploader available at http://localhost:${port}/image-uploader.html`);
});
