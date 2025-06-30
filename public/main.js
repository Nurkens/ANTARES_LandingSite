// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (header) {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(35, 38, 55, 0.95)';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
      header.style.background = 'var(--dark)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  }
});

// Обработка формы контактов
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    const formData = {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value
    };

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        showFormMessage(data.message || 'Сообщение успешно отправлено!', 'success');
        this.reset();
      } else {
        showFormMessage(data.message || 'Ошибка при отправке формы', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showFormMessage('Произошла ошибка при отправке формы', 'error');
    } finally {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });

  function showFormMessage(message, type) {
    const formResponse = document.getElementById('formResponse');
    if (!formResponse) return;
    
    formResponse.textContent = message;
    formResponse.className = 'form-response'; // Reset classes
    formResponse.classList.add(type);
    
    // Clear message after 5 seconds
    setTimeout(() => {
      formResponse.textContent = '';
      formResponse.className = 'form-response';
    }, 5000);
  }
}

// ScrollReveal animations configuration
const scrollRevealOption = {
  distance: '50px',
  origin: 'bottom',
  duration: 1000,
};

// Hero section animations
if (document.querySelector('.hero-section')) {
  ScrollReveal().reveal('.hero-text h1, .hero-text p', {
    distance: '50px',
    origin: 'left',
    duration: 1000,
    delay: 300,
    interval: 200
  });

  ScrollReveal().reveal('.hero-buttons', {
    distance: '50px',
    origin: 'left',
    duration: 1000,
    delay: 800
  });

  ScrollReveal().reveal('.hero-logo', {
    distance: '50px',
    origin: 'right',
    duration: 1000,
    delay: 300
  });

  ScrollReveal().reveal('.container img', {
    duration: 1000,
    delay: 2500,
  });

  ScrollReveal().reveal('.container .text-left, .container .text__left', {
    ...scrollRevealOption,
    origin: 'right',
    delay: 2000,
  });

  ScrollReveal().reveal('.container .text-right, .container .text__right', {
    ...scrollRevealOption,
    origin: 'left',
    delay: 2000,
  });

  ScrollReveal().reveal('.container .explore', {
    duration: 1000,
    delay: 2500,
  });

  ScrollReveal().reveal('.container h5, .container .feature-text', {
    duration: 1000,
    interval: 500,
    delay: 3000,
  });

  ScrollReveal().reveal('.container .catalog', {
    duration: 1000,
    delay: 5000,
  });

  ScrollReveal().reveal('.container .print', {
    duration: 1000,
    delay: 5500,
  });

  ScrollReveal().reveal('.footer p, .hero-footer p', {
    duration: 1000,
    delay: 7000,
  });
}

// Sections animations
ScrollReveal().reveal('.section-title', {
  distance: '50px',
  origin: 'top',
  duration: 1000
});

ScrollReveal().reveal('.about-text, .about-image', {
  distance: '50px',
  origin: 'bottom',
  duration: 1000,
  interval: 200
});

ScrollReveal().reveal('.service-card', {
  distance: '50px',
  origin: 'bottom',
  duration: 1000,
  interval: 200
});

ScrollReveal().reveal('.project-card', {
  distance: '50px',
  origin: 'bottom',
  duration: 1000,
  interval: 200
});

ScrollReveal().reveal('.contact-info, .contact-form', {
  distance: '50px',
  origin: 'bottom',
  duration: 1000,
  interval: 200
});