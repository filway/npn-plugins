<template>
  <div id="app">
      <npn-search
        :search="search"
        show-export-btn
        is-search
        :othersearch="search2"
        :size="size"
        :list-query="listquery"
        @searchdata="getdata"
        @exportdata="exportdata"
      />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      listquery: {},
      size: "small",
      search: [
        {
          name: "日期段",
          key: "daterange",
          value: "",
          type: "daterange",
          editable: false,
          width: "255px"
        },
        {
          name: "远程搜索",
          key: "remote",
          value: "",
          type: "remote_select",
          multiple: true,
          width: "200px",
          url: "https://www.filway.cn:9528/search/list"
        },
        {
          name: "远程搜索2",
          key: "remote2",
          value: "",
          type: "remote_select",
          multiple: true,
          width: "200px",
          url: "https://www.filway.cn:9528/search/list"
        },
        {
          name: "选项",
          key: "select",
          value: "",
          type: "select",
          multiple: true,
          width: "200px",
          list: [
            {
              key: 1,
              text: "npn admin"
            },
            {
              key: 2,
              text: "npn reports"
            }
          ]
        },
        {
          name: "文本框",
          key: "text",
          value: "",
          type: "text",
          width: "200px"
        }
      ],
      search2: [
        {
          name: "日期段",
          key: "other_daterange",
          value: "",
          type: "daterange",
          editable: false,
          width: "255px"
        },
        {
          name: "远程搜索",
          key: "other_remote",
          value: "",
          type: "remote_select",
          multiple: true,
          width: "200px",
          url: "https://www.filway.cn:9528/search/list2"
        },
        {
          name: "远程搜索2",
          key: "other_remote2",
          value: "",
          type: "remote_select",
          multiple: true,
          width: "200px",
          url: "https://www.filway.cn:9528/search/list2"
        },
        {
          name: "选项",
          key: "other_select",
          value: "",
          type: "select",
          multiple: true,
          width: "200px",
          list: [
            {
              key: 1,
              text: "npn admin"
            },
            {
              key: 2,
              text: "npn reports"
            }
          ]
        },
        {
          name: "文本框",
          key: "other_text",
          value: "",
          type: "text",
          width: "200px"
        },
        {
          name: "日期",
          key: "other_date",
          value: "",
          type: "date",
          width: "190px"
        }
      ]
    };
  },
  methods: {
    getdata(val) {
      console.log("查询");
      console.log(JSON.stringify(val));
    },
    exportdata() {
      ELEMENT.Message({
        message: "export data success!",
        type: "success",
        duration: 5 * 1000
      });
    }
  }
};
</script>

<style></style>
