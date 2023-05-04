import express from 'express';
import multer from 'multer';

const router = express.Router();

// multer 설정
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        const originalName = file.originalname;
        callback(null, originalName);
    }
});
let upload = multer({ storage: storage });

router.post('/upload', upload.array('selectedFiles'), function(req, res, next) {
    // 업로드된 파일들을 처리하는 로직을 작성합니다.
    console.log(req.files);

    //todo: 파일받은거 처리

    res.send('파일 변환 완료');
});

router.get('/download', function(req, res, next) {
    res.send('respond with a resource');
});

export default router;