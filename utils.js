import fs from 'fs';
import path from 'path';

export const diretoryTreeToObj = (dir, done) => {
  let results = {};

  fs.readdir(dir, (err, list) => {
    if (err)
      return done(err);

    let pending = list.length;

    if (!pending)
      return done(null, {name: path.basename(dir), type: 'folder', children: results});

    list.forEach(file => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        const id = file.replace(/\\/g, '/');
        if (stat && stat.isDirectory()) {
          diretoryTreeToObj(file, (err, res) => {
            results[id] = {
              name: path.basename(file),
              id,
              type: 'folder',
              children: res,
            };
            if (!--pending)
              done(null, results);
          });
        }
        else {
          results[id] = {
            type: 'file',
            id,
            name: path.basename(file),
          };
          if (!--pending)
            done(null, results);
        }
      });
    });
  });
};
