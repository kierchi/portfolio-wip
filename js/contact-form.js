// ================================
// CONTACT FORM FUNCTIONALITY
// Choose ONE of the options below
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // ================================
    // OPTION 1: MAILTO (Simplest - No Setup)
    // Opens user's email client with pre-filled message
    // ================================
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Create email body
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;
        
        // Open mailto link
        const mailtoLink = `mailto:kailawong@live.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        // Show success message
        showSuccessMessage();
    }
    
    // ================================
    // OPTION 2: FORMSPREE (Free, Easy Setup)
    // Sign up at formspree.io and replace YOUR_FORM_ID
    // ================================
    /*
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccessMessage();
                contactForm.reset();
            } else {
                showErrorMessage();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
        });
    }
    */
    
    // ================================
    // OPTION 3: NETLIFY FORMS (If hosting on Netlify)
    // Just add data-netlify="true" to your form tag
    // ================================
    /*
    // In your HTML, change:
    // <form id="contact-form" class="postcard" data-netlify="true">
    
    // Then this simple handler:
    function handleFormSubmit(e) {
        // Netlify handles it automatically
        // Just show a success message
        showSuccessMessage();
    }
    */
    
    // ================================
    // OPTION 4: GOOGLE FORMS (Free, Google Account)
    // 1. Create a Google Form
    // 2. Get the form ID and field IDs
    // 3. Replace the IDs below
    // ================================
    /*
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Replace these with your Google Form IDs
        const formId = 'YOUR_GOOGLE_FORM_ID';
        const nameFieldId = 'entry.123456789';  // Replace with your field ID
        const emailFieldId = 'entry.987654321'; // Replace with your field ID
        const phoneFieldId = 'entry.567891234'; // Replace with your field ID
        const messageFieldId = 'entry.456789123'; // Replace with your field ID
        
        const googleFormUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse?${nameFieldId}=${encodeURIComponent(name)}&${emailFieldId}=${encodeURIComponent(email)}&${phoneFieldId}=${encodeURIComponent(phone)}&${messageFieldId}=${encodeURIComponent(message)}`;
        
        // Submit to Google Forms
        fetch(googleFormUrl, {
            method: 'POST',
            mode: 'no-cors'
        })
        .then(() => {
            showSuccessMessage();
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
        });
    }
    */
    
    // ================================
    // Success/Error Message Display
    // ================================
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'form-message success';
        message.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>Postcard sent! Thanks for reaching out!</p>
        `;
        
        contactForm.insertAdjacentElement('afterend', message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    function showErrorMessage() {
        const message = document.createElement('div');
        message.className = 'form-message error';
        message.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>Oops! Something went wrong. Please try emailing me directly.</p>
        `;
        
        contactForm.insertAdjacentElement('afterend', message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
});
