<template>
    <div class="wrapper">
        <top-component title="还款" ></top-component>
        <div class="content">
            <div class="group" v-if="model">
                <div class="title">{{ date }}</div>
                <div class="money">{{ money }}</div>
                <div class="explain">请确保余额储蓄卡账户资金充足，在还款日当天按时还款，以免逾期产生利息。</div>
            </div>
            <div class="empty" v-else>
                <div class="img-box">
                    <img src="../../assets/img/p_01.png" alt="">
                </div>
                <div>无需还款哦！</div>
                <div>您本月暂无需要还款账单。</div>
            </div>

            <!--<div class="group">
                <div class="panel">
                    <div class="title">剩余还款计划</div>
                    <div class="content">
                        <span class="date"></span>
                        <span class="money"></span>
                    </div>
                </div>
            </div>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: "repayment",
    data() {
      return {
        money: '00.00',
        date: '',
        model: false
      }
    },
    created() {
        this.$request.get('getMonthRefund').then(res=> { //
            if (res.code == 0 && res.data) {
              this.model = true;
              const { date, money } = res.data;
              this.date = date;
              this.money = money;
            }
        });
    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
    @import '~@/common/var.less';
    .wrapper {
        .content {
            box-sizing: border-box;
            padding-top: 2.75rem;
            .group {
                background: #fff;
                padding: 10px;
                padding-bottom: 20px;
                box-sizing: border-box;
                .title {
                    font-size: 18px;
                    text-align: center;
                    padding: 10px 0;
                }
                .money {
                    text-align: center;
                    font-size: 30px;
                    font-weight: bold;
                    color: @themeColor
                }
                .explain {
                    padding-top: 10px;
                }
            }
            .empty {
                .img-box {
                    width: 127px;
                    height: 114px;
                    margin: 0 auto;
                    margin-top: 25%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                div {
                    text-align: center;
                    font-size: 16px;
                    color: grey;
                    line-height: 28px;
                }
            }
        }
    }
</style>
