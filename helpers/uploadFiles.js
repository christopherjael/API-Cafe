const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFiles = async (
  files = '',
  allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'],
  carpet = ''
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const shortedName = file.name.split('.');
    const extension = shortedName[shortedName.length - 1];

    if (!allowedExtensions.includes(extension)) {
      return reject(
        `Extension of this file is not allowed, allowed extensions: ${allowedExtensions}`
      );
    }

    const nameTemp = uuidv4() + '.' + extension;

    const uploadPath = path.join(__dirname, '../uploads/', carpet, nameTemp);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nameTemp);
    });
  });
};

module.exports = { uploadFiles };
