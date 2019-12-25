<template>
    <div class='wrapper'>
        <top-component title="修改密码"></top-component>
        <div class="content">
            <div class="group" :class="{ 'is-error': formKey.password === false }">
                <span>旧密码</span>
                <div>
                    <input v-model="formData.password" @blur="inputBlur('password')" type="password" placeholder="若包含字母，请注意区分大小写">
                </div>
            </div>
            <div class="group" :class="{ 'is-error': formKey.newPassword === false }">
                <span>新密码</span>
                <div>
                    <input v-model="formData.newPassword" @blur="inputBlur('newPassword')"  type="password" placeholder="8-16位，包含数字字母">
                </div>
            </div>
        </div>

        <footer>
            <div class="btn-div">
                <el-button type="primary" @click="submit">确定</el-button>
            </div>
           <!-- <div class="more">
                <el-checkbox v-model="isPassword">显示密码</el-checkbox>
            </div>-->

        </footer>
    </div>
</template>

<script>
export default {
    name: "editPassword",
    data() {
        return {
          isPassword: false,
          inputType: 'password',
          formData: {
            password: '',
            newPassword: ''
          },
          formKey: {}
        }
    },
    watch: {
      isPassword(val) {
        if (val) {
          this.inputType = 'text';
        } else {
          this.inputType = 'password';
        }
      }
    },
    created() {
        const { formData } = this;
        Object.keys(formData).forEach(key=> {
          this.$set(this.formKey, key, undefined);
        });
    },
    methods: {
      inputBlur(prop) {
        const { formData } = this;
        if (!formData[prop] || formData[prop].length < 6) {
          this.formKey[prop] = false;
        } else {
          this.formKey[prop] = true;
        }
      },
      submit() {
        const { formData } = this;
        Object.keys(formData).forEach(key=> {
          if (!formData[key]) {
            this.formKey[key] = false;
          }
        });
        if (!Object.values(this.formKey).includes(false)) {
            this.$request.post("editPassword", formData).then(res => {
                if (res.code == 0) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    this.$router.back();
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            })
        }
      }
    }
}
</script>

<style scoped lang="less">
    .wrapper {
        .content {
            padding: 10px;
            padding-top: 2.75rem;
            box-sizing: border-box;
            background: #fff;
            .group {
                margin-top: 20px;
                border-bottom: 1px solid transparent;
                &.is-error {
                    border-bottom: 1px solid red;
                }
                >span {
                    display: inline-block;
                    padding: 10px 0;
                    width: 100%;
                    border-bottom: 1px solid #DCDFE6;
                    color: #909399;
                    margin-bottom: 10px;
                }
                input {
                    line-height: 40px;
                    width: 100%;
                    border-bottom: 1px solid #E4E7ED;
                }

            }
        }
        footer {
            margin-top: 20px;
            .btn-div {
                text-align: center;
                .el-button {
                    width: 95%;
                }
            }
            .more {
                margin-left: 2.5%;
                margin-top: 10px;
            }

        }
    }

</style>
