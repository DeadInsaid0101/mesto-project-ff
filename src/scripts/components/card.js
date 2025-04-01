import { likeCard, unlikeCard, deleteCardFromServer } from '../api.js';
import { closePopup, openPopup } from './modal.js';

export const deleteCard = (cardElement, cardId) => {
  const popupTypeBeforeDelete = document.querySelector('.popup_type_before_delete');
  const popupButtonDeleteCard = document.querySelector('.button_delete_popup');

  const handleConfirm = () => {
    deleteCardFromServer(cardId)
      .then(() => {
        cardElement.remove();
        popupButtonDeleteCard.removeEventListener('click', handleConfirm);
        closePopup(popupTypeBeforeDelete);
      })
      .catch(err => {
        console.log(err);
        popupButtonDeleteCard.removeEventListener('click', handleConfirm);
        closePopup(popupTypeBeforeDelete);
      });
  };
  openPopup(popupTypeBeforeDelete);
  popupButtonDeleteCard.addEventListener('click', handleConfirm);

};

export const createCard = (cardData, deleteCard, clickPopupImage, handleLikeCard, currentUserId) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.ownerId !== currentUserId) {
    deleteButton.style.display = 'none';
  }

  const isLikedByMe = cardData.likes.some(user => user._id === currentUserId);
  if (isLikedByMe) {
    likeButton.classList.add('card__like-button_is-active');
  }

  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener('click', (evt) => {
    handleLikeCard(evt, cardData.cardId, likeCounter);
  });
  cardElement.querySelector(".card__image").addEventListener('click', () => clickPopupImage(cardData.link, cardData.name));

  return cardElement;
};

export function handleLikeCard(evt, cardId, likeCounter) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const apiMethod = isLiked ? unlikeCard : likeCard;

  apiMethod(cardId)
    .then(updatedCard => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => {
      console.log(err);
      likeButton.classList.toggle('card__like-button_is-active');
    });
}