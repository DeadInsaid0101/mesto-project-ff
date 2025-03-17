import { createCard } from "./card";
import { deleteCard } from "./card";
import { likeCard } from "./card";
import { clickPopupImage } from "..";

export function openPopup(popup) {
    popup.classList.add('popup_is-opened')
    document.addEventListener('keydown', handleEscape);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', handleEscape);
}


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

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened')
        closePopup(openedPopup)
    }
}

