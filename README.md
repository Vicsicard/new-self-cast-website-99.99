# Self Cast Studios Website

This repository contains the Self Cast Studios website with image upload functionality.

## Project Structure

- `index.html` - Main website
- `image-uploader.html` - Image upload interface
- `server.js` - Express server for handling image uploads
- `public/images/` - Directory for storing uploaded images

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Access the website:
   - Main website: http://localhost:3000
   - Image uploader: http://localhost:3000/image-uploader.html

## Image Upload Features

- Drag and drop interface for easy uploading
- Preview images before uploading
- Support for multiple image formats (JPG, PNG, GIF, WebP, SVG)
- File size limit of 5MB per image
- Gallery view of uploaded images

## Development

For development with auto-restart:
```
npm run dev
```

## Technologies Used

- HTML/CSS
- JavaScript
- TailwindCSS
- Express.js
- Multer (for file uploads)
