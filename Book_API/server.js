const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

/* Swagger setup */
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Library System API',
        version: '1.0.0',
        description: 'API for a simple library management system'
      },
      servers: [
        {
          url: `http://localhost:${config.port}`,
          description: 'Development server'
        }
      ]
    },
    apis: ['./routes/*.js']
  };

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import routes
const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/members');
const transactionRoutes = require('./routes/transactions');

// Use routes
app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/transactions', transactionRoutes);

app.listen(config.port, () => {
  console.log(`Server berjalan di port ${config.port}`);
});

module.exports = app;

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         stock:
 *           type: integer
 *     Member:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         borrowedBooks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *               borrowedDate:
 *                 type: string
 *                 format: date-time
 *         penaltyEndDate:
 *           type: string
 *           format: date-time
 */
