export const applicationData: Application[] = [
  {
    id: "1",
    company: "Company With Very Long Name",
    link: "https://www.google.com",
    stage: "r1",
    application: {
      date: new Date(new Date().setDate(new Date().getDate() - 10)),
      questions: [
        {
          id: "1",
          question: "What is your name?",
          answer: "My name is John Doe",
        },
        {
          id: "2",
          question: "What do you like to do in your free time?",
          answer:
            "I like skiing in winter. In summer I like to go to the beach and go out with friends.",
        },
      ],
    },
    interviews: [
      {
        round: 1,
        date: new Date(new Date().setDate(new Date().getDate() - 3)),
        questions: [],
      },
    ],
  },
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
    },
    interviews: [],
  },
];
