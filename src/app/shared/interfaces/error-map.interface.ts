export interface ErrorMap {
  [key: string]: {
    [gender in Gender]: string;
  };
}

export type Gender = 'male' | 'female';
