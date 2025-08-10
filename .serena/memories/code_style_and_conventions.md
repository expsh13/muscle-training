# コードスタイル・規約

## TypeScript規約

### 型安全性
```typescript
// 厳格設定を使用
"strict": true
"noUncheckedIndexedAccess": true
"exactOptionalPropertyTypes": true

// domain typesは readonly・immutable
export type Exercise = {
  readonly id: string
  readonly name: string
  readonly userId: string
  readonly createdAt: Date
}

// branded typesをIDに活用
export type ExerciseId = string & { __brand: 'ExerciseId' }
```

### 関数型プログラミング
```typescript
// constを多用、varは使用禁止
const createExercise = (command: CreateExerciseCommand): Exercise => ({
  // pure function implementation
})

// mutation回避、immutable更新を優先
const updatedExercise = {
  ...originalExercise,
  name: newName,
  updatedAt: new Date()
}

// 副作用の分離
const pureBusinessLogic = (data: ReadonlyData): Result => {
  // 純粋な計算のみ
}

const sideEffectWrapper = async (data: Data): Promise<void> => {
  const result = pureBusinessLogic(data)
  // 副作用はここで実行
}
```

### エラーハンドリング
```typescript
// Result型パターンの使用
type Result<T, E> = { success: true; data: T } | { success: false; error: E }

// HTTP status codeの適切な使用
return new Response(JSON.stringify(data), { status: 201 })
```

## React/Next.js規約

### コンポーネント設計
```typescript
// Props型は明示的に定義
interface ButtonProps {
  readonly children: React.ReactNode
  readonly onClick: () => void
  readonly disabled?: boolean
}

// Server Componentを優先、必要時のみClient Component
'use client' // 必要な場合のみ

// アクセシビリティ必須
<button
  aria-label="運動記録を保存"
  aria-describedby="save-help"
  onClick={handleSave}
>
  保存
</button>
```

## API設計規約

### RESTful設計
```typescript
// 一貫した命名規則
GET    /api/body-records
POST   /api/body-records
PUT    /api/body-records/:id
DELETE /api/body-records/:id

// リクエスト・レスポンス型の厳密な定義
export interface CreateBodyRecordRequest {
  readonly weight: number
  readonly bodyFatPercentage?: number
  readonly recordedAt: string // ISO date
}
```

### Honoでの実装
```typescript
// ミドルウェアでの認証確認
app.use('/*', authMiddleware)

// 適切なエラーレスポンス
return c.json({ error: 'Validation failed' }, 400)
```

## データベース規約

### Drizzle ORM
```typescript
// スキーマ定義はstrict
export const exercises = pgTable('exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// クエリは型安全
const exercisesByUser = await db
  .select()
  .from(exercises)
  .where(eq(exercises.userId, userId))
```

## テスト規約

### TDD実践
```typescript
// テスト名は日本語で詳細に
describe('createExercise', () => {
  test('有効なコマンドで新しい種目を作成できる', () => {
    const command: CreateExerciseCommand = {
      name: 'ベンチプレス',
      userId: 'user-123'
    }
    
    const result = createExercise(command)
    
    expect(result.name).toBe('ベンチプレス')
    expect(result.userId).toBe('user-123')
  })
})

// アクセシビリティテストは必須
test('ボタンはキーボードでアクセス可能である', async () => {
  render(<Button>テスト</Button>)
  
  const button = screen.getByRole('button')
  button.focus()
  fireEvent.keyDown(button, { key: 'Enter' })
  
  // アサーション
})
```

## コメント・ドキュメント規約

### 日本語コメント
```typescript
/**
 * 筋トレ種目を新規作成する純粋関数
 * @param command - 種目作成コマンド
 * @returns 作成された種目オブジェクト
 */
export const createExercise = (command: CreateExerciseCommand): Exercise => {
  // ユニークIDを生成
  const id = generateId()
  
  // 現在時刻で作成日・更新日を設定
  const now = new Date()
  
  return {
    id,
    name: command.name,
    userId: command.userId,
    createdAt: now,
    updatedAt: now
  }
}
```

### 技術的な判断理由の記録
```typescript
// NOTE: Chart.jsを選択した理由：
// - React環境での安定性
// - アクセシビリティ対応
// - モバイル最適化
import Chart from 'chart.js/auto'
```

## Biome設定

### 統合リンター・フォーマッター
```json
{
  "linter": {
    "rules": {
      "style": {
        "noVar": "error",           // varの使用禁止
        "useConst": "error"         // constの使用強制
      },
      "a11y": {
        "recommended": true         // アクセシビリティルール適用
      }
    }
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2
  }
}
```

これらの規約により、保守性・可読性・アクセシビリティを確保したコードベースを構築します。