<template>
  <div class="CalenderPlan g_box-shadow_gray">
        <el-calendar v-model="value">
        </el-calendar>
        <el-dialog :title="outDialogDate.date" :visible.sync="outDialogDate.visible">
          <el-dialog
            width="30%"
            :title="innerDialogDate.title"
            :visible.sync="innerDialogDate.visible"
            append-to-body>
              <el-input ref="planInput" v-model="innerDialogDate.data" placeholder="请输入内容" @keyup.enter.native="commitMsg"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="innerDialogDate.visible = false">取 消</el-button>
                <el-button 
                  type="primary" 
                  @click="commitMsg"
                  @keyup.enter.native='commitMsg'>确 定</el-button>
              </span>
          </el-dialog>
          <el-table :data.sync="outDialogDate.gridData">
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
            <el-button type="primary" icon="el-icon-edit" @click="add"
            ></el-button>
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
      value : new Date(),
      innerDialogDate:{
        visible:false,
        data:'',
        title:'编辑',
        index:0
      },
    
      outDialogDate:{
        visible:false,
        gridData:[
          {
            content:'测试内容',
            hasfinish:true
          },      
        ],
        date:'',
        id:0,
        allFinish:false
      },
    }
  },
  watch:{
    value(newValue, oldValue){
      this.outDialogDate.visible = true;
      this.outDialogDate.date = this.changDate(newValue);
    },

    innerDialogDate:{
      deep:true,
      handler(newVal, oldVal){
        if(newVal.visible === true) {
          this.$nextTick(()=>{
            this.$refs['planInput'].focus();
          })
        }
      }
    },

    ['outDialogDate.visible']:function(newVal, oldVal){
        if(newVal == false) {
    
          if(this.outDialogDate.gridData.length === 0) return;

          // 如果所有计划都完成，则标记完成
          this.outDialogDate.allFinish = true;
          for (const iterator of this.outDialogDate.gridData) {
            if(!iterator.hasfinish) {
              this.outDialogDate.allFinish = false;
            }
          }

          http_post_commitCalenderPlan('/commitCalender',this.outDialogDate).then((data)=>{

          })
        } else if(newVal == true) {
          http_get_getCalenderPlan('/getCalender',this.outDialogDate.date).then((data)=>{
            this.outDialogDate.gridData = JSON.parse(data.data.gridData);
            this.outDialogDate.id = data.data.id;
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
      this.outDialogDate.gridData.splice(scope.$index,1);
    },
    commitMsg(){
      let title = this.innerDialogDate.title;
      switch(title) {
        case '编辑':
          this.outDialogDate.gridData[this.innerDialogDate.index].content = this.innerDialogDate.data;
          break;
        case '添加':
          this.outDialogDate.gridData.push(
            {
              content:this.innerDialogDate.data,
              hasfinish:false
            },
          )
          break;
      }
      this.innerDialogDate.visible = false;
    },
    changDate(date){
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();

      let str_year = year.toString();
      let str_month = month > 9 ? month.toString() : '0' + month.toString();
      let str_day = day <= 9 ? '0' + day : day.toString();

      return str_year +'-'+ str_month +'-'+ str_day;

    }
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
    justify-content: flex-end;
    margin: 10px;

  }
}
</style>
