import express from 'express';
const router = express.Router();

/* GET users listing. */
router.post('/upload', function(req, res, next) {
    console.log('12')
    //todo: formdata 받기
    //todo: db로 보내기
    res.send('respond with a resource');
});
router.get('/download', function(req, res, next) {
    res.send('respond with a resource');
});

export default router;
