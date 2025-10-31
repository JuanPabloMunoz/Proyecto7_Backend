const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let token = req.cookies.token;// obtenemos el token de la cookie

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        const openToken = jwt.verify(token, process.env.SECRET);
        req.user = openToken.user;// guardamos la informacion del usuario en la solicitud
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalido o expirado', error });
    }
}