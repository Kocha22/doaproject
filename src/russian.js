import { createI18n } from 'vue-i18n';

const russian = createI18n({
  // Set the initial locale
  locale: 'ru',
  // Define the translations
  messages: {
    form: {
        farmer_name: 'Имя',
        emailLabel: 'Электронная почта',
        // other form labels
        placeholders: {
          farmer_name: 'Введите ваше имя',
          email: 'Введите вашу электронную почту',
          // other placeholders
        },
        errors: {
          farmer_nameRequired: 'Имя обязательно',
          emailRequired: 'Электронная почта обязательна',
          emailInvalid: 'Неверный формат электронной почты',
          // other error messages
        },
      },
  },
});

export default russian;