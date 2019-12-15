<template>
    <div class="footer">
        <ul>
            <li v-for="(item,index) in list" :id='item.id' :class="[{on:index === idx}]"
                @click="$router.push(item.url)">
                <i :class="['iconfont', item.cls]"></i>
                <div>{{ item.con }}</div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript">
  export default {
    data: function () {
      return {
        list: [
          {id: 'loan', cls: 'footer-tab icon-un-home-o', con: '借款', url: '/'},
          {id: 'credit', cls: 'footer-tab icon-un-money-o', con: '我的借款', url: 'loanList'},
          {id: 'wallet', cls: 'footer-tab icon-un-crowd-o', con: '我的钱包', url: 'wallet'},
          {id: 'mecenter', cls: 'footer-tab icon-un-mine-o', con: '个人中心', url: '/mecenter'}
        ]

      }
    },
    props: ['idx']
  }
</script>

<style lang="less" scoped>
    .footer {
        li {
            width: 25%;

            &:not(.on) {
                color: #929292;
            }

            padding-top: 3px;

            i {
                font-size: 26px;
            }

            div {
                margin-top: 2px;
                font-size: 14px;
            }
        }
    }
</style>
