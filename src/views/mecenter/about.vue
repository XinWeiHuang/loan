<template>
    <div class="wrapper">
        <top-component title="帮助中心"></top-component>
        <div class="content">
            <div class="title-list">
                <div v-for="(item, index) in articleType" :key="index" :class="{ active: currentType == item.value }">
                    <el-button @click="switchType(item)">{{ item.label }}</el-button>
                </div>
            </div>
            <div class="notice-content">
                <div class="item" v-for="(item, index) in  getArticleData" :key="index" @click="readDetail(item)">
                    <div class="title" style="color: black;">{{ item.title }}</div>
                    <div class="content" style="color:#909399;">{{ item.shortContent }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        activeNames: [1],
        collapseData: [],
        currentType: '',
        articleType: [],
        articleData: []
      };
    },
    created() {
      this.$request.get('getarticle', { page: 1, size: 1000}).then(res=> {
        if (!res.code) {
          const { data } = res;
          return this.articleData = data;
        }
        this.$message({
          type: 'error',
          message: res.msg
        });
      });

      this.$request.get('getDropDown').then(res=> {
        if (!res.code) {
          if (res.length > 0) {
              this.currentType = res[0].value;
          }
          return this.articleType = res;
        }
        this.$message({
          type: 'error',
          message: res.msg
        });
      });

    },
    computed: {
      getArticleData() {
        let data = this.articleData;
        if (this.currentType) {
          data = data.filter(elt=> elt.item == this.currentType);
        }
        return data;
      }
    },
    methods: {
      switchType(item) {
        this.currentType = item.value;
      },
      readDetail(item) {
        const { id } = item;
        this.$router.push({ name: 'articleDetail', query: { id } })
      }
    }
  }
</script>

<style scoped lang="less">
    .wrapper {
        height: 100%;
        >.content {
            padding-top: 2.75rem;
            box-sizing: border-box;
            height: 100%;
            overflow: hidden;
            .title-list {
                padding-top: 10px;
                overflow: hidden;
                background: #fff;
                border-bottom: 1px solid #E4E7ED;
                >div {
                    float: left;
                    text-align: center;
                    margin-bottom: 5px;
                    width: 20%;
                    padding: 0 5px;
                    box-sizing: border-box;
                    &.active {
                        button {
                            color: #3a8ee6;
                            border-color: #3a8ee6;
                            outline: 0;
                        }
                    }
                    button {
                        width: 100%;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        padding: 12px 4px;
                        font-size: 12px;
                    }
                }
            }
            .notice-content {
                background: #fff;
                height: calc(100% - 64px);
                padding: 10px;
                box-sizing: border-box;
                overflow: auto;
                .item {
                    width: 100%;
                    border: 1px solid #eeeeee;
                    min-height: 100px;
                    margin-bottom: 10px;
                    padding: 5px;
                    box-sizing: border-box;
                    .title {
                        padding: 4px;
                        border-bottom: 1px solid #eee;
                        font-size: 14px;
                        color: #909399;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        margin-bottom: 10px;
                    }
                    .content {
                        font-size: 16px;
                        color: #606266;
                    }
                }
            }
            /deep/.el-collapse-item__header {
                padding: 0 10px;
                box-sizing: border-box;
            }
            /deep/.el-collapse-item__content {
                padding: 0 10px;
                box-sizing: border-box;
            }
            .group {
                margin-bottom: 10px;
                border-bottom: 1px solid #DCDFE6;
                .title {
                    font-weight: bold;
                }
            }
        }
    }


</style>
