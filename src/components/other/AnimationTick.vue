<!--这是打勾动漫，根据loading来判断什么时候完成打勾，size可以改变圆圈的大小-->
<template>
  <div id="AnimationTick" loading>
    <svg width="400" height="400" class="AnimationTick_svg">
      <circle
        fill="none"
        stroke="#68E534"
        stroke-width="20"
        cx="200"
        cy="200"
        r="190"
        stroke-linecap="round"
        transform="rotate(-90,200,200)"
        class="AnimationTick_circle"
      />
      <polyline
        fill="none"
        stroke="#68E534"
        stroke-width="24"
        points="88,214 173,284 304,138"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="AnimationTick_tick"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    loading:{
      type:Boolean,
      default:true,
    },
    size:{
      type:Number,
      default:1
    }
  },
  data() {
    return {
      loadingA : true
    };
  },
  methods: {
    /*第一步：设置圈圈动画 */
    circleBegin() {
      const circle = document.getElementsByClassName("AnimationTick_circle")[0];  // 获取元素
      circle.style["animation"] = "AnimationTick_circle-kf 1s ease-in-out";                       // 根据动画规则启动动画
      
      // 1设置监听当动画完成时，
      circle.addEventListener("animationend", () => {
        // 1.1清除动画
        circle.style["animation"] = "";   
        // 1.2设置定时器
        setTimeout(() => {
          // 判断是否需要重新启动动画
          if(this.loading){
            circle.style["animation"] = "AnimationTick_circle-kf 1s ease-in-out";   // 重新启动动画
          } else {
            circle.style["animation-fill-mode"] = "forwards";             // 将动画定格在最后一帧
            this.tickBegin();       // 调用打勾动画
          }
        }, 10);
      });
    },
    /*第一步：设置打勾动画 */
    tickBegin() {
      const tick = document.getElementsByClassName("AnimationTick_tick")[0];
      tick.style["animation"] = "AnimationTick_tick-kf 1s ease-in-out";  // 根据动画规则启动动画
      tick.style["animation-fill-mode"] = "forwards";     // 将动画定格在最后一帧
      // 设置当动画完成时，设置这个组件消失
      tick.addEventListener('animationend',()=>{
        const AnimationTick = document.getElementById("AnimationTick");
        AnimationTick.style['display'] = "none";
      })
    },
    setSize() {
      const svg = document.getElementsByClassName("AnimationTick_svg")[0];
      const size = this.size/10;
      svg.style["transform"] = `scale(${size})`;
    }
  },
  mounted() {
    this.setSize();
    this.circleBegin();
  },
  watch:{

  }
};
</script>


<style >
body{
  margin: 0;
  padding: 0;
}
#AnimationTick {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
}

#AnimationTick .AnimationTick_circle {
  stroke-dasharray: 1194; /*设置实线为圆的周长（既是第一圈为实现），空白线为圆的周长（第二圈为空白） */
  stroke-dashoffset: 0; 
}
#AnimationTick .AnimationTick_tick {
  stroke-dasharray: 350;
  stroke-dashoffset: 360;
}
/*定义AnimationTick_circle-kf的动画规则*/
@keyframes AnimationTick_circle-kf {
  from {
    stroke-dashoffset: 1194;
  }
  to {
    stroke-dashoffset: 2388;
  }
}
/*定义AnimationTick_tick-kf的动画规则*/
@keyframes AnimationTick_tick-kf {
  from {
    stroke-dashoffset: 350;
  }
  to {
    stroke-dashoffset: 0;
  }
}

</style>
