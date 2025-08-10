# Muscle Training App - プロジェクト概要

## プロジェクトの目的
筋トレ記録・体重管理アプリの開発を通じた関数型DDD（Domain-Driven Design）とTDD（Test-Driven Development）の学習プロジェクト

### 主な学習目標
- ペアプログラミング体験（日本語での技術コミュニケーション）
- 関数型DDD + TDDの実践的理解
- モダンTypeScript・JavaScript技術習得
- クリーンアーキテクチャの理解
- アクセシビリティ意識の向上

## 技術スタック

### フロントエンド
- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **Storybook** + @storybook/addon-a11y
- **Chart.js** (データ可視化)

### バックエンド
- **Hono** (Cloudflare Workers)
- **TypeScript**
- **Auth.js** + Google OAuth
- **Neon PostgreSQL**
- **Drizzle ORM**

### 開発ツール
- **pnpm workspaces** (monorepo管理)
- **Biome** (リント・フォーマット・a11y統合)
- **Vitest** + @testing-library/react
- **@axe-core/react** (アクセシビリティテスト)

## アーキテクチャ特徴

### 関数型DDD
- クラスを使わない純粋関数によるビジネスロジック
- イミュータブルなデータ構造
- 副作用の分離と管理
- 型安全性を活用したドメインモデリング

### TDD戦略
- **Heavy TDD**: API層・ビジネスロジック・計算処理
- **Light TDD**: UIコンポーネント・認証フロー・チャート設定

### monorepo構成
```
apps/
├── web/          # Next.js frontend
└── api/          # Hono backend
packages/
├── types/        # 共通TypeScript型
├── db/           # データベース関連（Drizzle ORM）
├── ui/           # 共通UIコンポーネント
└── utils/        # ユーティリティ関数
```

## 現在の開発段階
**フェーズ1: 基盤構築段階** - ドキュメント整備完了、次はmonorepo環境構築

## 特別な考慮事項
- **日本語での開発**: コメント・説明・ドキュメントは日本語
- **学習重視**: スピードより理解と品質を優先
- **アクセシビリティ**: WCAG AA準拠必須
- **PWA対応**: 基本的なPWA機能（オフライン対応なし）