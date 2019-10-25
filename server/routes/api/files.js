const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/files/');
const uploader = fileUpload.uploader;

const dModule = require('../../modules/files/filesController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetFileAndFolder);
router.post('/', authorization, uploader.single('file'), dModule.UploadFiles);
router.post('/folder', authorization, dModule.AddFolders);

module.exports = router;
