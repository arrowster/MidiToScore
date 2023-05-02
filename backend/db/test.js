import Database from './dbConnectPool.js'   //import

const db = new Database()   // db객체생성

db.getConnection((conn) => {   // getConnection 메소드 사용
    conn.query('select * from miditest2', (error, results, fields) => {   //error= 에러반환, results = 값
        if (error) throw error;   //에러처리
        console.log('test')
        console.log('The solution is: ', results);      //console에 값 보내줌
    })   //query
    conn.release()   //db객체 반환
})   // getConnection