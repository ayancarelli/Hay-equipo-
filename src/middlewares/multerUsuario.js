const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file,cb) =>{
        cb(null,path.join(__dirname,'../../public/img/img-users'));
    },
    filename: (req,file,cb) =>{
        const newFileName = 'img-user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer ({storage: storage});

module.exports = upload;