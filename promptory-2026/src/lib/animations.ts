import { Variants } from 'framer-motion';
import { animation } from './tokens';

/**
 * 공통 애니메이션 variants
 * 컴포넌트별 중복 정의를 제거하고 일관된 애니메이션 제공
 */

// 페이드 인 애니메이션
export const fadeIn: Variants = {
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

// 페이드 인 + 업 애니메이션 (아래에서 위로)
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

// 페이드 인 + 스케일 애니메이션
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animation.duration.base,
      ease: animation.ease.out,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: animation.duration.fast,
      ease: animation.ease.in,
    },
  },
};

// 백드롭 애니메이션 (모달/다이얼로그용)
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

// 스태거 컨테이너
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animation.stagger.base,
      delayChildren: animation.stagger.fast,
    },
  },
};

// 스태거 아이템
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animation.duration.base,
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

// 스트리밍 인디케이터 도트 애니메이션
export const streamingDot = (index: number): Variants => ({
  animate: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: animation.duration.slow,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: index * animation.stagger.fast,
    },
  },
});

// 탭 하이라이트 애니메이션
export const tabHighlight: Variants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      duration: animation.duration.base,
      ease: animation.ease.out,
    },
  },
};

// 버튼 탭 애니메이션
export const buttonTap = {
  scale: 0.97,
  transition: {
    duration: animation.duration.fast,
  },
};

// 카드 호버 애니메이션
export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: animation.duration.base,
    ease: animation.ease.out,
  },
};
