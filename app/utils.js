export function promisay(self, func, ...args) {
  return new Promise(function(resolve, reject) {
    // node.js object.method(...args, callback)
    // callback is last element of arguments list
    // callbcak signature callbcak(error, data)
    args.push(function(error, ...data) {
      if (error) {
        reject(error);
      } else {
        if (data) {
          resolve(data);
        } else {
          resolve(self);
        }
      }
    });
    func.apply(self, args);
  });
}

export function promi(self, func, ...args) {
  return new Promise(function(resolve, reject) {
    // node.js object.method(...args, callback)
    // callback is last element of arguments list
    // callbcak signature callbcak(error, data)
    args.push(function(...data) {
      if (data) {
        resolve(data);
      } else {
        resolve(self);
      }
    });
    func.apply(self, args);
  });
}
