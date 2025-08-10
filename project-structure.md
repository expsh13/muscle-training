# プロジェクト構造設計

## 1. 全体アーキテクチャ

### 1.1 monorepo構成
```
muscle-training/
├── apps/                    # アプリケーション層
│   ├── web/                # Next.js フロントエンド
│   └── api/                # Hono バックエンド
├── packages/               # 共通パッケージ
│   ├── types/              # 共通型定義
│   ├── db/                 # データベース関連
│   ├── ui/                 # UIコンポーネント
│   └── utils/              # ユーティリティ関数
├── docs/                   # ドキュメント
├── tools/                  # 開発ツール・スクリプト
└── 設定ファイル群
```

### 1.2 設計原則
- **関心の分離**: 各パッケージが明確な責務を持つ
- **依存関係の整理**: 循環依存を避ける設計
- **再利用性**: 共通機能の効率的な共有
- **型安全性**: TypeScriptによる厳密な型管理
- **テスタビリティ**: テストしやすい構造

## 2. 詳細ディレクトリ構造

### 2.1 ルートレベル
```
muscle-training/
├── package.json            # monorepo設定
├── pnpm-workspace.yaml     # workspace設定
├── tsconfig.json          # TypeScript基本設定
├── biome.json             # Biome設定（リント・フォーマット統合）
├── .gitignore             # Git無視設定
├── README.md              # プロジェクト概要
├── requirements.md        # 要件定義書
├── TODO.md               # 実装計画
├── pair-programming-guide.md  # ペアプロガイド
├── learning-objectives.md     # 学習目標
└── project-structure.md       # この文書
```

### 2.2 apps/web (Next.js フロントエンド)
```
apps/web/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── src/
│   ├── app/                    # App Router
│   │   ├── layout.tsx         # ルートレイアウト
│   │   ├── page.tsx           # ホームページ
│   │   ├── login/             # 認証関連
│   │   ├── dashboard/         # ダッシュボード
│   │   ├── body-records/      # 体重記録
│   │   ├── exercises/         # 筋トレ記録
│   │   └── api/              # API Routes（必要に応じて）
│   ├── components/            # コンポーネント
│   │   ├── ui/               # 基本UIコンポーネント
│   │   ├── forms/            # フォームコンポーネント
│   │   ├── charts/           # グラフコンポーネント
│   │   └── layouts/          # レイアウトコンポーネント
│   ├── hooks/                # カスタムフック
│   ├── lib/                  # ユーティリティ・設定
│   ├── styles/               # グローバルスタイル
│   └── types/                # アプリ固有の型
├── public/                   # 静的ファイル
│   ├── icons/
│   ├── images/
│   └── manifest.json        # PWA設定
├── __tests__/               # テストファイル
└── .storybook/              # Storybook設定
```

### 2.3 apps/api (Hono バックエンド)
```
apps/api/
├── package.json
├── wrangler.toml           # Cloudflare Workers設定
├── tsconfig.json
├── src/
│   ├── index.ts            # エントリーポイント
│   ├── routes/             # ルート定義
│   │   ├── auth.ts        # 認証エンドポイント
│   │   ├── body-records.ts # 体重記録API
│   │   ├── exercises.ts   # 種目管理API
│   │   ├── workout-groups.ts # グループ管理API
│   │   └── workout-records.ts # 記録管理API
│   ├── middleware/         # ミドルウェア
│   │   ├── auth.ts        # 認証ミドルウェア
│   │   ├── cors.ts        # CORS設定
│   │   └── error.ts       # エラーハンドリング
│   ├── services/          # ビジネスロジック層
│   │   ├── body-record.service.ts
│   │   ├── exercise.service.ts
│   │   └── workout.service.ts
│   ├── domain/            # ドメインロジック（関数型DDD）
│   │   ├── body-record/
│   │   │   ├── types.ts
│   │   │   ├── validators.ts
│   │   │   └── operations.ts
│   │   ├── exercise/
│   │   └── workout/
│   └── lib/               # ユーティリティ
└── __tests__/             # テストファイル
    ├── unit/              # 単体テスト
    ├── integration/       # 統合テスト
    └── fixtures/          # テストデータ
```

### 2.4 packages/types (共通型定義)
```
packages/types/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts           # 型のエクスポート
│   ├── api/               # API関連の型
│   │   ├── requests.ts    # リクエスト型
│   │   ├── responses.ts   # レスポンス型
│   │   └── errors.ts      # エラー型
│   ├── domain/            # ドメインオブジェクトの型
│   │   ├── user.ts
│   │   ├── body-record.ts
│   │   ├── exercise.ts
│   │   └── workout.ts
│   └── ui/                # UI関連の型
│       ├── components.ts  # コンポーネントProps型
│       └── forms.ts       # フォーム型
└── __tests__/
```

### 2.5 packages/db (データベース関連)
```
packages/db/
├── package.json
├── tsconfig.json
├── drizzle.config.ts      # Drizzle設定
├── src/
│   ├── index.ts           # DB接続とエクスポート
│   ├── schema/            # スキーマ定義
│   │   ├── users.ts
│   │   ├── body-records.ts
│   │   ├── exercises.ts
│   │   ├── workout-groups.ts
│   │   └── workout-records.ts
│   ├── migrations/        # マイグレーションファイル
│   ├── queries/           # 共通クエリ
│   │   ├── body-records.ts
│   │   ├── exercises.ts
│   │   └── workouts.ts
│   └── seed/              # シードデータ
└── __tests__/
```

### 2.6 packages/ui (UIコンポーネント)
```
packages/ui/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── src/
│   ├── index.ts           # コンポーネントエクスポート
│   ├── components/        # 基本コンポーネント
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── Button.test.tsx
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── Chart/
│   ├── hooks/             # 共通フック
│   ├── utils/             # UI関連ユーティリティ
│   └── styles/            # 共通スタイル
├── .storybook/           # Storybook設定
└── __tests__/
```

### 2.7 packages/utils (ユーティリティ関数)
```
packages/utils/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── date/              # 日付関連
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── validation/        # バリデーション
│   │   ├── schemas.ts
│   │   └── rules.ts
│   ├── math/              # 計算関連
│   │   ├── statistics.ts
│   │   └── charts.ts
│   └── string/            # 文字列処理
└── __tests__/
```

## 3. 依存関係の管理

### 3.1 パッケージ間の依存関係
```
依存関係フロー:
apps/web    → packages/ui, packages/types, packages/utils
apps/api    → packages/db, packages/types, packages/utils
packages/ui → packages/types, packages/utils
packages/db → packages/types
```

### 3.2 外部依存関係の管理
```json
// package.json (ルート)
{
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "vitest": "^1.0.0"
  }
}
```

## 4. 設定ファイル管理

### 4.1 TypeScript設定
```json
// tsconfig.json (ルート)
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "references": [
    { "path": "./apps/web" },
    { "path": "./apps/api" },
    { "path": "./packages/types" },
    { "path": "./packages/db" },
    { "path": "./packages/ui" },
    { "path": "./packages/utils" }
  ]
}
```

### 4.2 Biome設定
```json
// biome.json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "a11y": {
        "recommended": true
      },
      "style": {
        "noVar": "error",
        "useConst": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "organizeImports": {
    "enabled": true
  }
}
```

## 5. 開発ワークフロー

### 5.1 開発コマンド
```json
{
  "scripts": {
    "dev": "pnpm run --parallel dev",
    "dev:web": "pnpm --filter web dev",
    "dev:api": "pnpm --filter api dev",
    "build": "pnpm run --recursive build",
    "test": "pnpm run --recursive test",
    "lint": "biome check .",
    "format": "biome format --write .",
    "type-check": "tsc --noEmit",
    "db:generate": "pnpm --filter db generate",
    "db:migrate": "pnpm --filter db migrate",
    "storybook": "pnpm --filter ui storybook"
  }
}
```

### 5.2 Git管理
```
# ブランチ戦略
main          # 本番環境
develop       # 開発環境
feature/*     # 機能ブランチ
hotfix/*      # 緊急修正
```

## 6. テスト戦略

### 6.1 テストの配置
```
各パッケージ内にテストを配置:
- __tests__/unit/      # 単体テスト
- __tests__/integration/ # 統合テスト
- __tests__/e2e/       # E2Eテスト（webのみ）
```

### 6.2 テスト実行
```bash
# 全テスト実行
pnpm test

# 特定パッケージのテスト
pnpm --filter api test

# TDD用のwatch mode
pnpm --filter api test --watch
```

## 7. 関数型DDD実装パターン

### 7.1 ドメインの構造
```typescript
// packages/types/src/domain/exercise.ts
export type Exercise = {
  readonly id: string
  readonly name: string
  readonly userId: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export type CreateExerciseCommand = {
  readonly name: string
  readonly userId: string
}
```

### 7.2 純粋関数によるビジネスロジック
```typescript
// apps/api/src/domain/exercise/operations.ts
export const createExercise = (
  command: CreateExerciseCommand
): Exercise => ({
  id: generateId(),
  name: command.name,
  userId: command.userId,
  createdAt: new Date(),
  updatedAt: new Date()
})

export const validateExerciseName = (
  name: string
): Result<string, ValidationError> => {
  // バリデーションロジック（純粋関数）
}
```

## 8. 学習効果を考慮した設計

### 8.1 段階的な複雑度上昇
1. **基本パッケージ**: types, utils
2. **データ層**: db
3. **UI基盤**: ui
4. **アプリケーション**: web, api

### 8.2 実践学習ポイント
- **monorepo管理**: 実際の複数パッケージ管理体験
- **型安全性**: 厳密なTypeScript設定での開発
- **関数型設計**: 純粋関数による副作用制御
- **テスト戦略**: TDDサイクルの実践

## 9. 拡張性の考慮

### 9.1 将来的な拡張ポイント
- **packages/email**: メール送信機能
- **packages/storage**: ファイルストレージ
- **packages/analytics**: 分析機能
- **apps/mobile**: React Native アプリ

### 9.2 スケーラビリティ
- パッケージ単位での独立したデプロイ
- マイクロフロントエンド対応の準備
- API のバージョニング戦略

この構造により、学習効果と実践的なスキル習得を両立させながら、保守性とスケーラビリティを確保したプロジェクトを構築します。