/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () =>{
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.questions__content')

    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }

}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 400 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// 检查主题按钮是否存在
if (themeButton) {
    // Previously selected topic (if user selected)
    const selectedTheme = localStorage.getItem('selected-theme')
    const selectedIcon = localStorage.getItem('selected-icon')

    // We obtain the current theme that the interface has by validating the dark-theme class
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

    // We validate if the user previously chose a topic
    if (selectedTheme) {
      // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
      themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
    }

    // Activate / deactivate the theme manually with the button
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}

/*=============== EMAIL FUNCTIONALITY ===============*/
// EmailJS 配置 - 请在 email-config.js 中设置您的配置信息
(function() {
    // 检查配置是否存在
    if (typeof EMAIL_CONFIG !== 'undefined') {
        emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
        if (EMAIL_CONFIG.SETTINGS.DEBUG) {
            console.log('EmailJS initialized with config');
        }
    } else {
        // 如果没有配置文件，使用默认配置（需要手动替换）
        emailjs.init("YOUR_PUBLIC_KEY"); // 请替换为您的 Public Key
        console.warn('EMAIL_CONFIG not found. Please include email-config.js or update the configuration manually.');
    }
})();

// 邮件发送功能
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnIcon = document.getElementById('btn-icon');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 验证配置
        if (!validateEmailConfig()) {
            showErrorMessage('Email configuration is incomplete. Please check your settings.');
            return;
        }

        // 显示加载状态
        showLoadingState();

        // 获取配置信息
        const serviceId = typeof EMAIL_CONFIG !== 'undefined' ? EMAIL_CONFIG.SERVICE_ID : 'YOUR_SERVICE_ID';
        const templateId = typeof EMAIL_CONFIG !== 'undefined' ? EMAIL_CONFIG.TEMPLATE_ID : 'YOUR_TEMPLATE_ID';

        // 发送邮件
        emailjs.sendForm(serviceId, templateId, this)
            .then(function(response) {
                showSuccessMessage();
                contactForm.reset();
            }, function(error) {
                console.error('EmailJS error:', error);
                showErrorMessage();
            })
            .finally(function() {
                hideLoadingState();
            });
    });
}

// 验证邮件配置
function validateEmailConfig() {
    if (typeof EMAIL_CONFIG === 'undefined') {
        console.error('EMAIL_CONFIG is not defined. Please include email-config.js');
        return false;
    }

    const requiredFields = ['PUBLIC_KEY', 'SERVICE_ID', 'TEMPLATE_ID'];
    const defaultValues = ['YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID'];

    for (let field of requiredFields) {
        if (!EMAIL_CONFIG[field] || defaultValues.includes(EMAIL_CONFIG[field])) {
            console.error(`EMAIL_CONFIG.${field} is not properly configured`);
            return false;
        }
    }

    return true;
}

// 显示加载状态
function showLoadingState() {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.className = 'ri-loader-4-line button__icon';

    formStatus.className = 'form-status loading';
    formStatus.textContent = 'Sending your message...';
}

// 隐藏加载状态
function hideLoadingState() {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
    btnIcon.className = 'ri-arrow-right-up-line button__icon';
}

// 显示成功消息
function showSuccessMessage() {
    formStatus.className = 'form-status success';
    formStatus.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';

    // 获取超时时间
    const timeout = typeof EMAIL_CONFIG !== 'undefined' ? EMAIL_CONFIG.SETTINGS.SUCCESS_TIMEOUT : 5000;

    setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }, timeout);
}

// 显示错误消息
function showErrorMessage(customMessage = null) {
    formStatus.className = 'form-status error';
    formStatus.textContent = customMessage || 'Sorry, there was an error sending your message. Please try again or contact us directly.';

    // 获取超时时间
    const timeout = typeof EMAIL_CONFIG !== 'undefined' ? EMAIL_CONFIG.SETTINGS.ERROR_TIMEOUT : 7000;

    setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }, timeout);
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1800,
    delay: 100,
    // reset: true
})

sr.reveal(`.home__data`)
sr.reveal(`.home__img`, {delay: 500})
sr.reveal(`.home__social`, {delay: 600})
sr.reveal(`.about__img, .contact__box`,{origin: 'left'})
sr.reveal(`.about__data, .contact__form`,{origin: 'right'})
sr.reveal(`.steps__card, .product__card, .questions__group, .footer`,{interval: 100})
