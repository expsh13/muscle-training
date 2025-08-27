// 共通ユーティリティ関数

// 日付関連のユーティリティ
export const formatDate = (date: Date): string => {
	return date.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
};

export const formatDateTime = (date: Date): string => {
	return date.toLocaleString("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
};

// バリデーション関連のユーティリティ
export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const isValidWeight = (weight: number): boolean => {
	return weight > 0 && weight < 1000;
};

export const isValidBodyFat = (bodyFat: number): boolean => {
	return bodyFat >= 0 && bodyFat <= 100;
};

export const isValidReps = (reps: number): boolean => {
	return Number.isInteger(reps) && reps > 0 && reps <= 1000;
};

// ID生成
export const generateId = (): string => {
	return crypto.randomUUID();
};

// 配列関連のユーティリティ
export const groupBy = <T, K extends string | number>(
	array: readonly T[],
	keyFn: (item: T) => K
): Record<K, T[]> => {
	return array.reduce(
		(groups, item) => {
			const key = keyFn(item);
			if (!groups[key]) {
				groups[key] = [];
			}
			groups[key].push(item);
			return groups;
		},
		{} as Record<K, T[]>
	);
};

// 数値関連のユーティリティ
export const roundToDecimalPlace = (
	num: number,
	decimalPlaces: number
): number => {
	const multiplier = 10 ** decimalPlaces;
	return Math.round(num * multiplier) / multiplier;
};

export const calculateBMI = (weight: number, heightInCm: number): number => {
	const heightInM = heightInCm / 100;
	return roundToDecimalPlace(weight / (heightInM * heightInM), 1);
};
