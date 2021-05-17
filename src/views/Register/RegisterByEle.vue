<template>
  <div class="RegisterByEle" @click.self="$router.push('/')">
    <div class="form-warpper">
      <el-row type="flex" class="row-bg" justify="center">
        <h1>注册</h1>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <!-- 表单信息 -->
        <el-col :span="24">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="学校" prop="school">
              <el-cascader
                v-model="ruleForm.school"
                :options="schools"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="专业" prop="major">
              <el-cascader
                v-model="ruleForm.major"
                :options="majors"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="年级" prop="class">
              <el-select v-model="ruleForm.class" placeholder="请选择您的年级">
                <el-option
                  v-for="(value, index) of classes"
                  :key="index"
                  :label="value"
                  :value="value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm.sex" placeholder="请选择您的性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即注册</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <div class="tip-wrapper">
          已有账号？赶快<router-link to="/LoginByEle">登录</router-link>吧
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
// 静态数据
import { schoolList } from "@/assets/js/chinaUniversityList.js";
import { majorList } from "@/assets/js/majorList.js";

// 网络请求
import { httpRegister } from "@/network/User.js";

export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        school: "",
        major: "",
        class: "",
        email: "",
        password: "",
        sex: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入您的名字", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        school: [{ required: true, message: "请选择学校", trigger: "change" }],
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
        major: [{ required: true, message: "请选择专业", trigger: "blur" }],
        class: [{ required: true, message: "请选择您的年级", trigger: "blur" }],
        sex: [{ required: true, message: "请选择您的性别", trigger: "blur" }],
      },
      schools: schoolList,
      majors: majorList,
      classes: [],
    };
  },
  created() {
    this.classes = this.SetClasses();
  },
  methods: {
    /**
     * 提交表单
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 注册
          httpRegister(this.ruleForm).then(
            (response) => {
              this.$message({
                message: "注册成功,请您登录",
                type: "success",
              });
            },
            (err) => {
              this.$message({
                message: "注册失败，该邮箱已经被注册",
                type: "error",
              });
            }
          );
        } else {
          this.$message.error("注册失败，请重新注册");
          return false;
        }
      });
    },
    /**
     * 重置表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 根据今年年份设置年级。
     */
    SetClasses() {
      let date = new Date();
      let array = [];
      for (let i = date.getFullYear() - 4; i < date.getFullYear(); i++) {
        array.push(i + "届");
      }
      return array;
    },
  },
};
</script>
<style lang="less">
.RegisterByEle {
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
    width: 40%;
    min-width: 400px;
  }
  .login-h1__center {
    text-align: center;
  }
}
</style>
