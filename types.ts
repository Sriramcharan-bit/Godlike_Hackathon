export type QuestType = 'video' | 'quiz' | 'code' | 'debug' | 'project';

interface BaseQuest {
  id: number;
  title: string;
  description: string;
  xp: number;
  type: QuestType;
}

export interface VideoQuestData extends BaseQuest {
  type: 'video';
  videoId: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizQuestData extends BaseQuest {
  type: 'quiz';
  questions: QuizQuestion[];
}

export interface CodeChallengeQuestData extends BaseQuest {
  type: 'code';
  embedUrl: string;
}

export interface DebugChallengeQuestData extends BaseQuest {
  type: 'debug';
  buggyCode: string;
  fixedCode: string;
}

export interface MiniProjectQuestData extends BaseQuest {
    type: 'project';
    instructions: string;
    codeSnippet: string;
}

export type Quest = VideoQuestData | QuizQuestData | CodeChallengeQuestData | DebugChallengeQuestData | MiniProjectQuestData;
