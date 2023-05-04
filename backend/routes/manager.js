import express from 'express';
import multer from 'multer';
import { PDFDocument } from 'pdf-lib';

const router = express.Router();

// multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer({ storage: storage });

// 파일 업로드를 처리하는 라우터
router.post('/upload', upload.array('selectedFiles'), async function(req, res, next) {
    try {
        // 업로드된 파일들을 처리하는 로직을 작성합니다.
        console.log(req.files);

        // Blob으로 변환하는 코드
        const blobs = req.files.map(file => {
            const blob = new Blob([file.buffer], { type: file.mimetype });
            blob.name = file.originalname;
            return blob;
        });

        // Blob 데이터를 ArrayBuffer로 변환
        const arrayBuffer = await new Response(blobs[0]).arrayBuffer();

        // ArrayBuffer를 Uint8Array로 변환
        const uint8Array = new Uint8Array(arrayBuffer);

        // Uint8Array를 PDF 파일로 변환
        const pdf = await PDFDocument.load(uint8Array);

        // PDF 파일 저장
        const pdfBytes = await pdf.save();

        res.send('PDF 파일 생성 완료');
    } catch (error) {
        console.error(error);
        res.status(500).send('PDF 파일 생성 중 오류 발생');
    }
});

router.get('/download', function(req, res, next) {
    res.send('respond with a resource');
});

export default router;
