type Application = {
  id: string;
  company: string;
  link: string;
  stage: Stage;
  application: ApplicationStage;
  interviews: Interview[];
};

type ApplicationWithPrimativeDate = {
  id: string;
  company: string;
  link: string;
  stage: Stage;
  application: ApplicationStageWithPrimativeDate;
  interviews: InterviewWithPrimativeDate[];
};

type Stage = "ap" | "r1" | "r2" | "r3" | "of" | "xx";

type ApplicationStage = {
  date: Date;
  questions: Question[];
  notes: string;
};

type ApplicationStageWithPrimativeDate = {
  date: number;
  questions: Question[];
  notes: string;
};

type Interview = {
  round: number;
  date?: Date;
  questions: Question[];
  notes?: string;
};

type InterviewWithPrimativeDate = {
  round: number;
  date?: number;
  questions: Question[];
  notes?: string;
};

type Question = {
  id: string;
  question: string;
  answer: string;
};

type Message =
  | {
      event: "updateApplications";
      data: Application[];
    }
  | {
      event: "setApplicationInView";
      data: Application | null;
    }
  | {
      event: "startApplication";
      data: {
        url: string;
        title: string;
      };
    }
  | {
      event: "setApplicationInProgress";
      data: Application;
    }
  | {
      event: "toggleWindow";
      data: boolean;
    };
