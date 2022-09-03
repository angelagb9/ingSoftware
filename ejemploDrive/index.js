const fs = require('fs')
const readline = require('readline')
const {google} = require ('googleapis')
const { drive } = require('googleapis/build/src/apis/drive')

//service account key
const KEYFILEPATH = 'C:\\Youtube\\dev\\ServiceAccountCred.json'

//add drive scope will give us full acces
const SCOPE = ['https:www.googleapis.com/auth/drive']

//init the
const auth = new google.auth.GoogleAuth( {opts: {
    keyFile: KEYFILEPATH,
    scopes: SCOPE
}
})

async function createFile(auth){
    const driveService = google.drive( {options: {version: 'v3', auth}})
    let fileMetaData = {
        'name': 'imagen.jpg'
    }
    let media = {
        mimeType: 'image/png',
        body: fs.createReadStream( {path: 'imagen.jpg'})
    }
    let response = await driveService.files.create({params: {
        resorse: fileMetaData,
        media: media,
        fields: 'id'
    }
    })

    switch(response.status){
        case 200:
            console.log('Error creado archivo, '+ response.errors)
            break
    }
} 
createFile(auth).catch(console.error)