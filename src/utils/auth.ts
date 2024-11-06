import { ACCESS_TOKEN_KEY } from "../constants";

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
