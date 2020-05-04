import { Router } from 'express';

import multer from 'multer';

import speech from '@google-cloud/speech';
import fs from 'fs';
import uploadConfig from '../config/upload';

// Imports the Google Cloud client library
const upload = multer(uploadConfig);

const chatbotRouter = Router();

chatbotRouter.get('/', (req, res) => {
  return res.json({ message: 'online!' });
});

chatbotRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const client = new speech.SpeechClient();
    const fileRead = fs.readFileSync(file.path);
    const audioBytes = fileRead.toString('base64');
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const [response] = await client.recognize(request);
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Error' });
  }
});
export default chatbotRouter;
