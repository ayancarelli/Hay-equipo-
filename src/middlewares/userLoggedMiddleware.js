const db = require('../database/models');

async function userLoggedMiddleware (req, res, next) {
    
    res.locals.isLogged = false;
    console.log(req.cookies.userEmail);
    if(req.cookies.userEmail != undefined){
        
    let userFromCookie = await db.usuario.findOne({
        where: {
            email: req.cookies.userEmail
        }
    })

	if (userFromCookie) {        
		req.session.userLogged = userFromCookie;
	}

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
}
    next();
}

module.exports = userLoggedMiddleware;