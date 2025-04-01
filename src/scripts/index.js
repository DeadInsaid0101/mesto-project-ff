import '../pages/index.css';
import { deleteCard, createCard, handleLikeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { loadUserInfo, loadCards, updateUserInfo, addNewCard, updateAvatar, deleteCardFromServer } from './api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(validationConfig);

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
const popupTypeImageCaption = document.querySelector('.popup__caption');
const profileImage = document.querySelector('.profile__image-edit');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');
const profileAvatar = document.querySelector('.profile__image');
const popupTypeBeforeDelete = document.querySelector('.popup_type_before_delete');
const popupButtonDeleteCard = document.querySelector('.button_delete_popup');
const popups = Array.from(document.querySelectorAll('.popup'));

const handleConfirm = () => {
  const originalText = popupButtonDeleteCard.textContent;
  popupButtonDeleteCard.textContent = 'Удаление...';
  popupButtonDeleteCard.disabled = true;

  deleteCardFromServer(popupTypeBeforeDelete._cardId)
    .then(() => {
      deleteCard(popupTypeBeforeDelete._cardElement);
      closePopup(popupTypeBeforeDelete);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupButtonDeleteCard.textContent = originalText;
      popupButtonDeleteCard.disabled = false;
    });
};

popupButtonDeleteCard.addEventListener('click', handleConfirm);
const openPopupTypeBeforeDelete = (cardElement, cardId) => {
  popupTypeBeforeDelete._cardElement = cardElement;
  popupTypeBeforeDelete._cardId = cardId;
  openPopup(popupTypeBeforeDelete);
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupTypeEdit)
  nameProfileForm.value = profileTitle.textContent
  descriptionProfileForm.value = profileDescription.textContent
  clearValidation(profileForm, validationConfig);
})

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

profileForm.addEventListener('submit', handleEditFormSubmit);

profileAddButton.addEventListener('click', () => {
  newCardForm.reset();
  openPopup(popupTypeNewCard)

  clearValidation(newCardForm, validationConfig);
})

popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close') || evt.target === popup) {
      closePopup(popup);
    }
  });
});

export function clickPopupImage(link, name) {

  popupImage.src = link;
  popupImage.alt = name;
  popupTypeImageCaption.textContent = name;

  openPopup(popupTypeImage);
}

export function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameProfileForm.value;
  const newDescription = descriptionProfileForm.value;

  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateUserInfo(newName, newDescription)
    .then(userData => {

      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(popupTypeEdit);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {

      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = evt.target.querySelector('.popup__input_type_card-name').value;
  const cardLink = evt.target.querySelector('.popup__input_type_url').value;

  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  addNewCard(cardName, cardLink)
    .then(cardData => {
      const newCard = createCard(
        {
          name: cardData.name,
          link: cardData.link,
          likes: cardData.likes,
          ownerId: cardData.owner._id,
          cardId: cardData._id
        },
        openPopupTypeBeforeDelete,
        clickPopupImage,
        handleLikeCard,
        currentUserId
      );

      placeList.prepend(newCard);
      closePopup(popupTypeNewCard);
      evt.target.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
}

profileImage.addEventListener('click', () => {
  openPopup(popupTypeAvatar);
  clearValidation(avatarForm, validationConfig);
});

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateAvatar(avatarInput.value)
    .then(userData => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(popupTypeAvatar);
      evt.target.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
}

let currentUserId;

Promise.all([loadUserInfo(), loadCards()])
  .then(([userData, cardsData]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    cardsData.forEach(card => {
      const cardElement = createCard(
        {
          name: card.name,
          link: card.link,
          likes: card.likes,
          ownerId: card.owner._id,
          cardId: card._id
        },
        openPopupTypeBeforeDelete,
        clickPopupImage,
        handleLikeCard,
        currentUserId
      );
      placeList.append(cardElement);
    });
  })
  .catch(err => {
    console.log(err);
  });