import '../pages/index.css';
import { initialCards } from './cards.js';
import { deleteCard } from './components/card.js';
import { createCard } from './components/card.js';
import { openPopup } from './components/modal.js';
import { closePopup } from './components/modal.js';
import { clickPopupImage } from './components/modal.js';
import { handleEditFormSubmit } from './components/modal.js';
import { handleNewCardFormSubmit } from './components/card.js';
import { likeCard } from './components/card.js';

const placeList = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardForm = document.forms['new-place'];
const popupForm = document.querySelector('.popup__form');
const description = popupForm.querySelector('.popup__input_type_description');
const name = popupForm.querySelector('.popup__input_type_name');
const popups = Array.from(document.querySelectorAll('.popup'));

profileEditButton.addEventListener('click', () => {
    openPopup(popupTypeEdit)
    name.value = profileTitle.textContent
    description.value = profileDescription.textContent
})

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

popupForm.addEventListener('submit', handleEditFormSubmit);

profileAddButton.addEventListener('click', () => {
    newCardForm.reset();
    openPopup(popupTypeNewCard)
})

popups.forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup__close') || evt.target === popup) {
            closePopup(popup);
        }
    });
    document.addEventListener('keydown', function closeEsc(evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    });
});

initialCards.forEach(function (cardElement) {
    const newCard = createCard(cardElement, deleteCard, clickPopupImage, likeCard);

    placeList.append(newCard);
});


