<template>
    <div class="container">
        <!--<top-component title="草根金融"></top-component>-->
        <!--<dl class="userInfo">
            <dt>
                <p class="user-logo"></p>
                <p class="user-tel">
                    您好
                    <span>15837587256</span>
                </p>
                <p class="user-tag">
                    <span class="mLevel">学徒</span>
                    <span class="mName">白手起家</span>
                </p>
            </dt>
            <dd>
                申请借款
                <span>1笔</span>
            </dd>
            <dd>
                待还借款
                <span>0笔</span>
            </dd>
        </dl>-->
        <div class="user-info">
            <div class="user-img">
                <el-upload
                        class="avatar-uploader"
                        :action="this.action"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccessOppo"
                        :data="{name: '头像'}"
                        :before-upload="beforeAvatarUpload">
                    <img :src="this.headerImg">
                </el-upload>
                <!--<img :src="this.headerImg">-->
            </div>
            <div class="user-name">
                <span>{{ userName }}</span>
                <div class="vip-icon">
                    <img :src="this.vipIcons[vip].img" alt="">
                </div>
            </div>
        </div>

        <ul class="listCom list-arrow list-icon mt20">
            <listComponent v-for="(item, index) in lists" :key='index' :class="item.cls" :title="item.tit"
                           @click="routerClick(item)"></listComponent>
        </ul>
        <footerComponent :idx="3"></footerComponent>
    </div>
</template>

<script type="application/ecmascript">
  import {location} from "../../util/utils";
  export default {
    data: function () {
      return {
        lists: [
          {cls: 'icon iconfont icon-un-mine-o', tit: '我的资料', url: {name: 'info'}},
          /*{cls: 'icon-jiekuan', tit: '我的借款', url: {name: 'loanProgress'}},*/
          {cls: 'icon-huankuan', tit: '我的还款', url: {name: 'repayment'}},
          {cls: 'icon iconfont icon-un-complain-o', tit: '修改密码', url: {name: 'editPassword'}},
          /*{cls:'icon-jiangli',tit:'我的奖励',url:''},*/
          {cls: 'icon-help', tit: '帮助中心', url: {name: 'about'}},
          {cls: ' iconfont icon-un-servicer-o', tit: '联系客服', url: ''},
          {cls: 'icon-about', tit: '关于我们', url: ''},
          {cls: 'icon iconfont icon-un-delete-border-o', tit: '退出登录', url: ''},
        ],
        action: location + "resource/upload",
        userName: '不如',
        serviceUrl: '',
        headerImg: require('../../../static/img/default_user.png'),
          vipIcons: [
              {img: ''},
              {img: require('../../../static/img/commonvip.png')},
              {img: require('../../../static/img/supervippng.png')}
          ],
          vip: 0,
      }
    },
    created() {
      const { name, phone, headImageUrl } = this.$store.state.userInfo;
      this.userName = name ? name : phone;
      if (headImageUrl != null && headImageUrl != undefined && headImageUrl.length > 0) {
         this.headerImg = headImageUrl
      }
      this.$request.get('serviceLink').then(res => {
        if (res.code) {
          return this.$message({
            type: 'error',
            message: res.msg
          });
        }
        this.serviceUrl = res.data;
      });
        this.$request.get('info').then(res => {
            if (!res.code) {
                this.vip = res.data.vip;
            }
        });
      this.$store.dispatch('getCustomerInfo')
    },
    methods: {
      routerClick(item) {
        switch (item.tit) {
          case '退出登录':
            this.$request.post('signout').then(res => {
              if (!res.code) {
                sessionStorage.clear()
              }
              this.$store.commit('resetState');
              this.$router.push({name: 'login'})
            });
            break;

          case '联系客服':
            // window.location.href = this.serviceUrl;
            window.open(this.serviceUrl)
            break;

          default:
            this.$router.push(item.url)
        }
      },
      handleAvatarSuccessOppo(response, file, fileList) {
          if (response.code == 0) {
              const { data } = response;
              //发送请求到后台修改头像
              this.$request.post('headerImg', {'headResource': data.id}).then(res => {
                  if (res.code == 0) {
                      this.$message({
                          message: '头像上传成功',
                          type: 'success'
                      });
                      this.headerImg = data.fullPath;
                      this.$store.commit("setUserInfo", {
                          prop: "headImageUrl",
                          val: data.fullPath
                      });
                  } else {
                      this.$message({
                          message: res.msg,
                          type: 'error'
                      });
                  }
              })
          } else {
              this.$message({
                  message: response.msg,
                  type: 'error'
              });
          }
      },
      beforeAvatarUpload(file) {
          console.log(file);
          const {type} = file;
          if (!/jpeg|png|jpg|bmp/ig.test(type)) {
            this.$message({
                message: '请上传jpeg、png、jpg、bmpg格式的文件',
                type: 'warning'
            });
          }
      },
      handleUserIcon() {
        this.$router.push({name: 'info'})
      },
    }
  }
</script>
<style lang="less" scoped>
    @import '~@/common/var.less';

    .container {
        &:before {
            height: auto;
        }

        .user-info {
            height: 175px;
            /*background: #3BC67D;*/
            background: @themeColor;
            position: relative;

            .user-img {
                width: 64px;
                height: 64px;
                border: 2px solid #fff;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                top: 45%;
                transform: translate(-50%, -50%);
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .user-name {
                position: absolute;
                top: 70%;
                left: 50%;
                transform: translateX(-50%);
                span {
                    font-size: 18px;
                    color: #fff;
                }
                .vip-icon {
                    position: absolute;
                    overflow: hidden;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    top: 10%;
                    left: 102%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .listCom {
            width: 92%;
            margin: -20px auto;
            position: relative;
            z-index: 99;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 6px 0px rgba(233, 233, 233, 1);
            border-radius: 4px;

            li {
                border: 0;
            }
        }
    }

</style>
