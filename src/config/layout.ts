/** 布局配置 */
interface ILayoutSettings {
  /** 是否显示 Settings Panel */
  showSettings: boolean
  /** 是否显示标签栏 */
  showTagsView: boolean
  /** 是否显示侧边栏 Logo */
  showSidebarLogo: boolean
  /** 是否固定 Header */
  fixedHeader: boolean
  /** 是否显示消息通知 */
  showNotify: boolean
  /** 是否显示切换主题按钮 */
  showThemeSwitch: boolean
  /** 是否显示全屏按钮 */
  showScreenfull: boolean
}

const layoutSettings: ILayoutSettings = {
  showSettings: true,
  showTagsView: false,
  fixedHeader: true,
  showSidebarLogo: true,
  showNotify: false,
  showThemeSwitch: true,
  showScreenfull: true
}

export default layoutSettings
