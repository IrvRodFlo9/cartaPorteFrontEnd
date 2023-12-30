export interface InputErrorMap {
  [key: string]: {
    [gender in Gender]: string;
  };
}

export type Gender = 'male' | 'female';
