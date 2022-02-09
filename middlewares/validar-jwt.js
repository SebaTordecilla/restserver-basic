const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'NO hay token en la peticioón'
        })
    }

    console.log(token);
    next();
}


module.exports = {
    validarJWT
};