<template>
    <div class="loan-progress">
        <top-component title="贷款进度"></top-component>
        <div class="wrapper">
            <div class="title">
                <span>订单编号：{{ formData.id || '--' }}</span>
            </div>
            <div class="content">
                <el-steps :active="formData.status" align-center>
                    <el-step v-for="item in stepData" :title="item.curStatusName" icon="el-icon-circle-check"></el-step>
                </el-steps>
                <div class="tips">温馨提示：<span class="inner"></span></div>
                <div class="detail">
                    <div class="title">借款详情</div>
                    <div class="content">
                        <el-row v-for="item in detail" :key="item.prop">
                            <el-col :span="6">{{ item.label }}</el-col>
                            <el-col :span="18">{{ formData[item.prop] || '-' }}</el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "loanProgress",
    data() {
      return {
        detail: [],
        formData: {
          id: ''
        },
        detailCode: '9527',
        stepData: [],
        tips: ''
      }
    },
    created() {
      this.detail = [
        {label: '订单编号', prop: 'id'},
        {label: '借款金额', prop: 'money'},
        {label: '借款时间', prop: 'createDate'},
        {label: '到账银行', prop: 'receiveBank'},
        {label: '收款账号', prop: 'receiveAccount'},
        {label: '每月还款', prop: 'termMoney'},
      ];
      const {id} = this.$route.query;
      this.formData.id = id;
      this.$request.get('getLogs', { id }).then(res=> {
        const { data } = res;
        this.stepData = data;
        this.formData.status = data.length;
      });
      // 获取详情
      this.$request.get('findById', {id}).then(res => {
        console.log(res)
        if (!res.code) {
          this.formData = res.data;
          this.tips = res.data.tips;
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          });
        }
      })
    }
  }
</script>

<style scoped lang="less">
    .loan-progress {
        height: 100%;

        .wrapper {
            padding: 10px;
            padding-top: 2.75rem;
            box-sizing: border-box;
            background: #fff;

            .title {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #eee;
                color: #606266;
                font-size: 14px;

                span {
                    margin-right: 10px;
                    /* &:last-child {
                         color: red;
                     }*/
                }
            }

            .content {
                margin-top: 20px;

                /deep/ .el-steps {
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;

                    .iconfont {
                        font-size: 25px;
                        font-weight: 400;
                    }
                }
                .tips {
                    padding: 10px 0;
                    border-bottom: 1px solid #eee;
                    font-size: 12px;
                    color: red;
                    .inner {
                        color: #606266;
                    }
                }
                .detail {
                    margin-top: 20px;

                    .el-row {
                        padding: 5px 0;
                        font-size: 14px;
                        color: #909399;

                        .el-col {
                            &:last-child {
                                color: #606266;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
