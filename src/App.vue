<template>
  <a-layout class="app-shell">
    <a-layout-header class="app-header" :class="{ scrolled: isScrolled }">
      <div class="header-inner">
        <div class="app-brand" @click="$router.push('/')">
          <div class="brand-mark">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="2" width="8" height="8" rx="2" fill="white" opacity="0.9"/>
              <rect x="12" y="2" width="8" height="8" rx="2" fill="white" opacity="0.6"/>
              <rect x="2" y="12" width="8" height="8" rx="2" fill="white" opacity="0.6"/>
              <rect x="12" y="12" width="8" height="8" rx="2" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <div class="brand-text">
            <div class="brand-title">智聘云台</div>
            <div class="brand-subtitle">智能招聘管理系统</div>
          </div>
        </div>

        <nav class="app-nav" :class="{ 'nav-open': mobileMenuOpen }">
          <div class="nav-overlay" @click="mobileMenuOpen = false" />
          <div class="nav-panel">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="app-nav-item"
              :class="{ active: $route.path === item.path }"
              @click="mobileMenuOpen = false"
            >
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-label">{{ item.label }}</span>
              <span v-if="$route.path === item.path" class="nav-dot" />
            </router-link>
          </div>
        </nav>

        <div class="app-actions">
          <a-input-search
            v-model="headerSearch"
            placeholder="搜索职位 / 企业 / 城市"
            class="header-search"
            @search="goSearch"
            @pressEnter="goSearch"
          />
          <a-button type="primary" shape="round" class="header-cta" @click="$router.push('/')">
            立即投递
          </a-button>
          <button class="hamburger" :class="{ open: mobileMenuOpen }" @click="mobileMenuOpen = !mobileMenuOpen">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </a-layout-header>

    <a-layout-content class="app-content">
      <router-view />
    </a-layout-content>

    <a-layout-footer class="app-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-name">智聘云台</span>
          <span class="footer-divider">·</span>
          <span class="footer-copy">PC / H5 一体化招聘解决方案</span>
        </div>
        <div class="footer-links">
          <span>关于我们</span>
          <span>隐私政策</span>
          <span>用户协议</span>
          <span>联系方式</span>
        </div>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      headerSearch: "",
      mobileMenuOpen: false,
      isScrolled: false,
      navItems: [
        { label: "招聘广场", path: "/", icon: "🎯" },
        { label: "企业专区", path: "/companies", icon: "🏢" },
        { label: "投递管理", path: "/delivery", icon: "📋" },
        { label: "数据大屏", path: "/dashboard", icon: "📊" }
      ]
    };
  },
  watch: {
    "$route.path"() {
      this.mobileMenuOpen = false;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    goSearch(keyword) {
      if (!keyword && !this.headerSearch) return;
      this.$router.push({
        path: "/",
        query: { keyword: keyword || this.headerSearch }
      });
    },
    onScroll() {
      this.isScrolled = window.scrollY > 10;
    }
  }
};
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f0f2f7;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0;
  height: auto;
  line-height: 1.2;
  background: rgba(8, 15, 40, 0.82);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: box-shadow 0.3s ease, background 0.3s ease;
}

.app-header.scrolled {
  background: rgba(8, 15, 40, 0.94);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 28px;
  height: 68px;
}

.app-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex-shrink: 0;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1677ff 0%, #4096ff 50%, #52c41a 100%);
  box-shadow: 0 4px 14px rgba(22, 119, 255, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.app-brand:hover .brand-mark {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 6px 20px rgba(22, 119, 255, 0.45);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.brand-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  letter-spacing: 0.3px;
  margin-top: 1px;
}

.app-nav {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  gap: 4px;
}

.nav-overlay {
  display: none;
}

.nav-panel {
  display: flex;
  align-items: center;
  gap: 2px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.app-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.22s ease;
  cursor: pointer;
}

.app-nav-item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.app-nav-item.active {
  color: #fff;
  background: rgba(22, 119, 255, 0.3);
  box-shadow: inset 0 0 0 1px rgba(22, 119, 255, 0.4);
}

.nav-icon {
  font-size: 15px;
  line-height: 1;
}

.nav-dot {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #1677ff;
  box-shadow: 0 0 6px #1677ff;
}

.app-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.header-search {
  width: 240px;
}

:deep(.header-search .ant-input-search .ant-input) {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
  color: #fff;
  border-radius: 10px;
  height: 36px;
}

:deep(.header-search .ant-input-search .ant-input::placeholder) {
  color: rgba(255, 255, 255, 0.4);
}

:deep(.header-search .ant-input-search .ant-input-affix-wrapper) {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 4px 12px;
  height: 36px;
}

:deep(.header-search .ant-input-search-button) {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
  border-radius: 0 10px 10px 0;
  height: 36px;
}

.header-cta {
  height: 36px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(22, 119, 255, 0.4);
  transition: all 0.2s ease;
}

.header-cta:hover {
  box-shadow: 0 6px 20px rgba(22, 119, 255, 0.5);
  transform: translateY(-1px);
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.hamburger:hover {
  background: rgba(255, 255, 255, 0.14);
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: #fff;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.app-content {
  min-height: calc(100vh - 68px - 72px);
}

.app-footer {
  background: rgba(8, 15, 40, 0.88);
  backdrop-filter: saturate(180%) blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 24px 28px;
}

.footer-inner {
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-name {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
  font-size: 15px;
}

.footer-divider {
  color: rgba(255, 255, 255, 0.3);
}

.footer-copy {
  color: rgba(255, 255, 255, 0.45);
  font-size: 13px;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links span {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.footer-links span:hover {
  color: rgba(255, 255, 255, 0.75);
}

@media (max-width: 1024px) {
  .header-search {
    width: 200px;
  }

  .brand-subtitle {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 16px;
    height: 60px;
  }

  .app-nav {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    justify-content: flex-start;
    pointer-events: none;
  }

  .app-nav.nav-open {
    pointer-events: all;
  }

  .nav-overlay {
    display: block;
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .app-nav.nav-open .nav-overlay {
    opacity: 1;
  }

  .nav-panel {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    background: #0a0f2e;
    border-radius: 0;
    border: none;
    width: 280px;
    max-width: 80vw;
    height: 100%;
    padding: 20px 16px;
    backdrop-filter: none;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
  }

  .app-nav.nav-open .nav-panel {
    transform: translateX(0);
  }

  .app-nav-item {
    width: 100%;
    padding: 14px 16px;
    font-size: 16px;
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.9);
    background: transparent;
  }

  .app-nav-item:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  .app-nav-item.active {
    background: rgba(22, 119, 255, 0.35);
    color: #fff;
    box-shadow: inset 0 0 0 1px rgba(22, 119, 255, 0.5);
  }

  .nav-dot {
    display: none;
  }

  .app-actions {
    gap: 8px;
  }

  .header-search {
    display: none;
  }

  .header-cta {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .app-content {
    min-height: calc(100vh - 60px - 80px);
  }

  .app-footer {
    padding: 20px 16px;
  }

  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 14px;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
  }
}
</style>
