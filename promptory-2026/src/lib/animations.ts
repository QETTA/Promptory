import { Variants } from 'framer-motion';
import { animation } from './tokens';

/**
 * 공통 애니메이션 variants
 * 컴포넌트별 중복 정의를 제거하고 일관된 애니메이션 제공
 */

// 페이드 인 + 업 애니메이션 (아래에서 위로) - 주요 진입 애니메이션
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animation.duration.base,
      ease: animation.ease.out,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: animation.duration.fast,
      ease: animation.ease.in,
    },
  },
};

// 백드롭 애니메이션 (모달/다이얼로그용) - 5회 사용
export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: animation.duration.base,
      ease: animation.ease.out,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: animation.duration.fast,
      ease: animation.ease.in,
    },
  },
};

// 패널/모달 애니메이션
export const panel: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: animation.duration.base,
      ease: animation.ease.out,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: animation.duration.fast,
      ease: animation.ease.in,
    },
  },
};

// 하단 시트 애니메이션 (모바일용)
export const bottomSheet: Variants = {
  hidden: {
    y: '100%',
    transition: {
      duration: animation.duration.base,
      ease: animation.ease.in,
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: animation.duration.slow,
      ease: animation.ease.out,
    },
  },
};

// 스피닝 애니메이션 (로딩 아이콘용)
export const spin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// 버튼 탭 애니메이션 - 6회 사용 (주요 인터랙션)
export const buttonTap = {
  scale: 0.97,
  transition: {
    duration: animation.duration.fast,
  },
};

// 패널 애니메이션 - 7회 사용 (모달/카드 진입)
// panel 애니메이션은 컴포넌트에서 직접 whileHover 사용 권장
