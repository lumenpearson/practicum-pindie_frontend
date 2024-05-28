import Styles from "./Game.module.css";

export default function GamePage(props) {
  return (
    <main className="main">
      <section className={Styles["game"]}>
        <iframe
          className={Styles["game__iframe"]}
          src="https://code.s3.yandex.net/teens/pindie-games/defence-of-crystal/game/index.html"
        ></iframe>
      </section>
      <section className={Styles["about"]}>
        <h2 className={Styles["about__title"]}>Defence of Crystal</h2>
        <div className={Styles["about__content"]}>
          <p className={Styles["about__description"]}>
            Вы играете за волшебника, последнюю надежду Земли, которую поглотил
            мрак... Вы должны любой ценой защищать магический кристалл, ведь это
            единственное, что сможет вернуть всё на круги своя, но полчища
            монстров так и норовят его уничтожить. Ваша задача уничтожить все
            кладбища.
          </p>
          <div className={Styles["about__author"]}>
            <p>
              Автор:
              <span className={Styles["about__accent"]}>MastWe</span>
            </p>
          </div>
        </div>
        <div className={Styles["about__vote"]}>
          <p className={Styles["about__vote-amount"]}>
            За игру уже проголосовали:
            <span className={Styles["about__accent"]}>10</span>
          </p>
          <button className={`button ${Styles["about__vote-button"]}`}>
            Голосовать
          </button>
        </div>
      </section>
    </main>
  );
}
