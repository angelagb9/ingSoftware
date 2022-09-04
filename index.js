
const fs = require('fs')
const {google} = require('googleapis')
const {jsPDF} = require('jspdf')

//crear un documento pdf
var doc = new jsPDF();
doc.setFontSize(22);
doc.text(20, 20, 'This is a title');
doc.setFontSize(16);
doc.text(20, 30, 'This is some normal sized text underneath.');
//doc.save('Test.pdf');


const folderID = '1g1c8AG6lr0M2pEUwUmcnLmFgGj3ME4ne'

async function uploadFile(){
    try{
        const auth = new google.auth.GoogleAuth({
            keyFile: './googleKey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })

        const driveService= google.drive({
            version: 'v3',
            auth 
        })

        const fileMetaData = {
            'name': 'test.pdf',
            'parents': [folderID]
        }

        const media ={
            mimeType: 'application/pdf',
            body: fs.createReadStream('./Test.pdf')
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })
        return response.data.id
    }
    catch(err){
        console.log('Error al subir el archivo ', err)
    }
}

uploadFile().then(data=>{
    console.log(data)
})