(function() {
    'use strict';
    
    // Настройки cookies
    const COOKIE_CONSENT_KEY = 'gameon_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;
    
    // Создание HTML баннера
    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        
        banner.innerHTML = `
            <div class="container">
                <div class="cookie-content">
                    <h6><i class="fi fi-rr-cookie-bite"></i> Cookies на нашому сайті</h6>
                    <p>Ми використовуємо cookies для покращення вашого досвіду на сайті, аналізу трафіку та персоналізації контенту. 
                    <a href="privacy-policy.html">Детальніше про cookies</a></p>
                </div>
                <div class="cookie-actions">
                    <button class="cookie-btn accept" onclick="acceptCookies()">Прийняти</button>
                    <button class="cookie-btn decline" onclick="declineCookies()">Відмовитись</button>
                  
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        return banner;
    }
    
    // Проверка согласия
    function checkCookieConsent() {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        const consentData = consent ? JSON.parse(consent) : null;
        
        if (!consentData) {
            return null;
        }
        
        // Проверяем срок действия
        const expiryDate = new Date(consentData.expiry);
        const now = new Date();
        
        if (now > expiryDate) {
            localStorage.removeItem(COOKIE_CONSENT_KEY);
            return null;
        }
        
        return consentData.accepted;
    }
    
    // Сохранение согласия
    function saveCookieConsent(accepted) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
        
        const consentData = {
            accepted: accepted,
            expiry: expiryDate.toISOString(),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    }
    
    // Показ баннера
    function showCookieBanner() {
        const banner = document.getElementById('cookieBanner') || createCookieBanner();
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
    }
    
    // Скрытие баннера
    function hideCookieBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 400);
        }
    }
    
    // Принятие cookies
    window.acceptCookies = function() {
        saveCookieConsent(true);
        hideCookieBanner();
        
        // Здесь можно добавить код для активации аналитики
       
        
        // Пример активации Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    };
    
    // Отклонение cookies
    window.declineCookies = function() {
        saveCookieConsent(false);
        hideCookieBanner();
        
        console.log('Cookies отклонена');
        
        // Отключение аналитики
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    };
    
    // Инициализация при загрузке страницы
    function initCookieBanner() {
        const consent = checkCookieConsent();
        
        if (consent === null) {
            // Согласие не задано - показываем баннер
            showCookieBanner();
        } else if (consent === true) {
            // Согласие дано - активируем аналитику
            console.log('Cookies уже принята');
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        } else {
            // Согласие отклонено
            console.log('Cookies отклонена пользователем');
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        }
    }
    
    // Запуск при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieBanner);
    } else {
        initCookieBanner();
    }
    
})(); 