
const state = {}
var copyState = deepClone(state) // 拷贝state对象
function deepClone (obj) {
  var newObj = obj instanceof Array ? [] : {}
  for (var i in obj) {
    newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
  }
  return newObj
}

export const mutations = {
  changeLoanIconStatu(state, param) {
    state.loanIcons[param.name] = param.val;
  },
  uploadCreditStatu(state, param) {
    console.log('this is mutations');
    state.creditStatus[param.name] = param.val;
  },
  uploadCreditData(state, param) {
    console.log('this is mutations');
    state.creditDatas[param.name] = param.val;
  },
  uploadApplys(state, param) {
    state[param.name] = param.val;
  },
  setLoanDetail(state, params) {
    state.loanDetail[params.prop] = params.val;
  },
  setLoanMoney(state, val) {
    state.loanDetail.money = val;
  },
  setCustomerInfo(state, data) {
    state.userInfo = data;
  },
  resetState (state) {
   /* for (var i in copyState) {
      state[i] = copyState[i] // 递归赋值
    }*/
   state.userInfo = {};
  },
  setCloseTips(state, data) {
    state.closeTips = data;
  }
};
