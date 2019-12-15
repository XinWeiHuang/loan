<template>
    <div class="load-detail-wrapper">
        <top-component title="申请贷款"></top-component>
        <div class="content">
            <header>确认借款信息</header>
            <section>
                <el-row>
                    <el-col :span="6">借款金额</el-col>
                    <el-col :span="18">￥{{ money }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">借款期限</el-col>
                    <el-col :span="18">{{ monthNum }}个月</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">每月还款</el-col>
                    <el-col :span="18">￥{{ termMoney }}（含日利率 {{ moneyRate }} %）</el-col>
                </el-row>
            </section>
        </div>
        <footer>
            <el-checkbox v-model="model">我已确认</el-checkbox>
            <div>
                <el-button type="primary" @click="submit()">提交借款申请</el-button>
            </div>
        </footer>
    </div>
</template>

<script>
  export default {
    name: "loanDetail",
    data() {
      return {
        model: false,
          money: '',
          monthNum: '',
          termMoney: '',
          moneyRate: '',
      }
    },
    created() {
      const { money, monthNum, termMoney, moneyRate } = this.$store.state.loanDetail;
      this.money = money
      this.monthNum = monthNum;
      this.termMoney = termMoney;
      this.moneyRate = moneyRate;
    },
    methods: {
      submit() {
        if (!this.model) {
          return this.$message({
            showClose: true,
            message: '请先确认借款信息',
            type: 'warning'
          });
        }
        const {money, monthNum, termMoney} = this.$store.state.loanDetail;
        this.$request.post('postLoan', {}, {'money': this.money, 'monthNum': this.monthNum, 'termMoney': this.termMoney}).then(res => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'  // 成功设置为 success，失败设置为 error
          });
        });
      }
    }
  }
</script>

<style scoped lang="less">
    .load-detail-wrapper {
        height: 100%;

        .content {
            background: #fff;
            padding: 10px;
            padding-top: 2.75rem;
            box-sizing: border-box;
            position: relative;

            header {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #eee;
                font-size: 16px;
                font-weight: bold;
            }

            section {
                margin-top: 10px;

                .el-row {
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    color: #606266;
                }
            }
        }

        footer {
            margin-top: 20px;
            padding: 0 15px;

            > div {
                text-align: center;
                margin-top: 20px;

                .el-button {
                    width: 100%;
                }
            }
        }
    }
</style>
