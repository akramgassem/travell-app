const app = require('.');
const routes = require('./routes');

// listen to for incoming requests
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server app listening on port http://localhost:${PORT}`);
});

// default uri
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});
// app use api
app.use('/api', routes);
