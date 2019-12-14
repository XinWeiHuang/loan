export const actions = {
  getCustomerInfo({ commit }) {
    const vm = this._vm;
    vm.$request.get('info').then(res=> {
      if (!res.code) {
        return commit('setCustomerInfo', res.data)
      }
      vm.$message({
        type: 'error',
        msg: res.msg
      });
    })
  }
}

