<template>
  <div class="login-container">
    <div class="login-form">
      <el-form :rules="loginRules" :model="loginform" ref="loginForm">
        <!-- 图片 -->
        <img src="@/assets/images/logo.595745bd.png" alt="" />

        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginform.username"
            type="text"
            placeholder="请输入账号"
          >
            <template #prefix>
              <svg-icon icon-class="user" />
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item class="pass_icon" prop="password">
          <el-input
            v-model="loginform.password"
            :type="type"
            placeholder="请输入密码"
          >
            <template #prefix>
              <svg-icon icon-class="password" />
            </template>
            <!-- 右边icon -->
            <template #suffix>
              <i @click="openeye" v-if="openEye">
                <svg-icon icon-class="eye" />
              </i>
              <i v-else @click="closeeye">
                <svg-icon icon-class="eye-open" />
              </i>
            </template>
            <!-- <template #suffix>
              <svg-icon icon-class="eye-open" />
            </template> -->
          </el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input v-model="loginform.code" placeholder="请输入验证码">
            <template #prefix>
              <i class="el-icon-message" />
            </template>
            <template #suffix>
              <img @click="getCode" class="code-image" :src="codeimg" alt="" />
            </template>
          </el-input>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-button class="login-btn" type="primary" @click="login"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCode } from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      loginform: { username: "admin", password: "admin", code: "" },
      openEye: true,
      type: "password",
      codeimg: "",
      randomNum: 0,
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            trigger: "blur",
            message: "请输入正确的用户名",
          },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        code: [
          { required: true, trigger: "blur", message: "请输入四位验证码" },
          {
            pattern: /^[A-Za-z0-9]{4}$/,
            trigger: "blur",
            message: "请输入四位验证码",
          },
        ],
      },
    };
  },

  created() {
    this.getCode();
  },

  methods: {
    openeye() {
      // console.log(11);
      this.openEye = !this.openEye;
      this.type = "text";
    },
    closeeye() {
      // console.log(11);
      this.openEye = !this.openEye;
      this.type = "password";
    },
    async getCode() {
      console.log(11);
      try {
        // await this.$refs.loginForm.validate();
        // console.log("校验成功");
        const num = Math.random() * 100;
        this.randomNum = num;
        const res = await getCode(num);
        // console.log(this.randomNum);
        // console.log(res);
        this.codeimg =
          "http://likede2-admin.itheima.net/likede/" + res.config.url;
        // console.log(this.codeimg);
      } catch (error) {
        console.log(error);
      }
    },
    async login() {
      try {
        await this.$refs.loginForm.validate(() => {});
        this.$store.dispatch("user/getToken", [
          this.randomNum,
          this.loginform.code,
          this.loginform.username,
          this.loginform.password,
        ]);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url("../../assets/images/background.be4fae7d.png");
  background-repeat: no-repeat;
  background-size: cover;
  .el-form > img {
    position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
  }
  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    .login-btn {
      width: 100%;
      height: 52px;
      background: linear-gradient(262deg, #2e50e1, #6878f0);
      opacity: 0.91;
      border-radius: 8px;
      color: #fff;
      text-shadow: 0 7px 22px #cfcfcf;
    }
    .el-form-item {
      width: 450px;
      height: 60px;
      .el-input,
      .el-input--prefix,
      ::v-deep .el-input__inner {
        height: 50px;
        right: 0;
      }
      ::v-deep .el-input__suffix {
        cursor: pointer;
        right: 0;
      }
      ::v-deep .el-input__prefix {
        margin-top: 5px;
        margin-left: 5px;
      }
    }
    ::v-deep .pass_icon {
      cursor: pointer;
      .el-input__suffix {
        margin-top: 8px;
        margin-right: 10px;
      }
    }
  }
}
</style>
