<template>
    <div class="wrapper">
        <topComponent title="资料信息"></topComponent>
        <div class="content">
            <div class="group">
                <div class="title">填写真实有效的信息，审核才会通过哦~</div>
                <div class="section">
                    <el-row v-for="item in formLayout1" :key="item.prop">
                        <el-col :span="10">{{ item.label }}</el-col>
                        <el-col :span="14">
                            <input type="text" v-model="formData[item.prop]">
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="group">
                <div class="title">直系亲属联系人</div>
                <div class="section">
                    <el-row v-for="item in formLayout2" :key="item.prop">
                        <el-col :span="10">{{ item.label }}</el-col>
                        <el-col :span="14">
                            <input v-if="item.label != '关系'" type="text" v-model="formDataMain[item.prop]">
                            <el-select v-else v-model="formDataMain[item.prop]">
                                <el-option v-for="item in  relationSelect" :label="item.label" :key="item.prop"
                                           :value="item.prop"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="group">
                <div class="title">其他联系人</div>
                <div class="section">
                    <el-row v-for="item in formLayout2" :key="item.prop">
                        <el-col :span="10">{{ item.label }}</el-col>
                        <el-col :span="14">
                            <input v-if="item.label != '关系'" type="text" v-model="formDataOther[item.prop]">
                            <el-select v-else v-model="formDataOther[item.prop]">
                                <el-option v-for="item in  relationSelect" :label="item.label" :key="item.prop"
                                           :value="item.prop"></el-option>
                            </el-select>
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
  const relationSelect = [
    {label: '朋友', prop: 0},
    {label: '姐妹', prop: 1},
    {label: '兄弟', prop: 2},
    {label: '父母', prop: 3},
    {label: '夫妻', prop: 4}
  ];
  export default {
    name: "userDetail",
    data() {
      return {
        relationSelect: relationSelect,
        formData: {
          name: '',
          idCode: ''
        },
        formDataMain: {},
        formDataOther: {},
        formLayout1: [],
        formLayout2: [],
      }
    },
    created() {
      const {workInfo, education, mainContact, otherContact} = this.$store.state.userInfo;
      this.formLayout1 = [
        {label: '学历', prop: 'education'},
        {label: '公司名称', prop: 'companyName'},
        {label: '职位', prop: 'position'},
        {label: '公司电话', prop: 'companyPhone'},
        {label: '公司地址', prop: 'companyAddress'}
      ];

      this.formLayout2 = [
        {label: '姓名', prop: 'name'},
        {label: '手机号', prop: 'phone'},
        {label: '关系', prop: 'relation'}
      ];

      this.formLayout2 = [
        {label: '姓名', prop: 'name'},
        {label: '手机号', prop: 'phone'},
        {label: '关系', prop: 'relation'}
      ];

      // 获取用户信息，赋值给formData
      this.$request.get('getWorkInfo', {id: workInfo}).then(res => {
        if (!res.code) {
          this.formData = res.data || {};
          this.formData['education'] = education;
        }
      });
      // 直系联系人
      console.log(mainContact)
      this.$request.get('get', {id: mainContact}).then(res => {
        if (!res.code) {
          return this.formDataMain = res.data;
        }
        this.$message({
          type: 'error',
          message: res.msg
        });
      });
      // 其他联系人
      this.$request.get('get', {id: otherContact}).then(res => {
        if (!res.code) {
          return this.formDataOther = res.data;
        }
        this.$message({
          type: 'error',
          message: res.msg
        });
      })
    },
    methods: {
      submit() {
        // 提交信息
        this.$request.post('postWorkInfo', this.formData).then(res => {
          if (res.code) {
            return this.$message({
              type: 'error',
              message: res.msg
            })
          }
          this.$store.dispatch('getCustomerInfo');
        });
        this.$request.post('main', this.formDataMain).then(res => {
          if (res.code) {
            return this.$message({
              type: 'error',
              message: res.msg
            })
          }
          this.$store.dispatch('getCustomerInfo');
        });
        this.$request.post('other', this.formDataOther).then(res => {
          if (res.code) {
            return this.$message({
              type: 'error',
              message: res.msg
            });
          }
          this.$store.dispatch('getCustomerInfo');
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

                    .el-col {
                        .el-select {
                            width: 100%;
                            margin-top: 5px;
                        }
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

    .avatar-uploader {
        text-align: center;
        position: relative;

        .el-upload__text {
            width: 100%;
            font-size: 12px;
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            color: #C0C4CC;
        }
    }

    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
