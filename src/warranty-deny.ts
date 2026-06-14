const TARGET_SELECTOR = "#attachSiNoCoverage .a-button-input";

const observer = new MutationObserver((_mutations) => {
    const noThanksBtn = document.querySelector<HTMLElement>(TARGET_SELECTOR);
    if (noThanksBtn && noThanksBtn.offsetParent !== null) {
        noThanksBtn.click();
        console.log('Amazon Auto-Decline Warranty: "No thanks" clicked.');
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
