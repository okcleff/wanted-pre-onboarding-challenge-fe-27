import {
  ACCESS_TOKEN_KEY,
  MIN_PASSWORD_LENGTH,
  EMAIL_REGEX,
} from "../constants";

export class AuthInstance {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage; // 로컬 스토리지 또는 다른 스토리지 객체
  }

  // 토큰 저장
  set(token: string): void {
    this.storage.setItem(ACCESS_TOKEN_KEY, token);
  }

  // 토큰 삭제
  remove(): void {
    this.storage.removeItem(ACCESS_TOKEN_KEY);
  }

  // 토큰 불러오기
  get(): string | null {
    return this.storage.getItem(ACCESS_TOKEN_KEY);
  }

  // 토큰 존재 여부 확인
  hasToken(): boolean {
    return this.get() !== null;
  }
}

// 각 필드의 유효성 검사 규칙을 객체로 정의
export const validationRules: {
  [key: string]: (value: string) => string | null;
} = {
  email: (value: string) => {
    if (!value) return "이메일을 입력해주세요.";
    if (!EMAIL_REGEX.test(value)) return "이메일 형식에 맞게 입력해주세요.";
    return null;
  },
  password: (value: string) => {
    if (!value) return "비밀번호를 입력해주세요.";
    if (value.length < MIN_PASSWORD_LENGTH) {
      return `패스워드 길이는 ${MIN_PASSWORD_LENGTH} 이상이어야 합니다.`;
    }
    return null;
  },
};

export const getErrorMessageByValidation = (
  name: string,
  value: string
): string | null => {
  const validate = validationRules[name];

  if (!validate) {
    console.log(`'${name}' 필드에 대한 유효성 검사 규칙이 없습니다.`);
  }

  return validate ? validate(value) : null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasAnyTruthyField = (obj: Record<string, any>): boolean => {
  return Object.values(obj).some((value) => Boolean(value));
};
