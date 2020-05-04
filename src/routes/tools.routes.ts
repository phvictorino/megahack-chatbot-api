import { Router } from 'express';

import multer from 'multer';

import path from 'path';
import speech from '@google-cloud/speech';
import fs from 'fs';
import uploadConfig from '../config/upload';

// Imports the Google Cloud client library
const upload = multer(uploadConfig);

const chatbotRouter = Router();
chatbotRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const client = new speech.SpeechClient();
    const file = fs.readFileSync(file.path);
    const audioBytes = file.toString('base64');
    const audio = {
      content: audioBytes,
    };
    const config = {
      enableAutomaticPunctuation: true,
      encoding: 'WAV',
      languageCode: 'pt-BR',
      model: 'default',
    };
    const request = {
      audio,
      config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    return res.json(response);
  } catch (err) {
    console.log(err);
  }
});
export default chatbotRouter;
