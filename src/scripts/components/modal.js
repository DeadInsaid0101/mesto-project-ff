export function openPopup(popup) {
    popup.classList.add('popup_is-opened')

}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened')
}

export function clickPopupImage(link, name) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption')

    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    openPopup(popupTypeImage);
}

export function handleEditFormSubmit(evt) {
    evt.preventDefault();
    const popupForm = document.querySelector('.popup__form');
    const name = popupForm.querySelector('.popup__input_type_name');
    const description = popupForm.querySelector('.popup__input_type_description');

    const newName = name.value
    const newDescription = description.value

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = newName
    profileDescription.textContent = newDescription

    const popupTypeEdit = document.querySelector('.popup_type_edit');

    closePopup(popupTypeEdit)
}

