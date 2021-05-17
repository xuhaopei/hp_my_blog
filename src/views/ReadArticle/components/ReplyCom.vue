<template>
  <div class="ReplyCom">
    <el-row>
      <el-col :span="24">
        <el-input
          type="textarea"
          autosize
          placeholder="评论......"
          v-model="textarea1"
        >
        </el-input>
      </el-col>
    </el-row>
    <div class="ReplyCom-div_footer">
      <div class="left">
        <!-- <emoji-picker @emoji="insert" :search="search">
          打开表情
          <div
            slot="emoji-invoker"
            slot-scope="{ events: { click: clickEvent } }"
            @click.stop="clickEvent"
          >
            <el-link :underline="false" type="primary" icon="el-icon-ice-cream"
              >表情</el-link
            >
          </div>
          表情内容
          <div
            slot="emoji-picker"
            slot-scope="{ insert }"
            style="position:absolute"
          >
            <div class="emoji-wrapper">
              <div>
                <el-carousel trigger="click" height="130px" :autoplay="false">
                  <el-carousel-item
                    v-for="(value, item) in emojisList"
                    :key="item"
                  >
                    <span
                      v-for="(emoji, emojiName) in value"
                      :key="emojiName"
                      @click="insert(emoji)"
                      :title="emojiName"
                      class="emoji"
                      >{{ emoji }}
                    </span>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </emoji-picker>
        <el-link :underline="false" type="primary" style="margin-left:15px"
          ><i class="el-icon-picture-outline"></i> 图片
        </el-link> -->
      </div>
      <el-button type="primary" plain size="small" @click="submit"
        >评论</el-button
      >
    </div>
  </div>
</template>

<script>
import EmojiPicker from "vue-emoji-picker";

import { emojisList } from "@/assets/js/emojisList.js";

export default {
  name: "ReplyCom",
  components: {
    "emoji-picker": EmojiPicker,
  },
  model: {},
  props: {
    user: {
      type: Object,
      default: function() {
        return {
          name: "许浩培",
          lv: "1",
          university: "广东技术师范大学",
          college: "计算机科学学院",
          major: "计算机科学技术",
          class: "大三",
          id: 0,
        };
      },
    },
  },
  data() {
    return {
      textarea1: "",
      search: "",
      emojisList: emojisList,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestory() {},
  methods: {
    insert(emoji) {
      this.textarea1 += emoji;
    },
    submit(){
        this.$emit("success",{
          methods:'reply',
          data:{
            content:this.textarea1
          }
        });
    }
  },
};
</script>

<style lang="less" scoped>
.ReplyCom {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  .ReplyCom-div_footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .left {
      display: flex;
      .emoji-wrapper {
        position: absolute;
        width: 300px;
        background: rgba(0, 0, 0, 0.1);
        padding: 0 10px;
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
        .emoji {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
