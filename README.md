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

---

## 🔗 Links

- **Live Demo**: [Conference Ticket Generator](https://conference-ticket-generator-initial.vercel.app/)
- **Solution URL**: [Frontend Mentor Solution](https://www.frontendmentor.io/solutions/conference-ticket-generator-lm9QCl8Ry0)
- **Challenge URL**: [Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w)

---

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

## 👤 Author

- Website: https://sharn-portfolio.vercel.app/
- Frontend Mentor: [@sharnjeet21](https://www.frontendmentor.io/profile/sharnjeet21)

---

## 🙏 Acknowledgments

Special thanks to **Frontend Mentor** for such a well-structured and realistic challenge.