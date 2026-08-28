const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { Store } = require('./store');

const app = express();
const store = new Store(
  process.env.DATA_FILE ? path.resolve(process.env.DATA_FILE) : null);

app.use(express.json());
app.use(morgan('tiny'));

function validBookmark(body) {
  if (!body || typeof body.url !== 'string') return 'url is required';
  if (!/^https?:\/\//.test(body.url)) return 'url must be absolute';
  if (body.tags && !Array.isArray(body.tags)) return 'tags must be an array';
  return null;
}

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/bookmarks', (req, res) => {
  res.json(store.search(req.query.q, req.query.tag));
});

app.post('/api/bookmarks', (req, res) => {
  const err = validBookmark(req.body);
  if (err) return res.status(400).json({ error: err });
  res.status(201).json(store.add(req.body));
});

app.delete('/api/bookmarks/:id', (req, res) => {
  if (!store.remove(Number(req.params.id))) {
    return res.status(404).json({ error: 'not found' });
  }
  res.status(204).end();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on :' + port));
