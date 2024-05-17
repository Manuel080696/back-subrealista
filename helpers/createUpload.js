const fs = require('fs').promises;

const createUpload = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

module.exports = {
  createUpload,
};
