// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placeList = document.querySelector(".places__list");

const deleteCard = (cardElement) => {
    cardElement.remove();
};

const createCard = (initialCards, deleteCard) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name;
    cardElement.querySelector(".card__title").textContent = initialCards.name;

    const deleteButton = cardElement.querySelector(".card__delete-button");

    deleteButton.addEventListener("click", () => deleteCard(cardElement));

    return cardElement;
};

initialCards.forEach(function (cardElement) {
    const newCard = createCard(cardElement, deleteCard);

    placeList.append(newCard);
});

