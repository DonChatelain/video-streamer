import { VideoListItem } from '@org/types';
import { createReadStream } from 'fs';
import { readdir, stat } from 'fs/promises';
import { resolve as pathResolve } from 'path';

const volume = '/Volumes/Big Boi';

export class VideoRepo {
  storagePath: string;

  constructor(folder = 'Movies') {
    this.storagePath = `${volume}/${folder}`;
  }

  public static async getFileStat(filename: string) {
    return await stat(pathResolve(`${filename}`));
  }

  public static async getVideo(filename: string, start: number, end: number) {
    const stream = createReadStream(pathResolve(`${filename}`), {
      start,
      end,
    });

    return stream;
  }

  public async getList() {
    try {
      const fileList = await this.getFiles(pathResolve(this.storagePath));

      const filesWithPaths = fileList.map((f) => ({
        fullPath: f,
        filename: f.split('/').splice(-1, 1).join(''),
      }));

      const listItems: Promise<VideoListItem>[] = filesWithPaths.map((data) => {
        return new Promise((resolve, reject) => {
          stat(pathResolve(data.fullPath))
            .then((stats) => {
              resolve({
                filename: data.filename,
                fullPath: data.fullPath,
                size: stats.size,
              });
            })
            .catch(reject);
        });
      });

      return await Promise.all(listItems);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async getFiles(dir: string): Promise<string[]> {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents
        .filter((dirent) =>
          dirent.isDirectory() ? true : this.isSupportedFile(dirent.name)
        )
        .map((dirent) => {
          const res = pathResolve(dir, dirent.name);
          return dirent.isDirectory() ? this.getFiles(res) : res;
        })
    );
    return Array.prototype.concat(...files);
  }

  private isSupportedFile(file: string) {
    let isSupported = false;

    // todo: AVI
    const supportedExtensions = ['.mp4', '.mov', '.mkv'];

    isSupported =
      !file.startsWith('.') &&
      supportedExtensions.some((ext) => file.endsWith(ext));
    return isSupported;
  }

  private isBlackListed(file: string) {
    let blackListed = false;

    const blackSuffixes = [
      '.imovielibrary',
      '.theater',
      '.stash',
      '.bif',
      '.mp3',
      '.srt',
    ];
    const blackPrefixes = ['.'];

    blackListed =
      blackPrefixes.some((x) => file.startsWith(x)) ||
      blackSuffixes.some((x) => file.endsWith(x));

    return blackListed;
  }
}
