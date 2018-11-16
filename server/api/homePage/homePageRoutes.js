import express from 'express';
const router = express.Router();

/* It exposes an API to listen to certain routes. We do a server .get specifying
the route we're interested in as the first argument. The second argument is the
event handler, similar to an HTTP module, receives both a request and a
response object.*/
router.get('/', (req,res) => {
  res.render('index', {
    content: 'Loading Home Page'
  });
});

export default router;
