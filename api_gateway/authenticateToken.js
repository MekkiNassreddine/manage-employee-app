const jwt = require('jsonwebtoken');

const secretKey = 'podc,kejnjo,jo@@..ceacas'; 

const authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    req.isAuthenticated = false; // Set the property on the req object
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify and decode the token using the shared secret key
    const decoded = jwt.verify(token, secretKey);

    // Check if the token is valid and contains necessary claims
    if (!decoded || !decoded.id_employee || !decoded.email || !decoded.password) {
      console.log(decoded.id_employee)
      console.log(decoded.email)
      console.log(decoded.password)
      console.log(decoded)
      req.isAuthenticated = false; // Set the property on the req object
      return res.status(401).json({ error: ' 1 - Unauthorized: Invalid token' });
    }

    // If the token is valid, set req.isAuthenticated to true
    req.isAuthenticated = true; // Set the property on the req object
    next();
  } catch (err) {
    req.isAuthenticated = false; // Set the property on the req object
    return res.status(401).json({ error: ' 2 - Unauthorized: Invalid token' });
  }
};

module.exports = authenticateToken;
