<template>
    <div class="wrapper">
        <top-component title="帮助详情"></top-component>
        <div class="main">
            <div class="title">{{ title }}
                <span class="time">{{ createTime }}</span>
            </div>
            <div class="content">{{ content }}</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "articleDetail",
    data() {
      return {
        title: '',
        content: '',
        createTime: ''
      }
    },
    created() {
      const { id } = this.$route.query;
      this.$request.get('articleDetail', { id }).then(res=> {
        if (res.code) {
          return this.$messageShow({
            type: 'error',
            message: res.msg
          });
        }
        const { data } = res;
        this.title = data.title;
        this.content = data.content;
        this.createTime = data.createTime;
      });
    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
    .wrapper {
        height: 100%;
        background: #fff;
        .main {
            padding-top: 2.75rem;
            box-sizing: border-box;
            height: 100%;
            overflow: hidden;
            box-sizing: border-box;
            .title {
                width: 85%;
                margin: 20px auto;
                padding: 10px;
                padding-bottom: 15px;
                font-size: 16px;
                text-align: center;
                border-bottom: 1px solid #E4E7ED;
                box-sizing: border-box;
                position: relative;
                .time {
                    position: absolute;
                    font-size: 12px;
                    right: 0;
                }
            }
            .content {
                width: 90%;
                margin: 20px auto;
                font-size: 14px;
                color: #606266;
            }
        }
    }
</style>
