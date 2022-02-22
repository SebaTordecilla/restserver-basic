const {response} = require("express");
const {Producto} = require('../models');
const {populate} = require("../models/categoria");


//obtener Productos -paginado- total - populate

const obtenerProductos = async (req, res = response) => {
    const {
        limite = 5, desde = 0
    } = req.query;
    const query = {
        estado: true
    };

    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        producto
    });
}


////obtener categorias - populate

const obtenerProducto = async (req, res = response) => {

    const {
        id
    } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria','nombre');
    res.json(producto);
}

const crearProducto = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion.toUpperCase();
    const precio =req.body.precio;
    const categoria =req.body.categoria;
    const productoDB = await Producto.findOne({
        nombre
    });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }
    //Generar la data a guardar
    const data = {nombre,usuario: req.usuario._id,precio,categoria,descripcion}
    const producto = new Producto(data);

    await producto.save();
    res.status(201).json(producto);
}


const actualizarProducto = async (req, res = response) => {

    const {id} = req.params;
    const {estado,usuario,...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;


    const producto = await Producto.findByIdAndUpdate(id, data, {
        new: true
    });
    res.json(producto);
}


const borrarProducto = async (req, res = response) => {

    const {id} = req.params;

    const productoBorrado= await Producto.findByIdAndUpdate(id,{
        estado:false,
        disponible:false
    },{
        new:true
    });

    res.status(200).json(productoBorrado);
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}