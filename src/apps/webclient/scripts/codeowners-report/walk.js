/* eslint-disable semi,no-param-reassign,no-plusplus,consistent-return */

// This snippet has been taken from the following StackOverflow answer
// https://stackoverflow.com/a/5827895
const fs = require('fs');
const path = require('path');

/*
 * Recursively get all files within `dir` and its children
 *
 * Exclude files with `excludedFiles`
 */

function walk(dir, excludedFiles, done) {
  let results = [];

  // get directory contents
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);

    // filter out the excluded files
    list = list.filter(file => !excludedFiles.includes(file));

    // see how many files remain, and return if 0
    let pending = list.length;
    if (!pending) return done(null, results);

    // go through each remaining file
    list.forEach(file => {
      file = path.resolve(dir, file);

      // get file info
      fs.stat(file, (err, stat) => {
        // if it's a directory, recursively call `walk`
        if (stat && stat.isDirectory()) {
          walk(file, excludedFiles, (err, res) => {
            // add it to the results
            results = [...results, ...res]
            pending--;

            // finish if no more files remain
            if (!pending) done(null, results);
          });

          return;
        }

        // add file to the results
        results.push(file);
        pending--;

        // finish if no more files remain
        if (!pending) done(null, results);
      });
    });
  });
}

module.exports = {
  walk
}
