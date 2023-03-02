'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmpresaSchema = Schema({
    name: String,
    email: String,
    password: String,
    puesto: String,
    nombreEmpresa: String,
    tipoE: String,
    sucursal: [{
        direccion: String,
        nsucursal: Number,
        
    }
    ]
})

module.exports = mongoose.model("empresas", EmpresaSchema)