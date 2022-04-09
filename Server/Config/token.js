
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    
    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

function generateAccessToken(username) {
    return jwt.sign(username, TOKEN_SECRET);
}
  
module.exports = {
  authenticateToken,
  generateAccessToken
}