<template>
    <div class="wallet">
        <top-component title="我的钱包"></top-component>
        <div class="content">
            <div class="panel">
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
            </div>
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
        money2: 0
      }
    },
    created() {
       this.$request.get('getWallet').then(res=> {
         console.log(res);
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
        this.$request.post('draw').then(res=> {
          this.$message({
            type: !res.code ? 'success' : 'warning',
            message: res.msg
          })
        })
      },
      handleRepayment() {
        // 立即还款
        this.$request.post('').then(res=> {

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
            margin-top: 4rem;
        }
        .panel {
            height: 200px;
            width: 96%;
            margin: 10px auto;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            background: #fff;
            margin-bottom: 10px;
            box-sizing: border-box;
            position: relative;

            > div {
                position: absolute;
                padding: 20px;
                width: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-sizing: border-box;

                .title {
                    font-size: 30px;
                    margin-bottom: 15px;
                    font-weight: bold;
                }

                .money {
                    font-size: 30px;
                    color: #f56c6c;
                    margin-top: 40px;
                    button {
                        float: right;
                    }
                }
            }
        }
    }
</style>
