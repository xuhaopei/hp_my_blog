<template>
  <div class="ShowCom">
    <div class="img-wrapper">
      {{ user.userName && user.userName[0] }}
    </div>
    <div class="ShowCom-wrapper">
      <!-- 用户个人信息 -->
      <div>
        {{ user.userName }} @ 
        <!-- <el-tag effect="dark" :type="lvs[user.lv]" size="mini"
          >Lv{{ user.lv }}</el-tag
        > -->
        <span class="study-div-introduce">
          {{ user.school && user.school[1] }} @ {{ user.major && user.major[1] }} @ {{ user.class }} 
        </span>
      </div>
      <!-- 评论内容 -->
      <div style="font-size:16px;padding:1vw;">
        {{ comment.content }}
      </div>
      <!-- 发布日期 点赞 回复 -->
      <div class="ShowCom-div_footer">
        <span> {{ comment.date | date2current }}天前 </span>
        <el-button-group>
          <!-- <el-button type="default" size="mini" icon="el-icon-thumb"
            >1</el-button
          > -->
          <el-button
            type="default"
            size="mini"
            icon="el-icon-chat-square"
            @click="reply()"
            >回复</el-button
          >
        </el-button-group>
      </div>
      <!-- 回复 -->
      <reply-com v-if="isReply" @success="replySubmit"></reply-com>
      <div style="background:rgba(0,0,0,0.05)">
        <show-com
          v-show="comment.childrens.length"
          v-for="(com, index) of comment.childrens"
          :comment="com"
          :key="index"
          @success="$emit('success')"
        ></show-com>
      </div>
    </div>
  </div>
</template>

<script>
import ReplyCom from "@/views/ReadArticle/components/ReplyCom.vue";

import { httpCommentAdd, httpCommentQuery } from "@/network/Comment.js";
import { httpUserQuery } from "@/network/User.js";

export default {
  name: "show-com",
  components: {
    "reply-com": ReplyCom,
  },
  model: {},
  props: {
    comment: {
      type: Object,
      default: function() {
        return {
          id: 4,
          aId: 65,
          uId: 4,
          userName: "许浩培",
          content: "仔细擦拭中心城中心？？？仔细擦拭",
          date: "2021-04-05T15:32:28.000Z",
          path: "/65/4",
          pId: 65,
          childrens: [],
        };
      },
    },
  },
  data() {
    return {
      lvs: ["info", "success", "danger", "warning"],
      isReply: false,
      user:{},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getUserMsg(this.comment.uId);
  },
  beforeDestory() {},
  methods: {
    reply(msg) {
      this.isReply = !this.isReply;
    },
    replySubmit(event) {
      let content = event.data.content;
      let aId = this.comment.aId;
      let uId = this.$store.state.people.user.id;
      let userName = this.$store.state.people.user.userName;
      let path = this.comment.path;
      let pId = this.comment.id;
      httpCommentAdd(aId, uId, userName, content, path, pId)
        .then((Response) => {
          this.$message({
            message: "评论成功",
            type: "success",
          });
          this.$emit("success");
          this.reply();
        })
        .catch((err) => {});
    },
    getUserMsg(userId) {
      httpUserQuery(userId)
      .then((res)=>{
        let user = res.data;
        user.school =  JSON.parse( user.school);
        user.major = JSON.parse( user.major);
        this.user = user;
      })
      .catch((err)=>{
        this.$message.error("用户信息不存在")
      })
   }
  },
};
</script>

<style lang="less" scoped>
.ShowCom {
  display: flex;
  flex-direction: row;
  justify-content: row;
  padding: 10px 0;
  .ShowCom-wrapper {
    flex: 1;
    font-size: 13px;
  }
  .ShowCom-div_footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    span {
      color: rgba(0, 0, 0, 0.5);
    }
    margin-bottom: 10px;
  }
  .img-wrapper {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background-color: brown;
    margin-right: 10px;
    line-height: 50px;
    color:white;
    text-align: center;
    font-size: 18px;
  }
}
</style>
