<template>
    <div class="wallet">
        <top-component title="我的钱包"></top-component>
        <div class="content">
            <div class="img-box">
                <img :src="src" alt="">
                <div class="info">
                    <div class="icon">
                        <img :src="this.$store.state.userInfo.headImageUrl" alt="">
<!--                        <div class="vip-icon">-->
<!--                            <img :src="this.lists[0].img" alt="">-->
<!--                        </div>-->
                    </div>
                    <div class="name">{{ authentication }}</div>
                </div>
            </div>
            <div class="panel">
                <div class="box">
                    <div class="title">账户额度（元）</div>
                    <div class="money">
                        <span class="inner">￥ {{ money1 }}</span>
                    </div>
                    <el-button type="primary" @click="handleWithdraw" :disabled="withdrawDisabled">提现</el-button>
                    <div class="line"></div>
                </div>
                <div class="box">
                    <div class="title">待还金额（元）</div>
                    <div class="money">
                        <span class="inner">￥ {{ money2 }}</span>
                    </div>
                    <el-button type="primary" :disabled="repayDisabled" @click="handleRepayment">立即还款</el-button>
                </div>
            </div>
            <!--<div class="panel">
                <div>
                    <div class="title">账户额度（元）</div>
                    <div class="money">
                        <span class="inner">￥ {{ money1 }}</span>
                        <el-button type="primary" @click="handleWithdraw">提现</el-button>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div>
                    <div class="title">待还金额（元）</div>
                    <div class="money">
                        <span class="inner">￥ {{ money2 }}</span>
                        <el-button type="primary" @click="handleRepayment">立即还款</el-button>
                    </div>
                </div>
            </div>-->
        </div>
        <footerComponent :idx="2"></footerComponent>

        <el-dialog
            title="密码"
            :visible.sync="dialogVisible"
            @close="closeForm('dialogVisible','pwdForm')">
            <el-form :model="pwdForm" status-icon  ref="pwdForm" label-width="50px" class="demo-ruleForm">
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="pwdForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="closeForm('dialogVisible','pwdForm')">取消</el-button>
                    <el-button type="primary" @click="submitForm('pwdForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
  export default {
    name: "wallet",
    data() {
      return {
        money1: 0,
        money2: 0,
        src: '',
        repayDisabled: true,
        withdrawDisabled: true,
        authentication: '',
          needPassword: false,
          dialogVisible: false,
          pwdForm: {
            password:''
          },
          lists: [
              {img: require('../../../static/img/commonvip.png')},
              {img: require('../../../static/img/supervippng.png')}
          ],
      }
    },
    created() {
        this.$request.get('info').then(res => {
            if (!res.code) {
                if (res.data.authentication){
                    this.authentication = '已认证'
                }
                this.needPassword = res.data.needPassword;
            } else {
                this.authentication = '未认证'
            }
        });
        this.src = require('../../../static/img/wallet.jpg')
        this.$request.get('getWallet').then(res => {
            if (!res.code) {
                if (res.data) {
                    this.withdrawDisabled = res.data.money <= 0;
                    return this.money1 = res.data.money;
                }
            } else {
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        });
        this.$request.get('getMonthRefund').then(res => {
            if (!res.code) {
                if (res.data) {
                    this.money2 = res.data.money
                    if (this.money2 > 0) {
                        this.repayDisabled = false
                    }
                    return
                }
            }
        });
    },
    methods: {
        submitForm(formName) {
            var password = this[formName]['password'];
            if (isNaN(password) || password.length != 6) {
                this.$message({
                    type:'error',
                    message: '提现密码为6位数字!'
                })
                return;
            }
            this.doWithdraw();
        },
        closeForm(visible, form) {
            this[visible] = false;
            for (let key in this[form]) {
                this[form][key] = '';
            }
        },
      handleWithdraw() {
          if (this.needPassword) {
                this.dialogVisible = true;
          } else {
              this.doWithdraw()
          }
      },
        doWithdraw() {
          //1.生成一个获取最新用户信息
          this.$request.post('draw',{'money': this.money1, 'password': this.pwdForm.password}).then(res => {
              if (!res.code) {
                  this.money1=0
                  this.closeForm('dialogVisible', 'pwdForm')
              }
              this.$message({
                  type: !res.code ? 'success' : 'warning',
                  message: res.msg
              })
          })
      },
      handleRepayment() {
          this.$message({
              type: 'warn',
              message: '当前还未到到还款日期'
          })
      }
    }
  }
</script>

<style scoped lang="less">
    .wallet {
        height: 100%;
        width: 100%;
        overflow: hidden;
        .content {
            margin-top: 2.8rem;
            .img-box {
                width: 100%;
                height: 200px;
                overflow: hidden;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
                .info {
                    position: absolute;
                    z-index: 999;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    .name {
                        border-radius: 11px;
                        border: 1px solid #fff;
                        height: 25px;
                        width: 80px;
                        color: #fff;
                        line-height: 25px;
                        margin-top: 20px;
                        text-align: center;
                    }
                    .icon {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        border: 2px solid #fff;
                        overflow: hidden;
                        img {
                            height: 100%;
                            width: 100%;
                        }
                        .vip-icon {
                            overflow: hidden;
                            border-radius: 50%;
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            left: 70%;
                            top: -5%;
                        }
                    }
                }
            }
        }

        .panel {
            height: 200px;
            width: 96%;
            margin: 10px auto;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            background: #fff;
            box-sizing: border-box;
            padding: 20px 0;

            .box {
                width: 50%;
                height: 100%;
                float: left;
                box-sizing: border-box;
                position: relative;
                padding: 20px 10px;
                text-align: center;

                .line {
                    position: absolute;
                    width: 1px;
                    height: 100%;
                    right: 0;
                    top: 0;
                    background: #EBEEF5;
                }

                .title {
                    font-size: 16px;
                    margin-bottom: 15px;
                }

                .money {
                    font-size: 30px;
                    color: #f56c6c;
                }

                button {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    width: 80%;
                    transform: translateX(-50%);
                }
            }
        }
    }
</style>
