const { parse } = require('url');
const { createReadStream, createWriteStream } = require('fs');
const { join } = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Parse the request URL
      const { pathname } = parse(req.url);
      // Define the file path where the uploaded file will be stored
      const filePath = join(process.cwd(), 'uploads', pathname.replace('/api/upload', ''));

      // Create a write stream to save the uploaded file
      const writeStream = createWriteStream(filePath);

      // Pipe the request stream to the write stream
      await pipelineAsync(req, writeStream);

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