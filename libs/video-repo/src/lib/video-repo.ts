import { ReadStream, createReadStream, readFile, readdir } from 'fs';
import { stat } from 'fs/promises';
import path = require('path');

export class VideoRepo {
  public static async getVideo(filename: string) {
    const fileData = await stat(path.resolve('data', `${filename}.mp4`));
    const stream = createReadStream(path.resolve('data', `${filename}.mp4`), {
      start: 0,
      end: fileData.size - 1,
    });

    return { stream, size: fileData.size };
  }
  public static async getList(): Promise<string[]> {
    return await new Promise((resolve, reject) => {
      readdir(path.resolve('data'), (err, fileList) => {
        if (err) reject(err);
        else resolve(fileList.filter((file) => file !== '.DS_Store'));
      });
    });
  }

  public static async test() {
    try {
      const files = await this.getList();
      const vid = await this.getVideo(files[0]);
      return vid;
    } catch (e) {
      console.error(e);
    }
  }
}
