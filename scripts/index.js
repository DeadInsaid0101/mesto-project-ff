// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placeList = document.querySelector('.places__list')



const deleteCard = (cardElement) => {
    cardElement.remove()
}

const addCard = initialCards => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = initialCards.link
    cardElement.querySelector('.card__image').alt = initialCards.name
    cardElement.querySelector('.card__title').textContent = initialCards.name

    placeList.append(cardElement)

    const deleteButton = cardElement.querySelector('.card__delete-button')

    deleteButton.addEventListener('click', () => deleteCard(cardElement))
}






initialCards.forEach(addCard)
