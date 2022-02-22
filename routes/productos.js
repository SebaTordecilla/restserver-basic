const {Router} = require('express');
const {check} = require('express-validator');
const {crearProducto, obtenerProductos,obtenerProducto,actualizarProducto,borrarProducto} = require('../controllers/productos');
const {existeProductoPorId} = require('../helpers/db-validators');

const {
    validarJWT,
    validarCampos,
    esAdminRole
} = require('../middlewares');




const router = Router();


//obtener todas las categorias
router.get('/', obtenerProductos);


//obtener una categoria
router.get('/:id', [
    check('id', 'El nombre es obligatorio').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);


//crear nueva categoria -privado con token valido
router.post('/', [validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto);


//actualizar
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], actualizarProducto);



router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El nombre es obligatorio').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);


module.exports = router;