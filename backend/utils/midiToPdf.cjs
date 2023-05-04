const { spawn } = require('child_process')
const { jsPDF } = require('jspdf') //midi를 악보로 변환함
const fs = require('fs')

const midiToPdf = (fileName, uuid) => {
    return midiToScore(fileName).then(() => {
        return scoreToPdf(fileName, fileCount(fileName), uuid)
    })
}

const fileCount = (fileName) => {
    let fileCount = 0
    while(true) {
        if (fs.existsSync(`./storage/${fileName}_${fileCount + 1}.png`)) {
            fileCount++
        } else {
            break
        }
    }
    return fileCount
}

const midiToScore = async (fileName) => {
    return new Promise((resolve, reject) => {
        let scoreCounter = 0
        const midiToSheetProcess = spawn('MidiToSheet.exe', [`./storage/${fileName}`, `./storage/${fileName}`])
        console.log('변환시작')
        midiToSheetProcess.stdout.on('data', (data) => {
            const output = data.toString().trim();
            console.log(`stdout: ${output}`)
        });
        midiToSheetProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`)
            resolve(false)
        });
        midiToSheetProcess.on('close', (code) => {
            console.log(`MidiToSheet process exited with code ${code}`)
            resolve(true)
        })
    })
}

const scoreToPdf = (fileName, scoreCounter, uuid) => {
    return new Promise((resolve, reject) => {
        const doc = new jsPDF()
        let imagePaths = []
        if (scoreCounter === 0) {
            return resolve(false)
        }

        for (let i = 1; i <= scoreCounter; i++) {
            imagePaths.push(`./storage/${fileName}_${i}.png`)
            console.log(`./storage/${fileName}_${i}.png`)
        }

        for (let i = 0; i < imagePaths.length; i++) {
            let imgData = fs.readFileSync(imagePaths[i]).toString('base64');
            doc.addImage(imgData, 'PNG', 0, 0, 210, 0)
            if (i !== imagePaths.length - 1) {
                doc.addPage()
            }
        }
        doc.save(`./storage/pdf/${uuid}.pdf`)
        return resolve(true)
    })
}

module.exports = { midiToPdf }