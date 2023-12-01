import fs from 'fs';

export function import_file (file_name, file_type = 'utf-8') {
  try {
    const data = fs.readFileSync(file_name, file_type);
    return data.toString();
  } catch (error) {
    console.error(error);
  }
}