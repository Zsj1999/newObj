<template>
  <div class="dashboard">
    <div class="dashboard-bg">
      <div class="bg-glow glow-1" />
      <div class="bg-glow glow-2" />
      <div class="bg-grid" />
    </div>

    <div class="dashboard-header">
      <div class="header-left">
        <div class="header-time">{{ currentTime }}</div>
        <div class="header-date">{{ currentDate }}</div>
      </div>
      <div class="header-title">
        <span class="title-cn">智聘云台 · 数据驾驶舱</span>
        <span class="title-en">INTELLIGENT RECRUITMENT DATA CENTER</span>
      </div>
      <div class="header-right">
        <div class="live-dot">
          <span class="dot-pulse" />
          <span>LIVE</span>
        </div>
      </div>
    </div>

    <div class="dashboard-body">
      <div class="row row-top">
        <div class="stat-card stat-primary">
          <div class="stat-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="8" width="6" height="18" rx="2" fill="rgba(255,255,255,0.3)"/>
              <rect x="11" y="4" width="6" height="22" rx="2" fill="rgba(255,255,255,0.5)"/>
              <rect x="20" y="0" width="6" height="26" rx="2" fill="rgba(255,255,255,0.8)"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ portalMetrics[0].value.toLocaleString() }}</div>
            <div class="stat-label">{{ portalMetrics[0].label }}</div>
            <div class="stat-trend up">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2L10 7H2L6 2Z" fill="#52c41a"/></svg>
              +12.5%
            </div>
          </div>
        </div>

        <div class="stat-card stat-success">
          <div class="stat-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="11" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
              <circle cx="14" cy="14" r="6" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
              <circle cx="14" cy="14" r="2" fill="rgba(255,255,255,0.9)"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ portalMetrics[1].value.toLocaleString() }}</div>
            <div class="stat-label">{{ portalMetrics[1].label }}</div>
            <div class="stat-trend up">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2L10 7H2L6 2Z" fill="#52c41a"/></svg>
              +8.3%
            </div>
          </div>
        </div>

        <div class="stat-card stat-info">
          <div class="stat-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 3L24 9V19L14 25L4 19V9L14 3Z" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"/>
              <path d="M14 3V25M4 9L24 19M24 9L4 19" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ portalMetrics[2].value.toLocaleString() }}</div>
            <div class="stat-label">{{ portalMetrics[2].label }}</div>
            <div class="stat-trend up">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2L10 7H2L6 2Z" fill="#52c41a"/></svg>
              +23.1%
            </div>
          </div>
        </div>

        <div class="stat-card stat-warning">
          <div class="stat-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4L25 22H3L14 4Z" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"/>
              <line x1="14" y1="11" x2="14" y2="17" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
              <circle cx="14" cy="20" r="1" fill="rgba(255,255,255,0.9)"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ portalMetrics[3].value.toLocaleString() }}</div>
            <div class="stat-label">{{ portalMetrics[3].label }}</div>
            <div class="stat-trend down">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 10L2 5H10L6 10Z" fill="#ff4d4f"/></svg>
              -5.2%
            </div>
          </div>
        </div>
      </div>

      <div class="row row-middle">
        <div class="panel panel-city">
          <div class="panel-header">
            <div class="panel-title">
              <span class="title-dot city-dot" />
              城市岗位分布
            </div>
            <div class="panel-subtitle">TOP 10 CITIES</div>
          </div>
          <div class="panel-body">
            <div v-for="(item, index) in cityStats" :key="item.city" class="bar-item">
              <div class="bar-label">
                <span class="bar-rank">{{ String(index + 1).padStart(2, "0") }}</span>
                <span class="bar-name">{{ item.city }}</span>
              </div>
              <div class="bar-track">
                <div
                  class="bar-fill"
                  :style="{ width: item.percent + '%', background: barGradient(index) }"
                >
                  <span class="bar-value">{{ item.count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-industry">
          <div class="panel-header">
            <div class="panel-title">
              <span class="title-dot industry-dot" />
              行业岗位分布
            </div>
            <div class="panel-subtitle">INDUSTRY DISTRIBUTION</div>
          </div>
          <div class="panel-body industry-grid">
            <div v-for="(item, index) in industryStats" :key="item.industry" class="industry-item">
              <div class="industry-outer">
                <div
                  class="industry-inner"
                  :style="{ '--pct': item.percent + '%', '--hue': 180 + index * 22 }"
                />
              </div>
              <div class="industry-label">{{ item.industry }}</div>
              <div class="industry-count">{{ item.count }}</div>
            </div>
          </div>
        </div>

        <div class="panel panel-salary">
          <div class="panel-header">
            <div class="panel-title">
              <span class="title-dot salary-dot" />
              薪资区间分布
            </div>
            <div class="panel-subtitle">SALARY RANGE</div>
          </div>
          <div class="panel-body salary-body">
            <div v-for="(item, index) in salaryStats" :key="item.range" class="salary-item">
              <div class="salary-info">
                <span class="salary-range">{{ item.range }}</span>
                <span class="salary-count">{{ item.count }} 个岗位</span>
              </div>
              <div class="salary-bar-track">
                <div
                  class="salary-bar-fill"
                  :style="{ width: item.percent + '%', opacity: 0.5 + index * 0.08 }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row row-bottom">
        <div class="panel panel-type">
          <div class="panel-header">
            <div class="panel-title">
              <span class="title-dot type-dot" />
              岗位类型分布
            </div>
            <div class="panel-subtitle">EMPLOYMENT TYPE</div>
          </div>
          <div class="panel-body type-body">
            <div v-for="(item, index) in typeStats" :key="item.type" class="type-item">
              <div class="type-ring" :style="{ '--idx': index, '--total': typeStats.length }">
                <div class="type-inner-circle">
                  <span class="type-pct">{{ item.percent.toFixed(1) }}%</span>
                </div>
              </div>
              <div class="type-info">
                <div class="type-name">{{ item.type }}</div>
                <div class="type-count">{{ item.count }} 个</div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-trend">
          <div class="panel-header">
            <div class="panel-title">
              <span class="title-dot trend-dot" />
              近30天新增趋势
            </div>
            <div class="panel-subtitle">30-DAY TREND</div>
          </div>
          <div class="panel-body trend-body">
            <div class="trend-chart">
              <div v-for="(item, index) in trendData" :key="index" class="trend-bar-group">
                <div
                  class="trend-bar"
                  :style="{ height: item.height + '%', background: index === trendData.length - 1 ? '#1677ff' : 'rgba(22,119,255,0.4)' }"
                />
                <span class="trend-label">{{ item.day }}</span>
              </div>
            </div>
            <div class="trend-summary">
              <div class="trend-stat">
                <span class="trend-val">{{ maxTrend }}</span>
                <span class="trend-key">最高单日</span>
              </div>
              <div class="trend-stat">
                <span class="trend-val">{{ avgTrend }}</span>
                <span class="trend-key">日均新增</span>
              </div>
              <div class="trend-stat">
                <span class="trend-val">{{ totalTrend }}</span>
                <span class="trend-key">总新增</span>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-status">
          <div class="panel-header">
            <div class="panel-title">
              <span class="title-dot status-dot" />
              投递流程状态
            </div>
            <div class="panel-subtitle">APPLICATION PIPELINE</div>
          </div>
          <div class="panel-body status-body">
            <div v-for="(item, index) in deliveryStats" :key="item.status" class="status-item">
              <div class="status-left">
                <div class="status-dot-connector">
                  <div class="status-node" :style="{ background: statusColors[index] }" />
                  <div v-if="index < deliveryStats.length - 1" class="status-line" />
                </div>
              </div>
              <div class="status-content">
                <div class="status-name">{{ item.status }}</div>
                <div class="status-bar-track">
                  <div
                    class="status-bar-fill"
                    :style="{ width: item.percent + '%', background: statusColors[index] }"
                  />
                </div>
              </div>
              <div class="status-count">{{ item.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jobs, companies, applications, portalMetrics, cityGroups } from "../mock/jobs";

export default {
  name: "DataDashboard",
  data() {
    return {
      jobs,
      companies,
      applications,
      portalMetrics,
      currentTime: "",
      currentDate: "",
      statusColors: ["#1677ff", "#52c41a", "#faad14", "#722ed1", "#eb2f96", "#fa8c16", "#13c2c2", "#2f54eb", "#a0d911"]
    };
  },
  computed: {
    cityStats() {
      const map = {};
      this.jobs.forEach((j) => {
        map[j.city] = (map[j.city] || 0) + 1;
      });
      const sorted = Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      const max = sorted[0]?.[1] || 1;
      return sorted.map(([city, count]) => ({
        city,
        count,
        percent: Math.round((count / max) * 100)
      }));
    },
    industryStats() {
      const map = {};
      this.jobs.forEach((j) => {
        map[j.industry] = (map[j.industry] || 0) + 1;
      });
      const sorted = Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
      const max = sorted[0]?.[1] || 1;
      return sorted.map(([industry, count]) => ({
        industry,
        count,
        percent: Math.round((count / max) * 100)
      }));
    },
    salaryStats() {
      const ranges = [
        { label: "8k以下", min: 0, max: 8 },
        { label: "8-12k", min: 8, max: 12 },
        { label: "12-18k", min: 12, max: 18 },
        { label: "18-25k", min: 18, max: 25 },
        { label: "25-35k", min: 25, max: 35 },
        { label: "35k以上", min: 35, max: 999 }
      ];
      const counts = ranges.map((r) => ({
        range: r.label,
        count: this.jobs.filter((j) => j.salaryMin >= r.min && j.salaryMin < r.max).length
      }));
      const max = Math.max(...counts.map((c) => c.count), 1);
      return counts.map((c) => ({
        ...c,
        percent: Math.round((c.count / max) * 100)
      }));
    },
    typeStats() {
      const map = {};
      this.jobs.forEach((j) => {
        map[j.employmentType] = (map[j.employmentType] || 0) + 1;
      });
      const total = this.jobs.length;
      return Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .map(([type, count]) => ({
          type,
          count,
          percent: (count / total) * 100
        }));
    },
    deliveryStats() {
      const map = {};
      this.applications.forEach((a) => {
        map[a.status] = (map[a.status] || 0) + 1;
      });
      const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
      const max = sorted[0]?.[1] || 1;
      return sorted.map(([status, count]) => ({
        status,
        count,
        percent: Math.round((count / max) * 100)
      }));
    },
    trendData() {
      return Array.from({ length: 30 }, (_, i) => ({
        day: String((i + 1) % 5 === 0 ? (i + 1) + "日" : ""),
        height: 20 + Math.abs(Math.sin(i * 0.4) * 60 + (i * 7 % 30))
      }));
    },
    maxTrend() {
      return Math.max(...this.trendData.map((t) => t.height)).toFixed(0);
    },
    avgTrend() {
      return (this.trendData.reduce((s, t) => s + t.height, 0) / this.trendData.length).toFixed(0);
    },
    totalTrend() {
      return this.trendData.reduce((s, t) => s + Math.round(t.height * 0.8), 0);
    }
  },
  mounted() {
    this.updateTime();
    this._timer = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this._timer);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      this.currentDate = now.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", weekday: "long" });
    },
    barGradient(index) {
      const colors = [
        "linear-gradient(90deg, #1677ff, #52c41a)",
        "linear-gradient(90deg, #1677ff, #13c2c2)",
        "linear-gradient(90deg, #1677ff, #722ed1)",
        "linear-gradient(90deg, #1677ff, #eb2f96)",
        "linear-gradient(90deg, #1677ff, #fa8c16)",
        "linear-gradient(90deg, #1677ff, #faad14)",
        "linear-gradient(90deg, #1677ff, #52c41a)",
        "linear-gradient(90deg, #1677ff, #13c2c2)",
        "linear-gradient(90deg, #1677ff, #722ed1)",
        "linear-gradient(90deg, #1677ff, #eb2f96)"
      ];
      return colors[index % colors.length];
    }
  }
};
</script>

<style scoped>
.dashboard {
  position: relative;
  min-height: calc(100vh - 68px - 72px);
  padding: 20px 24px;
  overflow: hidden;
  background: #0a0f2e;
}

.dashboard-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}

.glow-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  left: -100px;
  background: radial-gradient(circle, #1677ff, transparent);
}

.glow-2 {
  width: 500px;
  height: 500px;
  bottom: -150px;
  right: -100px;
  background: radial-gradient(circle, #722ed1, transparent);
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(22, 119, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22, 119, 255, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}

.dashboard-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 20px 32px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
}

.header-left,
.header-right {
  min-width: 200px;
}

.header-right {
  display: flex;
  justify-content: flex-end;
}

.header-time {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  font-family: "Courier New", monospace;
  letter-spacing: 2px;
}

.header-date {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 4px;
}

.header-title {
  text-align: center;
}

.title-cn {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 6px;
}

.title-en {
  display: block;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 4px;
  margin-top: 6px;
}

.live-dot {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 700;
  letter-spacing: 2px;
}

.dot-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #52c41a;
  box-shadow: 0 0 8px #52c41a;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.4); }
}

.dashboard-body {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: grid;
  gap: 16px;
}

.row-top {
  grid-template-columns: repeat(4, 1fr);
}

.row-middle {
  grid-template-columns: 2fr 1.5fr 2fr;
}

.row-bottom {
  grid-template-columns: 1fr 1.5fr 2fr;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 22px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.stat-primary { background: linear-gradient(135deg, rgba(22, 119, 255, 0.4), rgba(22, 119, 255, 0.15)); border-color: rgba(22, 119, 255, 0.3); }
.stat-success { background: linear-gradient(135deg, rgba(82, 196, 26, 0.4), rgba(82, 196, 26, 0.15)); border-color: rgba(82, 196, 26, 0.3); }
.stat-info { background: linear-gradient(135deg, rgba(19, 194, 194, 0.4), rgba(19, 194, 194, 0.15)); border-color: rgba(19, 194, 194, 0.3); }
.stat-warning { background: linear-gradient(135deg, rgba(250, 173, 20, 0.4), rgba(250, 173, 20, 0.15)); border-color: rgba(250, 173, 20, 0.3); }

.stat-icon {
  flex-shrink: 0;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 4px;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 6px;
}

.stat-trend.up { color: #52c41a; }
.stat-trend.down { color: #ff4d4f; }

.panel {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}

.title-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.city-dot { background: #1677ff; box-shadow: 0 0 8px #1677ff; }
.industry-dot { background: #722ed1; box-shadow: 0 0 8px #722ed1; }
.salary-dot { background: #faad14; box-shadow: 0 0 8px #faad14; }
.type-dot { background: #52c41a; box-shadow: 0 0 8px #52c41a; }
.trend-dot { background: #eb2f96; box-shadow: 0 0 8px #eb2f96; }
.status-dot { background: #13c2c2; box-shadow: 0 0 8px #13c2c2; }

.panel-subtitle {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 2px;
}

.panel-body {
  padding: 18px 22px;
}

.bar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.bar-item:last-child {
  margin-bottom: 0;
}

.bar-label {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
}

.bar-rank {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  font-family: "Courier New", monospace;
}

.bar-name {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
}

.bar-track {
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.bar-fill {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  border-radius: 999px;
  transition: width 1s ease;
  min-width: 40px;
}

.bar-value {
  font-size: 11px;
  color: #fff;
  font-weight: 600;
  padding-right: 6px;
  white-space: nowrap;
}

.industry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.industry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.industry-outer {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: conic-gradient(
    hsl(calc(180 + var(--idx, 0) * 22), 80%, 60%) var(--pct, 0%),
    rgba(255, 255, 255, 0.06) var(--pct, 0%)
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.industry-inner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(10, 15, 46, 0.9);
}

.industry-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.industry-count {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
}

.salary-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.salary-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.salary-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.salary-range {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.salary-count {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
}

.salary-bar-track {
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.salary-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #faad14, #1677ff);
  transition: width 1s ease;
}

.type-body {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.type-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: calc(50% - 8px);
}

.type-ring {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: conic-gradient(
    hsl(calc(140 + var(--idx, 0) * 40), 80%, 55%) calc(var(--pct, 0) * 1%),
    rgba(255, 255, 255, 0.06) calc(var(--pct, 0) * 1%)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.type-inner-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(10, 15, 46, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-pct {
  font-size: 10px;
  font-weight: 700;
  color: #fff;
}

.type-name {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.type-count {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

.trend-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.trend-chart {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 140px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.trend-bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  gap: 4px;
}

.trend-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  transition: height 0.8s ease;
  min-height: 4px;
}

.trend-label {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  transform: rotate(-45deg);
  transform-origin: top left;
  margin-top: 2px;
}

.trend-summary {
  display: flex;
  justify-content: space-around;
  padding-top: 8px;
}

.trend-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.trend-val {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
}

.trend-key {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.status-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-left {
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-dot-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-node {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 8px currentColor;
}

.status-line {
  width: 2px;
  height: 20px;
  background: rgba(255, 255, 255, 0.08);
}

.status-content {
  flex: 1;
}

.status-name {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}

.status-bar-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.status-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 1s ease;
}

.status-count {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  min-width: 36px;
  text-align: right;
}

@media (max-width: 1200px) {
  .row-top {
    grid-template-columns: repeat(2, 1fr);
  }
  .row-middle,
  .row-bottom {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 12px 14px;
  }
  .dashboard-header {
    flex-direction: column;
    gap: 14px;
    padding: 16px;
    text-align: center;
  }
  .header-left,
  .header-right {
    display: none;
  }
  .row-top {
    grid-template-columns: 1fr 1fr;
  }
  .stat-card {
    padding: 16px 14px;
  }
  .stat-value {
    font-size: 24px;
  }
  .industry-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .type-item {
    width: 100%;
  }
  .title-cn {
    font-size: 18px;
    letter-spacing: 3px;
  }
}
</style>
