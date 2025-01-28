const FORM_LIST = document.getElementById("sub-form");
const MODAL = document.getElementById("modal");

FORM_LIST?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const {email, btn} = FORM_LIST;
    if(!email.value) return;
    
    const response = await fetch("/api/emails", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "email":email.value
        }
    });

    if (!response.status == 404){
        email.value = '';

        let temp = MODAL.textContent;
        let thank_text = "Thank you!"
        
        MODAL.innerHTML = thank_text;
        email.disabled = true;
        btn.disabled = true;
        btn.style.cursor = "auto";

        setTimeout(() => {
            MODAL.innerHTML = temp;
        }, 2000);

        email.placeholder = thank_text;
    }
}); 