<template>
  <div class="page">
    <a-card :bordered="false" class="banner-card">
      <div class="banner-copy">
        <a-tag color="purple">企业品牌馆</a-tag>
        <h2>集中展示优质雇主，强化招聘品牌感知</h2>
        <p>
          在保留原有展示风格基础上，新增企业检索、行业城市筛选、明星雇主推荐与快速查看岗位入口，提升用户找企业效率。
        </p>
      </div>
      <div class="banner-stats">
        <div class="stat-item">
          <div class="stat-value">{{ companies.length }}</div>
          <div class="stat-label">合作企业</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ totalOpenJobs }}</div>
          <div class="stat-label">开放岗位</div>
        </div>
      </div>
    </a-card>

    <a-card :bordered="false" class="filter-card">
      <div class="filter-toolbar">
        <a-input-search
          v-model="keyword"
          allow-clear
          placeholder="搜索企业名 / 行业 / 城市"
          class="toolbar-search"
        />
        <a-select v-model="industry" class="toolbar-select">
          <a-select-option value="全部行业">全部行业</a-select-option>
          <a-select-option v-for="item in industries" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
        <a-select v-model="city" class="toolbar-select">
          <a-select-option value="全部城市">全部城市</a-select-option>
          <a-select-option v-for="item in cities" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </div>
      <div class="filter-summary">
        当前展示 {{ filteredCompanies.length }} 家企业，优先推荐评分高、岗位多、覆盖热门城市的雇主。
      </div>
    </a-card>

    <div class="section-title">明星雇主</div>
    <div class="featured-grid">
      <a-card
        v-for="company in featuredCompanies"
        :key="company.id"
        :bordered="false"
        class="featured-card"
      >
        <div class="featured-top">
          <div>
            <strong>{{ company.name }}</strong>
            <span>{{ company.industry }} · {{ company.city }}</span>
          </div>
          <b>{{ company.rating }}</b>
        </div>
        <div class="featured-desc">{{ company.summary }}</div>
        <div class="featured-tags">
          <a-tag color="blue">{{ company.financing }}</a-tag>
          <a-tag color="green">{{ company.openJobs }} 个岗位</a-tag>
          <a-tag>{{ company.scale }}</a-tag>
        </div>
        <a-button type="primary" ghost @click="jumpToCompanyJobs(company)">查看岗位</a-button>
      </a-card>
    </div>

    <a-row :gutter="[16, 16]">
      <a-col v-for="company in filteredCompanies" :key="company.id" :xs="24" :md="12" :xl="8">
        <a-card :bordered="false" class="company-card">
          <div class="company-head">
            <div class="company-mark">{{ company.name.slice(0, 2) }}</div>
            <div>
              <h3>{{ company.name }}</h3>
              <div class="company-meta">{{ company.industry }} · {{ company.city }} · {{ company.district }}</div>
            </div>
          </div>
          <p class="company-summary">{{ company.summary }}</p>
          <div class="company-data">
            <div>
              <strong>{{ company.openJobs }}</strong>
              <span>在招岗位</span>
            </div>
            <div>
              <strong>{{ company.rating }}</strong>
              <span>雇主评分</span>
            </div>
            <div>
              <strong>{{ company.financing }}</strong>
              <span>融资阶段</span>
            </div>
          </div>
          <div class="company-tags">
            <a-tag>{{ company.scale }}</a-tag>
            <a-tag color="blue">{{ company.financing }}</a-tag>
            <a-tag color="green">{{ company.industry }}</a-tag>
          </div>
          <div class="company-benefits">
            <span>反馈更快</span>
            <span>简历更聚焦</span>
            <span>品牌展示强</span>
          </div>
          <a-button type="primary" ghost block @click="jumpToCompanyJobs(company)">查看该企业岗位</a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { companies } from "../mock/jobs";

export default {
  name: "CompanyHub",
  data() {
    return {
      companies,
      keyword: "",
      industry: "全部行业",
      city: "全部城市"
    };
  },
  computed: {
    totalOpenJobs() {
      return this.companies.reduce((sum, item) => sum + item.openJobs, 0);
    },
    industries() {
      return [...new Set(this.companies.map((item) => item.industry))];
    },
    cities() {
      return [...new Set(this.companies.map((item) => item.city))];
    },
    featuredCompanies() {
      return this.companies
        .slice()
        .sort((a, b) => b.rating + b.openJobs / 50 - (a.rating + a.openJobs / 50))
        .slice(0, 3);
    },
    filteredCompanies() {
      const keyword = this.keyword.trim().toLowerCase();
      return this.companies.filter((company) => {
        const matchesKeyword =
          !keyword ||
          [company.name, company.industry, company.city]
            .join(" ")
            .toLowerCase()
            .includes(keyword);
        const matchesIndustry = this.industry === "全部行业" || company.industry === this.industry;
        const matchesCity = this.city === "全部城市" || company.city === this.city;
        return matchesKeyword && matchesIndustry && matchesCity;
      });
    }
  },
  methods: {
    jumpToCompanyJobs(company) {
      this.$router.push({
        path: "/",
        query: {
          keyword: company.name
        }
      });
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

.section-title {
  color: #0f172a;
  font-size: 20px;
  font-weight: 700;
}

.banner-card,
.company-card,
.filter-card,
.featured-card {
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
}

.banner-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: linear-gradient(135deg, #25124d 0%, #512da8 100%);
  color: #fff;
}

.banner-copy h2 {
  margin: 18px 0 10px;
  color: #fff;
  font-size: clamp(28px, 4vw, 40px);
}

.banner-copy p {
  max-width: 700px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 15px;
  line-height: 1.8;
}

.banner-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  min-width: 140px;
  padding: 22px 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.14);
  text-align: center;
}

.stat-value {
  font-size: 34px;
  font-weight: 700;
}

.stat-label {
  color: rgba(255, 255, 255, 0.72);
}

.filter-toolbar {
  display: flex;
  gap: 16px;
}

.toolbar-search {
  flex: 1;
}

.toolbar-select {
  width: 180px;
}

.filter-summary {
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8fafc;
  color: #475569;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.featured-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}

.featured-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.featured-top strong {
  display: block;
  color: #0f172a;
  font-size: 20px;
}

.featured-top span {
  display: block;
  margin-top: 8px;
  color: #64748b;
}

.featured-top b {
  color: #7c3aed;
  font-size: 28px;
}

.featured-desc {
  min-height: 72px;
  margin: 18px 0;
  color: #475569;
  line-height: 1.8;
}

.featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.company-card {
  height: 100%;
}

.company-head {
  display: flex;
  align-items: center;
  gap: 16px;
}

.company-head h3 {
  margin: 0;
  font-size: 22px;
  color: #0f172a;
}

.company-mark {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, #1677ff, #5b8cff);
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}

.company-meta {
  color: #64748b;
}

.company-summary {
  min-height: 72px;
  margin: 18px 0;
  color: #475569;
  line-height: 1.8;
}

.company-data {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 16px;
  border-radius: 18px;
  background: #f8fafc;
}

.company-data strong {
  display: block;
  color: #1677ff;
  font-size: 24px;
}

.company-data span {
  color: #64748b;
  font-size: 13px;
}

.company-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0;
}

.company-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
  color: #475569;
}

.company-benefits span {
  padding: 8px 12px;
  border-radius: 999px;
  background: #f8fafc;
}

@media (max-width: 900px) {
  .banner-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .banner-stats {
    width: 100%;
  }

  .filter-toolbar,
  .featured-grid {
    grid-template-columns: 1fr;
    display: grid;
  }
}

@media (max-width: 480px) {
  .banner-stats,
  .company-data {
    grid-template-columns: 1fr;
    display: grid;
  }

  .stat-item {
    min-width: auto;
  }

  .toolbar-select {
    width: 100%;
  }
}
</style>
