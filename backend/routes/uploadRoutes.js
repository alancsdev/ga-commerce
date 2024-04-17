// import path from 'path';
// import express from 'express';
// import multer from 'multer';

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function fileFilter(req, file, cb) {
//   const fileTypes = /jpe?g|png|webp/;
//   const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = mimeTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Images only!'), false);
//   }
// }

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single('productImage');

// router.post('/', (req, res) => {
//   uploadSingleImage(req, res, function (err) {
//     if (err) {
//       return res.status(400).send({ message: err.message });
//     }

//     res.status(200).send({
//       message: 'Image uploaded successfully',
//       image: `/${req.file.path}`,
//     });
//   });
// });

// export default router;

// the code above is to save the image locally

import path from 'path';
import multer from 'multer';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post('/', upload.single('productImage'), (req, res) => {
  const file = req.file.path;

  cloudinary.uploader.upload(file, async (error, result) => {
    if (error) {
      return res.status(400).send({ message: 'Upload failed', error });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
    });
  });
});

export default router;
