var multer  = require('multer'),
    path    = require('path');


//SET STORAGE ENGINE
// exports.storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function(req, res, cb){
//         cb(null, file, fieldname + '-' + Date.now() + 
//         path.extname(file.originalname));
//     }
// });

//Init Upload
// exports.upload = multer({
//     storage: storage
// }).single('image');

