# 🎟️ Frontend Mentor - Conference Ticket Generator Solution

This is a solution to the **[Conference Ticket Generator challenge](https://www.frontendmentor.io/challenges/conference-ticket-generator-8D6WZ0UmlW)** on Frontend Mentor. It helps improve form validation, accessibility, and responsive UI skills by building a realistic ticket generation form with live preview.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Screenshot](#screenshot)
- [Links](#links)
- [My Process](#my-process)
- [Built With](#built-with)
- [What I Learned](#what-i-learned)
- [Continued Development](#continued-development)
- [Useful Resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## 🧐 Overview

### The Challenge

Users should be able to:

- Complete the form with their details
- Receive real-time validation messages if:
  - Any field is empty
  - Email address is invalid
  - Avatar image is too large or wrong format
- Navigate the entire form using only a keyboard
- Have labels, hints, and errors announced to screen readers
- See a styled, dynamic conference ticket on successful submission
- View the layout adaptively across all screen sizes
- Experience hover and focus states on interactive elements

---

## 📸 Screenshot

![Conference Ticket Generator - Desktop Form](./design/desktop-design-form.jpg)

*Desktop view showing the ticket generation form with live preview*

![Conference Ticket Generator - Completed Ticket](./design/desktop-design-ticket.jpg)

*Generated conference ticket with user details*


## 🔨 My Process

I started by laying out the HTML structure with semantic markup and ensured accessibility with ARIA attributes and keyboard navigation. Then, I built a form validation system using JavaScript and added a dynamic ticket generator using `FileReader` for avatar previews and string formatting for the ticket code.

---

## 🛠️ Built With

- Semantic **HTML5**
- **CSS Custom Properties**
- **Flexbox** and **CSS Grid**
- **JavaScript** for interactivity
- **Mobile-first workflow**
- Progressive enhancement and accessibility
- No frameworks — Vanilla JS!

---

## 💡 What I Learned

- How to use `FileReader` to preview uploaded images:
  ```js
  const reader = new FileReader();
  reader.onload = (e) => {
    this.uploadedImageData = e.target.result;
  };
  reader.readAsDataURL(file);
  ```

- How to rotate text vertically using CSS:
  ```css
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  ```

- Managing accessibility (error messages, ARIA roles, keyboard support)

---

## 🔁 Continued Development

In future versions, I plan to:
- Add ticket download as PNG or PDF
- Implement dark/light mode toggle
- Integrate with backend to store generated tickets
- Improve animation transitions

---

## 📚 Useful Resources

- [MDN Web Docs](https://developer.mozilla.org/) — Reference for `FileReader`, ARIA, validation
- [CSS Tricks – Vertical Writing](https://css-tricks.com/almanac/properties/w/writing-mode/) — Helped me rotate the ticket number
- [A11y Project](https://www.a11yproject.com/) — For accessibility best practices

---

## 👤 Author

- Website: [Your Portfolio or Website]
- Frontend Mentor: [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter: [@yourusername](https://twitter.com/yourusername)

---

## 🙏 Acknowledgments

Special thanks to **Frontend Mentor** for creating such a well-structured and realistic challenge. Also big shoutout to [OpenAI ChatGPT](https://openai.com/chatgpt) for helping troubleshoot avatar upload logic!