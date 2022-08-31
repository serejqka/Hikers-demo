const path = require('path');
const util = require('util');

const storage = async (file) => {
  const fileName = file.name;
  const size = file.data.length;
  const extension = path.extname(fileName);
  const allowedExtensions = /png|jpeg|jpg|gif|webp/;

  if (!allowedExtensions.test(extension)) throw 'Unsupported extension !';
  if (size > 5000000) throw 'File must be less than 5MB';

  const md5 = file.md5 + new Date().getTime();
  const URL = `/images/review/${md5}${extension}`;
  await util.promisify(file.mv)(`./public${URL}`);
  return URL;
};

module.exports = storage;
