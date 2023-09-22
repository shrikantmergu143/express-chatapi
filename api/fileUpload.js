// api/fileUpload.js

import { createWriteStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Define the file path where the uploaded file will be stored
      const filePath = join(process.cwd(), 'uploads', 'uploaded-file.txt'); // Update with your desired file path and name

      // Create a write stream to save the uploaded file
      const writeStream = createWriteStream(filePath);

      // Pipe the request stream to the write stream
      await pipeline(req, writeStream);

      // Send a success response
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('File uploaded successfully.');
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('An error occurred while uploading the file.');
    }
  } else {
    // Only allow POST requests
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Method Not Allowed');
  }
};