const fs = require('fs');
const _ = require('underscore');

module.exports = {
  JSONFilePath: '',
  tempStore: {},
  read() {
    this.tempStore = JSON.parse(fs.readFileSync(this.JSONFilePath, 'utf8'));
  },

  getLastId() {
    return this.tempStore.lastId;
  },

  get(id) {
    return this.findOne('id', id);
  },

  getSanitized() {
    const data = this.tempStore.data.slice();
    const params = Array.prototype.slice.call(arguments);

    data.forEach((rowData) => {
      params.forEach((param) => {
        delete rowData[param];
      });
    });

    return data;
  },

  put(data) {
    const foundData = _.find(this.tempStore.data, function(rowData) {
      return rowData.id === data.id;
    });

    if (!foundData) return false;
    Object.assign(foundData, data);
    return true;
  },

  set(input) {
    const newData = Object.assign({}, input);
    this.tempStore.lastId += 1;
    newData.id = this.tempStore.lastId;
    this.tempStore.data.push(newData);

    return newData;
  },

  save(input) {
    const newRecord = this.set(input);
    this.record();

    return newRecord;
  },

  delete(id) {
    const idx = _(this.tempStore.data).findIndex({ id });
    return _.first(this.tempStore.data.splice(idx, 1));
  },

  record() {
    fs.writeFileSync(this.JSONFilePath, JSON.stringify(this.tempStore), 'utf8');
  },

  isUnique(field, value) {
    const result = _.find(this.tempStore.data, function(user) {
      return user[field] === value;
    });

    return !result;
  },

  findOne(field, value) {
    const result = _.find(this.tempStore.data, function(data) {
      return data[field] === value;
    });

    return result ? Object.assign({}, result) : undefined;
  },

  findMany(field, value) {
    const result = _.filter(this.tempStore.data, function(data) {
      return data[field] === value;
    });

    return result.slice();
  },

  init(filePath) {
    this.JSONFilePath = filePath;
    this.read();
    return this;
  },
};
