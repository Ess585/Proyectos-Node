'use strict'
const Enterprise = require("../models/enterprise.model")
const bcrypt = require('bcrypt')
const {generateJWT} = require('../helpers/create-jwt')

const createEnterprise = async(req,res)=>{
    const {nameEnterprise, email, password} = req.body
    try{
        let user = await Enterprise.findOne({email})
        if(user){
            return res.status(400).send({
                ok: false,
                message: 'Este correo ya se encuentra en uso',
                user: user
            })
        }
        user = new Enterprise(req.body)
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
        user = await user.save()
        res.status(200).send({
            message:`Bienvenido a ${nameEnterprise}`,
            user
        })

    }catch(error){
        throw new Error(error)
    }
}



const listEnterprise = async(req,res)=>{
  try{
    const enterprises = await Enterprise.find()
    if(!enterprises){
      res.satatus(400).send({
        message: 'No hay datos'
      })
    }else{
      res.status(200).send({
        cuentas: enterprises
      })
    }
  }catch(error){
    throw new Error(error)
  }
}

const updateEnterprise = async (req,res)=>{
  const id = req.params.id
  const editEnterprise = {...req.body}
  editEnterprise.password = editEnterprise.password
  ? bcrypt.hashSync(editEnterprise.password, bcrypt.genSaltSync())
  : editEnterprise.password
  const company = await Enterprise.findByIdAndUpdate(id, editEnterprise,{new:true})
  if(company){
    res.status(200).send({
      message: 'El registro ha sido actualizado', company
    })
  }else{
    res.status(400).send({message: 'error este usuario no existe en la base de datos'})
  }
  
  
}

const deleteEnterprise = async (req,res)=>{
  try{
    const id = req.params.id
    const deleteEnterprise = await Empresa.findByIdAndDelete(id)
    return res.status(200).send({
      message: 'Se han eliminado los datos'
    })
  }catch(er){
    throw new Error(er)
  }
}

const login = async(req,res)=>{
  const { email, password } = req.body
  try{
    const company = await Enterprise.findOne({email})
    if(!company){
      return res.status(400).send({
        ok:false,
        message: "email incorrecto o datos no validos"
      })
    }
    const validPassword = bcrypt.compareSync(password, company.password)
    if(!validPassword){
      return res.status(400).send({
        ok: false,
        message: "contraseña incorrecta"
      })
    }
        res.json({
            ok: true,
            uid: empresa.id,
            name: empresa.name,
            email: empresa.email,
            empresa: empresa.nombreEmpresa,
            puesto: empresa.puesto,
            
        })
  }catch(er){
    throw new Error(er)
  }

}
const addSucursal = async (req, res) => {
  const { name, email} = req.body; 
  try {
    const id = req.params.id;
    const { direccion, nsucursal } = req.body;

    const registSucursal = await Empresa.findByIdAndUpdate(id,
      {
        $push: {
          sucursal: {
            direccion: direccion,
            nsucursal: nsucursal,
           
          },
        },
      },
      { new: true }
    );
    if (!registSucursal) {
      return res.status(404).send({ message: "No hemos encontrado esta empresa" });
    }

    return res.status(200).send({ message: "sucursal agregada", registSucursal });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteSucursal = async(req,res)=>{
  const id = req.params.id;
    const { idSucursal } = req.body;
    try {
      const elimSucusar = await Empresa.updateOne(
        { id },
        {
          $pull: { sucursal: { id: idSucursal } },
        },
        { new: true, multi: false }
      );
  
      if (!elimSucusar) {
        return res.status(404).send({ message: "El registro no existe" });
      }
  
      return res.status(200).send({ message: `sucursal eliminado`, elimSucusar });
    } catch (error) {
      throw new Error(error);
    }
}

const updateSucursal = async(req,res)=>{
  const id = req.params.id;
    const {idSucursal, direccion, nsucursal} = req.body;
    try {
      const editSucursal = await Empresa.updateOne(
        { _id: id, "sucursal._id": idSucursal },
        {
          $set: {
            "sucursal.$.direccion": direccion,
            "sucursal.$.nsucursal": nsucursal
          },
        },
        { new: true }
      );
  
      if (!editSucursal) {
        return res.status(404).send({ message: "No existe este registro" });
      }
  
      return res.status(200).send({ message: "se edito la sucursal con exito", editSucursal });
    } catch (error) {
      throw new Error(error);
    }
}


module.exports = {createEnterprise, listEnterprise, addSucursal, updateEnterprise, deleteEnterprise, login, deleteSucursal, updateSucursal}