export function getFriendlyAuthErrorMessage(message: string) {
  const normalized = message.trim().toLowerCase();

  if (normalized.includes("email not confirmed")) {
    return "이메일 인증을 완료한 뒤 로그인해 주세요.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호를 다시 확인해 주세요.";
  }

  if (normalized.includes("user already registered")) {
    return "이미 가입된 이메일입니다. 바로 로그인해 주세요.";
  }

  if (normalized.includes("password should be at least")) {
    return "비밀번호는 8자 이상이어야 합니다.";
  }

  return message;
}

export function getAuthQueryErrorMessage(code: string | null) {
  switch (code) {
    case "confirm_failed":
      return "이메일 인증 링크가 만료되었거나 이미 사용되었습니다. 다시 시도해 주세요.";
    case "invalid_link":
      return "인증 링크를 다시 확인해 주세요.";
    case "setup":
      return "인증을 처리하려면 /setup에서 Supabase 연결을 먼저 확인해 주세요.";
    default:
      return null;
  }
}
