import React from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // NY Times Top Stories API sections
  const sections = [
    "NEWS",
    "LIFE",
    "SPORT",
    "TRAVEL",
    "GUIDE",
    "EDU",
    "AUTO",
  ];

  // Define mappings for sections
  const sectionMappings = {
    NEWS: "world",
    LIFE: "health",
    SPORT: "technology",
    TRAVEL: "travel",
    GUIDE: "climate",
    EDU: "education",
    AUTO: "automobiles",
  };


  // Define the logo sections
  const logoSections = [
    "world",
    "science",
    "us",
  ];

  // Format sections' names for navbar menu
  const formatSection = (section) => {
    switch (section) {
      case "health":
          return "Tengri Life";
      case "technology":
        return "Tengri Tech( Couldn't find sport :/ )";
      case "travel":
        return "Tengri Travel";
      case "climate":
        return "Tengri Guide";
      case "education":
        return "Tengri Edu";
      case "automobiles":
        return "Tengri Auto";
      case "us":
        return "Что будет с Казахстаном?";
      case "science":
        return "Статьи";
      case "world":
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
        sectionMappings,
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
