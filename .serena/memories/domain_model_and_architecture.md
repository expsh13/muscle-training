# ドメインモデル・アーキテクチャ

## 関数型DDD実装パターン

### ドメインエンティティ（immutable型）
```typescript
// packages/types/src/domain/
export type User = {
  readonly id: string
  readonly email: string
  readonly name: string
  readonly createdAt: Date
}

export type BodyRecord = {
  readonly id: string
  readonly userId: string
  readonly weight: number
  readonly bodyFatPercentage: number | null
  readonly recordedAt: Date
  readonly createdAt: Date
}

export type Exercise = {
  readonly id: string
  readonly name: string
  readonly userId: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export type WorkoutGroup = {
  readonly id: string
  readonly name: string
  readonly userId: string
  readonly exercises: readonly string[] // Exercise IDs
  readonly createdAt: Date
}

export type WorkoutRecord = {
  readonly id: string
  readonly exerciseId: string
  readonly userId: string
  readonly sets: readonly WorkoutSet[]
  readonly recordedAt: Date
}

export type WorkoutSet = {
  readonly weight: number
  readonly reps: number
  readonly restSeconds: number | null
}
```

### コマンド・バリュー型
```typescript
// ドメイン操作のコマンド
export type CreateBodyRecordCommand = {
  readonly userId: string
  readonly weight: number
  readonly bodyFatPercentage?: number
  readonly recordedAt?: Date
}

export type CreateExerciseCommand = {
  readonly name: string
  readonly userId: string
}

// バリデーション結果型
export type ValidationResult<T> = 
  | { success: true; data: T }
  | { success: false; errors: readonly string[] }
```

## 純粋関数によるビジネスロジック

### ドメイン操作関数
```typescript
// apps/api/src/domain/body-record/operations.ts
export const createBodyRecord = (
  command: CreateBodyRecordCommand
): BodyRecord => ({
  id: generateId(),
  userId: command.userId,
  weight: command.weight,
  bodyFatPercentage: command.bodyFatPercentage ?? null,
  recordedAt: command.recordedAt ?? new Date(),
  createdAt: new Date()
})

// apps/api/src/domain/exercise/operations.ts
export const createExercise = (
  command: CreateExerciseCommand
): ValidationResult<Exercise> => {
  const nameValidation = validateExerciseName(command.name)
  if (!nameValidation.success) {
    return nameValidation
  }

  return {
    success: true,
    data: {
      id: generateId(),
      name: command.name.trim(),
      userId: command.userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}
```

### バリデーション関数
```typescript
// apps/api/src/domain/exercise/validators.ts
export const validateExerciseName = (
  name: string
): ValidationResult<string> => {
  const errors: string[] = []
  
  if (!name || name.trim().length === 0) {
    errors.push('種目名は必須です')
  }
  
  if (name.length > 50) {
    errors.push('種目名は50文字以内で入力してください')
  }
  
  return errors.length === 0
    ? { success: true, data: name.trim() }
    : { success: false, errors }
}

export const validateBodyWeight = (
  weight: number
): ValidationResult<number> => {
  const errors: string[] = []
  
  if (weight <= 0) {
    errors.push('体重は正の数値で入力してください')
  }
  
  if (weight > 500) {
    errors.push('体重は500kg以下で入力してください')
  }
  
  return errors.length === 0
    ? { success: true, data: weight }
    : { success: false, errors }
}
```

## アーキテクチャレイヤー

### 依存関係フロー
```
presentation layer (apps/web, apps/api routes)
        ↓
application layer (apps/api services)
        ↓
domain layer (pure functions, no external deps)
        ↓
infrastructure layer (packages/db)
```

### サービス層（副作用の管理）
```typescript
// apps/api/src/services/exercise.service.ts
export class ExerciseService {
  constructor(
    private readonly db: Database,
    private readonly logger: Logger
  ) {}

  async createExercise(
    command: CreateExerciseCommand
  ): Promise<Result<Exercise, ServiceError>> {
    try {
      // 純粋関数でビジネスロジック実行
      const exerciseResult = createExercise(command)
      
      if (!exerciseResult.success) {
        return {
          success: false,
          error: { type: 'VALIDATION_ERROR', details: exerciseResult.errors }
        }
      }

      // 副作用（DB保存）
      const savedExercise = await this.db.insert(exercises)
        .values(exerciseResult.data)
        .returning()

      return { success: true, data: savedExercise[0] }
      
    } catch (error) {
      this.logger.error('Failed to create exercise', error)
      return {
        success: false,
        error: { type: 'DATABASE_ERROR', message: 'Failed to save exercise' }
      }
    }
  }
}
```

## データアクセスパターン

### Drizzle ORM Repository
```typescript
// packages/db/src/queries/exercises.ts
export const findExercisesByUserId = async (
  db: Database,
  userId: string
): Promise<readonly Exercise[]> => {
  return db.select()
    .from(exercises)
    .where(eq(exercises.userId, userId))
    .orderBy(exercises.createdAt)
}

export const findExerciseById = async (
  db: Database,
  id: string
): Promise<Exercise | null> => {
  const results = await db.select()
    .from(exercises)
    .where(eq(exercises.id, id))
    .limit(1)
    
  return results[0] || null
}
```

## テスト戦略

### ドメイン層（Heavy TDD）
```typescript
// 純粋関数のテスト（高い網羅性）
describe('createExercise', () => {
  test('有効なコマンドで種目を作成できる', () => {
    const command: CreateExerciseCommand = {
      name: 'ベンチプレス',
      userId: 'user-123'
    }
    
    const result = createExercise(command)
    
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('ベンチプレス')
      expect(result.data.userId).toBe('user-123')
    }
  })
})
```

### サービス層（Integration Testing）
```typescript
describe('ExerciseService', () => {
  test('新しい種目をデータベースに保存できる', async () => {
    const service = new ExerciseService(testDb, mockLogger)
    const command: CreateExerciseCommand = {
      name: 'スクワット',
      userId: 'user-123'
    }
    
    const result = await service.createExercise(command)
    
    expect(result.success).toBe(true)
    // データベースに保存されていることを確認
  })
})
```

## 関数型設計の利点

### テスタビリティ
- 純粋関数は簡単にテスト可能
- 副作用が分離されているため、モックが最小限
- 入力と出力が明確

### 保守性
- 副作用の影響範囲が限定的
- 関数の組み合わせで複雑な処理を構築
- 型システムによる安全性

### パフォーマンス
- immutableデータによる最適化
- メモ化しやすい構造
- 並列処理に適している

この設計により、学習しやすく保守性の高いアプリケーションを構築します。