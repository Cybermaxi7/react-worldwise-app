import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({})
  const BASE_URL = "http://localhost:8000";
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);
  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }
  async function createCity(city) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await response.json();
      setCities(cities => [...cities, data]);
    } catch {
      alert("There was an adding the city");
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCity(city) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${city.id}`, {
        method: "DELETE",
      });
      await response.json();
      setCities(cities => cities.filter(c => c.id!== city.id));
    } catch {
      alert("There was an error deleting the city");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        setIsLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === "undefined")
    throw new Error("CitiesContext is been used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCitiesContext };
