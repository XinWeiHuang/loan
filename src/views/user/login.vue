<template>
    <div class="login-wrapper">
        <div class="wrapper">
            <div class="content">
                <header>
                    <span :class="{ active: isSignIn }" @click="isSignIn = true">登录</span> /
                    <span :class="{ active: !isSignIn }" @click="isSignIn = false">注册</span>
                    <div>welcome to ~</div>
                </header>
                <section :class="[ isSignIn ? 'section-sign-in' : 'section-sign-up']">
                    <transition>
                        <div v-show="isSignIn" class="section-group">
                            <div :class="{ 'is-error': formKey.phone === false }">
                                <input type="text" placeholder="输入账号"
                                       @blur="blurEvent({ prop: 'phone' })"
                                       v-model="signInFormData.phone">
                            </div>
                            <div :class="{ 'is-error': formKey.password === false }">
                                <!--<input :type="passType" placeholder="输入密码"
                                       @blur="blurEvent({ prop: 'password' })"
                                       v-model="signInFormData.password">
                                <i :class="['seltarr', passType == 'password' ? 'password_icon_off' : 'password_icon_on' ]"
                                   @click="handleShowPassword()"></i>-->
                                <input type="password" placeholder="输入密码"
                                       @blur="blurEvent({ prop: 'password' })"
                                       v-model="signInFormData.password">
                            </div>
                        </div>
                    </transition>

                    <transition>
                        <div v-show="!isSignIn" class="section-group">
                            <div v-for='col in singUpFormItem' :key="col.prop"
                                 :class="{ 'is-error': formKey[col.prop] === false }">
                                <input :type="col.type" v-model="signUpFormData[col.prop]" :placeholder="col.placeholder"
                                       @blur="blurEvent(col)">
                                <!--<input type="text" v-model="signUpFormData[col.prop]" :placeholder="col.placeholder"
                                       @blur="blurEvent(col)">-->
                                <v-render v-if="col.render" :col="col" :row="signUpFormData"
                                          :render="col.render"></v-render>
                            </div>
                        </div>
                    </transition>


                </section>
                <footer :class="[ isSignIn ? 'footer-sign-in' : 'footer-sign-up']">
                    <div class="link_home">
                        <a href="javascript:void(0)" @click="handlePageHome">去首页</a>
                    </div>
                    <el-button @click="formSubmit">确定</el-button>
                    <!--<div v-if="isSignIn" class="forget-password" @click="dialogVisible = true">忘记密码？</div>-->
                </footer>
            </div>
        </div>
        <!--<footerComponent :idx="3"></footerComponent>-->

        <el-dialog
                title="重置密码"
                class="reset-password"
                :visible.sync="dialogVisible"
                top="25%"
                width="90%"
                :before-close="handleClose">
            <div class="content">
                <div class="group" :class="{ 'is-error': resetFormKey.phone === false }">
                    <input type="text" v-model="resetFormData.phone" @blur="resetBlurEvent('phone')"
                           placeholder="请输入手机号">
                </div>
                <div class="group yzm" :class="{ 'is-error': resetFormKey.yzm === false }">
                    <input type="text" v-model="resetFormData.yzm" @blur="resetBlurEvent('yzm')" placeholder="请输入验证码">
                    <el-button type="primary" size="mini" :disabled="resetYzmDisabled" @click="getVerificationCode">{{
                        VerificationText }}
                    </el-button>
                </div>

                <div class="group" :class="{ 'is-error': resetFormKey.password === false }">
                    <input type="text" v-model="resetFormData.password" @blur="resetBlurEvent('password')"
                           placeholder="请输入新密码">
                </div>

                <div class="group" :class="{ 'is-error': resetFormKey.newPassword === false }">
                    <input type="text" v-model="resetFormData.newPassword" @blur="resetBlurEvent('newPassword')"
                           placeholder="再次请输入新密码">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetDialogClose">取 消</el-button>
                <el-button type="primary" @click="resetDialogSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import request from "../../util/utils";
  import { location } from '@/util/utils.js'
  const resetPassword = {
    data() {
      return {
        dialogVisible: false,
        resetFormData: {
          phone: '',
          yzm: '',
          password: '',
          newPassword: ''
        },
        signInFormData: {
          phone: '',
          password: ''
        },
        resetFormKey: {},
        VerificationText: '发送验证码',
        resetYzmDisabled: false,
        resetFormItem: []
      }
    },
    watch: {
      isSignIn: {
        handler(val) {
          let fromData = {};
          const {formKey} = this;
          if (val) {
            fromData = this.signInFormData
          } else {
            fromData = this.signUpFormData
          }
          Object.keys(fromData).forEach(key => this.$set(formKey, key, undefined));
        },
        immediate: true
      },
    },
    created() {
      const {resetFormKey, resetFormData} = this;
      const _this = this;
      Object.keys(resetFormData).forEach(key => this.$set(resetFormKey, key, undefined));
      this.resetFormItem = [
        {placeholder: '输入手机号', prop: 'phone'},
        {
          placeholder: '输入短信验证码', prop: 'messageVerifyCode', render(h, scope) {
            return (
              <el-button
                onClick={() => _this.getVerificationCode()}
                type="primary"
                size="mini"
                class="verify-code btn">获取验证码
              </el-button>
            )
          }
        },
        {
          placeholder: '设置6-16位密码', prop: 'password', render(h, scope) {
            return (
              <i onClick={() => _this.handleShowPassword()}
                 class={['seltarr', _this.passType == 'password' ? 'password_icon_off' : 'password_icon_on']}></i>
            )
          }
        },
        {
          placeholder: '请输入确认密码', prop: 'password', render(h, scope) {
            return (
              <i onClick={() => _this.handleShowPassword()}
                 class={['seltarr', _this.passType == 'password' ? 'password_icon_off' : 'password_icon_on']}></i>
            )
          }
        },
      ]
    },
    methods: {
      resetDialogSubmit() {
        const {resetFormData} = this;
        Object.keys(resetFormData).forEach(key => {
          if (!resetFormData[key]) {
            this.resetFormKey[key] = false
          }
        });
        if (!Object.values(this.resetFormKey).includes(false)) {
          // 提交表单

        }
      },
      resetDialogClose() {

      },
      resetBlurEvent(prop) {
        this.resetFormKey[prop] = this.resetFormData[prop] ? true : false;
      },

      getVerificationCode() {
        this.$request.get('').then(data => { // 验证码

        });

        let n = 60;
        clearInterval(timer);
        const timer = setInterval(() => {
          if (!n) {
            clearInterval(timer);
            this.resetYzmDisabled = false;
            this.VerificationText = '发送验证码';
          } else {
            this.VerificationText = n + '秒后重新发送';
            this.resetYzmDisabled = true;
            n--;
          }
        }, 1000);
      },
    }
  };


  export default {
    mixins: [resetPassword],
    name: "login",
    data() {
      return {
        title: '登录',
        activeName: 'first',
        passType: 'password',
        isSignIn: true,
        imgVerifyCodeSrc: '',
        signUpFormData: {
          phone: '',
          verifyCode: '',
          messageCode: '',
          password: ''
        },
        formKey: {},
        singUpFormItem: [],
        VerifyCodeMessage: '发送验证码',
        VerifyCodeDisabled: false,
        timer: null
      }
    },
    created() {
      const _this = this;
      // const {signUpFormData, formKey} = this;
      // Object.keys(signUpFormData).forEach(key => this.$set(formKey, key, undefined));
      this.getImgVerifyCode();
      this.singUpFormItem = [
        {placeholder: '输入手机号', prop: 'phone'},
        {
          placeholder: '输入图片验证码', prop: 'verifyCode', render(h, scope) {
            return (
              <img src={_this.imgVerifyCodeSrc} onClick={() => _this.getImgVerifyCode()} class='verify-code'/>
            )
          }
        },
        {
          placeholder: '输入短信验证码', prop: 'messageCode', render(h, scope) {
            return (
              <el-button
                onClick={() => _this.getMessageVerifyCode()}
                type="primary"
                size="mini"
                disabled={ _this.VerifyCodeDisabled  }
                class="verify-code btn">{ _this.VerifyCodeMessage }</el-button>
            )
          }
        },
        {
          placeholder: '设置6-16位密码', type: 'password', prop: 'password'/*, render(h, scope) {
            return (
              <i onClick={() => _this.handleShowPassword()}
                 class={['seltarr', _this.passType == 'password' ? 'password_icon_off' : 'password_icon_on']}></i>
            )
          }*/
        },
      ]
    },
    methods: {
      blurEvent(col) {
        const {isSignIn, signInFormData, signUpFormData} = this;
        let formData = {};
        if (isSignIn) {
          formData = signInFormData
        } else {
          formData = signUpFormData
        }
        this.formKey[col.prop] = formData[col.prop] ? true : false;
      },
      getMessageVerifyCode() {
        // 短信验证码
        const { phone } = this.signUpFormData;
        if (!phone) {
          return this.$message({
            type: 'warning',
            message: '请输入手机号'
          })
        }
        this.$request.get('messageCode', { phone }).then(res=> {
          if (res.code == -1) {
            this.$message({
              type: 'error',
              message: res.msg
            });
          } else if (res.code == 0){
              clearInterval(this.timer);
              // VerifyCodeMessage
              let num = 60;
              this.timer = setInterval(()=> {
                  if (num > 0) {
                      num--;
                      this.VerifyCodeDisabled = true;
                      this.VerifyCodeMessage = num + '秒后重新发送'
                  } else {
                      clearInterval(this.timer);
                      this.VerifyCodeDisabled = false;
                      this.VerifyCodeMessage = '发送验证码';
                  }
              }, 1000);
          }
        })
      },

      getImgVerifyCode() {
        // 图片验证码
        this.imgVerifyCodeSrc = location + 'resource/verification?callbackparam=jQuery34106161523676636267_1575792352842&_=' + new Date().getTime();
        // imgVerifyCodeSrc
      },

      formSubmit() {
        const {signUpFormData, signInFormData, isSignIn} = this;
        let fromData = {};
        if (isSignIn) {
          fromData = signInFormData
        } else {
          fromData = signUpFormData
        }
        Object.keys(fromData).forEach(key => {
          if (fromData[key] === '') {
            this.formKey[key] = false;
          }
        });
        if (!Object.values(this.formKey).includes(false)) {
          let url = 'registry';
          if (isSignIn) {
            url = 'login';
            this.$request.get(url, fromData).then((data) => {
              if(data.code) {
                this.$message({
                  type: data.code == 0 ? 'success' : false,
                  message: data.msg
                });
              } else {
                this.$store.commit('setCustomerInfo', data.data);
                this.$router.push({path: '/'})
              }
            });
          } else {
            url = "registry";
            this.$request.post(url, fromData).then(data => {
              this.$message({
                type: data.code == 0 ? 'success' : false,
                message: data.msg
              });
              if (!data.code) {
                this.$store.commit('setCustomerInfo', data.data);
                this.$router.push({path: '/'})
                // this.isSignIn = true;
              }
            });
          }
        }
      },

      handleShowPassword() {
        this.passType = this.passType === 'password' ? 'text' : 'password';
      },
      handleClose() {

      },
      handlePageHome() {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style scoped lang="less">
    @import '~@/common/var.less';

    .login-wrapper {
        height: 100%;
        background: #fff;

        .wrapper {
            position: relative;
            height: calc(100% - 2.75rem);

            .content {
                position: absolute;
                width: 85%;
                height: 78%;
                padding: 15px;
                background: #fff;
                box-sizing: border-box;
                margin: 0 auto;
                border-radius: 8px;
                box-shadow: 0px 1px 8px 0px #ded8d8;
                top: 55%;
                left: 50%;
                transform: translate(-50%, -50%);

                header {
                    margin-top: 20px;

                    span {
                        font-size: 25px;
                        color: #C0C4CC;

                        &.active {
                            font-size: 30px;
                            color: #000;
                        }
                    }

                    div {
                        font-size: 18px;
                        margin-top: 5px;
                        color: #909399;
                    }
                }

                section {
                    margin-top: 20%;

                    &.section-sign-up {
                        margin-top: 20px;

                        .section-group {
                            > div {
                                height: 30px;
                                line-height: 30px;

                                .verify-code {
                                    top: -5px;
                                }

                                .seltarr {
                                    top: 8px;
                                }
                            }
                        }

                    }

                    .section-group {
                        > div {
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            font-size: 16px;
                            border-bottom: 1px solid #EBEEF5;
                            margin-bottom: 20px;
                            position: relative;
                            transition: all 0.1s linear;

                            &.is-error {
                                border-bottom: 1px solid red;
                            }

                            .verify-code {
                                position: absolute;
                                width: 80px;
                                height: 28px;
                                top: 5px;
                                right: 10px;
                                border: 1px solid #ccc;

                                &.btn {
                                    width: auto;
                                }
                            }

                            input {
                                width: 100%;
                            }

                            .seltarr {
                                position: absolute;
                                top: 16px;
                                right: 10px;
                                width: 22px;
                                background: url("../../assets/img/fico.png") no-repeat;
                                background-size: 28px auto;

                                &.password_icon_off {
                                    background-position: 0 -1346px;
                                    height: 13px;
                                }

                                &.password_icon_on {
                                    background-position: 0 -1359px;
                                    height: 16px;
                                }
                            }
                        }

                        &.sign-up {
                            margin-top: 0;
                        }
                    }

                }

                footer {
                    margin-top: 17%;
                    text-align: center;
                    position: relative;
                    .link_home {
                        position: absolute;
                        right: 18px;
                        bottom: 55px;
                        a {
                            text-decoration: underline;
                            color: #333;
                            font-size: 16px;
                        }
                    }
                    &.footer-sign-up {
                        margin-top: 0;
                    }

                    button {
                        width: 90%;
                        border-radius: 20px;

                        /deep/ span {
                            font-size: 18px;
                            font-weight: bold;
                            color: #909399;
                        }
                    }

                    .forget-password {
                        margin-top: 10%;
                        font-size: 16px;
                        color: @themeColor
                    }
                }
            }
        }

        .reset-password {
            /deep/ .el-dialog {
                margin-top: 0 !important;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                .content {
                    .group {
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        font-size: 16px;
                        border-bottom: 1px solid #EBEEF5;
                        margin-bottom: 20px;
                        position: relative;
                        transition: all 0.1s linear;

                        &.is-error {
                            border-bottom: 1px solid red;
                        }

                        &.yzm {
                            position: relative;

                            .el-button {
                                position: absolute;
                                right: 5px;
                                top: 50%;
                                transform: translateY(-50%);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
