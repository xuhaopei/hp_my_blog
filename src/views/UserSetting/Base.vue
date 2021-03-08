<template>
  <div class="UserSetting">
      <el-row :gutter="15">
          <!-- 个人资料 -->
          <el-col :span="10" :offset="7" >
            <div class="form-warpper">
            <el-row type="flex" class="row-bg" justify="center">
                <h1>个人资料</h1>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
                <!-- 表单信息 -->
                <el-col :span="24" >
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name" ></el-input>
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
                        <el-option label="大一" value="1"></el-option>
                        <el-option label="大二" value="2"></el-option>
                        <el-option label="大三" value="3"></el-option>
                        <el-option label="大四" value="4"></el-option>
                        </el-select>                             
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password1">
                        <el-input v-model="ruleForm.password1" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                        <el-button @click="$router.go(-1)">取消</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            </div>
          </el-col>
      </el-row>      
  </div>
</template>

<script>

  import {schoolList} from '@/assets/js/chinaUniversityList.js';
  import {majorList} from '@/assets/js/majorList.js';
export default {
    name:'user-setting',
    components:{},
    model:{},
    props:{},
    data(){
      return {
        ruleForm: {
          name: '',
          school: '',
          college:'',
          major:'',
          class:'',
          email: '',
          password: '',
          password1: '',
        },
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
          password1:[
              { type: 'string', required: true, trigger: 'change', validator: (rule, value, callback) => {  // 校验规则2
              if(this.password != value) {
                callback("密码不一致");  // callback触发，组件弹出提示
              }
            },}
          ],
          major:[
            { required: true, message: '请选择专业', trigger: 'blur' },
          ],
          class:[
            { required: true, message: '请选择您的年级', trigger: 'blur' },
          ],
        },
        schools:schoolList,
        majors:majorList,

      };
    },
    computed:{},
    watch:{},
    created(){
    },
    mounted(){},
    beforeDestory(){},
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // 修改
                // doRegister('/user/register',this.ruleForm).then((response)=>{
                //         this.$message({
                //         message: '注册成功,请您登录',
                //         type: 'success'
                //         }); 
                // })
                
            } else {
                this.$message.error('注册失败，请重新注册');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
}
</script>

<style lang="less" scoped>
    .UserSetting{
        margin-top: 10px;
        
        .form-warpper{
            background: #ffffff;
        }
    }
</style>