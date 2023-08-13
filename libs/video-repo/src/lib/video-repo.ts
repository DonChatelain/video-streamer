import { createReadStream, readdir } from 'fs';
import { stat } from 'fs/promises';
import path = require('path');

const storagePath = '/Volumes/Big Boi/Movies';

export class VideoRepo {
  public static async getFileStat(filename: string) {
    return await stat(path.resolve(storagePath, `${filename}.mp4`));
  }

  public static async getVideo(filename: string, start: number, end: number) {
    const stream = createReadStream(
      path.resolve(storagePath, `${filename}.mp4`),
      {
        start,
        end,
      }
    );

    return stream;
  }
  public static async getList(): Promise<string[]> {
    return await new Promise((resolve, reject) => {
      readdir(path.resolve(storagePath), (err, fileList) => {
        if (err) reject(err);
        else
          resolve(
            fileList.filter(
              (file) => !file.startsWith('.') && file.endsWith('.mp4')
            )
          );
      });
    });
  }
}
