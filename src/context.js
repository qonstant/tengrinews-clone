import React from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // NY Times Top Stories API sections
  const sections = [
    "NEWS",
    "LIFE",
    "SPORTS",
    "TRAVEL",
    "GUIDE",
    "EDU",
    "AUTO",
  ];

  // Define the logo sections
  const logoSections = [
    "home",
    "articles",
    "kazakhstan",
  ];

  // Format sections' names for navbar menu
  const formatSection = (section) => {
    switch (section) {
      case "us":
        return "U.S.";
      case "nyregion":
        return "N.Y.";
      case "t-magazine":
        return "magazine";
      case "realestate":
        return "real estate";
      case "kazakhstan":
        return "Что будет с Казахстаном?";
      case "articles":
        return "Статьи";
      case "home":
        return "Новости";
      default:
        return section;
    }
  };

  // Format articles' date
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <AppContext.Provider
      value={{
        sections,
        logoSections, // Include logoSections in the context
        formatSection,
        formatDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to pass values
export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppProvider };
