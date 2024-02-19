import fs from "fs";

export class FileHelper {
  static async getStatus(folder: string): Promise<any> {
    const current = await fs.promises.readdir(folder)
  }
}