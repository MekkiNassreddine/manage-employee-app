const express = require('express');
const authenticateToken = require('./authenticateToken'); 
const { createProxyMiddleware } = require('http-proxy-middleware');
const {setupLogging} = require("./logging");
const cors = require('cors');


const app = express();
app.use(cors());
const port = 3000;

setupLogging(app);

// use authentication token onlt with routes employees and leaves.
app.use('/employees', authenticateToken);
app.use('/leaves', authenticateToken);

app.use('/login', createProxyMiddleware({
  target: 'http://manage-employee-service:8081/employees',
  changeOrigin: true,
  timeout: 60000,
}));

app.use('/retrive', createProxyMiddleware({
  target: 'http://manage-employee-service:8081/employees',
  changeOrigin: true,
  timeout: 60000,
}));

// app.use('/register', createProxyMiddleware({
//   target: 'http://manage-employee-service:8081/employees',
//   changeOrigin: true,
// }));


// Employee Micro Service API Gateway

  app.use('/employees/register', createProxyMiddleware({
    target: 'http://manage-employee-service:8081', 
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        console.log(req.user)
        console.log(JSON.stringify(req.user))
        proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
      }
    },
  }));

  app.use('/employees/all', createProxyMiddleware({
    target: 'http://manage-employee-service:8081', 
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
      }
    },
  }));

  app.use('/employees/identify/:id', createProxyMiddleware({
    target: 'http://manage-employee-service:8081', 
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
      }
    },
  }));

  // update employee
  app.use('/employees/:id', createProxyMiddleware({
    target: 'http://manage-employee-service:8081', 
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
      }
    },
  }));
  
  // delete Emplyee
  app.use('/employees/:id', createProxyMiddleware({
    target: 'http://manage-employee-service:8081', 
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
      }
    },
  }));

// Post fuction : create a new vacation request 
app.use('/leaves/request', createProxyMiddleware({
  target: 'http://manage-leave-work-service:8082', // Replace with your authentication microservice URL
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // Forward the decoded user information to the authentication microservice if needed
    if (req.user) {
      proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
    }
  },
}));

// retrive all Vacations with a GET function
app.use('/leaves', createProxyMiddleware({
  target: 'http://manage-leave-work-service:8082', // Replace with your authentication microservice URL
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // Forward the decoded user information to the authentication microservice if needed
    if (req.user) {
      proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
    }
  },
}));

// Retrieve a single Vacation with id
app.use('/leaves/:id', createProxyMiddleware({
  target: 'http://manage-leave-work-service:8082', // Replace with your authentication microservice URL
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // Forward the decoded user information to the authentication microservice if needed
    if (req.user) {
      proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
    }
  },
}));

// Retrieve all employee vacations with id_card employee : GET function
app.use('/leaves/identify/:id', createProxyMiddleware({
  target: 'http://manage-leave-work-service:8082', // Replace with your authentication microservice URL
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // Forward the decoded user information to the authentication microservice if needed
    if (req.user) {
      proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
    }
  },
}));

app.use('/leaves/state/:id', createProxyMiddleware({
  target: 'http://manage-leave-work-service:8082', // Replace with your authentication microservice URL
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // Forward the decoded user information to the authentication microservice if needed
    if (req.user) {
      proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
    }
  },
}));

// Update 
app.use('/leaves/valide/:id', createProxyMiddleware({
  target: 'http://manage-leave-work-service:8082', // Replace with your authentication microservice URL
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // Forward the decoded user information to the authentication microservice if needed
    if (req.user) {
      proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
    }
  },
}));

// Update 
app.use('/leaves/refuse/:id', createProxyMiddleware({
  target: 'http://manage-leave-work-service:8082', // Replace with your authentication microservice URL
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // Forward the decoded user information to the authentication microservice if needed
    if (req.user) {
      proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
    }
  },
}));

// Delete
app.use('/leaves/:id', createProxyMiddleware({
  target: 'http://manage-leave-work-service:8082', // Replace with your authentication microservice URL
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // Forward the decoded user information to the authentication microservice if needed
    if (req.user) {
      proxyReq.setHeader('X-User-Info', JSON.stringify(req.user));
    }
  },
}));

  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
