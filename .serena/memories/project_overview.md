# Muscle Training App - プロジェクト概要

## プロジェクトの目的

筋トレ記録・体重管理アプリの開発を通じた関数型 DDD（Domain-Driven Design）と TDD（Test-Driven Development）の学習プロジェクト

### 主な学習目標

- ペアプログラミング体験（日本語での技術コミュニケーション）
- 関数型 DDD + TDD の実践的理解
- モダン TypeScript・JavaScript 技術習得
- クリーンアーキテクチャの理解
- アクセシビリティ意識の向上

## 技術スタック

### フロントエンド

- **Next.js 15** (App Router)
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

- **pnpm workspaces** (monorepo 管理)
- **Biome** (リント・フォーマット・a11y 統合)
- **Vitest** + @testing-library/react
- **@axe-core/react** (アクセシビリティテスト)

## アーキテクチャ特徴

### 関数型 DDD

- クラスを使わない純粋関数によるビジネスロジック
- イミュータブルなデータ構造
- 副作用の分離と管理
- 型安全性を活用したドメインモデリング

### TDD 戦略

- **Heavy TDD**: API 層・ビジネスロジック・計算処理
- **Light TDD**: UI コンポーネント・認証フロー・チャート設定

### monorepo 構成

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

**フェーズ 1: 基盤構築段階** - ドキュメント整備完了、次は monorepo 環境構築

## 特別な考慮事項

- **日本語での開発**: コメント・説明・ドキュメントは日本語
- **学習重視**: スピードより理解と品質を優先
- **アクセシビリティ**: WCAG AA 準拠必須
- **PWA 対応**: 基本的な PWA 機能（オフライン対応なし）
