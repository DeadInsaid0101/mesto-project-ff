import '../pages/index.css';
import { initialCards } from './cards.js';
import { deleteCard } from './components/card.js';
import { createCard } from './components/card.js';
import { openPopup } from './components/modal.js';
import { closePopup } from './components/modal.js';
import { handleNewCardFormSubmit } from './components/modal.js';
import { likeCard } from './components/card.js';


const placeList = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardForm = document.forms['new-place'];
const profileForm = document.forms['edit-profile'];
const descriptionProfileForm = profileForm.querySelector('.popup__input_type_description');
const nameProfileForm = profileForm.querySelector('.popup__input_type_name');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupTypeImageCaption = document.querySelector('.popup__caption')
const popups = Array.from(document.querySelectorAll('.popup'));

profileEditButton.addEventListener('click', () => {
    openPopup(popupTypeEdit)
    nameProfileForm.value = profileTitle.textContent
    descriptionProfileForm.value = profileDescription.textContent
})

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

profileForm.addEventListener('submit', handleEditFormSubmit);

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
});

initialCards.forEach(function (cardElement) {
    const newCard = createCard(cardElement, deleteCard, clickPopupImage, likeCard);

    placeList.append(newCard);
});

export function clickPopupImage(link, name) {

    popupImage.src = link;
    popupImage.alt = name;
    popupTypeImageCaption.textContent = name;

    openPopup(popupTypeImage);
}


export function handleEditFormSubmit(evt) {
    evt.preventDefault();

    const newName = nameProfileForm.value
    const newDescription = descriptionProfileForm.value

    profileTitle.textContent = newName
    profileDescription.textContent = newDescription

    closePopup(popupTypeEdit)
}
