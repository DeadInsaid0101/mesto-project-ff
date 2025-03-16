import { clickPopupImage } from './modal.js';
import { closePopup } from './modal.js';

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

export function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const placeList = document.querySelector(".places__list");
    const placeName = evt.target.querySelector('.popup__input_type_card-name').value;
    const imageUrl = evt.target.querySelector('.popup__input_type_url').value;
    const popupTypeNewCard = document.querySelector('.popup_type_new-card');

    const newCardData = {
        name: placeName,
        link: imageUrl
    };

    const newCard = createCard(newCardData, deleteCard, clickPopupImage, likeCard);
    placeList.prepend(newCard);

    closePopup(popupTypeNewCard);

}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}