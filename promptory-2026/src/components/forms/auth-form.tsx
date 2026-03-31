"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast-provider";
import { getAuthQueryErrorMessage } from "@/lib/auth-feedback";
import { buildLoginHref, buildSignupHref } from "@/lib/auth-redirect";
import { loginSchema, signupSchema, type LoginInput, type SignupInput } from "@/lib/validations/auth";

interface AuthFormProps {
  mode: "login" | "signup";
  redirectTo?: string;
}

function getDefaultRedirect() {
  return "/optimize";
}

export function AuthForm({ mode, redirectTo }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const lastQueryErrorRef = useRef<string | null>(null);
  const schema = mode === "login" ? loginSchema : signupSchema;
  const destination = redirectTo ?? getDefaultRedirect();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<LoginInput | SignupInput>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const authError = searchParams.get("authError");

    if (!authError || lastQueryErrorRef.current === authError) {
      return;
    }

    lastQueryErrorRef.current = authError;
    const message = getAuthQueryErrorMessage(authError);

    if (!message) {
      return;
    }

    setServerError(message);
    toast({
      description: message,
      title: "인증을 완료하지 못했습니다.",
      tone: "error",
    });
  }, [searchParams, toast]);

  async function parsePayload(response: Response) {
    try {
      const raw = await response.text();
      return raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }

  async function onSubmit(values: LoginInput | SignupInput) {
    setServerError(null);

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, redirectTo: destination }),
    });

    const payload = (await parsePayload(response)) as {
      email?: string;
      error?: string;
      ok?: boolean;
      requiresEmailVerification?: boolean;
    };

    if (!response.ok || !payload.ok) {
      const message = payload.error ?? "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";
      setServerError(message);
      toast({
        description: message,
        title: mode === "login" ? "로그인에 실패했습니다." : "회원가입에 실패했습니다.",
        tone: "error",
      });
      return;
    }

    if (payload.requiresEmailVerification) {
      const email = payload.email ?? values.email;

      setPendingVerificationEmail(email);
      toast({
        description: `${email}로 인증 메일을 보냈습니다. 메일의 링크를 열면 바로 로그인됩니다.`,
        title: "이메일 인증이 필요합니다.",
        tone: "success",
      });
      return;
    }

    router.push(destination);
    router.refresh();
  }

  async function resendVerification() {
    if (!pendingVerificationEmail) {
      return;
    }

    setServerError(null);
    setIsResendingVerification(true);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: pendingVerificationEmail,
          redirectTo: destination,
        }),
      });
      const payload = (await parsePayload(response)) as { error?: string; ok?: boolean };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "인증 메일을 다시 보내지 못했습니다.");
      }

      toast({
        description: `${pendingVerificationEmail}로 인증 메일을 다시 보냈습니다.`,
        title: "인증 메일을 다시 보냈습니다.",
        tone: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "인증 메일을 다시 보내지 못했습니다. 잠시 후 다시 시도해 주세요.";
      setServerError(message);
      toast({
        description: message,
        title: "인증 메일 재전송에 실패했습니다.",
        tone: "error",
      });
    } finally {
      setIsResendingVerification(false);
    }
  }

  if (mode === "signup" && pendingVerificationEmail) {
    return (
      <Card variant="strong" className="mx-auto w-full max-w-md rounded-[1.75rem] p-6 sm:p-7">
        <p className="section-kicker text-[var(--slate-500)]">Email verification</p>
        <h2 className="mt-2 text-[1.9rem] font-semibold tracking-tight text-[var(--slate-950)]">
          이메일 인증을
          <br />
          완료해 주세요
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">
          <span className="font-semibold text-[var(--slate-900)]">{pendingVerificationEmail}</span>로
          인증 메일을 보냈습니다. 메일의 링크를 열면 24시간 세션으로 바로 로그인됩니다.
        </p>

        {serverError ? <p className="mt-5 text-sm text-rose-600">{serverError}</p> : null}

        <div className="mt-7 flex flex-col gap-3">
          <Button type="button" size="lg" onClick={resendVerification} disabled={isResendingVerification}>
            {isResendingVerification ? "재전송 중..." : "인증 메일 다시 보내기"}
          </Button>
          <Link href={buildLoginHref(destination)} className="text-center text-sm font-semibold text-[var(--brand-700)]">
            로그인 화면으로 이동
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="strong" className="mx-auto w-full max-w-md rounded-[1.75rem] p-6 sm:p-7">
      <p className="section-kicker text-[var(--slate-500)]">
        {mode === "login" ? "로그인" : "계정 만들기"}
      </p>
      <h2 className="mt-2 text-[1.9rem] font-semibold tracking-tight text-[var(--slate-950)]">
        {mode === "login" ? "내 작업으로 돌아가기" : "진단과 작업공간 열기"}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">
        {mode === "login"
          ? "저장한 진단, 주문, 라이브러리, 제작실처럼 다시 들어가야 하는 작업을 한 계정에서 이어갈 수 있습니다."
          : "계정을 만들면 인증 메일로 안전하게 시작하고, URL 진단 저장과 결과 전달 흐름을 같은 계정으로 관리할 수 있습니다."}
      </p>

      <div className="mt-5 rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3 text-sm leading-6 text-[var(--slate-700)]">
        {mode === "login"
          ? "빠르게 확인하려면 로그인 후 저장한 진단, 주문 상태, 라이브러리, 제작실 작업으로 바로 이동하면 됩니다."
          : "회원가입 뒤 메일 인증을 마치면 채널 진단 저장, 주문 확인, 라이브러리 복귀까지 같은 흐름으로 이어집니다."}
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {mode === "signup" ? (
          <div>
            <Label htmlFor="displayName">이름 또는 활동명</Label>
            <Input id="displayName" {...register("displayName" as const)} />
            {"displayName" in errors && errors.displayName ? (
              <p className="mt-2 text-xs text-rose-600">이름은 2자 이상 입력해 주세요.</p>
            ) : null}
          </div>
        ) : null}

        <div>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email ? (
            <p className="mt-2 text-xs text-rose-600">올바른 이메일 주소를 입력해 주세요.</p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            {...register("password")}
          />
          {errors.password ? (
            <p className="mt-2 text-xs text-rose-600">비밀번호는 8자 이상이어야 합니다.</p>
          ) : null}
        </div>

        {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

        <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "처리 중..." : mode === "login" ? "로그인" : "회원가입"}
        </Button>
      </form>

      <div className="mt-6 border-t border-[var(--line)] pt-5 text-sm text-[var(--slate-500)]">
        {mode === "login" ? (
          <>
            아직 계정이 없나요?{" "}
            <Link href={buildSignupHref(destination)} className="font-semibold text-[var(--brand-700)]">
              회원가입
            </Link>
          </>
        ) : (
          <>
            이미 계정이 있나요?{" "}
            <Link href={buildLoginHref(destination)} className="font-semibold text-[var(--brand-700)]">
              로그인
            </Link>
          </>
        )}
      </div>
    </Card>
  );
}
