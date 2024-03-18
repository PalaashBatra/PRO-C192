AFRAME.registerComponent("tour", {
  schema: {
    state: { type: "string", default: "places-list" },
    selected_card: { type: "string", default: "#card1" },
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards();
  },
  tick: function () {
    const { state } = this.el.getAttribute("tour");
    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.show_view();
    }
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "taj",
        title: "Taj Mahal",
        url: "./taj/55000481_303.jpg",
      },
      {
        id: "petra-jordan",
        title: "petra-jordan",
        url: "./petra-jordan/AUC_3062-2.jpg",
      },

      {
        id: "gwc",
        title: "gwc",
        url: "./gwc/gwc1.jpg",
      },
      {
        id: "pyramids",
        title: "pyramids",
        url: "./pyramids/Kheops-Pyramid.jpg",
      },
      {
        id: "rio",
        title: "rio",
        url: "./rio/rio_christ_vr_01_big.jpg",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position, item.id);

      // Thumbnail Element
      const thumbNail = this.createThumbNail(item);
      borderEl.appendChild(thumbNail);

      // Title Text Element
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1,
    });

    //Add cursor-listener component to the ring border entity to change it's color
    //On Cursor 'mouseenter' and 'mouseleave' entity
    entityEl.setAttribute("cursor-listener", {});

    return entityEl;
  },
  createThumbNail: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 9,
    });
    entityEl.setAttribute("material", { src: item.url });

    return entityEl;
  },
  createTitleEl: function (position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 70,
      color: "#e65100",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);

    return entityEl;
  },
  hideEl: function (el_list) {
    el_list.map((el) => {
      el.setAttribute("visible", false);
    });
  },
  show_view: function () {
    const { selected_card } = this.data;
    const sky_el = document.querySelector("#main-container");
    sky_el.setAttribute("material", {
      src: `./assets/360_images/${selected_card}/p0.jpg`,
      color: "white",
    });
  },
});
