const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/user');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('rol', 'NO es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    /*check('rol').custom(async(rol = '') => {
        const existeRol = await Role.findOne({ rol });
        if (!existeRol) {
            throw new Error(`el rol ${rol} no se encuentra registrado en BD`);
        }
    }),*/
    validarCampos

], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;