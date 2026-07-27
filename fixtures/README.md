# fixtures/

실제 API 응답을 **가공 없이 그대로** 저장하는 곳. (스펙 §2 "중요: 구현 순서", §9 step 1)

> 파서를 상상해서 짜지 말 것. 반드시 실제 응답을 먼저 캡처한 뒤 타입/파서/테스트를 작성한다.

## 파일 목록

`DataProvider` 인터페이스(§2)의 세 메서드에 각각 대응한다.

| 메서드 | Apify | EnsembleData | HikerAPI |
|---|---|---|---|
| `getHashtagPosts(tag, 50)` | `apify-hashtag.json` | `ensemble-hashtag.json` | `hiker-hashtag.json` |
| `getProfile(username)` | `apify-profile.json` | `ensemble-profile.json` | `hiker-profile.json` |
| `getRecentPosts(username, 12)` | `apify-recent.json` | `ensemble-recent.json` | `hiker-recent.json` |

## 캡처 규칙

1. **원본 그대로.** 응답 envelope 전체(`data`/`items`/pagination 래퍼 포함)를 손대지 말고 저장.
2. **해시태그 응답에는 mix 포함.** 릴스(`views` 있음) 1개 + 이미지/캐러셀(`views` 없이 `likes`만) 1개 이상.
   §5 스코어링이 정확히 이 분기(reel vs feed)로 갈리므로 두 케이스가 다 필요.
3. **공개 계정만.** 비공개 계정 응답은 제외 (§0, §10).

## 우선순위

1. `apify-hashtag.json` — post 스키마 확정 시 `getHashtagPosts` + `getRecentPosts` 동시 해결
2. `*-profile.json` — 계정 보강용
3. 나머지 제공사(Ensemble → Hiker)
