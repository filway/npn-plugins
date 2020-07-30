<template>
  <div class="searchBarBox">
    <!-- <p>查询列表</p> -->
    <el-form :inline="true" :model="listQuery" :size="size">
      <div class="search">
        <template v-for="(item,index) in search">
          <el-form-item :key="index" :label="item.name+':'">
            <el-input
              v-model.trim="item.value"
              :key="item.key"
              :disabled="item.disabled"
              :placeholder="item.placeholder||''"
              v-if="item.type=='text'"
              :style="{width:item.width}"
              clearable
            ></el-input>
            <el-date-picker
              clearable
              v-if="item.type=='daterange'"
              v-model.trim="item.value"
              value-format="yyyy-MM-dd"
              :disabled="item.disabled"
              :editable="item.editable"
              type="daterange"
              unlink-panels
              range-separator="To"
              :start-placeholder="item.start_placeholder||''"
              :end-placeholder="item.end_placeholder||''"
              :style="{width:item.width}"
            ></el-date-picker>
            <el-date-picker
              clearable
              value-format="yyyy-MM-dd"
              v-if="item.type=='date'"
              :disabled="item.disabled"
              v-model.trim="item.value"
              align="right"
              :type="item.type"
              :placeholder="item.placeholder||''"
              :style="{width:item.width}"
            ></el-date-picker>
            <el-select
              clearable
              v-if="item.type=='select'"
              :disabled="item.disabled"
              :multiple="item.multiple"
              :filterable="item.filterable"
              :collapse-tags="item.collapseTags"
              v-model.trim="item.value"
              :placeholder="item.placeholder||''"
              :style="{width:item.width}"
            >
              <el-option
                v-for="item1 in item.list"
                :key="item1.key"
                :label="item1.text"
                :value="item1.key"
              ></el-option>
            </el-select>
            <el-select
              clearable
              v-if="item.type=='remote_select'"
              :disabled="item.disabled"
              :multiple="item.multiple"
              v-model.trim="item.value"
              filterable
              remote
              :reserve-keyword="item.keep_keyword"
              :placeholder="item.placeholder||'Please enter a keyword'"
              :remote-method="(query)=>{remoteMethod(query,`${item.url||''}`)}"
              @focus="clearOptions"
              :loading="remote_loading"
            >
              <el-option
                v-for="item1 in options"
                :key="item1.key"
                :label="item1.text"
                :value="item1.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
        <template>
          <el-form-item class="button-group">
            <el-button
              class="btn"
              type="success"
              icon="el-icon-search"
              @click="searchdata()"
              :size="size"
            >Search</el-button>
            <el-button
              v-if="showExportBtn"
              class="btn"
              icon="el-icon-download"
              type="success"
              @click="exportdata()"
              :size="size"
            >Export</el-button>
            <el-button
              v-if="showResetBtn"
              class="btn"
              type="success"
              @click="reset()"
              :size="size"
            >Reset</el-button>
            <slot name="behind"></slot>
          </el-form-item>
        </template>
      </div>
      <el-collapse-transition>
        <div class="othersearch" v-if="searchshow">
          <template v-for="(item,index) in othersearch">
            <el-form-item :key="index" :label="item.name+':'">
              <el-input
                v-model.trim="item.value"
                :key="item.key"
                :disabled="item.disabled"
                :placeholder="item.placeholder||''"
                v-if="item.type=='text'"
                :style="{width:item.width}"
                clearable
              ></el-input>
              <el-date-picker
                clearable
                v-if="item.type=='daterange'"
                v-model.trim="item.value"
                value-format="yyyy-MM-dd"
                :disabled="item.disabled"
                :editable="item.editable"
                type="daterange"
                unlink-panels
                range-separator="To"
                :start-placeholder="item.start_placeholder||''"
                :end-placeholder="item.end_placeholder||''"
                :style="{width:item.width}"
              ></el-date-picker>
              <el-date-picker
                clearable
                value-format="yyyy-MM-dd"
                v-if="item.type=='date'"
                :disabled="item.disabled"
                v-model.trim="item.value"
                align="right"
                :type="item.type"
                :placeholder="item.placeholder||''"
                :style="{width:item.width}"
              ></el-date-picker>
              <el-select
                clearable
                v-if="item.type=='select'"
                :disabled="item.disabled"
                :multiple="item.multiple"
                :filterable="item.filterable"
                :collapse-tags="item.collapseTags"
                v-model.trim="item.value"
                :placeholder="item.placeholder||''"
                :style="{width:item.width}"
              >
                <el-option
                  v-for="item1 in item.list"
                  :key="item1.key"
                  :label="item1.text"
                  :value="item1.key"
                ></el-option>
              </el-select>
              <el-select
                clearable
                v-if="item.type=='remote_select'"
                :disabled="item.disabled"
                :multiple="item.multiple"
                v-model.trim="item.value"
                filterable
                remote
                :reserve-keyword="item.keep_keyword"
                :placeholder="item.placeholder||'Please enter a keyword'"
                :remote-method="(query)=>{remoteMethod(query,`${item.url||''}`)}"
                :loading="remote_loading"
              >
                <el-option
                  v-for="item1 in options"
                  :key="item1.key"
                  :label="item1.text"
                  :value="item1.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </div>
      </el-collapse-transition>
      <span :class="{'toggle-login':!searchshow}" v-if="isSearch">
        <i
          :class="{'el-icon-arrow-up':searchshow,'el-icon-arrow-down':!searchshow}"
          :title="buttonTitle"
          @click="toggle"
        ></i>
      </span>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "NpnSearch",
  data() {
    return {
      width: "97px",
      remote_loading: false,
      searchshow: false,
      options: []
    };
  },
  props: {
    isSearch: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    othersearch: {
      type: Array,
      default: () => {
        return [];
      }
    },
    search: {
      type: Array,
      required: true
    },
    listQuery: {
      type: Object,
      default: () => {
        return {};
      }
    },
    showExportBtn: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    showResetBtn: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    size: {
      type: String,
      default: () => {
        return "mini";
      }
    }
  },
  computed: {
    buttonTitle() {
      if (this.searchshow) {
        return "Hide";
      } else {
        return "Show";
      }
    }
  },
  methods: {
    remoteMethod(query, url) {
      if (query !== "" && url !== "") {
        this.remote_loading = true;
        axios
          .get(url, {
            params: { q: query }
          })
          .then(response => {
            this.remote_loading = false;
            this.options = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.options = [];
      }
    },
    toggle() {
      this.searchshow = !this.searchshow;
      this.$emit("switch", this.searchshow);
    },
    clearOptions() {
      this.options = [];
    },
    searchdata() {
      // 点击查询按钮
      this.search.forEach(item => {
        this.$set(this.listQuery, item.key, item.value);
      });
      // 如果有多余的搜索项目,则一并提交
      if (this.isSearch) {
        this.othersearch.forEach(item => {
          this.$set(this.listQuery, item.key, item.value);
        });
      }
      this.$emit("searchdata", this.listQuery);
    },
    exportdata() {
      this.$emit("exportdata");
    },
    reset() {
      //  重置条件框数据
      this.search.forEach(item => {
        if (item.multiple) {
          item.value = [];
        } else {
          item.value = "";
        }
      });
      // 如果有多余的搜索项目,则一并重置
      if (this.isSearch) {
        this.othersearch.forEach(item => {
          if (item.multiple) {
            item.value = [];
          } else {
            item.value = "";
          }
        });
      }
      for (const p in this.listQuery) {
        this.listQuery[p] = "";
      }
      this.$emit("reset");
    }
  }
};
</script>
<style scoped>
div.searchBarBox {
  position: relative;
}
.searchBarBox span {
  width: 100%;
  position: absolute;
  text-align: center;
  bottom: 0px;
  height: 20px;
  line-height: 20px;
  z-index: 99;
}
.searchBarBox span i {
  cursor: pointer;
  border-radius: 2px;
  height: 16px;
  width: 40px;
  line-height: 16px;
  background: #fc8317;
}
.searchBarBox .button-group {
  position: absolute;
  right: 0;
  top: 0;
}
.search {
  width: 90%;
}
</style>
