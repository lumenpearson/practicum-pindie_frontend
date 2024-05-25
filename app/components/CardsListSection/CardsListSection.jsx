"use client";

import CardsList from "@/app/components/CardsListSection/CardsList";
import CardsSlider from "@/app/components/CardsListSection/CardsSlider";
import Styles from "@/app/components/CardsListSection/CardsListSection.module.css";

export const CardsListSection = (props) => {
  return (
    <section className={Styles["list-section"]}>
      <h2 className={Styles["list-section__title"]} id={props.id}>
        {props.title}
      </h2>
      {props.type === "slider" ? (
        <CardsSlider data={props.data} />
      ) : (
        <CardsList data={props.data} />
      )}
    </section>
  );
};

export default CardsListSection;
