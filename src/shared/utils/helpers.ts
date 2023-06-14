import { produce } from "immer";

export const toDateString = (dateAsNumber: number) => {
  const date = new Date(dateAsNumber);
  if (date.toDateString() === new Date().toDateString()) {
    return "Today";
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const createNewApplication = () =>
  ({
    id: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
    company: "",
    link: "",
    stage: "ap" as const,
    application: {
      date: new Date().getTime(),
      questions: [getBlankQuestion()],
      notes: "",
    },
    interviews: [],
  } as Application);

export const getBlankQuestion = () => ({
  id: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
  question: "",
  answer: "",
});

export const cleanUpQuestions = (questions: Question[]) => {
  const cleanedQuestions = questions.filter(
    (question) => question.question || question.answer
  );
  return [...cleanedQuestions, getBlankQuestion()];
};

export const startApplication = (
  application: Application,
  message: Message
): Application => {
  if (message.event !== "startApplication") return;
  const { title, url } = message.data;
  return { ...application, company: title, link: url };
};

export const addQuestion = (
  application: Application,
  message: Message
): Application => {
  if (message.event !== "addQuestion") return;
  const blankQuestionIndex = application.application.questions.findIndex(
    (question) => question.question === "" && question.answer === ""
  );

  return produce(application, (draft: Application) => {
    draft.application.questions[blankQuestionIndex].question = message.data;
    draft.application.questions.push(getBlankQuestion());
  });
};

export const addAnswer = (
  application: Application,
  message: Message
): Application => {
  if (message.event !== "addAnswer") return;
  const incompleteQuestionIndex = application.application.questions.findIndex(
    (question) => question.answer === ""
  );
  if (incompleteQuestionIndex === -1) return;

  return produce(application, (draft: Application) => {
    draft.application.questions[incompleteQuestionIndex].answer = message.data;
  });
};

const is30DaysOld = (dateAsNumber: number) => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  return new Date(dateAsNumber) < thirtyDaysAgo;
};

export const rejectOldApplications = (rawApplications: Application[]) => {
  const updatedApplications = rawApplications.map((application) => {
    if (
      application.stage === "ap" &&
      is30DaysOld(application.application.date)
    ) {
      return {
        ...application,
        stage: "xx" as const,
      };
    }
    return application;
  });
  return updatedApplications;
};

const stageOrder = ["xx", "ap", "r1", "r2", "r3", "of"] as const;

export const getNextStage = (stage: typeof stageOrder[number]) => {
  const currentStageIndex = stageOrder.indexOf(stage);
  return stageOrder[currentStageIndex + 1];
};

export const isInterview = (
  stage: ApplicationStage | Interview
): stage is Interview => {
  return (stage as Interview).round !== undefined;
};
