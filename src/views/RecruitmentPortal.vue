<template>
  <div class="page">
    <section class="hero-banner">
      <div class="hero-copy">
        <a-tag color="blue" class="hero-tag">智能招聘中台</a-tag>
        <h1>保持现有风格，补齐更顺手的求职体验</h1>
        <p>
          新增智能场景推荐、收藏职位、最近浏览、薪资偏好、快捷清空筛选与模拟投递，让整套招聘系统更接近真实用户使用路径。
        </p>
        <div class="hero-actions">
          <a-button type="primary" size="large" shape="round" @click="scrollToList">
            开始找工作
          </a-button>
          <a-button size="large" shape="round" @click="showFirstJob">
            预览职位详情
          </a-button>
        </div>
        <div class="hero-points">
          <span>响应式布局</span>
          <span>智能筛选</span>
          <span>收藏与最近浏览</span>
          <span>模拟投递联动</span>
        </div>
      </div>
      <div class="hero-panel">
        <div v-for="metric in portalMetrics" :key="metric.label" class="metric-card">
          <div class="metric-value">{{ metric.value }}{{ metric.suffix }}</div>
          <div class="metric-label">{{ metric.label }}</div>
        </div>
      </div>
    </section>

    <section class="scene-grid">
      <a-card
        v-for="scene in quickScenes"
        :key="scene.label"
        :bordered="false"
        class="scene-card"
        @click="applyScene(scene)"
      >
        <div class="scene-badge">{{ scene.badge }}</div>
        <div class="scene-title">{{ scene.label }}</div>
        <div class="scene-desc">{{ scene.desc }}</div>
      </a-card>
    </section>

    <section ref="listSection" class="content-grid">
      <div class="filter-panel">
        <a-card :bordered="false" class="filter-card">
          <div class="section-head">
            <div class="section-title">筛选条件</div>
            <a-button type="link" @click="resetAllFilters">清空</a-button>
          </div>
          <a-input-search
            v-model="keyword"
            allow-clear
            placeholder="职位名称 / 企业 / 技能标签"
            @search="resetPagination"
          />
          <div class="filter-group">
            <div class="filter-label">城市</div>
            <a-radio-group v-model="city" button-style="solid" class="full-width" @change="resetPagination">
              <a-radio-button value="全部">全部</a-radio-button>
              <a-radio-button v-for="item in cities.slice(0, 12)" :key="item" :value="item">
                {{ item }}
              </a-radio-button>
            </a-radio-group>
          </div>
          <div class="filter-group">
            <div class="filter-label">岗位类型</div>
            <a-select v-model="employmentType" class="full-width" @change="resetPagination">
              <a-select-option value="全部">全部</a-select-option>
              <a-select-option v-for="item in employmentTypes" :key="item" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </div>
          <div class="filter-group">
            <div class="filter-label">经验要求</div>
            <a-select v-model="experience" class="full-width" @change="resetPagination">
              <a-select-option value="全部">全部</a-select-option>
              <a-select-option v-for="item in experiences" :key="item" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </div>
          <div class="filter-group">
            <div class="filter-label">特色标签</div>
            <div class="quick-tags">
              <a-checkable-tag
                v-for="tag in featureTags"
                :key="tag"
                :checked="selectedFeatures.includes(tag)"
                @change="toggleFeature(tag)"
              >
                {{ tag }}
              </a-checkable-tag>
            </div>
          </div>
          <div class="filter-group">
            <div class="filter-label">排序方式</div>
            <a-select v-model="sortType" class="full-width">
              <a-select-option value="latest">最新发布</a-select-option>
              <a-select-option value="salary">薪资优先</a-select-option>
              <a-select-option value="hot">投递热度</a-select-option>
            </a-select>
          </div>
          <div class="filter-group">
            <div class="assistant-switch">
              <div>
                <div class="switch-title">仅看已收藏</div>
                <div class="switch-desc">快速回看重点岗位</div>
              </div>
              <a-button
                :type="showFavoritesOnly ? 'primary' : 'default'"
                shape="round"
                size="small"
                @click="toggleFavoritesOnly"
              >
                {{ showFavoritesOnly ? "已开启" : "未开启" }}
              </a-button>
            </div>
          </div>
          <div class="filter-summary">
            共筛选出 <span>{{ filteredJobs.length }}</span> 个职位
          </div>
        </a-card>

        <a-card :bordered="false" class="helper-card">
          <div class="section-title compact">求职助手</div>
          <div class="helper-grid">
            <div class="helper-item">
              <strong>{{ favoriteJobs.length }}</strong>
              <span>已收藏</span>
            </div>
            <div class="helper-item">
              <strong>{{ deliveredIds.length }}</strong>
              <span>已投递</span>
            </div>
            <div class="helper-item">
              <strong>{{ recentViewedJobs.length }}</strong>
              <span>最近浏览</span>
            </div>
          </div>
          <div class="helper-actions">
            <a-button block @click="applyScene(quickScenes[0])">校招专场</a-button>
            <a-button block @click="applyScene(quickScenes[1])">远程优先</a-button>
          </div>
        </a-card>

        <a-card v-if="recentViewedJobs.length" :bordered="false" class="recent-card">
          <div class="section-head">
            <div class="section-title compact">最近浏览</div>
            <a-button type="link" @click="clearRecentViewed">清空</a-button>
          </div>
          <div class="mini-list">
            <button
              v-for="job in recentViewedJobs.slice(0, 4)"
              :key="job.id"
              type="button"
              class="mini-job"
              @click="openJob(job)"
            >
              <strong>{{ job.title }}</strong>
              <span>{{ job.company }} · {{ job.salary }}</span>
            </button>
          </div>
        </a-card>
      </div>

      <div class="list-panel">
        <a-card :bordered="false" class="toolbar-card">
          <div class="toolbar-top">
            <div>
              <div class="toolbar-title">职位结果</div>
              <div class="toolbar-desc">支持多维筛选、收藏管理和智能推荐排序</div>
            </div>
            <div class="toolbar-stats">
              <span>收藏 {{ favoriteJobs.length }}</span>
              <span>投递 {{ deliveredIds.length }}</span>
            </div>
          </div>
          <div v-if="activeFilters.length" class="active-filters">
            <button
              v-for="item in activeFilters"
              :key="item.key"
              type="button"
              class="active-filter-chip"
              @click="clearSingleFilter(item.type, item.value)"
            >
              {{ item.label }}
            </button>
          </div>
        </a-card>

        <a-row :gutter="[16, 16]">
          <a-col v-for="job in paginatedJobs" :key="job.id" :xs="24" :lg="12">
            <a-card :bordered="false" class="job-card" @click="openJob(job)">
              <div class="job-card-top">
                <div>
                  <div class="job-title-row">
                    <h3>{{ job.title }}</h3>
                    <a-tag v-if="job.urgent" color="red">急招</a-tag>
                    <a-tag v-if="job.remote" color="green">支持远程</a-tag>
                    <a-tag v-if="deliveredIds.includes(job.id)" color="blue">已投递</a-tag>
                    <a-tag v-if="isFavorite(job.id)" color="orange">已收藏</a-tag>
                  </div>
                  <div class="job-meta">
                    {{ job.company }} · {{ job.location }} · {{ job.education }} · {{ job.experience }}
                  </div>
                </div>
                <div class="job-salary">{{ job.salary }}</div>
              </div>
              <div class="job-tags">
                <a-tag v-for="tag in job.tags.slice(0, 3)" :key="tag">{{ tag }}</a-tag>
              </div>
              <div class="job-benefits">
                <span v-for="benefit in job.benefits.slice(0, 3)" :key="benefit">{{ benefit }}</span>
              </div>
              <div class="job-footer">
                <span>{{ job.publishedAt }}</span>
                <span>{{ job.applicants }} 人投递</span>
              </div>
              <div class="job-actions">
                <a-button shape="round" size="small" @click.stop="toggleFavorite(job)">
                  {{ isFavorite(job.id) ? "取消收藏" : "收藏" }}
                </a-button>
                <a-button
                  type="primary"
                  shape="round"
                  size="small"
                  @click.stop="quickApply(job)"
                >
                  {{ deliveredIds.includes(job.id) ? "已投递" : "立即投递" }}
                </a-button>
              </div>
            </a-card>
          </a-col>
        </a-row>

        <a-empty v-if="!paginatedJobs.length" description="暂无符合条件的职位" />

        <div class="pagination-bar">
          <a-pagination
            :current="page"
            :page-size="pageSize"
            :total="filteredJobs.length"
            :show-size-changer="false"
            @change="changePage"
          />
        </div>
      </div>
    </section>

    <a-drawer
      :visible="drawerVisible"
      placement="right"
      :width="drawerWidth"
      @close="drawerVisible = false"
    >
      <template slot="title">
        <div class="drawer-title">
          <div>{{ selectedJob.title }}</div>
          <div class="drawer-subtitle">{{ selectedJob.company }} · {{ selectedJob.location }}</div>
        </div>
      </template>

      <div v-if="selectedJob.id" class="detail-section">
        <div class="detail-header">
          <div class="detail-salary">{{ selectedJob.salary }}</div>
          <div class="detail-buttons">
            <a-button shape="round" @click="toggleFavorite(selectedJob)">
              {{ isFavorite(selectedJob.id) ? "取消收藏" : "收藏职位" }}
            </a-button>
            <a-button type="primary" shape="round" @click="quickApply(selectedJob)">
              {{ deliveredIds.includes(selectedJob.id) ? "已投递" : "立即投递" }}
            </a-button>
          </div>
        </div>
        <div class="detail-tags">
          <a-tag v-for="tag in selectedJob.tags" :key="tag" color="blue">{{ tag }}</a-tag>
        </div>
        <a-descriptions :column="1" size="small" bordered>
          <a-descriptions-item label="岗位类型">{{ selectedJob.employmentType }}</a-descriptions-item>
          <a-descriptions-item label="学历要求">{{ selectedJob.education }}</a-descriptions-item>
          <a-descriptions-item label="经验要求">{{ selectedJob.experience }}</a-descriptions-item>
          <a-descriptions-item label="投递人数">{{ selectedJob.applicants }} 人</a-descriptions-item>
        </a-descriptions>
        <div class="detail-inline-card">
          <div class="detail-inline-item">
            <strong>{{ selectedJob.remote ? "支持" : "不支持" }}</strong>
            <span>远程办公</span>
          </div>
          <div class="detail-inline-item">
            <strong>{{ selectedJob.urgent ? "是" : "否" }}</strong>
            <span>紧急招聘</span>
          </div>
          <div class="detail-inline-item">
            <strong>{{ selectedJob.benefits.length }}</strong>
            <span>福利标签</span>
          </div>
        </div>
        <div class="detail-block">
          <div class="detail-heading">岗位职责</div>
          <ul>
            <li v-for="item in selectedJob.description" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="detail-block">
          <div class="detail-heading">任职要求</div>
          <ul>
            <li v-for="item in selectedJob.requirements" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="detail-block">
          <div class="detail-heading">福利待遇</div>
          <div class="detail-benefits">
            <a-tag v-for="item in selectedJob.benefits" :key="item" color="green">{{ item }}</a-tag>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { jobs, portalMetrics } from "../mock/jobs";

const emptyJob = {
  id: "",
  title: "",
  company: "",
  location: "",
  salary: "",
  tags: [],
  benefits: [],
  employmentType: "",
  education: "",
  experience: "",
  applicants: 0,
  description: [],
  requirements: [],
  remote: false,
  urgent: false
};

const favoriteStorageKey = "zp-favorite-job-ids";
const recentStorageKey = "zp-recent-job-ids";
const deliveredStorageKey = "zp-delivered-job-ids";

export default {
  name: "RecruitmentPortal",
  data() {
    return {
      allJobs: jobs,
      portalMetrics,
      keyword: this.$route.query.keyword || "",
      city: "全部",
      employmentType: "全部",
      experience: "全部",
      sortType: "latest",
      page: 1,
      pageSize: 12,
      selectedFeatures: [],
      showFavoritesOnly: false,
      favoriteIds: [],
      recentViewedIds: [],
      deliveredIds: [],
      drawerVisible: false,
      selectedJob: emptyJob,
      drawerWidth: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : 560
    };
  },
  computed: {
    cities() {
      return [...new Set(this.allJobs.map((job) => job.city))];
    },
    employmentTypes() {
      return [...new Set(this.allJobs.map((job) => job.employmentType))];
    },
    experiences() {
      return [...new Set(this.allJobs.map((job) => job.experience))];
    },
    featureTags() {
      return ["急招", "支持远程", "Vue2", "Java", "校招", "六险一金"];
    },
    quickScenes() {
      return [
        {
          label: "校招专场",
          badge: "Campus",
          desc: "直接定位校招职位与成长型团队",
          employmentType: "校招"
        },
        {
          label: "远程优先",
          badge: "Remote",
          desc: "优先查看支持远程办公的岗位",
          features: ["支持远程"]
        },
        {
          label: "高薪岗位",
          badge: "Top Pay",
          desc: "快速聚焦中高薪资区间职位",
          sortType: "salary"
        }
      ];
    },
    favoriteJobs() {
      return this.favoriteIds
        .map((id) => this.allJobs.find((j) => j.id === id))
        .filter(Boolean);
    },
    recentViewedJobs() {
      return this.recentViewedIds
        .map((id) => this.allJobs.find((j) => j.id === id))
        .filter(Boolean);
    },
    activeFilters() {
      const filters = [];
      if (this.city !== "全部") {
        filters.push({ type: "city", value: this.city, label: `城市: ${this.city}`, key: "city" });
      }
      if (this.employmentType !== "全部") {
        filters.push({ type: "employmentType", value: this.employmentType, label: `类型: ${this.employmentType}`, key: "employmentType" });
      }
      if (this.experience !== "全部") {
        filters.push({ type: "experience", value: this.experience, label: `经验: ${this.experience}`, key: "experience" });
      }
      if (this.keyword.trim()) {
        filters.push({ type: "keyword", value: this.keyword, label: `关键词: ${this.keyword}`, key: "keyword" });
      }
      this.selectedFeatures.forEach((f) => {
        filters.push({ type: "feature", value: f, label: f, key: f });
      });
      return filters;
    },
    filteredJobs() {
      const keyword = this.keyword.trim().toLowerCase();
      const base = this.allJobs.filter((job) => {
        if (keyword) {
          const haystack = [job.title, job.company, job.city, ...job.tags].join(" ").toLowerCase();
          if (!haystack.includes(keyword)) return false;
        }
        if (this.city !== "全部" && job.city !== this.city) return false;
        if (this.employmentType !== "全部" && job.employmentType !== this.employmentType) return false;
        if (this.experience !== "全部" && job.experience !== this.experience) return false;
        if (this.showFavoritesOnly && !this.favoriteIds.includes(job.id)) return false;
        if (this.selectedFeatures.length) {
          const hasAll = this.selectedFeatures.every((f) => {
            if (f === "急招") return job.urgent;
            if (f === "支持远程") return job.remote;
            if (f === "校招") return job.employmentType === "校招";
            if (f === "六险一金") return job.benefits.includes("六险一金");
            return job.tags.includes(f);
          });
          if (!hasAll) return false;
        }
        return true;
      });
      if (this.sortType === "salary") {
        return base.slice().sort((a, b) => b.salaryMax - a.salaryMax);
      }
      if (this.sortType === "hot") {
        return base.slice().sort((a, b) => b.applicants - a.applicants);
      }
      return base.slice().sort((a, b) => Number(b.id.split("-")[1]) - Number(a.id.split("-")[1]));
    },
    paginatedJobs() {
      const start = (this.page - 1) * this.pageSize;
      return this.filteredJobs.slice(start, start + this.pageSize);
    }
  },
  watch: {
    "$route.query.keyword": {
      immediate: true,
      handler(value) {
        this.keyword = value || "";
        this.page = 1;
      }
    }
  },
  mounted() {
    try {
      this.favoriteIds = JSON.parse(localStorage.getItem(favoriteStorageKey) || "[]");
      this.recentViewedIds = JSON.parse(localStorage.getItem(recentStorageKey) || "[]");
      this.deliveredIds = JSON.parse(localStorage.getItem(deliveredStorageKey) || "[]");
    } catch (e) {
      this.favoriteIds = [];
      this.recentViewedIds = [];
      this.deliveredIds = [];
    }
    window.addEventListener("resize", this.updateDrawerWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateDrawerWidth);
  },
  methods: {
    resetAllFilters() {
      this.keyword = "";
      this.city = "全部";
      this.employmentType = "全部";
      this.experience = "全部";
      this.selectedFeatures = [];
      this.showFavoritesOnly = false;
      this.sortType = "latest";
      this.page = 1;
    },
    clearSingleFilter(type, value) {
      if (type === "city") this.city = "全部";
      else if (type === "employmentType") this.employmentType = "全部";
      else if (type === "experience") this.experience = "全部";
      else if (type === "keyword") this.keyword = "";
      else if (type === "feature") this.toggleFeature(value);
      this.page = 1;
    },
    toggleFavoritesOnly() {
      this.showFavoritesOnly = !this.showFavoritesOnly;
      this.page = 1;
    },
    resetPagination() {
      this.page = 1;
    },
    toggleFeature(tag) {
      const idx = this.selectedFeatures.indexOf(tag);
      if (idx > -1) {
        this.selectedFeatures = this.selectedFeatures.filter((f) => f !== tag);
      } else {
        this.selectedFeatures = [...this.selectedFeatures, tag];
      }
      this.resetPagination();
    },
    changePage(page) {
      this.page = page;
    },
    isFavorite(id) {
      return this.favoriteIds.includes(id);
    },
    toggleFavorite(job) {
      const idx = this.favoriteIds.indexOf(job.id);
      if (idx > -1) {
        this.favoriteIds = this.favoriteIds.filter((id) => id !== job.id);
      } else {
        this.favoriteIds = [...this.favoriteIds, job.id];
      }
      try {
        localStorage.setItem(favoriteStorageKey, JSON.stringify(this.favoriteIds));
      } catch (e) {}
    },
    quickApply(job) {
      if (this.deliveredIds.includes(job.id)) return;
      this.deliveredIds = [...this.deliveredIds, job.id];
      try {
        localStorage.setItem(deliveredStorageKey, JSON.stringify(this.deliveredIds));
      } catch (e) {}
    },
    openJob(job) {
      this.selectedJob = job;
      this.drawerVisible = true;
      const ids = this.recentViewedIds.filter((id) => id !== job.id);
      this.recentViewedIds = [job.id, ...ids].slice(0, 20);
      try {
        localStorage.setItem(recentStorageKey, JSON.stringify(this.recentViewedIds));
      } catch (e) {}
    },
    showFirstJob() {
      this.openJob(this.allJobs[0]);
    },
    clearRecentViewed() {
      this.recentViewedIds = [];
      try {
        localStorage.removeItem(recentStorageKey);
      } catch (e) {}
    },
    applyScene(scene) {
      if (scene.employmentType) {
        this.employmentType = scene.employmentType;
      }
      if (scene.features) {
        this.selectedFeatures = [...scene.features];
      }
      if (scene.sortType) {
        this.sortType = scene.sortType;
      }
      this.page = 1;
    },
    scrollToList() {
      this.$refs.listSection && this.$refs.listSection.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    updateDrawerWidth() {
      this.drawerWidth = window.innerWidth < 768 ? "100%" : 560;
    }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-banner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 1fr);
  gap: 20px;
  padding: clamp(24px, 3vw, 40px);
  border-radius: 28px;
  background: linear-gradient(135deg, #08142c 0%, #102d65 55%, #1677ff 100%);
  color: #fff;
  box-shadow: 0 20px 60px rgba(16, 45, 101, 0.28);
}

.hero-copy h1 {
  margin: 18px 0 12px;
  color: #fff;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.15;
}

.hero-copy p {
  max-width: 640px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 15px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 24px;
}

.hero-points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.hero-points span {
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
}

.hero-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-content: center;
}

.metric-card {
  padding: 20px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
}

.metric-value {
  font-size: clamp(22px, 3.5vw, 34px);
  font-weight: 700;
}

.metric-label {
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
}

.scene-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.scene-card {
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(17, 31, 65, 0.08);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.scene-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(22, 119, 255, 0.14);
}

.scene-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 8px;
  background: #e6f4ff;
  color: #1677ff;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 10px;
}

.scene-title {
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.scene-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
}

.content-grid {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.filter-card,
.job-card {
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(17, 31, 65, 0.08);
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 14px;
}

.section-title.compact {
  font-size: 16px;
  margin-bottom: 0;
}

.filter-group {
  margin-top: 16px;
}

.filter-label {
  margin-bottom: 8px;
  color: #475569;
  font-weight: 600;
  font-size: 13px;
}

.full-width {
  width: 100%;
}

.quick-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.assistant-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 14px;
  background: #f8fafc;
  margin-top: 16px;
}

.switch-title {
  font-weight: 600;
  font-size: 13px;
  color: #0f172a;
}

.switch-desc {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
}

.filter-summary {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 14px;
  background: #f1f5f9;
  color: #334155;
  font-size: 13px;
}

.filter-summary span {
  color: #1677ff;
  font-size: 20px;
  font-weight: 700;
}

.helper-card {
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(17, 31, 65, 0.08);
  margin-top: 16px;
}

.helper-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 14px 0;
}

.helper-item {
  text-align: center;
  padding: 14px 8px;
  border-radius: 14px;
  background: #f8fafc;
}

.helper-item strong {
  display: block;
  font-size: 24px;
  color: #1677ff;
  font-weight: 700;
}

.helper-item span {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

.helper-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.recent-card {
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(17, 31, 65, 0.08);
  margin-top: 16px;
}

.mini-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
}

.mini-job {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f8fafc;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
  width: 100%;
}

.mini-job:hover {
  background: #e8f0fe;
}

.mini-job strong {
  font-size: 13px;
  color: #1e293b;
  font-weight: 600;
}

.mini-job span {
  font-size: 12px;
  color: #94a3b8;
}

.toolbar-card {
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(17, 31, 65, 0.08);
  margin-bottom: 4px;
}

.toolbar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.toolbar-title {
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
}

.toolbar-desc {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}

.toolbar-stats {
  display: flex;
  gap: 14px;
  font-size: 13px;
  color: #64748b;
  flex-shrink: 0;
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.active-filter-chip {
  padding: 5px 12px;
  border-radius: 999px;
  background: #e6f4ff;
  color: #1677ff;
  border: 1px solid #91caff;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.active-filter-chip:hover {
  background: #bae0ff;
}

.job-card {
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 50px rgba(22, 119, 255, 0.15);
}

.job-card-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.job-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.job-title-row h3 {
  margin: 0;
  color: #111827;
  font-size: 20px;
}

.job-meta {
  margin-top: 6px;
  color: #64748b;
  font-size: 13px;
}

.job-salary {
  color: #1677ff;
  font-size: 22px;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.job-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  color: #475569;
  font-size: 12px;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #e2e8f0;
  color: #94a3b8;
  font-size: 12px;
}

.job-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.pagination-bar {
  display: flex;
  justify-content: center;
  margin-top: 28px;
}

.drawer-title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.drawer-subtitle {
  color: #64748b;
  font-size: 13px;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.detail-salary {
  color: #1677ff;
  font-size: 30px;
  font-weight: 700;
}

.detail-buttons {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-inline-card {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: #f8fafc;
}

.detail-inline-item {
  text-align: center;
}

.detail-inline-item strong {
  display: block;
  font-size: 18px;
  color: #1677ff;
  font-weight: 700;
}

.detail-inline-item span {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

.detail-block {
  padding: 16px;
  border-radius: 16px;
  background: #f8fafc;
}

.detail-heading {
  margin-bottom: 10px;
  color: #0f172a;
  font-size: 15px;
  font-weight: 700;
}

.detail-block ul {
  padding-left: 18px;
  margin: 0;
  color: #475569;
  line-height: 1.9;
  font-size: 13px;
}

.detail-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 1100px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  .filter-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .filter-card {
    grid-column: 1 / -1;
  }
  .helper-card,
  .recent-card {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    grid-template-columns: 1fr;
    border-radius: 22px;
  }
  .hero-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .scene-grid {
    grid-template-columns: 1fr;
  }
  .filter-panel {
    grid-template-columns: 1fr;
  }
  .job-card-top,
  .job-footer {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .metric-card {
    padding: 16px 12px;
  }
  .hero-panel {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
