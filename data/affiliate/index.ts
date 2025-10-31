import { studying } from './banners/studying'
import { onsuku } from './banners/onsuku'
// 今後追加分もここに import

export const affiliateBanners = {
  studying,
  onsuku,
  // 例: smart, sanko, fpJapan, など...
}

export type AffiliateBannerKeys = keyof typeof affiliateBanners
