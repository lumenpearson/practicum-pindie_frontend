"use client";

import { useEffect, useState } from "react";
import endpoints from "@/app/api/config";
import {
  getNormalizedGameDataById,
  isResponseOk,
  checkIfUserVoted,
  vote,
} from "@/app/api/api-utils";
import { useStore } from "@/app/store/app-store";
import Preloader from "@/app/components/Preloader/Preloader";
import GameNotFound from "@/app/components/GameNotFound/GameNotFound";
import Styles from "@/app/games/[id]/Game.module.css";

export default function GamePage(props) {
  const authContext = useStore();
  console.log(authContext.user)
  const [isVoted, setIsVoted] = useState(false);

  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [game, setGame] = useState(null);


  useEffect(() => {
    async function fetchData() {
      const game = await getNormalizedGameDataById(
        endpoints.games,
        props.params.id
      );
      isResponseOk(game) ? setGame(game) : setGame(null);
      setPreloaderVisible(false);
      console.log(checkIfUserVoted(`game, ${authContext.user.id}`));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (authContext.user !== null && game) {
      try {
        const isVoted = checkIfUserVoted(game, authContext.user);
        setIsVoted(isVoted);
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      setIsVoted(false);
    }
  }, []);

  const handleVote = async () => {
    const jwt = authContext.token;
    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
      : [];
    usersIdArray.push(authContext.user.id);
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );
    if (isResponseOk(response)) {
      setGame(() => {
        return {
          ...game,
          users: [...game.users, authContext.user]
        };
      });
      setIsVoted(true);
    }
  };
  return (
    <main className="main">
      {game ? (
        <>
          <section className={Styles['game']}>
            <iframe className={Styles['game__iframe']} src={game.link}></iframe>
          </section>
          <section className={Styles['about']}>
            <h2 className={Styles['about__title']}>{game.title}</h2>
            <div className={Styles['about__content']}>
              <p className={Styles["about__description"]}>{game.description}</p>
              <div className={Styles["about__author"]}>
                <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
              </div>
            </div>
            <div className={Styles["about__vote"]}>
              <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: <span
                className={Styles["about__accent"]}>{game.users.length}</span></p>
              <button onClick={handleVote} disabled={!authContext.isAuth || isVoted} className={`button ${Styles["about__vote-button"]}`}>{isVoted ? "Голос учтён" : "Голосовать"}</button>
            </div>
          </section>
        </>
      ) : preloaderVisible ? (
        <Preloader />
      ) : (router.push('/games/notfound'))}
    </main>
  )
}
