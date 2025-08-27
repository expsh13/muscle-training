// 共通型定義のエクスポート

// ユーザー関連の型
export type User = {
	readonly id: string;
	readonly email: string;
	readonly name: string;
	readonly image?: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};

// 体重記録の型
export type BodyRecord = {
	readonly id: string;
	readonly userId: string;
	readonly weight: number;
	readonly bodyFat?: number;
	readonly recordedAt: Date;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};

// 筋トレ種目の型
export type Exercise = {
	readonly id: string;
	readonly userId: string;
	readonly name: string;
	readonly description?: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};

// ワークアウトグループの型
export type WorkoutGroup = {
	readonly id: string;
	readonly userId: string;
	readonly name: string;
	readonly description?: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};

// ワークアウト記録の型
export type WorkoutRecord = {
	readonly id: string;
	readonly userId: string;
	readonly exerciseId: string;
	readonly sets: readonly WorkoutSet[];
	readonly recordedAt: Date;
	readonly notes?: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
};

// ワークアウトセットの型
export type WorkoutSet = {
	readonly setNumber: number;
	readonly weight?: number;
	readonly reps: number;
	readonly duration?: number; // 秒単位
};

// API関連の型
export type ApiResponse<T> =
	| {
			readonly success: true;
			readonly data: T;
	  }
	| {
			readonly success: false;
			readonly error: string;
	  };

// ページネーション関連の型
export type PaginationParams = {
	readonly page?: number;
	readonly limit?: number;
};

export type PaginatedResponse<T> = {
	readonly items: readonly T[];
	readonly total: number;
	readonly page: number;
	readonly limit: number;
	readonly totalPages: number;
};
