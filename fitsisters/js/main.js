(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });

    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'slideOutDown',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });

    // International carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        items: 1,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        });

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        });
    });

    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Dynamic Class Type Selection
    $('#appointment-type').change(function () {
        const appointmentType = $(this).val();
        const locationContainer = $('#location-container');
        const classContainer = $('#class-container');

        // Hide or show location and class based on appointment type
        if (appointmentType === 'offline') {
            locationContainer.show();
            classContainer.show();
            $('#class-type').empty().append('<option value="">Pilih Kelas</option>');
        } else {
            locationContainer.hide();
            classContainer.hide();
        }
    });

    $('#location').change(function () {
        const classTypeSelect = $('#class-type');

        // Clear previous options
        classTypeSelect.empty().append('<option value="">Pilih Kelas</option>');

        if ($(this).val() === 'Insan Space Galaxy') {
            classTypeSelect.append(`
                <option value="Mat Pilates">Mat Pilates</option>
                <option value="Get in Shape">Get in Shape</option>
            `);
        } else if ($(this).val()) {
            classTypeSelect.append(`
                <option value="Mat Pilates">Mat Pilates</option>
            `);
        }
    });

    $('.btn-primary').click(function () {
        // Ambil nilai dari input dan select
        const name = $('input[placeholder="Name"]').val();
        const appointmentType = $('#appointment-type').val();
        let location = $('#location').val();
        let classType = $('#class-type').val();
        const comments = $('#area-text').val();

        // Validasi jenis janji temu
        if (!name) {
            alert("Silakan nama terlebih dahulu.");
            
            return; // Hentikan eksekusi jika belum dipilih
        }

        // Validasi jenis janji temu
        if (!appointmentType) {
            alert("Silakan pilih Online / Offline.");
            return; // Hentikan eksekusi jika belum dipilih
        }

        if (!location) {
            alert("Silakan pilih lokasi.");
            return; 
        }

        if (!classType) {
            alert("Silakan pilih kelas.");
            return;
        }

        // Atur nilai untuk online
        if (appointmentType.toLowerCase() === 'online') {
            location = 'Zoom';
            classType = 'Get in Shape';
        }

        // Buat pesan WhatsApp
        let message = `Bismillah, assalamu'alaikum warrahmatullahi wabarakatuh. Saya ${name}, ingin melakukan booking ${classType} ${appointmentType}, di ${location}. ${comments} Terima kasih jazaakillahu khairan`;

        // Encode pesan untuk URL
        const encodedMessage = encodeURIComponent(message);

        // URL WhatsApp
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

        // Alihkan ke WhatsApp
        window.open(whatsappUrl, '_blank');
    });

})(jQuery);
