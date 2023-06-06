export const applicationData: Application[] = [
  {
    id: "2",
    company: "Company X",
    link: "https://www.google.com",
    stage: "ap",
    application: {
      date: new Date(new Date().setDate(new Date().getDate() - 4)),
      questions: [
        {
          id: "1",
          question: "What is your name?",
          answer: "My name is John Doe",
        },
        {
          id: "2",
          question: "What is your name?",
          answer: "My name is John Doe",
        },
      ],
      notes: "This is a note",
    },
    interviews: [],
  },
  {
    id: "3",
    company: "Company Y",
    link: "https://www.google.com",
    stage: "ap",
    application: {
      date: new Date(),
      questions: [
        {
          id: "1",
          question: "What is your name?",
          answer: "My name is John Doe",
        },
        {
          id: "2",
          question: "What is your name?",
          answer: "My name is John Doe",
        },
      ],
      notes: "",
    },
    interviews: [],
  },
  {
    id: "4",
    company: "Company Z",
    link: "https://www.google.com",
    stage: "xx",
    application: {
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      questions: [],
      notes: "",
    },
    interviews: [],
  },
];
