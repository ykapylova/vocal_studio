import { Banner } from "../components/Banner";

export const Contact = () => {
  return (
    <main>
      <Banner pageName={"Контакты"} imgSrc={"banner-crystal-kids-jump.JPG"}/>
      <div className="wrapper wrapperContacts">
          <div className="text">
            <p>
              <b>Как нас найти?</b>
            </p>
            <div>
              РБ, г. Могилев,
              <br />
              ул. Первомайская, 34,
              <br />
              Могилевский городской центр культуры и досуга
            </div>
            <p>
              <b>Как с нами связаться?</b>
            </p>
            <a href="tel:375297444468">
              <div className="text">📞 +375 (29) 744-44-68</div>
            </a>
          </div>
          <iframe
            className="map"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Abf6a2ad35113445ac100b31a189cc2e804764c5e96f7404e3c62b90a9eb507ad&amp;source=constructor"
            width="500"
            height="400"
            frameborder="0"
          />

      </div>

      <div></div>
    </main>
  );
};
