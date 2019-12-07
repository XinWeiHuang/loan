<template>
    <div class="wrapper">
        <topComponent title="基本信息"></topComponent>
        <div class="content">
            <div class="group">
                <div class="title">填写真实有效的信息，审核才会通过哦~</div>
                <div class="section">
                    <el-row>
                        <el-col :span="10">姓名</el-col>
                        <el-col :span="14">
                            <input type="text" v-model="formData.name">
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">身份证号</el-col>
                        <el-col :span="14">
                            <input type="text" v-model="formData.idCode">
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="group">
                <div class="title"><i style="color: red">*</i>须本人身份证，且内容清晰可辨~</div>
                <div class="section">
                    <div class="panel">
                        <el-upload
                                class="avatar-uploader"
                                :action="action"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :data="{  }"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="el-upload__text">扫描身份证正面上传</div>
                        </el-upload>
                    </div>

                    <div class="panel">
                        <el-upload
                                class="avatar-uploader"
                                :action="action"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :data="{  }"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="el-upload__text">扫描身份证反面上传</div>
                        </el-upload>
                    </div>

                    <div class="panel">
                        <el-upload
                                class="avatar-uploader"
                                :action="action"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :data="{  }"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="el-upload__text">手持身份证照扫描上传</div>
                        </el-upload>
                    </div>
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
  import request from "../../util/utils";

    export default {
    name: "userDetail",
    data() {
     return {
       imageUrl: '',
       formData: {
         name: '',
         idCode: ''
       },
       action: "http://localhost:8080/resource",
       uploadData: { // 上传附带参数

       }
     }
    },
    created() {
      const { id } = this.$store.userInfo;
      // 获取用户信息，赋值给formData
      this.$request.get('', { id }).then(data=> {

      });
    },
    methods: {
      handleAvatarSuccess(response, file, fileList) {
        //
      },
      beforeAvatarUpload (file) {
        console.log(file);
        const { type } = file;
        if (!/jpeg|png|jpg|bmp/ig.test(type)) {
          this.$message({
            message: '请上传jpeg、png、jpg、bmpg格式的文件',
            type: 'warning'
          });
        }
      },
      submit() {
        // 提交信息
        this.$request.post('', this.formData).then(data=> {
          this.$router.back();
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
    .avatar-uploader /deep/.el-upload {
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
