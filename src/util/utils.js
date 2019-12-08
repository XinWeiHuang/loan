import axios from 'axios'
// const { interfaceUrl } = require('../../static/config')
// export const location = interfaceUrl;
export const global = {
  transferData(data, column, childCol = {}) {
    const result = [];
    if (data instanceof Array) {
      data.forEach(item => {
        const aliasCol = childCol;
        column.forEach(col => {
          if (item[col.prop] !== undefined && col.alias) {
            aliasCol[col.alias] = item[col.prop];
            if (item[col.prop] instanceof Array) {
              arguments.callee(item[col.prop], col.children, aliasCol[col.alias] = {});
            }
          }
        })
        result.push(aliasCol)
      })
    }
    return result
  },
  addThousSeparator(nbr) {
    if (nbr && nbr > 999) {
      //1. 从后往前插进数组，然后 join(",");
      var newNbr = nbr.toString();
      var arr = [];
      while (newNbr > 999) {
        var idx = newNbr.indexOf(".");
        if (idx > -1) { //包含小数
          arr.push(newNbr.substr(idx - 3, newNbr.length - (idx - 3)));
          newNbr = newNbr.substr(0, idx - 3);
        } else {
          arr.push(newNbr.substr(newNbr.length - 3, 3));
          newNbr = newNbr.substr(0, newNbr.length - 3);
        }
      }
      arr.push(newNbr);
      arr.reverse();
      return arr.join(",");
    } else {
      return nbr;
    }
  },
  setLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getLocal(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  removeLocal(key) {
    localStorage.removeItem(key)
  },
  setSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getSession(key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  removeSession(key) {
    sessionStorage.removeItem(key)
  }
};

export const location = 'http://192.168.1.106:8082/' // 服务器地址
const requestUrl = {
  user: {
    getLogin: '',
    postRegister: '',
    getIdCard: 'idCard',
<<<<<<< HEAD
    updateIdCard: 'idCard',
  },
  resource: {
    verification: 'verification'
=======
    postIdCard: 'idCard',
>>>>>>> 2dc9945de0019c23e7555e3f6db462cd48817135
  }
}
const getRequestUrl = (url) => {
  for (let i in requestUrl) {
    const controller = i
    const second = requestUrl[i]
    for (let n in second) {
      if (url === n) {
        return location + controller + '/' + second[n]
      }
    }
  }
  return ''
};

let handler = {
  get(target, property) {
    ['get', 'post'].forEach((methods) => {
      target[methods] = (url, data = {}, params = {}) => {
        /*  if (methods == 'get') {
            return new Promise((resolve, reject)=> {
              $.ajax({
                method: methods,
                url: reqUrl,
                dataType: 'jsonp',
                data,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                jsonp: 'callbackparam',
                success(res) {
                  if (params.ns) {
                    resolve(res)
                  }
                  if (res instanceof Object) {
                    if (res.success) {
                      if (!params.all) {
                        resolve(res.model, res);
                      } else {
                        resolve(res);
                      }
                    } else {
                      reject(res.msg);
                    }
                  } else {
                    resolve(res);
                  }
                },
                error(error) {
                  reject(error);
                }
              })
            })
          } else {*/
        return new Promise((resolve, reject) => {
          if (!url) {
            reject();
            return;
          }
          const reqUrl = getRequestUrl(url);
          axios.defaults.withCredentials = true;
          axios({
            method: methods,
            url: reqUrl,
            data: params,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            params: data
          }).then(response => {
              resolve(response.data)
            }
          ).catch(error => {
            reject(error);
          });
        })
      }
    })
    return target[property];
  }
};
let request = new Proxy({}, handler);
export default request
