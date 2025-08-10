# 推奨開発コマンド

## 基本開発コマンド

### 開発サーバー起動
```bash
# 全開発サーバー同時起動
pnpm dev

# フロントエンドのみ
pnpm --filter web dev

# バックエンドのみ  
pnpm --filter api dev
```

### ビルド
```bash
# 全パッケージビルド
pnpm build
```

### テスト
```bash
# 全テスト実行
pnpm test

# 特定パッケージのテスト
pnpm --filter api test
pnpm --filter web test

# TDD用watch mode
pnpm --filter api test --watch
```

### コード品質管理
```bash
# リント・フォーマット・型チェック
pnpm biome check
pnpm biome format
pnpm type-check
```

### データベース操作
```bash
# Drizzleマイグレーション生成
pnpm --filter db generate

# マイグレーション実行
pnpm --filter db migrate
```

### UI開発
```bash
# Storybook起動
pnpm --filter ui storybook
```

## macOS（Darwin）システムコマンド

### 基本的なシェルコマンド
```bash
# ファイル・ディレクトリ操作
ls -la          # 詳細リスト表示
find . -name    # ファイル検索
grep -r         # 文字列検索（ただしripgrepのrgを推奨）
rg              # 高速文字列検索（ripgrep）
```

### Git操作
```bash
git status
git add .
git commit -m
git push
git pull
```

## タスク完了時の確認コマンド

### 必須実行項目
1. **コード品質チェック**
   ```bash
   pnpm biome check    # リント・フォーマット確認
   pnpm type-check     # TypeScript型チェック
   ```

2. **テスト実行**
   ```bash
   pnpm test          # 全テスト実行
   ```

3. **ビルド確認**
   ```bash
   pnpm build         # ビルド成功確認
   ```

### デバッグ・確認用
```bash
# 依存関係確認
pnpm ls

# パッケージ情報確認
pnpm why <package-name>

# 開発サーバーログ確認
pnpm --filter web dev --verbose
```

## 開発効率化のコマンド

### 並列実行
```bash
# 複数コマンド並列実行
pnpm run --parallel <script>
```

### ワークスペース管理
```bash
# 特定ワークスペースでのコマンド実行
pnpm --filter <workspace> <command>

# 全ワークスペースでの再帰実行
pnpm run --recursive <script>
```

これらのコマンドを使用してTDD開発サイクルと品質確保を行ってください。