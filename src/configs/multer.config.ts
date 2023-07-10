import { diskStorage } from 'multer';


export const multerConfig = {
    dest: '/video-server/videos',
    storage: diskStorage({
        destination: (req, file, cb) => {
            cb(null, '/video-server/videos');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}.mp4`);
        },
    }),
};
