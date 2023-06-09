export const toDateString = (date: Date) => {
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

export const adaptApplicationToStorage = (application: Application | null) => {
  if (!application) return null;
  return {
    ...application,
    application: {
      ...application.application,
      date: new Date(application.application.date).getTime(),
    },
    interviews: application.interviews.map((interview) => ({
      ...interview,
      date: new Date(interview.date).getTime(),
    })),
  };
};

export const adaptApplicationFromStorage = (
  application: ApplicationWithPrimativeDate | null
) => {
  if (!application) return null;
  return {
    ...application,
    application: {
      ...application.application,
      date: new Date(application.application.date),
    },
    interviews: application.interviews.map((interview) => ({
      ...interview,
      date: new Date(interview.date),
    })),
  } as Application;
};

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
  const blankQuestion = application.application.questions.find(
    (question) => question.question === "" && question.answer === ""
  );
  const questions = application.application.questions.map((question) =>
    question.id === blankQuestion?.id
      ? { ...question, question: message.data }
      : question
  );
  return {
    ...application,
    application: {
      ...application.application,
      questions: [...questions, getBlankQuestion()],
    },
  };
};

export const addAnswer = (
  application: Application,
  message: Message
): Application => {
  if (message.event !== "addAnswer") return;
  const incompleteQuestion = application.application.questions.find(
    (question) => question.answer === ""
  );
  if (!incompleteQuestion) return;
  const questions = application.application.questions.map((question) =>
    question.id === incompleteQuestion.id
      ? { ...question, answer: message.data }
      : question
  );
  return {
    ...application,
    application: { ...application.application, questions },
  };
};
