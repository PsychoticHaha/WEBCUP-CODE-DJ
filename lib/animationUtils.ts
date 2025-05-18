// Utility functions for animations and transitions

/**
 * Creates cubic bezier easing functions for smoother animations
 */
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
};

/**
 * Animation variants for different UI elements
 */
export const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: easings.easeOut }
    }
  },
  
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: easings.easeOut }
    }
  },
  
  slideInFromBottom: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: easings.easeOut }
    }
  },
  
  slideInFromRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: easings.easeOut }
    }
  },
  
  buttonTap: {
    tap: { scale: 0.95 }
  },
  
  buttonHover: {
    hover: { scale: 1.05 }
  }
};

/**
 * Staggered animation for lists of items
 */
export const staggerChildren = (staggerTime = 0.05) => ({
  visible: {
    transition: {
      staggerChildren: staggerTime
    }
  }
});

/**
 * Utility function to create transition objects
 */
export const createTransition = (
  duration = 0.3, 
  easing = easings.easeInOut, 
  delay = 0,
  properties = ['all']
) => {
  return {
    duration,
    ease: easing,
    delay,
    properties
  };
};