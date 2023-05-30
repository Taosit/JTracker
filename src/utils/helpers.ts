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
  };
};
