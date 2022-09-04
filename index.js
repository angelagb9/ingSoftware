
const fs = require('fs')
const {google} = require('googleapis')

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
            'name': 'img.jpg',
            'parents': [folderID]
        }

        const media ={
            mimeType: 'image/jpg',
            body: fs.createReadStream('./imagen.jpg')
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