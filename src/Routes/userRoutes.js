const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const userModel = require('../Models/userModel');

// --------- Import the controllers ----------
const user_controller = require('../Controllers/userController');


router.route("/list").get(user_controller.all_users);

router.route("/details/:id").get(user_controller.user_details);

router.route("/update").put(user_controller.user_update);

router.route("/delete").delete(user_controller.user_delete);

const d = new Date()
const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
const ho = new Intl.DateTimeFormat('en', { hour: '2-digit' }).format(d)
const mi = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d)

var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
        cb(null, "./src/archivos")
    }, 
    filename: function (req, file, cb) { 
      cb(null, ye + "-" + mo + "-" + da + "-" + ho + "-" + mi + "-" + file.fieldname + "-" + file.originalname) 
    } 
  }) 
    
  var upload = multer({ storage: storage })       
  

  router.post('/create', upload.single('file'), async (req, res, next) => {
    const file = req.file
    // console.log(file);
    console.log(req.body.name);
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }

    if (!req.body.name || !req.body.lastname || !req.body.documentType || !req.body.document || !req.body.email || !req.body.phone || !req.body.born) {
        return res.status(400).send({
            success: false,
            message: "Por favor rellene todos los campos solicitados"
        });
    }

    const imagepost= new userModel({
        name: req.body.name,
        lastname: req.body.lastname,
        documentType: req.body.documentType,
        document: req.body.document,
        email: req.body.email,
        phone: req.body.phone,
        born: req.body.born,
        file: file.path,
    })

        await imagepost.save()
        .then(data => {
            res.send({
                success: true,
                message: "Su registro se ha guardado exitosamente",
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Ocurrio un error al crear el registro",
            });
        })
    
  })


module.exports = router;