import { createContext, PropsWithChildren, useContext, useState } from "react";

type PageContextType = {
  page: number;
  setPage: (page: number) => void;
};

const PageContext = createContext<PageContextType | null>(null);

export const usePage = () => {
  const currentPageContext = useContext(PageContext);
  if (!currentPageContext) {
    throw new Error("usePage has to be used within <PageContextProvider>");
  }
  return currentPageContext;
};

export const PageContextProvider = ({ children }: PropsWithChildren) => {
  const [page, setPage] = useState(0);
  return (
    <PageContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
