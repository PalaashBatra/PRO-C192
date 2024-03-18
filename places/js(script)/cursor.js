
AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" },
    },
    init: function () {
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
      this.handleClickEvents();
    },
  
    handlePlacesListState: function () {
      const id = this.el.getAttribute("id");

      const placesId = ["taj", "petra-jordan", "gwc", "pyramids","rio"];

      if (placesId.includes(id)) {
        const placeContainer = document.querySelector("#places-container");
        placeContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", {
          color: "#D76B30",
          opacity: 1,
        });
      }
    },
    handleMouseEnterEvents: function () {
      // Mouse Enter Events
      this.el.addEventListener("mouseenter", () => {
        this.handlePlacesListState();
      });
    },
    handleMouseLeaveEvents: function () {
      // Mouse Leave Events
      this.el.addEventListener("mouseleave",()=>{
        const {selectedItemId} = this.data 
        if(selectedItemId){
            const EL = document.querySelector(`#${selectedItemId}`)
            const ID = EL.getAttribute("id");
            if(ID === selectedItemId){
                 EL.setAttribute("material", {
                    color: "#00C897",
                    opacity: 1,
                });
            }
        }
      })
      
    },
    handleClickEvents: function(){
      this.el.addEventListener("click",(event)=>{
        const placesContainer = document.querySelector("#places-container")
        const {state} = placesContainer.getAttribute("tour")
        if(state === "places-list"){
          const id =this.el.getAttribute("id")
          const placesId = ["taj", "petra-jordan", "gwc", "pyramids", "rio"];
          if(placesId.includes(id)){
            placesContainer.setAttribute("tour",{state:"view",selected_card:id})
          }
        }
      })
    },
  });