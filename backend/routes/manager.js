import express from 'express';
import multer from 'multer';
import midiToPdf from "../utils/midiToPdf.cjs";
import { v4 } from 'uuid'
import Database from '../db/dbConnectPool.js'   //import

const router = express.Router();
const db = new Database()

// multer 설정
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './storage/');
    },
    filename: function (req, file, callback) {
        const originalName = file.originalname;
        callback(null, originalName);
    }
});

let upload = multer({ storage: storage });

router.post('/upload', upload.array('selectedFile'), function(req, res, next) {
    //파일받은거 처리
    const fileName = req.files[0].originalname
    console.log(fileName)
    const fileUUID = v4()
    midiToPdf.midiToPdf(fileName, fileUUID).then((success) => {
        if (!success) {
            return res.status(404).send('not found');
        }
        // db 에 fileName, fileUUID 넣기
        new Promise((resolve, reject) => {
            db.getConnection((conn) => {   // getConnection 메소드 사용
                conn.query('INSERT INTO storage (name, uuid) VALUES (?, ?)', [fileName, fileUUID], function(err, row, field) {
                    if(err) {
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                });
                conn.release()
            })
        }).then(success => {
            if (!success) {
                return res.status(401).send('not found');
            }
            return res.send(`${fileUUID}`);
        })
    })
});

router.get('/download/:uuid', function(req, res, next) {
    if (req.params.uuid === '' || typeof req.params.uuid === 'undeinfed') {
        return res.status(404).send('not found');
    }
    new Promise((resolve, reject) => {
        db.getConnection((conn) => {
            conn.query('SELECT name from storage where uuid = ?', [req.params.uuid], function(err, row) {
                if (err || !row || typeof row[0] === 'undefined') {
                    resolve([false, undefined])
                } else {
                    resolve([true, row[0].name])
                }
            });
            conn.release()
        })
    }).then(([success, fileName]) => {
        if (!success) {
            return res.status(401).send('not found');
        }
        return res.download(`./storage/pdf/${req.params.uuid}.pdf`, `${fileName}.pdf`);
    })
});

export default router;