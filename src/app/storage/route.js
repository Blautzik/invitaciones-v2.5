import { firebaseAdmin } from '@/firebase/admin';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const storage = firebaseAdmin.storage();
      const { files } = req.body;

      const uploadPromises = files.map(async (file) => {
        const fileId = uuidv4();
        const filePath = `uploads/${fileId}_${file.name}`;
        const fileRef = storage.bucket().file(filePath);

        await fileRef.save(file.data, { contentType: file.type });
      });

      await Promise.all(uploadPromises);

      return res.status(200).json({ message: 'Images uploaded successfully' });
    } catch (error) {
      console.error('Error uploading images:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}