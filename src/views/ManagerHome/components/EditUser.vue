<template>
    <div class="EditUser" >
        <el-row>
            <el-breadcrumb separator="/" class="nav-wrapper">
                <el-breadcrumb-item :to="{ path: '/ManagerHome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><router-link to="/ManagerHome/User">用户管理</router-link></el-breadcrumb-item>
                <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <el-row class="EditUser-content">
            <el-col :span="12" :offset="6">
            <el-row type="flex" class="row-bg" justify="center">
                <h1>编辑用户</h1>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
                <!-- 表单信息 -->
                <el-col :span="24" >
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
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
                        <el-select v-model="ruleForm.class" placeholder="请选择年级">
                        <el-option label="大一" value="1"></el-option>
                        <el-option label="大二" value="2"></el-option>
                        <el-option label="大三" value="3"></el-option>
                        <el-option label="大四" value="4"></el-option>
                        </el-select>                             
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" type="email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" prop="right">
                        <el-select v-model="ruleForm.right" placeholder="请设置权限">
                        <el-option label="管理员" value="0"></el-option>
                        <el-option label="普通用户" value="1"></el-option>
                        </el-select>                             
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>
            </el-row>                    
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {doRegister} from '@/network/Register.js';
  import {schoolList} from '@/assets/js/chinaUniversityList.js';
  import {majorList} from '@/assets/js/majorList.js';

  export default {
    name:'article-titleList',
    components:{},
    model:{},
    props:{
        user:{
            type:Object,
            default:function(){
                return {
                    name: 'abcd',
                    school: '胡安娜',
                    college:'',
                    major:'',
                    class:'',
                    email: '',
                    password: '',
                    right:'',
                }
            }
        }
    },
    data() {
      return {
        ruleForm: this.user,
        rules: {
          name: [
            { required: true, message: '请输入您的名字', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          school: [
            { required: true, message: '请选择学校', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }, 
            {
              required: true,
              pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
              message: '请输入正确的邮箱格式',
              trigger: 'blur'
            }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }

          ],
          major:[
            { required: true, message: '请选择专业', trigger: 'blur' },
          ],
          class:[
            { required: true, message: '请选择您的年级', trigger: 'blur' },
          ],
          right:[
            { required: true, message: '请选择权限', trigger: 'blur' },
          ],
        },
        schools:schoolList,
        majors:majorList,

      };
    },
    created(){
      
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 注册
            doRegister('/user/register',this.ruleForm).then((response)=>{
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    }); 
            })
            
          } else {
            this.$message.error('添加失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="less">
.EditUser {
    .nav-wrapper{
        padding:15px;
        font-size: 15px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
}

</style>