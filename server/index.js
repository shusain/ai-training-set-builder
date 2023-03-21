const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());

app.post('/api/save', upload.single('image'), (req, res) => {
  const base64Image = req.file.buffer.toString('base64');
  const imageExt = req.file.mimetype.split('/')[1];
  const imageName = `image_${Date.now()}.${imageExt}`;
  const imageFolder = req.body.folderPath;

  if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder, { recursive: true });
  }

  fs.writeFileSync(path.join(imageFolder, imageName), base64Image, 'base64');
  fs.writeFileSync(path.join(imageFolder, `${imageName}.txt`), req.body.description);

  res.status(200).json({ message: 'Files saved successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
