<template>
    <div class="wrapper">
        <topComponent title="资料信息"></topComponent>
        <div class="content">
            <div class="group">
                <div class="title">填写真实有效的信息，审核才会通过哦~</div>
                <div class="section">
                    <el-row v-for="item in formLayout" :key="item.prop">
                        <el-col :span="10">{{ item.label }}</el-col>
                        <el-col :span="14">
                            <input type="text" v-model="formData[item.prop]">
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <footer>
            <el-button type="primary" @click="submit">提交</el-button>
        </footer>
    </div>
</template>

<script>
  /*
  * el-upload中的:data="{  }" 是上传附带的参数
  *
  * */
  export default {
    name: "userDetail",
    data() {
      return {
        formData: {
          owner: '',
          ownerIdcard: '',
          openBank: '',
          carNo: ''
        },
        formLayout: [],
      }
    },
    created() {
      // const { id } = this.$store.userInfo; 暂时先注释，不然会报错，用的时候在放开
      this.formLayout = [
        { label: '持卡人姓名', prop: 'owner' },
        { label: '持卡人身份账号', prop: 'ownerIdcard' },
        { label: '开户银行', prop: 'openBank' },
        { label: '银行卡卡号', prop: 'carNo' }
      ];

      // 获取用户信息，赋值给formData
      this.$request.get('getBankCard').then(data=> {
        if (!data.code) {
          this.formData = data.data;
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      });
    },
    methods: {
      submit() {
        // 提交信息
        this.$request.post('postBankCard', this.formData).then(data=> {
          console.log(data);
          if (!data.code) {
            this.$router.back();
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        });

      }
    }
  }
</script>

<style scoped lang="less">
    .wrapper {
        height: 100%;
        .content {
            padding-top: 2.75rem;
            padding-bottom: 3.5rem;
            box-sizing: border-box;
            .title {
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 12px;
            }
            .section {
                background: #fff;
                padding: 10px;
                box-sizing: border-box;
                .el-row {
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    border-bottom: 1px solid #eee;
                    color: #4c4c4c;
                    &:last-child {
                        border-bottom: none;
                    }
                    input {
                        text-align: right;
                        color: #333;
                        width: 100%;
                    }
                }
                .panel {
                    margin: 10px 0;
                    padding: 10px;
                    box-sizing: border-box;
                    border: 1px solid #eee;
                    border-radius: 2px;
                }
            }
        }
        footer {
            position: fixed;
            bottom: 0;
            height: 3.5rem;
            background: #e8eaec;
            width: 100%;
            line-height: 3.5rem;
            text-align: center;
            .el-button {
                width: 90%;
            }
        }
    }
</style>
