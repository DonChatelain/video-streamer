import express from 'express';
import * as path from 'path';
import { VideoRepo } from '@org/video-repo';
import cors from 'cors';

const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.get('/videos', async (req, res) => {
  try {
    const files = await VideoRepo.getList();
    res.json({ files });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/videos/:title', async (req, res) => {
  try {
    const rangeHeader = req.headers.range;

    // split the range header
    const splittedRange = (rangeHeader as string)
      .replace(/bytes=/, '')
      .split('-');
    const start = parseInt(splittedRange[0]);

    const title = req.params.title.replace('.mp4', '');

    const fileData = await VideoRepo.getFileStat(title);

    // decide the end byte considering chunk size
    const end = splittedRange[1]
      ? parseInt(splittedRange[1], 10)
      : fileData.size - 1;

    // calculate content length
    const contentLength = end - start + 1;

    // create and set response headers
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileData.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    const stream = await VideoRepo.getVideo(title, start, end);

    res.writeHead(206, headers);
    stream.pipe(res);
  } catch (error) {
    res.json({ error });
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
