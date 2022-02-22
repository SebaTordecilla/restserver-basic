const {Router} = require('express');
const {check} = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias');
const {  existeCategoriaPorId} = require('../helpers/db-validators');

const {
    validarJWT,
    validarCampos,
    esAdminRole
} = require('../middlewares');




const router = Router();


//obtener todas las categorias
router.get('/', obtenerCategorias);


//obtener una categoria
router.get('/:id', [
    check('id', 'El nombre es obligatorio').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);

//crear nueva categoria -privado con token valido
router.post('/', [validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//actualizar
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], actualizarCategoria);

//crear nueva categoria -privado con token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El nombre es obligatorio').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);



module.exports = router;