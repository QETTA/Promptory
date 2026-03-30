/**
 * Clipboard Utilities
 * 중앙 집중식 클립보드 관리 - 코드 중복 및 병목 방지
 */

/**
 * Fallback copy method using document.execCommand
 * for non-secure contexts (localhost without HTTPS, etc.)
 * Bottleneck Fix: Single implementation shared across components
 */
export function fallbackCopy(textToCopy: string): boolean {
  const textArea = document.createElement("textarea");
  textArea.value = textToCopy;
  textArea.style.cssText = `
    position: fixed;
    left: -9999px;
    top: -9999px;
    opacity: 0;
    pointer-events: none;
  `;
  textArea.setAttribute("readonly", "");
  textArea.setAttribute("aria-hidden", "true");
  
  document.body.appendChild(textArea);
  
  try {
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    document.body.removeChild(textArea);
    console.error("Fallback copy failed:", err);
    return false;
  }
}

/**
 * Modern clipboard API with automatic fallback
 * Bottleneck Fix: Unified async clipboard operations
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) {
    throw new Error("No text provided to copy");
  }

  try {
    // Try modern clipboard API first (secure contexts only)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for non-secure contexts
    const success = fallbackCopy(text);
    if (!success) {
      throw new Error("Copy operation failed");
    }
    return true;
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    throw err instanceof Error ? err : new Error("Failed to copy to clipboard");
  }
}

/**
 * Batch copy multiple items with error boundaries
 * Bottleneck Fix: Prevents multiple sequential clipboard operations
 */
export async function copyBatch(items: string[], separator = "\n"): Promise<{
  success: boolean;
  copiedCount: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let copiedCount = 0;
  
  // Single clipboard operation vs multiple
  const combined = items.filter(item => {
    if (!item || typeof item !== "string") {
      errors.push(`Invalid item: ${item}`);
      return false;
    }
    return true;
  }).join(separator);
  
  if (!combined) {
    return { success: false, copiedCount: 0, errors: ["No valid items to copy"] };
  }
  
  try {
    await copyToClipboard(combined);
    copiedCount = items.length - errors.length;
    return { success: true, copiedCount, errors };
  } catch (err) {
    return { 
      success: false, 
      copiedCount: 0, 
      errors: [...errors, err instanceof Error ? err.message : "Unknown error"] 
    };
  }
}

/**
 * Check if clipboard API is available
 */
export function isClipboardAvailable(): boolean {
  return !!(navigator.clipboard && window.isSecureContext);
}

/**
 * Check if fallback copy method is available
 */
export function isFallbackCopyAvailable(): boolean {
  return typeof document !== "undefined" && !!document.execCommand;
}
