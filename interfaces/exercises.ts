export interface Week {
  description: string;
  number: number;
  exercises: Exercise[];
}

interface Exercise {
  number: number;
  description: string;
  codeHref: string;
  liveHref?: string;
}
