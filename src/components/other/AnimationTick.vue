<!--
这是打勾动漫，根据loading来判断什么时候完成打勾，size可以改变圆圈的大小
参数 loadingObj({isLoading:true,isSuccess:true})出现 loading(为false的时候)消失
  size(大小) 控制图标的大小
-->
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
      <polyline
        fill="none"
        stroke="red"
        stroke-width="24"
        points="100,100 300,300"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="AnimationTick_errorLeft"
      />
		
	  <polyline
        fill="none"
        stroke="red"
        stroke-width="24"
        points="300,100 100,300"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="AnimationTick_errorRihgt"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    loading:{
      type:Object,
      default:function(){
        return {
          isLoading:true,     // 判断是否启动组件
          isSuccess:true      // 判断是打勾动画还是打叉动画
          }
      },
    },
    size:{
      type:String,
      default:2
    }
  },
  data() {
    return {
      loadingA : true
    };
  },
  methods: {
    /**
     * 启动圈圈动画
     */
    circleBegin() {
      const circle = document.getElementsByClassName("AnimationTick_circle")[0];  // 获取元素
      circle.style["animation"] = "AnimationTick_circle-kf 1s ease-in-out";       // 根据动画规则启动动画
      
      // 1设置监听当动画完成时，
      circle.addEventListener("animationend", () => {
        // 1.1清除动画
        circle.style["animation"] = "";   
        // 1.2设置定时器
        setTimeout(() => {
          // 判断是否需要重新启动动画
          if(this.loading.isLoading){
            circle.style["animation"] = "AnimationTick_circle-kf 1s ease-in-out";   // 重新启动动画
          } else {
            circle.style["animation-fill-mode"] = "forwards";             // 将动画定格在最后一帧
            this.loading.isSuccess ? this.tickBegin() : this.errorBegin();
          }
        }, 10);
      });
    },
    /**
     * 启动打勾动画
     */
    tickBegin() {
      
      const tick = document.getElementsByClassName("AnimationTick_tick")[0];
      tick.style["animation"] = "AnimationTick_tick-kf 0.4s ease-in-out";  // 根据动画规则启动动画
      tick.style["animation-fill-mode"] = "forwards";     // 将动画定格在最后一帧
      // 设置当动画完成时，设置这个组件消失
      tick.addEventListener('animationend',()=>{
        const AnimationTick = document.getElementById("AnimationTick");
        AnimationTick.style['display'] = "none";          // 隐藏打勾动画这个组件
      })
    },
    /**
     * 启动打×动画 
     */
    errorBegin(){
      const errorLeft = document.getElementsByClassName("AnimationTick_errorLeft")[0];
      const errorRight = document.getElementsByClassName("AnimationTick_errorRihgt")[0];
      const AnimationTick_circle = document.getElementsByClassName("AnimationTick_circle")[0];
      AnimationTick_circle.style['stroke'] = "red";         

      errorLeft.style['stroke-dashoffset'] = "0";
      errorLeft.addEventListener('transitionend',()=>{
          errorRight.style['stroke-dashoffset'] = "0";
      })

      errorRight.addEventListener('transitionend',()=>{
        const AnimationTick = document.getElementById("AnimationTick");
        AnimationTick.style['display'] = "none";          // 隐藏打勾动画这个组件
      })

    },
    /**
     * 修改打勾动画大小
     */
    setSize() {
      const svg = document.getElementsByClassName("AnimationTick_svg")[0];
      const size = this.size/10;
      svg.style["transform"] = `scale(${size})`;
    },
    /**
     * 初始化打勾动画
     */
    init(){
        const circle = document.getElementsByClassName("AnimationTick_circle")[0];  
        circle.style["animation"] = ""; 
        const tick = document.getElementsByClassName("AnimationTick_tick")[0];
        tick.style["animation"] = "";  
        const errorLeft = document.getElementsByClassName("AnimationTick_errorLeft")[0];
        errorLeft.style['stroke-dashoffset'] = "420";
        const errorRight = document.getElementsByClassName("AnimationTick_errorRihgt")[0];
        errorRight.style['stroke-dashoffset'] = "420";
        const AnimationTick_circle = document.getElementsByClassName("AnimationTick_circle")[0];
        AnimationTick_circle.style['stroke'] = "#68E534";    
        const AnimationTick = document.getElementById("AnimationTick");
        AnimationTick.style['display'] = "flex";

    }
  },
  mounted() {
    this.setSize();
    const AnimationTick = document.getElementById("AnimationTick");
    AnimationTick.style['display'] = "none";          // 隐藏打勾动画这个组件
  },
  watch:{
    /**当loading重新变为true的时候 显示打勾动画组件 */
    loading:{
      handler:function(){
        if(this.loading.isLoading){
          this.init();
          this.circleBegin();
        }
      },
      deep: true
    }
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
  background: rgba(255,255,255,0.5);
  z-index: 9999;
  
}

#AnimationTick .AnimationTick_circle {
  stroke-dasharray: 1194; /*设置实线为圆的周长（既是第一圈为实现），空白线为圆的周长（第二圈为空白） */
  stroke-dashoffset: 0; 
  stroke:#68E534;
  transition: stroke 1s ease-in-out;
}
#AnimationTick .AnimationTick_tick {
  stroke-dasharray: 350;
  stroke-dashoffset: 360;
}

#AnimationTick .AnimationTick_errorLeft {
  stroke-dasharray: 400 400;
	stroke-dashoffset:420;	
	transition: all 0.4s ease-in-out;
}
#AnimationTick .AnimationTick_errorRihgt {
  stroke-dasharray: 400 400;
	stroke-dashoffset:420;	
	transition: all 0.4s ease-in-out;
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

/**定义 */
</style>
