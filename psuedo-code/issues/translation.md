# Moment

- moment displays X minutes ago
  - when translating I have
    - to get the number and keep it (I don't have to translate that)
    - get whether seconds, minutes, hours, days etc and translate that to the correct language
    - translate "ago"
    - Put it in the right order depending on the languages grammer
      - english its Subject Verb Object
      - japanese its Subject Object Verb


- I'm displaying the moment date as month day year when most of the world is day month year
  - probably best to use i18next


- I Got a bunch of Text that needs to be handled through i18Next
  - Should Probably Avoid all react-native Text components
  - Only use an "UnknownText" component and a TranslatedText component
    - Done to avoid confusion
