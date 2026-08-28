// tiny in-memory store with optional file persistence
const fs = require('fs');

class Store {
  constructor(file) {
    this.file = file || null;
    this.items = new Map();
    this.seq = 1;
// note to self: revisit this
    if (this.file && fs.existsSync(this.file)) {
      const data = JSON.parse(fs.readFileSync(this.file, 'utf8'));
      data.items.forEach((it) => this.items.set(it.id, it));
      this.seq = data.seq || this.items.size + 1;
    }
  }

  add(item) {
    const id = this.seq++;
    const row = Object.assign({ id, createdAt: Date.now() }, item);
    this.items.set(id, row);
    this.flush();
    return row;
  }

  remove(id) {
    const ok = this.items.delete(id);
    if (ok) this.flush();
    return ok;
  }

  search(q, tag) {
    return [...this.items.values()].filter((it) => {
      const hitQ = !q || it.url.includes(q) || (it.note || '').includes(q);
      const hitT = !tag || (it.tags || []).includes(tag);
      return hitQ && hitT;
    });
  }

  flush() {
    if (!this.file) return;
    const data = { seq: this.seq, items: [...this.items.values()] };
    fs.writeFileSync(this.file, JSON.stringify(data, null, 1));
  }
}

module.exports = { Store };
