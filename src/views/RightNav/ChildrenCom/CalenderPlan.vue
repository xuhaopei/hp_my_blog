<template>
  <div class="CalenderPlan g_box-shadow_gray">
        <el-calendar v-model="date">
        </el-calendar>
        <el-dialog :title="hasInit ? '初始化':outDialogDate.date" :visible.sync="outDialogDate.visible">
          <el-dialog
            width="30%"
            :title="innerDialogDate.title"
            :visible.sync="innerDialogDate.visible"
            append-to-body>
              <el-input 
              ref="planInput" 
              v-model="innerDialogDate.data" 
              placeholder="请输入内容" 
              @keyup.enter.native='hasInit ? commitMsg(initPlanItems) : commitMsg(planItems)'></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="innerDialogDate.visible = false">取 消</el-button>
                <el-button 
                  type="primary" 
                  @click="hasInit ? commitMsg(initPlanItems) : commitMsg(planItems)"
                  >确 定</el-button>
              </span>
          </el-dialog>
          <el-table  v-if='hasInit' :data.sync="initPlanItems">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column property="content" label="内容" ></el-table-column>
            <el-table-column property="hasfinish" label="完成情况" width="80">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.hasfinish" ></el-switch>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button 
                type="text" 
                size="small" 
                @click="edit(scope)">编辑</el-button>
                <el-button 
                type="text" 
                size="small"
                @click="_delete(scope)">删除</el-button>
              </template>
          </el-table-column>
          </el-table>
          <el-table  v-else :data.sync="planItems">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column property="content" label="内容" ></el-table-column>
            <el-table-column property="hasfinish" label="完成情况" width="80">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.hasfinish" ></el-switch>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button 
                type="text" 
                size="small" 
                @click="edit(scope)">编辑</el-button>
                <el-button 
                type="text" 
                size="small"
                @click="_delete(scope)">删除</el-button>
              </template>
          </el-table-column>
          </el-table>
          <div class='CalenderPlan-button-wrapper'>
            <el-button :type="hasInit ? 'warning':'primary'" icon="el-icon-edit" @click="hasInit = !hasInit,SetOrGetInitPlanDataByHasInit(hasInit, initPlanItems)">{{hasInit ? '返回':'初始化'}}</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="add">编辑</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import {
  http_post_commitCalenderPlan, 
  http_get_getCalenderPlan,
  } from '@/network/CalenderPlan.js';

export default {
  name: 'CalenderPlan',

  components: {
  },

  data(){
    return {
      date : new Date(),
      innerDialogDate:{
        visible:false,
        data:'',
        title:'编辑',
        index:0
      },
    
      outDialogDate:{
        visible:false,
        gridData:[   
        ],
        date:'',
        id:0,
        allFinish:false
      },

      // 计划表
      planItems:[],

      // 初始化计划表
      initPlanItems:[],

      // 用来判断是写计划表 还是 初始化计划表
      hasInit:false
    }
  },
  watch:{
    // 当用户点击日历的时候，日期会发生变化，此时弹出对话框
    date(newValue, oldValue){
      this.outDialogDate.visible = true;
      this.outDialogDate.date = this.changDate(newValue);
    },

    // 当用户打开内嵌对话宽时，输入框自动聚焦
    'innerDialogDate.visible':function(newVal, oldVal){
         if(newVal === true) {
          this.$nextTick(()=>{
            this.$refs['planInput'].focus();
          })
        }     
    },

    // 当用户打开/关闭对话框时，获取/发送http数据。
    'outDialogDate.visible':function(newVal, oldVal){
        // 当关闭计划表的时候，将数据上传到服务器
        if(newVal == false) {
          if(this.planItems.length === 0) return;

          // 如果所有计划都完成，则标记完成
          this.outDialogDate.allFinish = true;
          for (const iterator of this.planItems) {
            if(!iterator.hasfinish) {
              this.outDialogDate.allFinish = false;
            }
          }
          this.outDialogDate.gridData = this.planItems;
          http_post_commitCalenderPlan('/commitCalender',this.outDialogDate).then((data)=>{
          })
        }
        // 当打开计划表的时候，从服务器请求数据 , 从浏览器读取初始化的initPlanItems
        else if(newVal == true) {
          http_get_getCalenderPlan('/getCalender',this.outDialogDate.date).then((data)=>{
            this.planItems = JSON.parse(data.data.gridData);
            this.outDialogDate.id = data.data.id;
            this.initPlanItems = this.getInitPlanDataByLocalStorage();

            // 如果数据库没有数据，说明需要添加初始化数据
            if(this.planItems.length === 0) {
              for(let v of this.initPlanItems) {
                this.planItems.push(v);
              }
            }
          })
        }
    }
  },
  created(){

  },
  mounted(){
    
  },
  methods:{
    edit(scope){
      this.innerDialogDate.visible = true;
      this.innerDialogDate.index = scope.$index;
      this.innerDialogDate.data = scope.row.content;
      this.innerDialogDate.title = '编辑';
    },
    add(){
      this.innerDialogDate.visible = true;
      this.innerDialogDate.data = '';
      this.innerDialogDate.title = '添加';
    },
    _delete(scope){
      this.hasInit ? this.initPlanItems.splice(scope.$index,1) : this.planItems.splice(scope.$index,1)
    },
    commitMsg(array){
      let title = this.innerDialogDate.title;
      switch(title) {
        case '编辑':
          array[this.innerDialogDate.index].content = this.innerDialogDate.data;
          break;
        case '添加':
          array.push(
            {
              content:this.innerDialogDate.data,
              hasfinish:false
            },
          )
          break;
      }
      this.innerDialogDate.visible = false;
    },
    // 将日期格式转换成 年- 月- 日形式。
    changDate(date){
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();

      let str_year = year.toString();
      let str_month = month > 9 ? month.toString() : '0' + month.toString();
      let str_day = day <= 9 ? '0' + day : day.toString();

      return str_year +'-'+ str_month +'-'+ str_day;

    },

    // 通过localStorage获取initPlanItems的值。
    getInitPlanDataByLocalStorage(){

       let array = window.localStorage.getItem('initPlanItems');

       if(array == null) return [];

       array = JSON.parse(array);

       return array;

    },

    // 在localStorage获取initPlanItems的值。
    setInitPlanDataByLocalStorage(array) {

      if(Array.isArray(array) == false) return;

      window.localStorage.setItem('initPlanItems', JSON.stringify(array));
    },

    // 根据data()变量hasInit来判断是获取数据，还是设置数据
    SetOrGetInitPlanDataByHasInit(hasInit, initPlanItems){
      if(hasInit) {
        initPlanItems = this.getInitPlanDataByLocalStorage();
      } else {
        this.setInitPlanDataByLocalStorage(initPlanItems);

        // 如果计划表为空，那么我就需要把初始值值添加到计划表中
        if(this.planItems.length === 0) {
            for(let v of this.initPlanItems) {
                this.planItems.push(v);
            }
        }
      }
    },


  }
}
</script>
<style lang="less">
.CalenderPlan {
  position: relative;
  margin-top: 10px;
  border-radius: 10px;
  .el-calendar__title {
    font-size: 30px;
    margin-bottom: 10px;
  }
  .el-calendar__header {
    display: block;
  }
  .el-calendar-day {
    height: auto;
  }
  .el-button-group {
    display: none;
  }
  .CalenderPlan-button-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 10px;

  }
}
</style>
