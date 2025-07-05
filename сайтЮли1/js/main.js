const translations = {
  ua: {
    mainTitle: 'TattoHub',
    master1: 'Майстер 1',
    master2: 'Майстер 2',
    more: 'Детальніше',
    sketches: 'Ескізи',
    prices: 'Ціни',
    installments: 'Оплата частинами',
    contacts: 'Контакти',
    certificates: 'Сертифікати',
    reviews: 'Відгуки',
    blog: 'Блог',
    media: 'Фото/Відео',
    healing: 'Загоєння',
    payment: 'Оплата',
    sketchesPlaceholder: 'Тут будуть ескізи тату (заглушка)',
    pricesPlaceholder: 'Тут буде інформація про ціни (заглушка)',
    installmentsPlaceholder: 'Тут буде інформація про оплату частинами (заглушка)',
    contactsPlaceholder: 'Тут будуть контакти (заглушка)',
    certificatesPlaceholder: 'Тут буде інформація про сертифікати (заглушка)',
    reviewsPlaceholder: 'Тут будуть відгуки (заглушка)',
    blogPlaceholder: 'Тут буде блог (заглушка)',
    mediaPlaceholder: 'Тут будуть фото і відео (заглушка)',
    healingPlaceholder: 'Тут буде інформація про загоєння (заглушка)',
    paymentPlaceholder: 'Тут буде інформація про оплату (заглушка)',
    signup: 'Записатися',
    signupTitle: 'Запис на тату',
    formName: "Ваше ім'я",
    formPhone: 'Телефон',
    formComment: 'Коментар',
    formSend: 'Відправити',
    formThanks: 'Дякуємо! Ваша заявка надіслана (заглушка).',
    portfolio: 'Портфоліо',
    review1: 'Дуже крутий майстер! (заглушка)',
    review2: 'Все сподобалось, рекомендую! (заглушка)'
  },
  en: {
    mainTitle: 'TattoHub',
    master1: 'Master 1',
    master2: 'Master 2',
    more: 'More',
    sketches: 'Sketches',
    prices: 'Prices',
    installments: 'Installments',
    contacts: 'Contacts',
    certificates: 'Certificates',
    reviews: 'Reviews',
    blog: 'Blog',
    media: 'Photo/Video',
    healing: 'Healing',
    payment: 'Payment',
    sketchesPlaceholder: 'Tattoo sketches will be here (placeholder)',
    pricesPlaceholder: 'Price info will be here (placeholder)',
    installmentsPlaceholder: 'Installment info will be here (placeholder)',
    contactsPlaceholder: 'Contacts will be here (placeholder)',
    certificatesPlaceholder: 'Certificates info will be here (placeholder)',
    reviewsPlaceholder: 'Reviews will be here (placeholder)',
    blogPlaceholder: 'Blog will be here (placeholder)',
    mediaPlaceholder: 'Photos and videos will be here (placeholder)',
    healingPlaceholder: 'Healing info will be here (placeholder)',
    paymentPlaceholder: 'Payment info will be here (placeholder)',
    signup: 'Sign up',
    signupTitle: 'Sign up for tattoo',
    formName: 'Your name',
    formPhone: 'Phone',
    formComment: 'Comment',
    formSend: 'Send',
    formThanks: 'Thank you! Your request has been sent (placeholder).',
    portfolio: 'Portfolio',
    review1: 'Very cool master! (placeholder)',
    review2: 'I liked everything, recommend! (placeholder)'
  }
};

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  const dict = translations[lang] || translations['ua'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  renderModalForm(lang);
}

const langBtns = document.querySelectorAll('.lang-switcher button');
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.id === 'lang-en' ? 'en' : 'ua');
  });
});

function renderModalForm(lang) {
  const modalContent = document.querySelector('.modal-content');
  if (!modalContent) return;
  const dict = translations[lang || localStorage.getItem('lang') || 'ua'];
  const form = document.createElement('form');
  form.className = 'modal-form';
  form.innerHTML = `
    <input type="text" name="name" placeholder="${dict.formName}" required>
    <input type="tel" name="phone" placeholder="${dict.formPhone}" required>
    <textarea name="comment" placeholder="${dict.formComment}" rows="3"></textarea>
    <button type="submit" class="btn">${dict.formSend}</button>
  `;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert(dict.formThanks);
    closeModal();
  });
  const placeholder = modalContent.querySelector('.modal-placeholder');
  if (placeholder) placeholder.replaceWith(form);
  else {
    const oldForm = modalContent.querySelector('.modal-form');
    if (oldForm) oldForm.replaceWith(form);
  }
  const h2 = modalContent.querySelector('h2');
  if (h2) h2.textContent = dict.signupTitle;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Записаться') || btn.textContent.includes('Записатися') || btn.textContent.includes('Sign up')) {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openModal();
      });
    }
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  setLanguage(localStorage.getItem('lang') || 'ua');
});

// Модальное окно записи
function openModal() {
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
} 