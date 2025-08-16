document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.querySelector('.left-arrow');

    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            alert('Going to the previous page!');
            // Di sini Anda bisa menambahkan logika untuk memuat konten halaman sebelumnya
            // window.location.href = '/previous-page.html';
        });
    }

    // Anda bisa menambahkan event listener untuk halaman atau panah kanan di sini
    // const rightPage = document.querySelector('.right-page');
    // rightPage.addEventListener('click', () => {
    //     alert('Turning to the next page!');
    // });
});