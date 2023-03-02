'use strict'
const express = require('express')
const {Router} = require('express')
const {createEnterprise, addSucursal, listEnterprise, updateEnterprise, deleteEnterprise, login, deleteSucursal, updateSucursal} = require("../controller/enterprise.controller")
const api = Router()

api.post('/create-enterprise', createEnterprise)
api.post('/add-sucursal/:id',addSucursal)
api.get('/list-enterprises', listEnterprise)
api.put('/update-enterprise/:id', updateEnterprise)
api.put('/update-sucursal/:id',updateSucursal)
api.delete('/delete-enterprise/:id', deleteEnterprise)
api.delete('/delete-sucursal/:id',deleteSucursal)
api.post('/login',login)

module.exports = api;