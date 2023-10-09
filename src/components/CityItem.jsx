import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
export default function CityItem({ city }) {
  const {currentCity, deleteCity} = useCitiesContext()
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  const { cityName, emoji, date, id, position:{lat, lng} } = city;

  async function handleDelete(e) {
    e.preventDefault();
    console.log("clicked")
    await deleteCity(city);

  }
  return (
    <li>
      <Link
        to={`${id}/?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${city.id === currentCity.id ? styles["cityItem--active"] : "" }`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
      </Link>
    </li>
  );
}
