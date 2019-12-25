<template>
    <div class="wallet">
        <top-component title="我的钱包"></top-component>
        <div class="content">
            <div class="img-box">
                <img :src="src" alt="">
            </div>
            <div class="panel">
                <div class="box">
                    <div class="title">账户额度（元）</div>
                    <div class="money">
                        <span class="inner">￥ {{ money1 }}</span>
                    </div>
                    <el-button type="primary" @click="handleWithdraw">提现</el-button>
                    <div class="line"></div>
                </div>
                <div class="box">
                    <div class="title">待还金额（元）</div>
                    <div class="money">
                        <span class="inner">￥ {{ money2 }}</span>
                    </div>
                    <el-button type="primary" @click="handleRepayment">立即还款</el-button>
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
    </div>
</template>

<script>
  export default {
    name: "wallet",
    data() {
      return {
        money1: 0,
        money2: 0,
        src: ''
      }
    },
    created() {
      this.src = require('../../../static/img/wallet.jpg')
      this.$request.get('getWallet').then(res => {
        if (!res.code) {
          if (res.data) {
            return this.money1 = res.data.money;
          }
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      });
    },
    methods: {
      handleWithdraw() {
        this.$request.post('draw').then(res => {
          this.$message({
            type: !res.code ? 'success' : 'warning',
            message: res.msg
          })
        })
      },
      handleRepayment() {
        // 立即还款
        this.$request.post('').then(res => {

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

                img {
                    width: 100%;
                    height: 100%;
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
