<template>
  <div class="LoginByEle" @click.self="$router.push('/')">
    <div class="form-warpper">
      <el-row type="flex" class="row-bg" justify="center">
        <h1>登录</h1>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio-group v-model="loginWay">
                  <el-radio :label="0">普通用户</el-radio>
                  <el-radio :label="1">管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即登录</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <div class="tip-wrapper">
          未有账号？请点击这里的<router-link to="/RegisterByEle" style="color:red">注册</router-link>吧
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";

import { httpLogin } from "@/network/User.js";

import { setHeaderToken } from "@/network/Token.js";

export default {
  data() {
    return {
      loginWay: 0,
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            required: true,
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            message: "请输入正确的邮箱格式",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          httpLogin(this.ruleForm).then((Response) => {
            let token = Response.data.token; // 获取到token
            let user = Response.data.user; // 获取到用户信息
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            setHeaderToken(token);
            this.$store.commit("setUser", user);
            this.$message({
              message: "欢迎您：" + user.userName,
              type: "success",
            });
            this.loginWay === 0 ? this.$router.push("/") : this.$router.push("/ManagerHome");
          }).catch((error)=>{
            this.$message.error("登录失败，请您重新登录");
          });
        } else {
          this.$message.error("登录失败，请您重新登录");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less">
.LoginByEle {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(170, 162, 162, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tip-wrapper {
    position: relative;
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
  }
  .form-warpper {
    background: white;
    padding: 50px;
    box-shadow: 1px 1px 10px 10px rgba(0, 0, 0, 0.3);
  }
  .login-h1__center {
    text-align: center;
  }
}
</style>
