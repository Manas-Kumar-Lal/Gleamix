import express from 'express'
import { generateKeysAndGetUploadSignedUrl } from '../controllers/image.controller.js';
const router = express.Router();

router.post('/generate-keys-and-get-upload-signed-url',generateKeysAndGetUploadSignedUrl)

export default router;