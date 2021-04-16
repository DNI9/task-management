/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */

// https://gist.github.com/James1x0/8443042#gistcomment-3222955
export const greetUser = () => {
  const currentHour = new Date().getHours();

  const greetingMessage =
    currentHour >= 4 && currentHour < 12 // after 4:00AM and before 12:00PM
      ? 'Good morning.'
      : currentHour >= 12 && currentHour <= 17 // after 12:00PM and before 6:00pm
      ? 'Good afternoon.'
      : currentHour > 17 || currentHour < 4 // after 5:59pm or before 4:00AM (to accommodate night owls)
      ? 'Good evening.' // if for some reason the calculation didn't work
      : 'Welcome';

  return greetingMessage;
};
