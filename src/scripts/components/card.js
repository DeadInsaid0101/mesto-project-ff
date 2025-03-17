export const deleteCard = (cardElement) => {
    cardElement.remove();
};

export const createCard = (initialCards, deleteCard, clickPopupImage, likeCard) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name;
    cardElement.querySelector(".card__title").textContent = initialCards.name;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardLikeButton = cardElement.querySelector('.card__like-button')

    cardLikeButton.addEventListener('click', likeCard)

    deleteButton.addEventListener("click", () => deleteCard(cardElement));

    cardImage.addEventListener('click', () => clickPopupImage(cardImage.src, cardImage.alt));



    return cardElement;
};

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}