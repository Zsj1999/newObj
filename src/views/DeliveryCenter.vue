<template>
  <div class="page">
    <a-card :bordered="false" class="summary-card">
      <div class="summary-left">
        <a-tag color="cyan">投递全链路</a-tag>
        <h2>投递管理中心</h2>
        <p>新增待办提醒、高匹配候选人和状态快捷筛选，让投递跟进更像真实招聘业务后台。</p>
      </div>
      <div class="status-board">
        <div v-for="item in statusSummary" :key="item.label" class="status-card">
          <div class="status-value">{{ item.value }}</div>
          <div class="status-label">{{ item.label }}</div>
        </div>
      </div>
    </a-card>

    <div class="top-grid">
      <a-card :bordered="false" class="action-card">
        <div class="card-title">今日待办</div>
        <div class="action-list">
          <div class="action-item">
            <strong>{{ pendingActions.toCommunicate }}</strong>
            <span>待沟通候选人</span>
          </div>
          <div class="action-item">
            <strong>{{ pendingActions.toInterview }}</strong>
            <span>待安排面试</span>
          </div>
          <div class="action-item">
            <strong>{{ pendingActions.toOffer }}</strong>
            <span>待发 Offer</span>
          </div>
        </div>
      </a-card>

      <a-card :bordered="false" class="action-card">
        <div class="card-title">高匹配候选人</div>
        <div class="focus-list">
          <div v-for="item in topMatches" :key="item.id" class="focus-item">
            <strong>{{ item.candidate }}</strong>
            <span>{{ item.jobTitle }} · {{ item.matchScore }} 分</span>
          </div>
        </div>
      </a-card>
    </div>

    <div class="main-grid">
      <a-card :bordered="false" class="table-card">
        <div class="table-toolbar">
          <a-input-search
            v-model="keyword"
            allow-clear
            placeholder="搜索候选人 / 职位 / 企业"
            class="toolbar-search"
          />
          <a-select v-model="status" class="toolbar-select">
            <a-select-option value="全部">全部状态</a-select-option>
            <a-select-option v-for="item in statuses" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </div>
        <div class="quick-statuses">
          <button
            type="button"
            class="status-chip"
            :class="{ active: status === '全部' }"
            @click="status = '全部'"
          >
            全部
          </button>
          <button
            v-for="item in statuses"
            :key="item"
            type="button"
            class="status-chip"
            :class="{ active: status === item }"
            @click="status = item"
          >
            {{ item }}
          </button>
        </div>
        <a-table
          :columns="columns"
          :data-source="paginatedApplications"
          :pagination="false"
          :row-key="(record) => record.id"
          :scroll="{ x: 960 }"
        >
          <template slot="status" slot-scope="text">
            <a-tag :color="statusColor(text)">{{ text }}</a-tag>
          </template>
          <template slot="score" slot-scope="text">
            <span class="score-text">{{ text }} 分</span>
          </template>
        </a-table>
        <div class="pagination-bar">
          <a-pagination
            :current="page"
            :page-size="pageSize"
            :total="filteredApplications.length"
            :show-size-changer="false"
            @change="page = $event"
          />
        </div>
      </a-card>

      <a-card :bordered="false" class="aside-card">
        <div class="card-title">跟进建议</div>
        <div class="suggest-list">
          <div class="suggest-item">
            <strong>优先处理高分候选人</strong>
            <span>{{ topMatches.length }} 位候选人匹配度高于 95 分，建议优先联系。</span>
          </div>
          <div class="suggest-item">
            <strong>缩短简历停留时长</strong>
            <span>{{ pendingActions.toCommunicate }} 位候选人仍在待沟通阶段，可安排自动提醒。</span>
          </div>
          <div class="suggest-item">
            <strong>Offer 节奏优化</strong>
            <span>{{ pendingActions.toOffer }} 位候选人已进入 Offer 阶段，建议统一节点回访。</span>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { applications } from "../mock/jobs";

export default {
  name: "DeliveryCenter",
  data() {
    return {
      keyword: "",
      status: "全部",
      page: 1,
      pageSize: 10,
      applications,
      columns: [
        {
          title: "候选人",
          dataIndex: "candidate",
          key: "candidate",
          width: 120
        },
        {
          title: "应聘职位",
          dataIndex: "jobTitle",
          key: "jobTitle",
          width: 180
        },
        {
          title: "企业",
          dataIndex: "company",
          key: "company",
          width: 140
        },
        {
          title: "城市",
          dataIndex: "city",
          key: "city",
          width: 100
        },
        {
          title: "薪资",
          dataIndex: "salary",
          key: "salary",
          width: 120
        },
        {
          title: "匹配度",
          dataIndex: "matchScore",
          key: "matchScore",
          scopedSlots: { customRender: "score" },
          width: 120
        },
        {
          title: "流程状态",
          dataIndex: "status",
          key: "status",
          scopedSlots: { customRender: "status" },
          width: 120
        },
        {
          title: "更新时间",
          dataIndex: "updatedAt",
          key: "updatedAt",
          width: 140
        }
      ]
    };
  },
  computed: {
    statuses() {
      return [...new Set(this.applications.map((item) => item.status))];
    },
    pendingActions() {
      return {
        toCommunicate: this.applications.filter((item) => item.status === "待沟通").length,
        toInterview: this.applications.filter((item) => item.status === "约面中").length,
        toOffer: this.applications.filter((item) => item.status === "已发 Offer").length
      };
    },
    topMatches() {
      return this.applications.slice().sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
    },
    filteredApplications() {
      const keyword = this.keyword.trim().toLowerCase();
      return this.applications.filter((item) => {
        const matchesKeyword =
          !keyword ||
          [item.candidate, item.jobTitle, item.company].join(" ").toLowerCase().includes(keyword);
        const matchesStatus = this.status === "全部" || item.status === this.status;
        return matchesKeyword && matchesStatus;
      });
    },
    paginatedApplications() {
      const start = (this.page - 1) * this.pageSize;
      return this.filteredApplications.slice(start, start + this.pageSize);
    },
    statusSummary() {
      return this.statuses.map((label) => ({
        label,
        value: this.applications.filter((item) => item.status === label).length
      }));
    }
  },
  watch: {
    keyword() {
      this.page = 1;
    },
    status() {
      this.page = 1;
    }
  },
  methods: {
    statusColor(status) {
      const map = {
        待沟通: "orange",
        简历筛选: "blue",
        约面中: "purple",
        "已发 Offer": "green"
      };
      return map[status] || "default";
    }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-card,
.table-card,
.action-card,
.aside-card {
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
}

.summary-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: linear-gradient(135deg, #063c50 0%, #0f7490 100%);
  color: #fff;
}

.summary-left h2 {
  margin: 18px 0 10px;
  color: #fff;
  font-size: clamp(28px, 4vw, 40px);
}

.summary-left p {
  max-width: 620px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
}

.status-board {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 14px;
}

.status-card {
  padding: 22px 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  text-align: center;
}

.status-value {
  font-size: 30px;
  font-weight: 700;
}

.status-label {
  color: rgba(255, 255, 255, 0.74);
}

.top-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 320px;
  gap: 16px;
}

.card-title {
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
}

.action-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.action-item {
  padding: 18px 14px;
  border-radius: 18px;
  background: #f8fafc;
  text-align: center;
}

.action-item strong {
  display: block;
  color: #0f7490;
  font-size: 26px;
}

.action-item span {
  color: #64748b;
  font-size: 13px;
}

.focus-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 18px;
}

.focus-item {
  padding: 14px 16px;
  border-radius: 18px;
  background: linear-gradient(180deg, #f7fcff 0%, #eef8fb 100%);
}

.focus-item strong {
  display: block;
  color: #0f172a;
}

.focus-item span {
  display: block;
  margin-top: 6px;
  color: #64748b;
  font-size: 13px;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.toolbar-search {
  max-width: 360px;
}

.toolbar-select {
  width: 160px;
}

.quick-statuses {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.status-chip {
  padding: 8px 14px;
  border: none;
  border-radius: 999px;
  background: #f1f5f9;
  color: #475569;
  cursor: pointer;
}

.status-chip.active {
  background: #0f7490;
  color: #fff;
}

.score-text {
  color: #1677ff;
  font-weight: 700;
}

.suggest-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
}

.suggest-item {
  padding: 16px;
  border-radius: 18px;
  background: #f8fafc;
}

.suggest-item strong {
  display: block;
  color: #0f172a;
}

.suggest-item span {
  display: block;
  margin-top: 8px;
  color: #64748b;
  line-height: 1.7;
}

.pagination-bar {
  display: flex;
  justify-content: center;
  margin-top: 22px;
}

@media (max-width: 900px) {
  .summary-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .status-board {
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .top-grid,
  .main-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .table-toolbar {
    flex-direction: column;
  }

  .toolbar-search,
  .toolbar-select {
    width: 100%;
    max-width: none;
  }

  .action-list,
  .status-board {
    grid-template-columns: 1fr;
  }
}
</style>
