
$(document).ready(function() {
    console.log('jQuery is ready!');
    
    // --- TASK A: jQuery (Tabs) ---
    $('.tabs-nav .tab-btn').on('click', function() {
        $('.tab-btn').removeClass('active');
        $('.tab-content').removeClass('active');

        $(this).addClass('active');

        const targetTabId = $(this).data('tab');
        $('#' + targetTabId).addClass('active');
    });

    // --- TASK B: jQuery (Smooth Scroll) ---
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        const targetId = $(this).attr('href');
        
        if ($(targetId).length) {
            const targetOffset = $(targetId).offset().top;

            $('html, body').animate({
                scrollTop: targetOffset
            }, 800);
        }
    });

    // --- TASK D: jQuery UI (Drag & Drop and Datepicker) ---
    if ($.ui) {

        $('#draggable').draggable();
        $('#datepicker').datepicker({
            dateFormat: 'dd.mm.yy'
        });
    } else {
        console.error("Error: jQuery UI plugin is not loaded!");
    }
});


document.addEventListener('DOMContentLoaded', () => {

    // --- TASK B: Vanilla JS (Smooth Scroll) ---
    const links = document.querySelectorAll('.smooth-scroll-nav a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = e.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Native smooth scrolling
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- TASK C: VANILLA JS FETCH (Выполнение требования AJAX) ---
    const reviewBox = document.getElementById("reviews");
    const newReviewsBtn = document.getElementById("newReviewsBtn");
    const apiUrlReviews = "https://dummyjson.com/quotes/random"; 

    if (reviewBox && newReviewsBtn) {
        async function loadReview() {
            reviewBox.innerHTML = "Loading..."; 

            try {
                const res = await fetch(apiUrlReviews);

                if (!res.ok) {
                     throw new Error(`HTTP Error: ${res.status}`);
                }

                const data = await res.json();

                // Format as a blockquote
                reviewBox.innerHTML = `
                    <blockquote style="margin: 0;">
                        <p style="font-size:18px;"><i>"${data.quote}"</i></p>
                        <cite>— ${data.author}</cite>
                    </blockquote>
                `;
            } catch (error) {
                console.error("Error loading quote:", error);
                reviewBox.innerHTML = 'Error loading... Try again.';
            }
        }

        newReviewsBtn.onclick = loadReview;
        loadReview(); 
    }

});