<template>
    <div class="info-wrapper">
        <topComponent title="我的资料"> </topComponent>
        <div class="content">
            <div class="panel" v-for="(panel, index) in data" :key="index">
                <div class="more">{{ panel.title }}</div>
                <div class="user-list">
                    <router-link v-for="(item, vIndex) in panel.group" :key="vIndex" :to="item.route">
                        <div class="list-group">
                            <el-row>
                                <el-col :span="3">
                                    <div class="img-box">
                                        <img :src="item.icon" alt="">
                                    </div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="list-name">
                                        <div class="data-tip">{{ item.title }}</div>
                                        <div class="list-more">{{ item.describe }}</div>
                                    </div>
                                </el-col>
                                <el-col :span="5">
                                    <div class="f-status">
                                        <div class="status-name">{{ item.status ? '已填写': '未填写' }}</div>
                                        <div class="seltarr">></div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="agreement">
                <p>
                    本人已阅读并同意签署《个人消费贷款合同》、《个人信用报告查询授权书》，同意报送贷款相关信息至金融信用信息基础数据库（人行征信系统）
                </p>
            </div>

           <!-- <section class="submit">
                <el-button @click="">立即借款</el-button>
            </section>-->
        </div>

    </div>
</template>

<script>
  export default {
    name: "info",
    data() {
      return {
        data: []
      }
    },
    created() {
        this.data = [
          { title: '只需3分钟完成资料验证，即可申请借款哦~', group: [
              { route: { path: './userDetail' },  icon: require('../../assets/img/g_01.png'), title: '身份信息', describe: '*让我们了解您的基本情况', status: false },
              { route: { path: './personalData' },  icon: require('../../assets/img/g_04.png'), title: '资料信息', describe: '*让我们了解您的资料信息', status: false },
              { route: { path: './bankDetail' },  icon: require('../../assets/img/g_02.png'), title: '收款银行卡', describe: '银行卡号为收款账号也为还款账号', status: false },
              /*{ route: { path: './phoneDetail' },  icon: require('../../assets/img/g_05.png'), title: '手机号认证', describe: '*认证您本人的手机号', status: false }*/
            ]
          }
        ];
    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
    @import '~@/common/var.less';
    .info-wrapper {
        height: 100%;
        background: #f2f2f2;
        .content {
             height: calc(100% - 2.75rem);
             position: relative;
             top: 2.75rem;
            .panel {
                background: #fff;
            }
            .agreement {
                font-size: 12px;
                color: #999;
                padding: 10px;
                line-height: 21px;
            }
            .submit {
                margin-top: 10px;
                text-align: center;
                .el-button {
                    width: 90%;
                    background: @themeColor;
                    color: #fff;
                }
            }
        }
        .more {
            background: #f2f2f2;
            font-size: 12px;
            color: #666;
            text-align: center;
            padding: 10px;
        }
        .user-list {
            .list-group {
                height: 50px;
                position: relative;
                padding-left: 5%;
                box-sizing: border-box;
                position: relative;
                .el-row {
                    height: 100%;
                    .el-col {
                        height: 100%;
                        line-height: 50px;
                    }
                }
                &:not(:last-child):after{
                    content: '';
                    position: absolute;
                    height: 1px;
                    bottom: 0;
                    width: 95%;
                    right: 0;
                    background: #e4e4e4;
                }
                .img-box {
                    width: 30px;
                    height: 30px;
                    margin-top: 10px;
                    img {
                        width: 100%;
                        height: 100%;
                        right: 0;
                    }
                }

                .list-name {
                    position: relative;
                    top: 8px;
                    .data-tip {
                        font-size: 14px;
                        color: #333;
                        height: 20px;
                        line-height: 20px;
                        color: #333;
                    }
                    .list-more {
                        font-size: 12px;
                        height: 15px;
                        line-height: 15px;
                        color: #999;
                    }
                }

                .f-status {
                    text-align: right;
                    overflow: hidden;
                    color: #999;
                    .status-name {
                        font-size: 14px;
                        display: inline-block;
                        margin-right: 5px;
                    }
                    .seltarr {
                        display: inline-block;
                    }
                }
            }
        }
    }

</style>
