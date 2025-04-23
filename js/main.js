
  document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = [
      {
        image: './assets/1add.jpg',
        title: 'Ad',
        description: 'Serene mountain views with pristine lakes and forests',
        link: 'https://www.behance.net/gallery/223500707/Advertising-School-Project-Tiffany-Co'
      },
      {
        image: './assets/cover.jpg',
        title: 'Cover',
        description: 'Serene mountain views with pristine lakes and forests',
        link: 'https://www.behance.net/gallery/223498547/Cloud-Dreams-Ice-Cream-Restaurant-Menu-Project'
      },
      {
        image: './assets/can 3d advertise.jpeg',
        title: 'Can 3D',
        description: 'Serene mountain views with pristine lakes and forests',
        link: 'https://www.behance.net/gallery/223499723/Bam-Bang-can-drink-project'
      },
      {
        image: './assets/fun facts.jpg',
        title: 'Fun Facts',
        description: 'Serene mountain views with pristine lakes and forests',
        link: 'https://xd.adobe.com/view/c5024650-803f-4cc4-b4f8-f5cb2a7f580f-9051/'
      },
      {
        image: './assets/my brand.jpg',
        title: 'My Brand',
        description: 'Serene mountain views with pristine lakes and forests',
        link: 'https://www.behance.net/gallery/223500335/Personal-Branding'
      },
      
    ];
    // constantes for DOM elements
    const galleryWrapper = document.getElementById('galleryWrapper');
    const indicators = document.getElementById('indicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let activeIndex = 0;
    let autoPlayInterval;
    function initGallery() {
        galleryWrapper.innerHTML = '';
        indicators.innerHTML = '';
        galleryItems.forEach((item, index) => {
          const galleryItem = document.createElement('div');
          galleryItem.classList.add('gallery-item');
          if (index === activeIndex) {
            galleryItem.classList.add('center');
          } else if (index === getPrevIndex()) {
            galleryItem.classList.add('left');
          } else if (index === getNextIndex()) {
            galleryItem.classList.add('right');
          } else if (index === getPrevIndex(true)) {
            galleryItem.classList.add('far-left');
          } else if (index === getNextIndex(true)) {
            galleryItem.classList.add('far-right');
          } else {
            galleryItem.style.display = 'none';
          }
          // dynamic containers for images and info
          const galleryLink = document.createElement('a');
          galleryLink.href = item.link || '#';
          galleryLink.target = '_blank';
          galleryLink.classList.add('gallery-link');
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.title;
          const info = document.createElement('div');
          info.classList.add('gallery-info');
          const title = document.createElement('div');
          title.classList.add('gallery-title');
          title.textContent = item.title;
          const description = document.createElement('div');
          description.classList.add('gallery-description');
          description.textContent = item.description;
          info.appendChild(title);
          info.appendChild(description);
          galleryLink.appendChild(img);
          galleryLink.appendChild(info);
          galleryItem.appendChild(galleryLink);
          galleryWrapper.appendChild(galleryItem);
      
          if (index === getPrevIndex() || index === getNextIndex()) {
            galleryItem.addEventListener('click', function () {
              if (index === getPrevIndex()) {
                navigate('prev');
              } else {
                navigate('next');
              }
            });
          }
          const indicator = document.createElement('div');
          indicator.classList.add('gallery-indicator');
          if (index === activeIndex) {
            indicator.classList.add('active');
          }
      
          indicator.addEventListener('click', function () {
            goToSlide(index);
          });
      
          indicators.appendChild(indicator);
        });
      }
    function getPrevIndex(second = false) {
      if (second) {
        if (activeIndex <= 1) {
          return galleryItems.length - (2 - activeIndex);
        }
        return activeIndex - 2;
      }
      
      return activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1;
    }
    
    function getNextIndex(second = false) {
      if (second) {
        if (activeIndex >= galleryItems.length - 2) {
          return activeIndex + 2 - galleryItems.length;
        }
        return activeIndex + 2;
      }
      
      return activeIndex === galleryItems.length - 1 ? 0 : activeIndex + 1;
    }
    function navigate(direction) {
      clearInterval(autoPlayInterval);
      if (direction === 'next') {
        activeIndex = getNextIndex();
      } else {
        activeIndex = getPrevIndex();
      }
      initGallery();
      startAutoPlay();
    }
    function goToSlide(index) {
      clearInterval(autoPlayInterval);
      activeIndex = index;
      initGallery();
      startAutoPlay();
    }
    
    // next slide every 10 seconds
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        navigate('next');
      }, 100000);
    }
    prevBtn.addEventListener('click', function() {
      navigate('prev');
    });
    nextBtn.addEventListener('click', function() {
      navigate('next');
    });
    initGallery();
    startAutoPlay();
  });
