export interface TutorialContentItem {
  subtitle: string;
  description: string;
}

export interface TutorialStep {
  title: string;
  content: TutorialContentItem[];
}
