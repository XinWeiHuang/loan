<template>
    <div class="loan-list">
        <top-component title="我的借款"></top-component>
        <div class="wrapper">
            <div class="group" v-for="item in  loadList" @click="getListDetail(item)">
                <div class="title">
                    <el-row>
                        <el-col :span="12">
                            <span>借款编号</span>
                            <span>{{ item.id }}</span>
                        </el-col>
                        <el-col :span="12">
                            <span class="status">{{ item.statusName }}</span>
                            <i class="icon iconfont icon-un-forward-o"></i>
                        </el-col>
                    </el-row>
                </div>
                <div class="content">
                    <el-row>
                        <el-col :span="4" class="col-l">
                            <div class="icon-box">
                                <i class="icon iconfont icon-un-money-o"></i>
                            </div>
                        </el-col>

                        <el-col :span="20">
                            <div class="body">
                                <p>
                                    <span>金额：</span>
                                    <span>￥{{ item.money }}</span>
                                </p>
                                <p>
                                    月供：￥{{ item.money }}* {{ item.monthNum }}期
                                </p>
                                <p class="create-date">
                                    订单生成时间：{{ item.createDate }}
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
<!--            <div class="empty" v-if="!loadList.length"></div>-->
        </div>

        <footerComponent :idx="1"></footerComponent>
    </div>
</template>

<script>
  /*
  * id
  * orderId
  * userId
  * money
  * monthNum
  * termMoney
  * receiveBank
  * receiveAccount
  * status
  * curAuditorId
  * isDelete
  * createTime
  * updateTime
  * statusName
  * */
  export default {
    name: "loanList",
    data() {
      return {
        loadList: []
      }
    },
    created() {
      this.$request.get('getLoan').then(res => {
        console.log(res);
        if (!res.code) {
          this.loadList = res.data || []
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    methods: {
      getListDetail(item) {
        this.$router.push({path: './loanProgress', query: {id: item.id}})
      }
    }
  }
</script>

<style scoped lang="less">
    @import '~@/common/var.less';

    .loan-list {
        height: 100%;

        .wrapper {
            height: 100%;
            padding-top: 2.75rem;
            box-sizing: border-box;
            overflow: auto;
            background: #EBEEF5;

            .group {
                border-bottom: 1px solid #ccc;
                padding: 0 10px;
                box-sizing: border-box;
                background: #fff;
                margin-bottom: 5px;
                box-shadow: 2px 2px 2px #ccc;

                .title {
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    border-bottom: 1px solid #DCDFE6;

                    .el-row {
                        .el-col:nth-of-type(1) {
                            text-align: left;
                        }

                        .el-col:nth-of-type(2) {
                            text-align: right;
                        }

                        i {
                            font-size: 20px;
                            position: relative;
                            top: 2px;
                        }
                    }

                    .status {
                        color: #f90006;
                    }

                }

                .content {
                    padding: 10px 0;

                    .col-l {
                        margin-top: 6px;
                    }

                    .icon-box {
                        height: 40px;
                        width: 40px;
                        line-height: 40px;
                        text-align: center;
                        border: 1px solid #EBEEF5;

                        i {
                            font-size: 30px;
                            color: @themeColor
                        }
                    }

                    .body {
                        font-size: 14px;
                        color: #707070;

                        p {
                            padding: 2px 0;
                        }

                        .create-date {
                            color: #000;
                        }
                    }
                }
            }
        }
    }
</style>
