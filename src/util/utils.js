import axios from 'axios'
import qs from 'qs'
import '../../static/config';
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

// export const location = 'http://47.106.228.71:8080/' // 服务器地址
export const location = config.location;
//export const location = 'http://192.168.1.100:8080/' // 服务器地址
const requestUrl = {
  user: {
    login: '',
    registry: '',
    getIdCard: 'idCard',
    updateIdCard: 'idCard',
    info: 'info',
    messageCode: 'messageCode',
    editPassword: 'updatePassword',
    headerImg: 'headerImg'
  },
  admin: {
    signout: 'signout'
  },
  bankCard: {
    getBankCard: '',
    postBankCard: ''
  },
  loan: {
    getLoan: '',
    processing: 'processing',
    postLoan: '',
    getLogs: 'getLogs',
    findById: 'findById',
    getMonthRefund: 'getMonthRefund'
  },
  resource: {
    verification: 'verification'
  },
  workInfo: {
    getWorkInfo: '',
    postWorkInfo: ''
  },
  contact: {
    get: '',
    main: 'main',
    other: 'other'
  },
  system: {
    getloanRange: 'getloanRange',
    getLoanRate: 'getMonthRates',
    systemfind: 'find',
  },
  wallet: {
    getWallet: '',
    draw: 'draw'
  },
  webInfo: {
    serviceLink: 'serviceLink',
    getInfo: 'find'
  },
  article: {
    getarticle: '',
    articleDetail: 'detail'
  },
  articleItem: {
    getDropDown: 'getDropDown'
  }
}
export const getRequestUrl = (url) => {
  for (let i in requestUrl) {
    const controller = i;
    const second = requestUrl[i];
    for (let n in second) {
      if (url === n) {
        return location + controller + '/' + second[n]
      }
    }
  }
  return ''
};

const dateFormat = function (fmt, date) {
  let ret;
  let opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

let handler = {
  get(target, property) {
    ['get', 'post'].forEach((methods) => {
      target[methods] = (url, data = {}) => {
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
          let contentType = '';
          if (methods == 'get') {
            contentType = 'application/json;charset=UTF-8',
            data["adkshj"] =  dateFormat("YYYY-mm-dd HH:MM:SS",new Date())
          } else {
            contentType = 'application/x-www-form-urlencoded'
          }
          axios({
            method: methods,
            url: reqUrl,
            // data: qs.stringify(data),
            data,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            params: methods == 'get' ? data : false
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
