"use client";

import { useEffect, useState } from "react";
import { generateStaticParams } from "@/your/path/to/generateStaticParams";  // Import generateStaticParams function
import Image from 'next/image'; // Import next/image for image optimization

import Preloader from "@/app/components/Preloader/Preloader";
import GameNotFound from "@/app/components/GameNotFound/GameNotFound";

import Styles from "@/app/games/[id]/Game.module.css";

import endpoints from "@/app/api/config";
import {
  getNormalizedGameDataById,
  isResponseOk,
  checkIfUserVoted,
  vote,
} from "@/app/api/api-utils";
import { useStore } from "@/app/store/app-store";

export async function generateStaticParams() {
  // Implement fetchData() function to fetch data
  // Fetch data to determine which dynamic routes should be generated
  const gamesData = await fetchData(); // Implement fetchData() function to fetch data
  const params = gamesData.map(game => ({
    params: { id: game.id.toString() }
  }));
  return params;
}

export default function GamePage(props) {
  const authContext = useStore();
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [game, setGame] = useState(null);
  const [isVoted, setIsVoted] = useState(false);

  const handleVote = async () => {
    const jwt = authContext.token;

    let usersIdArray = game.users.length ? game.users.map((user) => user.id) : [];
    usersIdArray.push(authContext.user.id);
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );

    if (isResponseOk(response)) {
      setGame((prevGame) => ({
        ...prevGame,
        users: [...prevGame.users, authContext.user],
        users_permissions_users: [
          ...prevGame.users_permissions_users,
          authContext.user,
        ],
      }));

      setIsVoted(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setPreloaderVisible(true);
      const gameData = await getNormalizedGameDataById(
        endpoints.games,
        props.params.id
      );
      if (isResponseOk(gameData)) {
        setGame(gameData);
      } else {
        setGame(null);
      }
      setPreloaderVisible(false);
    }

    fetchData();
  }, [props.params.id]); // Include props.params.id as a dependency

  useEffect(() => {
    if (authContext.user && game) {
      setIsVoted(checkIfUserVoted(game, authContext.user.id));
    } else {
      setIsVoted(false);
    }
  }, [authContext.user, game]);

  return (
    <main className="main">
      {game ? (
        <>
          <section className={Styles["game"]}>
            <iframe
              className={Styles["game__iframe"]}
              src={game.link}
            ></iframe>
          </section>
          <section className={Styles["about"]}>
            <h2 className={Styles["about__title"]}>{game.title}</h2>
            <div className={Styles["about__content"]}>
              <p className={Styles["about__description"]}>
                {game.description}
              </p>
              <div className={Styles["about__author"]}>
                <p>
                  Автор:{" "}
                  <span className={Styles["about__accent"]}>
                    {game.developer}
                  </span>
                </p>
              </div>
            </div>
            <div className={Styles["about__vote"]}>
              <p className={Styles["about__vote-amount"]}>
                За игру уже проголосовали:{" "}
                <span className={Styles["about__accent"]}>
                  {game.users.length}
                </span>
              </p>
              <button
                disabled={!authContext.isAuth || isVoted}
                className={`button ${Styles["about__vote-button"]}`}
                onClick={handleVote}
              >
                {isVoted ? "Голос учтён" : "Голосовать"}
              </button>
            </div>
          </section>
        </>
      ) : preloaderVisible ? (
        <Preloader />
      ) : (
        <GameNotFound />
      )}
    </main>
  );
}
