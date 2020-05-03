const app = require('.');
const routes = require('./routes');

// listen to for incoming requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server app listening on port http://localhost:${PORT}`);
});

// app use api
app.use('/api', routes);
