import React from "react";
import Styles from "./CardsListSection.module.css";
import Card from "../Card/Card";
import Link from "next/link";

const CardList = (props) => {
    return (
        <section className={Styles["list-section"]}>
            <ul className={Styles["cards-list"]}>
                {props.data.map((item) => {
                    return (
                        <li
                            className={Styles["cards-list__item"]}
                            key={item.id}
                        >
                            <Link
                                href={`/games/${item.id}`}
                                className={Styles["card-list__link"]}
                            >
                                <Card {...item} />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default CardList;
