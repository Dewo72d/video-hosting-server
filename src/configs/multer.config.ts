import { diskStorage } from 'multer';


const filter = (req, file, callback) => {

    
    if (file.mimetype === "video/mp4" || file.mimetype === "video/webm") {
        callback(null, true)
    }
    return callback(null, false)

}

export const multerConfig = {
    dest: '/video-server/videos',
    storage: diskStorage({
        destination: (req, file, cb) => {
            cb(null, '/video-server/videos');
        },
        filename: (req, file, cb) => {
            //const uniqueSuffix = Math.round(Math.random() * 1e9);
            cb(null, file.originalname);
        },
    }),

    fileFilter: filter,
}

