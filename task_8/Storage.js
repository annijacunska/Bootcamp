export class Storage {
  #db = {
    // next_id: 1, //TODO change local id to storage id
    data: {}
  }

  constructor (name) {
    this.storage_name = name;
    const temp_data = localStorage.getItem(name);
    if (temp_data != null) {
      this.#db = JSON.parse(temp_data);
    }
  }

  getData() {
    return this.#db.data;
  }

  add(id, task, done) {
    this.#db.data[id] = {
      id: id,
      text: task,
      done: done
    };
    this.save();
  }

  remove(id) {
    delete this.#db.data[id];
    this.save();
  }

  save() {
    localStorage.setItem(this.storage_name, JSON.stringify(this.#db));
  }
}