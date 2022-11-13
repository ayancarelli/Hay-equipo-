const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file,cb) =>{
        cb(null,path.join(__dirname,'../../public/img/img-equipos'));
    },
    filename: (req,file,cb) =>{
        
        console.log(file);
        const newFileName = 'img-equipo-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer ({storage: storage});

module.exports = upload;