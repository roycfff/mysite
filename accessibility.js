// מצב נגישות - ניהול הגדרות נגישות
class AccessibilityManager {
    constructor() {
        this.settings = {
            textSize: 'normal',
            contrast: 'normal',
            highlightLinks: false,
            readableFont: false,
            highlightHeadings: false,
            stopAnimations: false
        };

        this.init();
    }

    init() {
        // טען הגדרות שמורות
        this.loadSettings();
        this.applySettings();

        // הוסף מאזינים לכפתורים
        this.attachEventListeners();

        // הוסף תמיכה במקלדת
        this.setupKeyboardNavigation();
    }

    attachEventListeners() {
        const accessibilityButton = document.getElementById('accessibility-button');
        const closeButton = document.getElementById('close-panel');
        const panel = document.getElementById('accessibility-panel');

        // פתיחה וסגירה של הפאנל
        accessibilityButton.addEventListener('click', () => this.togglePanel());
        closeButton.addEventListener('click', () => this.closePanel());

        // סגירה בלחיצה על ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panel.classList.contains('active')) {
                this.closePanel();
            }
        });

        // סגירה בלחיצה מחוץ לפאנל
        document.addEventListener('click', (e) => {
            if (panel.classList.contains('active') &&
                !panel.contains(e.target) &&
                !accessibilityButton.contains(e.target)) {
                this.closePanel();
            }
        });

        // כפתורי בקרה
        const controlButtons = document.querySelectorAll('.control-button');
        controlButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.currentTarget.getAttribute('data-action');
                this.handleAction(action, e.currentTarget);
            });
        });
    }

    togglePanel() {
        const panel = document.getElementById('accessibility-panel');
        const isActive = panel.classList.toggle('active');

        const accessibilityButton = document.getElementById('accessibility-button');
        accessibilityButton.setAttribute('aria-expanded', isActive);
        panel.setAttribute('aria-hidden', !isActive);

        if (isActive) {
            // מיקוד בכותרת הפאנל
            const title = document.getElementById('accessibility-title');
            title.focus();
        }
    }

    closePanel() {
        const panel = document.getElementById('accessibility-panel');
        const accessibilityButton = document.getElementById('accessibility-button');

        panel.classList.remove('active');
        accessibilityButton.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');

        // החזר מיקוד לכפתור הנגישות
        accessibilityButton.focus();
    }

    handleAction(action, button) {
        switch (action) {
            case 'increase-text':
                this.changeTextSize('increase');
                break;
            case 'decrease-text':
                this.changeTextSize('decrease');
                break;
            case 'reset-text':
                this.changeTextSize('reset');
                break;
            case 'normal-contrast':
                this.changeContrast('normal');
                break;
            case 'high-contrast':
                this.changeContrast('high');
                break;
            case 'dark-mode':
                this.changeContrast('dark');
                break;
            case 'highlight-links':
                this.toggleFeature('highlightLinks', 'highlight-links', button);
                break;
            case 'readable-font':
                this.toggleFeature('readableFont', 'readable-font', button);
                break;
            case 'highlight-headings':
                this.toggleFeature('highlightHeadings', 'highlight-headings', button);
                break;
            case 'stop-animations':
                this.toggleFeature('stopAnimations', 'stop-animations', button);
                break;
            case 'reset-all':
                this.resetAll();
                break;
        }

        // שמור הגדרות
        this.saveSettings();
    }

    changeTextSize(action) {
        const body = document.body;

        // הסר מחלקות קיימות
        body.classList.remove('text-size-small', 'text-size-large', 'text-size-xlarge');

        switch (action) {
            case 'increase':
                if (this.settings.textSize === 'normal') {
                    this.settings.textSize = 'large';
                    body.classList.add('text-size-large');
                } else if (this.settings.textSize === 'large') {
                    this.settings.textSize = 'xlarge';
                    body.classList.add('text-size-xlarge');
                }
                break;
            case 'decrease':
                if (this.settings.textSize === 'large') {
                    this.settings.textSize = 'normal';
                } else if (this.settings.textSize === 'xlarge') {
                    this.settings.textSize = 'large';
                    body.classList.add('text-size-large');
                } else if (this.settings.textSize === 'normal') {
                    this.settings.textSize = 'small';
                    body.classList.add('text-size-small');
                }
                break;
            case 'reset':
                this.settings.textSize = 'normal';
                break;
        }

        this.announceToScreenReader(`גודל טקסט השתנה ל-${this.settings.textSize}`);
    }

    changeContrast(mode) {
        const body = document.body;

        // הסר מחלקות קיימות
        body.classList.remove('high-contrast', 'dark-mode');

        // עדכן כפתורים
        const contrastButtons = document.querySelectorAll('[data-action^="normal-contrast"], [data-action^="high-contrast"], [data-action^="dark-mode"]');
        contrastButtons.forEach(btn => btn.classList.remove('active'));

        this.settings.contrast = mode;

        switch (mode) {
            case 'high':
                body.classList.add('high-contrast');
                document.querySelector('[data-action="high-contrast"]').classList.add('active');
                this.announceToScreenReader('מצב ניגודיות גבוהה הופעל');
                break;
            case 'dark':
                body.classList.add('dark-mode');
                document.querySelector('[data-action="dark-mode"]').classList.add('active');
                this.announceToScreenReader('מצב כהה הופעל');
                break;
            default:
                document.querySelector('[data-action="normal-contrast"]').classList.add('active');
                this.announceToScreenReader('מצב ניגודיות רגיל הופעל');
        }
    }

    toggleFeature(settingName, className, button) {
        const body = document.body;
        this.settings[settingName] = !this.settings[settingName];

        if (this.settings[settingName]) {
            body.classList.add(className);
            button.classList.add('active');
            this.announceToScreenReader(`${button.textContent} הופעל`);
        } else {
            body.classList.remove(className);
            button.classList.remove('active');
            this.announceToScreenReader(`${button.textContent} כובה`);
        }
    }

    resetAll() {
        const body = document.body;

        // הסר את כל המחלקות
        body.className = '';

        // אפס הגדרות
        this.settings = {
            textSize: 'normal',
            contrast: 'normal',
            highlightLinks: false,
            readableFont: false,
            highlightHeadings: false,
            stopAnimations: false
        };

        // עדכן כפתורים
        const toggleButtons = document.querySelectorAll('.control-button.toggle');
        toggleButtons.forEach(btn => btn.classList.remove('active'));

        const contrastButtons = document.querySelectorAll('[data-action^="normal-contrast"], [data-action^="high-contrast"], [data-action^="dark-mode"]');
        contrastButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-action="normal-contrast"]').classList.add('active');

        // שמור הגדרות
        this.saveSettings();

        this.announceToScreenReader('כל ההגדרות אופסו');
    }

    saveSettings() {
        try {
            localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
        } catch (e) {
            console.error('שגיאה בשמירת הגדרות נגישות:', e);
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('accessibilitySettings');
            if (saved) {
                this.settings = JSON.parse(saved);
            }
        } catch (e) {
            console.error('שגיאה בטעינת הגדרות נגישות:', e);
        }
    }

    applySettings() {
        const body = document.body;

        // גודל טקסט
        if (this.settings.textSize === 'small') {
            body.classList.add('text-size-small');
        } else if (this.settings.textSize === 'large') {
            body.classList.add('text-size-large');
        } else if (this.settings.textSize === 'xlarge') {
            body.classList.add('text-size-xlarge');
        }

        // ניגודיות
        if (this.settings.contrast === 'high') {
            body.classList.add('high-contrast');
            setTimeout(() => {
                const btn = document.querySelector('[data-action="high-contrast"]');
                if (btn) btn.classList.add('active');
            }, 0);
        } else if (this.settings.contrast === 'dark') {
            body.classList.add('dark-mode');
            setTimeout(() => {
                const btn = document.querySelector('[data-action="dark-mode"]');
                if (btn) btn.classList.add('active');
            }, 0);
        } else {
            setTimeout(() => {
                const btn = document.querySelector('[data-action="normal-contrast"]');
                if (btn) btn.classList.add('active');
            }, 0);
        }

        // תכונות נוספות
        const features = [
            { setting: 'highlightLinks', class: 'highlight-links', action: 'highlight-links' },
            { setting: 'readableFont', class: 'readable-font', action: 'readable-font' },
            { setting: 'highlightHeadings', class: 'highlight-headings', action: 'highlight-headings' },
            { setting: 'stopAnimations', class: 'stop-animations', action: 'stop-animations' }
        ];

        features.forEach(feature => {
            if (this.settings[feature.setting]) {
                body.classList.add(feature.class);
                setTimeout(() => {
                    const btn = document.querySelector(`[data-action="${feature.action}"]`);
                    if (btn) btn.classList.add('active');
                }, 0);
            }
        });
    }

    setupKeyboardNavigation() {
        // וודא שניתן לנווט בין כל האלמנטים האינטראקטיביים
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                // מאפשר ניווט עם Tab
                if (e.key === 'Tab') {
                    // הדפדפן יטפל בזה באופן אוטומטי
                }

                // מאפשר הפעלה עם Enter או Space לכפתורים
                if ((e.key === 'Enter' || e.key === ' ') && element.tagName === 'BUTTON') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // ניווט בתוך הפאנל
        const panel = document.getElementById('accessibility-panel');
        panel.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusableInPanel = panel.querySelectorAll(
                    'button, [tabindex]:not([tabindex="-1"])'
                );
                const firstFocusable = focusableInPanel[0];
                const lastFocusable = focusableInPanel[focusableInPanel.length - 1];

                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }

    announceToScreenReader(message) {
        // יצירת אזור הודעות לקוראי מסך
        let announcer = document.getElementById('a11y-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'a11y-announcer';
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.classList.add('sr-only');
            document.body.appendChild(announcer);
        }

        // עדכן ההודעה
        announcer.textContent = message;

        // נקה אחרי 1000ms
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }
}

// אתחול כאשר הדף נטען
document.addEventListener('DOMContentLoaded', () => {
    const accessibilityManager = new AccessibilityManager();

    // הוסף הודעה מותאמת לקוראי מסך
    console.log('מנהל הנגישות הופעל בהצלחה');

    // הפעל את כפתור הנגישות אוטומטית בטעינה ראשונה (אופציונלי)
    // accessibilityManager.announceToScreenReader('כפתור נגישות זמין בצד שמאל של המסך');
});

// תמיכה נוספת בקוראי מסך
document.addEventListener('focus', (e) => {
    if (e.target.tagName === 'A' && e.target.hasAttribute('href')) {
        // הוסף מידע נוסף לקישורים
        const href = e.target.getAttribute('href');
        if (href.startsWith('#')) {
            e.target.setAttribute('aria-label', `${e.target.textContent} - קישור פנימי`);
        }
    }
}, true);

// זיהוי העדפות מערכת
if (window.matchMedia) {
    // העדפת מצב כהה במערכת
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeQuery.matches) {
        // ניתן להפעיל אוטומטית מצב כהה אם המשתמש לא שמר הגדרות
        const saved = localStorage.getItem('accessibilitySettings');
        if (!saved) {
            document.body.classList.add('dark-mode');
        }
    }

    // העדפת אנימציות מופחתות
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
        document.body.classList.add('stop-animations');
    }
}
