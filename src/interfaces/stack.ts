export interface TechItem {
  name: string;
  proficiency: number;
}

export interface TechFeature {
  name: string;
  items: TechItem[];
  gradient: string;
}