const jwt = require('jsonwebtoken');

function decodetoken (token)
{   
    const claims = jwt.decode(token);
    
    const userId = claims.id;
    
    return userId;
}

function decodeemail (token)
{
    const claims = jwt.decode(token);
    
    const email = claims.sub;
    
    return email;
}

module.exports = { decodetoken };