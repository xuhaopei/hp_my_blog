<template>
  <div id="hp_date">
    <div id="jsContainer">
      <table class="calendar">
      </table>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let obj = document.getElementById("jsContainer");
      let date = new Date();
      let year = date.getFullYear();
      let mount = date.getMonth() + 1;
      this.Calendar(obj, year, mount);
    },
    /**
     * 创建日历实例，根据当前年月进行更新
     */
    Calendar(container, year, month) {
      let obj = {};
      obj.year = year;
      obj.month = month;
      obj.html = html;
      obj.el = document.getElementById("jsContainer"); //TODO: 创建分页组件根节点
      if (!obj.el) return;
      obj.el.className = "calendar";
      obj.el.innerHTML = html();
      container.appendChild(obj.el);

      obj.el.addEventListener("click", (event) => {
        var el = event.target;
        var isPre = el.classList.contains("pre");
        var isNext = el.classList.contains("next");
        if (!isPre && !isNext) return;
        if (isPre) {
          if (obj.month == 1) {
            obj.month = 12;
            obj.year--;
          } else {
            obj.month--;
          }
          //TODO: 更新this.month和this.year
        } else {
          if (obj.month == 12) {
            obj.month = 1;
            obj.year++;
          } else {
            obj.month++;
          }
          //TODO: 更新this.month和this.year
        }
        obj.el.innerHTML = html();
      });

      function html() {
        var date = new Date();
        var year = +obj.year || 0;
        var month = (+obj.month || 0) - 1;
        var day = date.getDate();
        //TODO: 生成组件的内部html字符串
        let mounths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)) {
          mounths[1] = 28;
        } else {
          mounths[1] = 29;
        }

        let arrayResult = new Array(35).fill("");
        let days = mounths[month];
        let tempDate = new Date(year, month, 1);
        let t = tempDate.getDay();
        for (let i = t; i < days + t; i++) {
          arrayResult[i - 1] = i - t + 1;
        }

        let str = `
                <table class="calendar">
                <thead>
                    <tr><th class="pre"><</th><th colspan="5" class="date">${year}.${
          month + 1
        }</th><th class="next">></th></tr>
                    <tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>
                </thead>
                <tbody>
                    <tr><td>${arrayResult[0]}</td><td>${
          arrayResult[1]
        }</td><td>${arrayResult[2]}</td><td>${arrayResult[3]}</td><td>${
          arrayResult[4]
        }</td><td>${arrayResult[5]}</td><td>${arrayResult[6]}</td></tr>
                    <tr><td>${arrayResult[7]}</td><td>${
          arrayResult[8]
        }</td><td>${arrayResult[9]}</td><td>${arrayResult[10]}</td><td>${
          arrayResult[11]
        }</td><td>${arrayResult[12]}</td><td>${arrayResult[13]}</td></tr>
                    <tr><td>${arrayResult[14]}</td><td>${
          arrayResult[15]
        }</td><td>${arrayResult[16]}</td><td>${arrayResult[17]}</td><td>${
          arrayResult[18]
        }</td><td>${arrayResult[19]}</td><td>${arrayResult[20]}</td></tr>
                    <tr><td>${arrayResult[21]}</td><td>${
          arrayResult[22]
        }</td><td>${arrayResult[23]}</td><td>${arrayResult[24]}</td><td>${
          arrayResult[25]
        }</td><td>${arrayResult[26]}</td><td>${arrayResult[27]}</td></tr>
                    <tr><td>${arrayResult[28]}</td><td>${
          arrayResult[29]
        }</td><td>${arrayResult[30]}</td><td>${arrayResult[31]}</td><td>${
          arrayResult[32]
        }</td><td>${arrayResult[33]}</td><td>${arrayResult[34]}</td></tr>
                </tbody>
                </table>
                `;

        let reg = new RegExp(`<td>${day}</td>`);
        let d = new Date();
        let year_ = d.getFullYear();
        let mount_ = d.getMonth();
        if (year_ == year && mount_ == month) {
          str = str.replace(reg, `<td class="current">${day}</td>`);
        }
        return str;
      }
    },
  },
};
</script>
<style lang="less">
#hp_date {
  flex: none;
  width: 280px;
  padding: 10px;
  table.calendar {
    font-size: 14px;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
  }

  table.calendar th {
    background: #f5f5f5;
    color: #999;
  }

  table.calendar th,
  table.calendar td {
    border: 1px solid #e1e1e1;
    padding: 0;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }

  table.calendar td.current {
    background: #1890ff;
    color: #fff;
  }

  table.calendar th.pre,
  table.calendar th.next {
    color: #1890ff;
    cursor: pointer;
  }

  table.calendar th.date {
    color: #000;
  }
}
</style>