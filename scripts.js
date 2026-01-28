// Event listener untuk memastikan DOM telah dimuat sebelum menjalankan kode
document.addEventListener("DOMContentLoaded", () => {
  // Mendapatkan elemen header utama untuk manipulasi kelas saat scroll
  // Avoid errors if element missing
  const header = document.getElementById("main-header");
  // Fungsi debounce untuk mengoptimalkan handler scroll dan resize
  // Debounce utility for scroll/resize handlers
  const debounce = (fn, wait = 12) => {
    // Variabel untuk menyimpan ID timeout
    let t;
    // Fungsi yang mengembalikan versi didebounce dari fungsi asli
    return (...args) => {
      // Membersihkan timeout sebelumnya
      clearTimeout(t);
      // Membuat timeout baru dengan fungsi asli
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  };

  // Jika header ada, tambahkan event listener untuk scroll
  if (header) {
    // Fungsi yang dipanggil saat scroll untuk mengubah tampilan header
    const onScroll = () => {
      // Jika scroll lebih dari 50px, tambahkan kelas efek glass dan bayangan
      if (window.scrollY > 50) {
        header.classList.add("glass-effect", "shadow-lg");
      } else {
        // Jika tidak, hapus kelas efek glass dan bayangan
        header.classList.remove("glass-effect", "shadow-lg");
      }
    };
    // Menambahkan event listener scroll dengan debounce
    window.addEventListener("scroll", debounce(onScroll, 15));
  }

  // Vanta.js Network Effect for Hero Section
  // Initialize Vanta.js if it's available and there's a home section
  let vantaEffect = null;
  const homeSection = document.getElementById("home");

  if (homeSection && typeof VANTA !== "undefined") {
    // Function to get Vanta.js effect options based on current theme
    const getVantaOptions = (isLightMode = false) => {
      if (isLightMode) {
        // Light mode colors - using light blue/gray for code-flow effect
        return {
          el: homeSection,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x7a869c, // light slate color
          backgroundColor: 0xf0f9ff, // light background color
          points: 12,
          maxDistance: 22,
          spacing: 18,
          showDots: false,
          lineWidth: 1.3,
          linkLineAlpha: 0.45,
          tension: 0.98,
        };
      } else {
        // Dark mode colors - using neon green for code-flow effect
        return {
          el: homeSection,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x4ade80, // neon green color
          backgroundColor: 0x0f172a, // dark background color
          points: 12,
          maxDistance: 22,
          spacing: 18,
          showDots: false,
          lineWidth: 1.3,
          linkLineAlpha: 0.55,
          tension: 0.98,
        };
      }
    };

    // Initialize Vanta.js with current theme
    const isLightMode = document.body.classList.contains("light");
    vantaEffect = VANTA.NET(getVantaOptions(isLightMode));

    // Update Vanta.js effect when theme changes
    const updateVantaEffect = (isLight) => {
      if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = VANTA.NET(getVantaOptions(isLight));
      }
    };

    // Handle window resize to maintain performance
    window.addEventListener(
      "resize",
      debounce(() => {
        // Vanta.js automatically handles resize, but we can add any resize-specific logic here
      }, 250)
    );
  }

  // Pengaturan tema (warna aksen)
  // Mendapatkan elemen panel pengaturan tema
  const themeSettingsPanel = document.getElementById("theme-settings");
  // Mendapatkan tombol buka pengaturan tema
  const openBtn = document.getElementById("open-theme-settings");
  // Mendapatkan tombol tutup pengaturan tema
  const closeBtn = document.getElementById("close-theme-settings");

  // Fungsi untuk toggle tampilan panel tema
  function toggleThemePanel(show) {
    if (show) {
      // Jika show=true, hapus kelas untuk menggeser panel ke dalam layar
      themeSettingsPanel.classList.remove("translate-x-full");
      // Hapus atribut inert agar elemen dapat diakses
      themeSettingsPanel.removeAttribute("inert");
      // Ubah aria-hidden menjadi false agar elemen dapat diakses oleh assistive technology
      themeSettingsPanel.setAttribute("aria-hidden", "false");
    } else {
      // Jika show=false, tambahkan kelas untuk menggeser panel keluar layar
      themeSettingsPanel.classList.add("translate-x-full");
      // Tambahkan atribut inert agar elemen tidak dapat diakses
      themeSettingsPanel.setAttribute("inert", "");
      // Ubah aria-hidden menjadi true agar elemen tidak dapat diakses oleh assistive technology
      themeSettingsPanel.setAttribute("aria-hidden", "true");
    }
  }

  // Tambahkan event listener untuk tombol buka pengaturan tema
  if (openBtn) openBtn.addEventListener("click", () => toggleThemePanel(true));
  // Tambahkan event listener untuk tombol tutup pengaturan tema
  if (closeBtn)
    closeBtn.addEventListener("click", () => toggleThemePanel(false));

  // Mendapatkan elemen untuk tombol warna tema
  const colorOptions = document.getElementById("color-options");
  // Array warna yang tersedia untuk tema
  const colors = [
    // Warna violet
    { name: "violet", hex: "#8b5cf6", rgb: "139, 92, 246" },
    // Warna sky
    { name: "sky", hex: "#0ea5e9", rgb: "14, 165, 233" },
    // Warna emerald
    { name: "emerald", hex: "#10b981", rgb: "16, 185, 129" },
    // Warna rose
    { name: "rose", hex: "#f43f5e", rgb: "244, 63, 94" },
    // Warna amber
    { name: "amber", hex: "#f59e0b", rgb: "245, 158, 11" },
  ];

  // Loop melalui warna dan buat tombol untuk masing-masing
  colors.forEach((color) => {
    // Buat elemen tombol baru
    const btn = document.createElement("button");
    // Tambahkan kelas untuk tampilan tombol
    btn.className =
      "h-10 w-10 rounded-full border-2 border-slate-700 transition hover:border-white";
    // Atur warna latar belakang sesuai warna
    btn.style.backgroundColor = color.hex;
    // Tambahkan label aksesibilitas
    btn.setAttribute("aria-label", `Select ${color.name} theme`);
    // Tambahkan tipe button
    btn.type = "button";
    // Tambahkan event listener untuk mengganti warna tema saat di klik
    btn.addEventListener("click", () => {
      // Setel variabel CSS untuk warna aksen
      document.documentElement.style.setProperty("--accent-color", color.hex);
      // Setel variabel CSS untuk warna RGB aksen
      document.documentElement.style.setProperty("--accent-rgb", color.rgb);
    });
    // Tambahkan tombol ke kontainer jika tersedia
    if (colorOptions) colorOptions.appendChild(btn);
  });

  // Inisialisasi Typed.js (guard if library loaded)
  if (typeof Typed !== "undefined" && document.getElementById("typed-text")) {
    try {
      // Inisialisasi Typed.js dengan opsi tertentu
      new Typed("#typed-text", {
        // Array string yang akan ditampilkan secara bergantian
        strings: [
          "Web Developer.",
          "UI/UX Designer.",
          "Java Enthusiast.",
          "Data Engineer.",
          "AI Explorer.",
        ],
        // Kecepatan pengetikan karakter (ms per karakter)
        typeSpeed: 60,
        // Kecepatan penghapusan karakter (ms per karakter)
        backSpeed: 30,
        // Delay before backspacing
        backDelay: 1700,
        // Ulangi animasi secara terus-menerus
        loop: true,
        // Hapus hanya karakter yang berbeda saat mengganti string
        smartBackspace: true,
      });
    } catch (e) {
      // Log peringatan jika inisialisasi Typed.js gagal
      console.warn("Typed.js init failed", e);
    }
  }

  // Inisialisasi AOS (Animate On Scroll)
  // Initialize AOS if available
  if (typeof AOS !== "undefined" && AOS && AOS.init) {
    // Inisialisasi AOS dengan opsi tertentu
    AOS.init({
      // Durasi animasi dalam milidetik
      duration: 800,
      // Animasikan ulang saat di scroll lagi (untuk efek saat scroll up/down)
      once: false,
      // Jarak dalam pixel sebelum elemen terlihat untuk memicu animasi
      offset: 120,
      // Jenis easing untuk animasi
      easing: "ease-out-cubic",
      // Delay antar animasi
      delay: 50,
      // Animasi akan aktif saat 30% elemen terlihat
      threshold: 0.3,
      // Animasi yang lebih halus saat scroll
      mirror: true,
      // Animasi yang aktif di mobile
      disable: false,
    });
  }

  // Update tahun copyright secara dinamis
  document.getElementById("copyright-year").textContent =
    new Date().getFullYear();

  // Fungsionalitas menu mobile

  // Mendapatkan tombol menu mobile
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  // Mendapatkan menu mobile
  const mobileMenu = document.getElementById("mobile-menu");

  // Jika kedua elemen tersedia, tambahkan event listener
  if (mobileMenuButton && mobileMenu) {
    // Tambahkan event listener untuk tombol menu mobile
    mobileMenuButton.addEventListener("click", (e) => {
      // Mencegah event bubble ke elemen luar
      e.stopPropagation();
      // Cek apakah menu saat ini dalam keadaan diperluas
      const isExpanded =
        mobileMenuButton.getAttribute("aria-expanded") === "true";
      // Ubah status aria-expanded
      mobileMenuButton.setAttribute("aria-expanded", String(!isExpanded));
      // Toggle visibilitas menu
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Menutup menu saat link di klik atau klik di luar area
  // Tambahkan event listener untuk semua link di menu mobile dan navigasi utama
  document.querySelectorAll("#mobile-menu a, #main-nav a").forEach((link) => {
    // Tambahkan event listener untuk setiap link
    link.addEventListener("click", () => {
      // Sembunyikan menu mobile
      if (mobileMenu) mobileMenu.classList.add("hidden");
      // Setel aria-expanded ke false untuk tombol menu mobile
      if (mobileMenuButton)
        mobileMenuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Tambahkan event listener untuk seluruh dokumen
  document.addEventListener("click", (e) => {
    // Cek jika klik tidak terjadi pada menu atau tombol menu
    if (
      mobileMenu &&
      mobileMenuButton &&
      !mobileMenu.contains(e.target) &&
      e.target !== mobileMenuButton
    ) {
      // Sembunyikan menu mobile
      mobileMenu.classList.add("hidden");
      // Setel aria-expanded ke false
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  // ========== LIGHT/DARK MODE TOGGLE LOGIC START ==========
  // Mendapatkan tombol toggle tema desktop
  const themeToggleBtn = document.getElementById("theme-toggle");
  // Mendapatkan tombol toggle tema mobile
  const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle");

  // Array ikon matahari
  const sunIcons = [
    document.getElementById("theme-icon-sun"),
    document.getElementById("mobile-theme-icon-sun"),
  ];
  // Array ikon bulan
  const moonIcons = [
    document.getElementById("theme-icon-moon"),
    document.getElementById("mobile-theme-icon-moon"),
  ];
  // Elemen teks untuk status tema mobile
  const mobileThemeText = document.getElementById("mobile-theme-text");

  // Fungsi untuk menerapkan tema tertentu
  const applyTheme = (theme) => {
    if (theme === "light") {
      // Jika tema terang, tambahkan kelas light ke body
      document.body.classList.add("light");
      // Tampilkan ikon matahari
      sunIcons.forEach((icon) => icon.classList.remove("hidden"));
      // Sembunyikan ikon bulan
      moonIcons.forEach((icon) => icon.classList.add("hidden"));
      // Ubah teks tombol mobile ke "Switch to Dark"
      if (mobileThemeText) mobileThemeText.textContent = "Switch to Dark";
      // Simpan tema ke localStorage
      localStorage.setItem("theme", "light");

      // Update Vanta.js effect for light mode if it exists
      if (vantaEffect && typeof VANTA !== "undefined") {
        vantaEffect.setOptions({
          color: 0x7a869c, // light slate color
          backgroundColor: 0xf0f9ff, // light background color
        });
      }
    } else {
      // Jika tema gelap, hapus kelas light dari body
      document.body.classList.remove("light");
      // Sembunyikan ikon matahari
      sunIcons.forEach((icon) => icon.classList.add("hidden"));
      // Tampilkan ikon bulan
      moonIcons.forEach((icon) => icon.classList.remove("hidden"));
      // Ubah teks tombol mobile ke "Switch to Light"
      if (mobileThemeText) mobileThemeText.textContent = "Switch to Light";
      // Simpan tema ke localStorage
      localStorage.setItem("theme", "dark");

      // Update Vanta.js effect for dark mode if it exists
      if (vantaEffect && typeof VANTA !== "undefined") {
        vantaEffect.setOptions({
          color: 0x4ade80, // neon green color
          backgroundColor: 0x0f172a, // dark background color
        });
      }
    }
  };

  // Fungsi untuk toggle antara tema terang dan gelap
  const toggleTheme = () => {
    // Ambil tema saat ini dari localStorage, default ke "dark"
    const currentTheme = localStorage.getItem("theme") || "dark";
    // Terapkan tema yang berlawanan
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  };

  // Tambahkan event listener untuk tombol toggle tema desktop
  if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);
  // Tambahkan event listener untuk tombol toggle tema mobile
  if (mobileThemeToggleBtn)
    mobileThemeToggleBtn.addEventListener("click", () => {
      // Toggle tema
      toggleTheme();
      // Juga tutup menu mobile
      if (mobileMenu) mobileMenu.classList.add("hidden");
      if (mobileMenuButton)
        mobileMenuButton.setAttribute("aria-expanded", "false");
    });

  // Check for saved theme preference
  // Ambil tema yang disimpan dari localStorage
  const savedTheme = localStorage.getItem("theme");
  // Periksa preferensi warna sistem pengguna
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  // Jika ada tema yang disimpan, gunakan itu
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersLight) {
    // Jika tidak ada tema disimpan tetapi sistem menggunakan tema terang, gunakan tema terang
    applyTheme("light");
  } else {
    // Jika tidak ada tema disimpan dan sistem menggunakan tema gelap, gunakan tema gelap
    applyTheme("dark");
  }
  // ========== LIGHT/DARK MODE TOGGLE LOGIC END ==========

  // ========== MODAL FUNCTIONALITY START ==========
  // Mendapatkan elemen modal dan bagian-bagiannya
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalTech = document.getElementById("modal-tech");
  const modalLiveLink = document.getElementById("modal-live-link");
  const modalCodeLink = document.getElementById("modal-code-link");
  const modalCloseBtn = document.querySelector(".close");

  // Data proyek untuk ditampilkan di modal
  const projects = [
    {
      // Data untuk proyek 1: E-commerce Website
      title: "E-commerce Website",
      image: "/images/project1-400.jpg",
      description:
        "A responsive online store built with React and Node.js. Features include product catalog, shopping cart, user authentication, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "#",
      codeLink: "#",
    },
    {
      // Data untuk proyek 2: Analytics Dashboard
      title: "Analytics Dashboard",
      image: "/images/project2-400.jpg",
      description:
        "Interactive dashboard with real-time data visualization. Built with Vue.js and D3.js for comprehensive analytics and reporting.",
      tech: ["Vue.js", "D3.js", "Firebase", "Chart.js"],
      liveLink: "#",
      codeLink: "#",
    },
    {
      // Data untuk proyek 3: Mobile App UI
      title: "Mobile App UI",
      image: "/images/project3-400.jpg",
      description:
        "Clean and intuitive mobile application interface design. Created with Figma, focusing on user experience and modern design principles.",
      tech: ["Figma", "UI/UX", "Prototyping", "Design System"],
      liveLink: "#",
      codeLink: "#",
    },
  ];

  // Function to open modal
  function openModal(projectIndex) {
    // Ambil data proyek berdasarkan indeks
    const project = projects[projectIndex];
    // Setel judul modal
    modalTitle.textContent = project.title;
    // Setel gambar modal
    modalImage.src = project.image;
    // Setel alt gambar
    modalImage.alt = project.title;
    // Setel deskripsi modal
    modalDescription.textContent = project.description;

    // Hapus tag teknologi yang ada sebelumnya
    modalTech.innerHTML = "";
    // Loop melalui array teknologi dan buat elemen span untuk masing-masing
    project.tech.forEach((tech) => {
      // Buat elemen span baru
      const span = document.createElement("span");
      // Tambahkan kelas untuk tampilan tag teknologi
      span.className =
        "text-xs font-medium bg-slate-700 text-slate-300 px-2 py-1 rounded-full";
      // Setel teks teknologi
      span.textContent = tech;
      // Tambahkan span ke kontainer teknologi
      modalTech.appendChild(span);
    });

    // Setel tautan live dan kode
    modalLiveLink.href = project.liveLink;
    modalCodeLink.href = project.codeLink;

    // Tampilkan modal
    modal.style.display = "block";
    // Cegah scroll pada background
    document.body.style.overflow = "hidden";
  }

  // Function to close modal
  function closeModal() {
    // Sembunyikan modal
    modal.style.display = "none";
    // Kembalikan kemampuan scroll pada body
    document.body.style.overflow = "auto";
  }

  // Tambahkan event listener untuk tombol tutup
  modalCloseBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  // Tambahkan event listener untuk menutup modal saat klik di luar
  window.addEventListener("click", (e) => {
    // Jika target klik adalah elemen modal itu sendiri, tutup modal
    if (e.target === modal) {
      closeModal();
    }
  });

  // Add click events to "View Project" links
  // Ambil semua tautan "View Project"
  const viewProjectLinks = document.querySelectorAll('.group a[href^="#"]');
  // Tambahkan event listener untuk setiap tautan
  viewProjectLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      // Mencegah perilaku default tautan
      e.preventDefault();
      // Buka modal dengan indeks proyek yang sesuai
      openModal(index);
    });
  });

  // ========== MODAL FUNCTIONALITY END ==========

  // ========== SCROLL ANIMATION CONTROLLER ==========
  // Parallax effect for background elements
  window.addEventListener("scroll", function () {
    // Parallax effect for the background
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax-element");

    // Apply parallax effect to elements with the class
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    // Enhanced header effect on scroll
    if (header) {
      const scrollPosition = window.scrollY;
      const headerOpacity = 1 - Math.min(scrollPosition / 200, 0.7);
      header.style.opacity = headerOpacity;
    }
  });

  // Intersection Observer for advanced scroll animations
  if ("IntersectionObserver" in window) {
    // Observer options
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animated class when element comes into view
          entry.target.classList.add("animated");

          // Add specific animation class based on data attribute
          const animationType = entry.target.dataset.animation || "fadeInUp";
          entry.target.classList.add(animationType);

          // Remove the observer after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with data-animate attribute
    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate offset to account for fixed header
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll progress indicator
  if (document.getElementById("progress-bar")) {
    window.addEventListener("scroll", () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById("progress-bar").style.width = scrolled + "%";
    });
  } else {
    // Create and add a scroll progress bar if it doesn't exist
    const progressBar = document.createElement("div");
    progressBar.id = "progress-bar";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--accent-color);
      z-index: 9999;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    // Add CSS for smooth scrollbar
    window.addEventListener("scroll", () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById("progress-bar").style.width = scrolled + "%";
    });
  }

  // 3D Floating Elements in the Hero Section
  if (typeof THREE !== "undefined") {
    // Create 3D floating elements in the hero section
    function createFloatingElements() {
      // Get the hero section
      const heroSection = document.getElementById("home");
      if (!heroSection) return;

      // Create a container for the 3D canvas
      const canvasContainer = document.createElement("div");
      canvasContainer.id = "floating-elements-container";
      canvasContainer.style.position = "absolute";
      canvasContainer.style.top = "0";
      canvasContainer.style.left = "0";
      canvasContainer.style.width = "100%";
      canvasContainer.style.height = "100%";
      canvasContainer.style.pointerEvents = "none";
      canvasContainer.style.zIndex = "5";
      canvasContainer.style.overflow = "hidden";
      canvasContainer.style.borderRadius = "0.5rem";

      // Insert the container at the beginning of the hero section
      heroSection.insertBefore(canvasContainer, heroSection.firstChild);

      // Initialize Three.js scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      canvasContainer.appendChild(renderer.domElement);

      // Create floating objects
      const floatingObjects = [];
      const colors = [
        new THREE.Color(0x8b5cf6), // violet
        new THREE.Color(0x0ea5e9), // sky
        new THREE.Color(0x10b981), // emerald
        new THREE.Color(0xf43f5e), // rose
        new THREE.Color(0xf59e0b), // amber
      ];

      // Create floating cubes
      for (let i = 0; i < 15; i++) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          transparent: true,
          opacity: 0.8,
          wireframe: Math.random() > 0.5,
        });
        const cube = new THREE.Mesh(geometry, material);

        // Position randomly within view
        cube.position.x = (Math.random() - 0.5) * 10;
        cube.position.y = (Math.random() - 0.5) * 5;
        cube.position.z = (Math.random() - 0.5) * 5 - 5;

        // Set random rotation and scale
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        cube.userData = {
          speedX: (Math.random() - 0.5) * 0.01,
          speedY: (Math.random() - 0.5) * 0.01,
          speedZ: (Math.random() - 0.5) * 0.01,
          rotationSpeedX: (Math.random() - 0.5) * 0.02,
          rotationSpeedY: (Math.random() - 0.5) * 0.02,
          rotationSpeedZ: (Math.random() - 0.5) * 0.02,
          scale: 0.5 + Math.random() * 0.7,
        };

        cube.scale.set(
          cube.userData.scale,
          cube.userData.scale,
          cube.userData.scale
        );
        scene.add(cube);
        floatingObjects.push(cube);
      }

      // Create floating spheres
      for (let i = 0; i < 10; i++) {
        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          transparent: true,
          opacity: 0.7,
          wireframe: Math.random() > 0.3,
        });
        const sphere = new THREE.Mesh(geometry, material);

        // Position randomly within view
        sphere.position.x = (Math.random() - 0.5) * 10;
        sphere.position.y = (Math.random() - 0.5) * 5;
        sphere.position.z = (Math.random() - 0.5) * 5 - 5;

        // Set random rotation and scale
        sphere.rotation.x = Math.random() * Math.PI;
        sphere.rotation.y = Math.random() * Math.PI;
        sphere.userData = {
          speedX: (Math.random() - 0.5) * 0.01,
          speedY: (Math.random() - 0.5) * 0.01,
          speedZ: (Math.random() - 0.5) * 0.01,
          rotationSpeedX: (Math.random() - 0.5) * 0.02,
          rotationSpeedY: (Math.random() - 0.5) * 0.02,
          rotationSpeedZ: (Math.random() - 0.5) * 0.02,
          scale: 0.4 + Math.random() * 0.6,
        };

        sphere.scale.set(
          sphere.userData.scale,
          sphere.userData.scale,
          sphere.userData.scale
        );
        scene.add(sphere);
        floatingObjects.push(sphere);
      }

      // Create floating torus knots
      for (let i = 0; i < 8; i++) {
        const geometry = new THREE.TorusKnotGeometry(0.4, 0.15, 64, 16);
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          transparent: true,
          opacity: 0.9,
          wireframe: true,
        });
        const torusKnot = new THREE.Mesh(geometry, material);

        // Position randomly within view
        torusKnot.position.x = (Math.random() - 0.5) * 10;
        torusKnot.position.y = (Math.random() - 0.5) * 5;
        torusKnot.position.z = (Math.random() - 0.5) * 5 - 5;

        // Set random rotation and scale
        torusKnot.rotation.x = Math.random() * Math.PI;
        torusKnot.rotation.y = Math.random() * Math.PI;
        torusKnot.userData = {
          speedX: (Math.random() - 0.5) * 0.01,
          speedY: (Math.random() - 0.5) * 0.01,
          speedZ: (Math.random() - 0.5) * 0.01,
          rotationSpeedX: (Math.random() - 0.5) * 0.02,
          rotationSpeedY: (Math.random() - 0.5) * 0.02,
          rotationSpeedZ: (Math.random() - 0.5) * 0.02,
          scale: 0.6 + Math.random() * 0.6,
        };

        torusKnot.scale.set(
          torusKnot.userData.scale,
          torusKnot.userData.scale,
          torusKnot.userData.scale
        );
        scene.add(torusKnot);
        floatingObjects.push(torusKnot);
      }

      // Position camera
      camera.position.z = 5;

      // Mouse move interaction
      let mouseX = 0;
      let mouseY = 0;

      document.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      });

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);

        // Update floating objects
        floatingObjects.forEach((obj) => {
          obj.rotation.x += obj.userData.rotationSpeedX;
          obj.rotation.y += obj.userData.rotationSpeedY;
          obj.rotation.z += obj.userData.rotationSpeedZ;

          obj.position.x += obj.userData.speedX;
          obj.position.y += obj.userData.speedY;
          obj.position.z += obj.userData.speedZ;

          // Add subtle movement based on mouse position
          obj.position.x += mouseX * 0.001;
          obj.position.y += mouseY * 0.001;

          // Reset position if out of bounds
          if (Math.abs(obj.position.x) > 8) obj.position.x *= -1;
          if (Math.abs(obj.position.y) > 6) obj.position.y *= -1;
          if (Math.abs(obj.position.z) > 10) obj.position.z *= -1;
        });

        // Add subtle camera movement based on mouse
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }

      animate();

      // Handle window resize
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    // Initialize floating elements when DOM is loaded
    createFloatingElements();
  }

  // 3D Interactive Elements in the Services Section
  if (typeof THREE !== "undefined") {
    // Create 3D interactive elements in the services section
    function createServices3DElements() {
      const servicesSection = document.getElementById("services");
      if (!servicesSection) return;

      // Add a container for the 3D canvas in the services section
      const servicesContainer = document.createElement("div");
      servicesContainer.id = "services-3d-container";
      servicesContainer.style.position = "absolute";
      servicesContainer.style.top = "0";
      servicesContainer.style.left = "0";
      servicesContainer.style.width = "100%";
      servicesContainer.style.height = "100%";
      servicesContainer.style.pointerEvents = "none";
      servicesContainer.style.zIndex = "0";
      servicesContainer.style.overflow = "hidden";
      servicesContainer.style.marginTop = "-100px";
      servicesContainer.style.marginBottom = "-100px";

      // Insert the container at the beginning of the services section
      servicesSection.insertBefore(
        servicesContainer,
        servicesSection.firstChild
      );

      // Initialize Three.js scene for services
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        servicesContainer.clientWidth / servicesContainer.clientHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(
        servicesContainer.clientWidth,
        servicesContainer.clientHeight
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      servicesContainer.appendChild(renderer.domElement);

      // Create interactive service icons as 3D objects
      const serviceIcons = [];
      const serviceItems = document.querySelectorAll("#services .group");
      const colors = [
        new THREE.Color(0x8b5cf6), // violet
        new THREE.Color(0x0ea5e9), // sky
        new THREE.Color(0x10b981), // emerald
        new THREE.Color(0xf43f5e), // rose
        new THREE.Color(0xf59e0b), // amber
        new THREE.Color(0x8b5cf6), // violet again
      ];

      // Create 3D objects for each service
      serviceItems.forEach((item, index) => {
        // Skip every other item to avoid overcrowding
        if (index % 2 === 0) {
          const geometry = new THREE.OctahedronGeometry(0.4, 0);
          const material = new THREE.MeshBasicMaterial({
            color: colors[index % colors.length],
            transparent: true,
            opacity: 0.6,
            wireframe: false,
          });
          const serviceObject = new THREE.Mesh(geometry, material);

          // Position based on the service card's position
          const rect = item.getBoundingClientRect();
          const containerRect = servicesSection.getBoundingClientRect();

          // Convert screen coordinates to scene coordinates
          serviceObject.position.x =
            (rect.left +
              rect.width / 2 -
              containerRect.left -
              containerRect.width / 2) /
            100;
          serviceObject.position.y =
            -(
              rect.top +
              rect.height / 2 -
              containerRect.top -
              containerRect.height / 2
            ) / 100;
          serviceObject.position.z = -2;

          serviceObject.userData = {
            baseX: serviceObject.position.x,
            baseY: serviceObject.position.y,
            baseZ: serviceObject.position.z,
            rotationSpeedX: (Math.random() - 0.5) * 0.01,
            rotationSpeedY: (Math.random() - 0.5) * 0.01,
            rotationSpeedZ: (Math.random() - 0.5) * 0.01,
            scale: 0.8 + Math.random() * 0.4,
          };

          serviceObject.scale.set(
            serviceObject.userData.scale,
            serviceObject.userData.scale,
            serviceObject.userData.scale
          );
          scene.add(serviceObject);
          serviceIcons.push({
            object: serviceObject,
            element: item,
          });
        }
      });

      // Position camera
      camera.position.z = 5;

      // Mouse move interaction for services
      let servicesMouseX = 0;
      let servicesMouseY = 0;

      document.addEventListener("mousemove", (event) => {
        if (!servicesSection.contains(event.target)) return;

        const rect = servicesSection.getBoundingClientRect();
        servicesMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        servicesMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      });

      // Animation loop for services
      function animateServices() {
        requestAnimationFrame(animateServices);

        // Update service 3D objects
        serviceIcons.forEach((service) => {
          const rect = service.element.getBoundingClientRect();
          const containerRect = servicesSection.getBoundingClientRect();

          // Convert screen coordinates to scene coordinates
          const targetX =
            (rect.left +
              rect.width / 2 -
              containerRect.left -
              containerRect.width / 2) /
            100;
          const targetY =
            -(
              rect.top +
              rect.height / 2 -
              containerRect.top -
              containerRect.height / 2
            ) / 100;

          // Apply subtle movement based on mouse position
          service.object.position.x = targetX + servicesMouseX * 0.5;
          service.object.position.y = targetY + servicesMouseY * 0.5;
          service.object.position.z = service.object.userData.baseZ;

          // Rotate the object
          service.object.rotation.x += service.object.userData.rotationSpeedX;
          service.object.rotation.y += service.object.userData.rotationSpeedY;
          service.object.rotation.z += service.object.userData.rotationSpeedZ;
        });

        renderer.render(scene, camera);
      }

      animateServices();

      // Handle window resize for services
      window.addEventListener("resize", () => {
        camera.aspect =
          servicesContainer.clientWidth / servicesContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          servicesContainer.clientWidth,
          servicesContainer.clientHeight
        );
      });
    }

    // Initialize services 3D elements when DOM is loaded
    setTimeout(createServices3DElements, 500); // Delay to ensure DOM is fully loaded
  }

  // 3D Rotation Effects for Portfolio Cards
  if (typeof THREE !== "undefined") {
    // Create 3D rotation effects for portfolio cards
    function createPortfolio3DCards() {
      const portfolioSection = document.getElementById("portfolio");
      if (!portfolioSection) return;

      // Get all portfolio cards
      const portfolioCards = document.querySelectorAll("#portfolio .group");

      portfolioCards.forEach((card, index) => {
        // Create a container for the 3D canvas for this card
        const cardContainer = document.createElement("div");
        cardContainer.className = "portfolio-3d-container";
        cardContainer.style.position = "absolute";
        cardContainer.style.top = "0";
        cardContainer.style.left = "0";
        cardContainer.style.width = "100%";
        cardContainer.style.height = "100%";
        cardContainer.style.pointerEvents = "none";
        cardContainer.style.zIndex = "0";
        cardContainer.style.overflow = "hidden";
        cardContainer.style.opacity = "0.3";
        cardContainer.style.borderRadius = "0.5rem";

        // Add the container to the card
        card.style.position = "relative";
        card.appendChild(cardContainer);

        // Initialize Three.js scene for each card
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          card.clientWidth / card.clientHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        renderer.setSize(card.clientWidth, card.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        cardContainer.appendChild(renderer.domElement);

        // Create 3D object for the card
        const geometry = new THREE.DodecahedronGeometry(0.6, 0);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(`hsl(${index * 60}, 70%, 60%)`),
          transparent: true,
          opacity: 0.4,
          wireframe: false,
        });
        const cardObject = new THREE.Mesh(geometry, material);

        // Position the object
        cardObject.position.z = -1;
        scene.add(cardObject);

        // Position camera
        camera.position.z = 2;

        // Mouse move interaction for this card
        let cardMouseX = 0;
        let cardMouseY = 0;

        card.addEventListener("mousemove", (event) => {
          const rect = card.getBoundingClientRect();
          cardMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          cardMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        });

        card.addEventListener("mouseleave", () => {
          cardMouseX = 0;
          cardMouseY = 0;
        });

        // Animation loop for this card
        function animateCard() {
          requestAnimationFrame(animateCard);

          // Rotate the object based on mouse position
          cardObject.rotation.x = cardMouseY * 0.5;
          cardObject.rotation.y = cardMouseX * 0.5;

          // Add subtle auto-rotation
          cardObject.rotation.z += 0.002;

          renderer.render(scene, camera);
        }

        animateCard();

        // Handle window resize for this card
        window.addEventListener("resize", () => {
          camera.aspect = card.clientWidth / card.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(card.clientWidth, card.clientHeight);
        });
      });
    }

    // Initialize portfolio 3D cards when DOM is loaded
    setTimeout(createPortfolio3DCards, 1000); // Delay to ensure DOM is fully loaded
  }

  // Enhanced Parallax Scrolling Effects for the Entire Page
  // Parallax effect for background elements
  window.addEventListener("scroll", function () {
    // Parallax effect for the background
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax-element");

    // Apply parallax effect to elements with the class
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    // Enhanced header effect on scroll
    if (header) {
      const scrollPosition = window.scrollY;
      const headerOpacity = 1 - Math.min(scrollPosition / 200, 0.7);
      header.style.opacity = headerOpacity;
    }

    // Enhanced parallax for 3D elements
    const floatingElements = document.querySelectorAll(
      "#floating-elements-container canvas"
    );
    floatingElements.forEach((canvas) => {
      const yPos = -(scrolled * 0.1);
      canvas.style.transform = `translateY(${yPos}px)`;
    });

    // Parallax effect for services 3D elements
    const servicesElements = document.querySelectorAll(
      "#services-3d-container canvas"
    );
    servicesElements.forEach((canvas) => {
      const yPos = -(scrolled * 0.05);
      canvas.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Enhanced mouse move parallax effect
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    // Apply to floating elements
    const floatingContainers = document.querySelectorAll(
      "#floating-elements-container"
    );
    floatingContainers.forEach((container) => {
      container.style.transform = `rotateY(${x / 20}deg) rotateX(${y / 20}deg)`;
    });

    // Apply to services elements
    const servicesContainers = document.querySelectorAll(
      "#services-3d-container"
    );
    servicesContainers.forEach((container) => {
      container.style.transform = `rotateY(${x / 30}deg) rotateX(${y / 30}deg)`;
    });

    // Apply to portfolio card containers
    const portfolioContainers = document.querySelectorAll(
      ".portfolio-3d-container"
    );
    portfolioContainers.forEach((container) => {
      container.style.transform = `rotateY(${x / 40}deg) rotateX(${y / 40}deg)`;
    });
  });

  // 3D Interactive Elements in the Contact Section
  if (typeof THREE !== "undefined") {
    // Create 3D interactive elements in the contact section
    function createContact3DElements() {
      const contactSection = document.getElementById("contact");
      if (!contactSection) return;

      // Add a container for the 3D canvas in the contact section
      const contactContainer = document.createElement("div");
      contactContainer.id = "contact-3d-container";
      contactContainer.style.position = "absolute";
      contactContainer.style.top = "0";
      contactContainer.style.left = "0";
      contactContainer.style.width = "100%";
      contactContainer.style.height = "100%";
      contactContainer.style.pointerEvents = "none";
      contactContainer.style.zIndex = "0";
      contactContainer.style.overflow = "hidden";
      contactContainer.style.marginTop = "-100px";
      contactContainer.style.marginBottom = "-100px";

      // Insert the container at the beginning of the contact section
      contactSection.style.position = "relative";
      contactSection.insertBefore(contactContainer, contactSection.firstChild);

      // Initialize Three.js scene for contact
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        contactContainer.clientWidth / contactContainer.clientHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(
        contactContainer.clientWidth,
        contactContainer.clientHeight
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      contactContainer.appendChild(renderer.domElement);

      // Create network of connected points for contact section
      const points = [];
      const lines = [];
      const maxPoints = 20;
      const colors = [
        new THREE.Color(0x8b5cf6), // violet
        new THREE.Color(0x0ea5e9), // sky
        new THREE.Color(0x10b981), // emerald
        new THREE.Color(0xf43f5e), // rose
        new THREE.Color(0xf59e0b), // amber
      ];

      // Create points
      for (let i = 0; i < maxPoints; i++) {
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({
          color: colors[i % colors.length],
          transparent: true,
          opacity: 0.8,
        });
        const point = new THREE.Mesh(geometry, material);

        // Position randomly within view
        point.position.x = (Math.random() - 0.5) * 12;
        point.position.y = (Math.random() - 0.5) * 8;
        point.position.z = (Math.random() - 0.5) * 4 - 2;

        point.userData = {
          speedX: (Math.random() - 0.5) * 0.005,
          speedY: (Math.random() - 0.5) * 0.005,
          speedZ: (Math.random() - 0.5) * 0.005,
          originalX: point.position.x,
          originalY: point.position.y,
          originalZ: point.position.z,
        };

        scene.add(point);
        points.push(point);
      }

      // Create connecting lines between nearby points
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const distance = points[i].position.distanceTo(points[j].position);
          if (distance < 3) {
            const material = new THREE.LineBasicMaterial({
              color: colors[i % colors.length],
              transparent: true,
              opacity: 0.4,
            });

            const geometry = new THREE.BufferGeometry().setFromPoints([
              points[i].position,
              points[j].position,
            ]);

            const line = new THREE.Line(geometry, material);
            scene.add(line);
            lines.push(line);
          }
        }
      }

      // Position camera
      camera.position.z = 8;

      // Mouse move interaction for contact
      let contactMouseX = 0;
      let contactMouseY = 0;

      contactSection.addEventListener("mousemove", (event) => {
        const rect = contactSection.getBoundingClientRect();
        contactMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        contactMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      });

      contactSection.addEventListener("mouseleave", () => {
        contactMouseX = 0;
        contactMouseY = 0;
      });

      // Animation loop for contact
      function animateContact() {
        requestAnimationFrame(animateContact);

        // Update points with mouse interaction
        points.forEach((point) => {
          // Apply original movement
          point.position.x += point.userData.speedX;
          point.position.y += point.userData.speedY;
          point.position.z += point.userData.speedZ;

          // Apply mouse repulsion
          const dx = point.position.x - contactMouseX * 5;
          const dy = point.position.y - contactMouseY * 4;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 2) {
            const force = (2 - distance) * 0.2;
            point.position.x += (dx / distance) * force;
            point.position.y += (dy / distance) * force;
          }

          // Reset position if out of bounds
          if (Math.abs(point.position.x) > 6) {
            point.position.x =
              point.userData.originalX + (Math.random() - 0.5) * 1;
          }
          if (Math.abs(point.position.y) > 4) {
            point.position.y =
              point.userData.originalY + (Math.random() - 0.5) * 1;
          }
          if (Math.abs(point.position.z) > 4) {
            point.position.z =
              point.userData.originalZ + (Math.random() - 0.5) * 1;
          }
        });

        // Update lines to follow points
        scene.remove(...lines);
        lines.length = 0;

        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const distance = points[i].position.distanceTo(points[j].position);
            if (distance < 3) {
              const material = new THREE.LineBasicMaterial({
                color: colors[i % colors.length],
                transparent: true,
                opacity: 0.4 - (distance / 3) * 0.3,
              });

              const geometry = new THREE.BufferGeometry().setFromPoints([
                points[i].position,
                points[j].position,
              ]);

              const line = new THREE.Line(geometry, material);
              scene.add(line);
              lines.push(line);
            }
          }
        }

        renderer.render(scene, camera);
      }

      animateContact();

      // Handle window resize for contact
      window.addEventListener("resize", () => {
        camera.aspect =
          contactContainer.clientWidth / contactContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          contactContainer.clientWidth,
          contactContainer.clientHeight
        );
      });
    }

    // Initialize contact 3D elements when DOM is loaded
    setTimeout(createContact3DElements, 1500); // Delay to ensure DOM is fully loaded
  }

  // Enhanced Mouse Tracking Animations
  function createMouseTrackingAnimations() {
    // Create custom cursor element
    const customCursor = document.createElement("div");
    customCursor.id = "custom-cursor";
    customCursor.style.position = "fixed";
    customCursor.style.width = "20px";
    customCursor.style.height = "20px";
    customCursor.style.border = "2px solid var(--accent-color)";
    customCursor.style.borderRadius = "50%";
    customCursor.style.pointerEvents = "none";
    customCursor.style.zIndex = "9999";
    customCursor.style.mixBlendMode = "difference";
    customCursor.style.transition =
      "transform 0.2s ease, width 0.3s ease, height 0.3s ease";
    customCursor.style.transform = "translate(-50%, -50%)";
    customCursor.style.left = "-100px"; // Initially hidden
    customCursor.style.top = "-100px"; // Initially hidden
    document.body.appendChild(customCursor);

    // Create cursor follower element
    const cursorFollower = document.createElement("div");
    cursorFollower.id = "cursor-follower";
    cursorFollower.style.position = "fixed";
    cursorFollower.style.width = "40px";
    cursorFollower.style.height = "40px";
    cursorFollower.style.backgroundColor = "var(--accent-color)";
    cursorFollower.style.borderRadius = "50%";
    cursorFollower.style.pointerEvents = "none";
    cursorFollower.style.zIndex = "9998";
    cursorFollower.style.opacity = "0.3";
    cursorFollower.style.transition =
      "transform 0.4s ease, width 0.4s ease, height 0.4s ease, opacity 0.4s ease";
    cursorFollower.style.transform = "translate(-50%, -50%) scale(0)";
    cursorFollower.style.left = "-100px"; // Initially hidden
    cursorFollower.style.top = "-100px"; // Initially hidden
    document.body.appendChild(cursorFollower);

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Mouse move event
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update custom cursor position
      customCursor.style.left = `${mouseX}px`;
      customCursor.style.top = `${mouseY}px`;

      // Update follower position for smooth animation
      followerX = e.clientX;
      followerY = e.clientY;
    });

    // Mouse enter event for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .group, .project-card, .service-card"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        customCursor.style.transform = "translate(-50%, -50%) scale(2)";
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
        cursorFollower.style.opacity = "0.4";
        cursorFollower.style.width = "60px";
        cursorFollower.style.height = "60px";
      });

      element.addEventListener("mouseleave", () => {
        customCursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursorFollower.style.transform = "translate(-50%, -50%) scale(0)";
        cursorFollower.style.opacity = "0.3";
        cursorFollower.style.width = "40px";
        cursorFollower.style.height = "40px";
      });
    });

    // Smooth follower animation
    function animateFollower() {
      // Apply easing to the follower position
      followerX += (mouseX - followerX) / 5;
      followerY += (mouseY - followerY) / 5;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(animateFollower);
    }

    animateFollower();

    // Add ripple effect on click
    document.addEventListener("click", (e) => {
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = "0px";
      ripple.style.height = "0px";
      ripple.style.border = "2px solid var(--accent-color)";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";
      ripple.style.zIndex = "9997";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.opacity = "0.7";
      document.body.appendChild(ripple);

      // Animate ripple
      let size = 0;
      const maxSize = 100;
      const rippleInterval = setInterval(() => {
        size += 5;
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.opacity = `${1 - size / maxSize}`;

        if (size >= maxSize) {
          clearInterval(rippleInterval);
          ripple.remove();
        }
      }, 10);
    });
  }

  // Initialize mouse tracking animations
  createMouseTrackingAnimations();

  // Performance optimization: Throttle animations based on device capabilities
  function optimizePerformance() {
    // Check if device has limited performance capabilities
    const isLowPerformanceDevice =
      navigator.userAgent.includes("Mobile") ||
      navigator.hardwareConcurrency < 4 ||
      window.deviceMemory < 4;

    if (isLowPerformanceDevice) {
      // Reduce animation complexity on low performance devices
      const floatingContainers = document.querySelectorAll(
        "#floating-elements-container canvas"
      );
      floatingContainers.forEach((canvas) => {
        if (canvas.getContext) {
          const ctx = canvas.getContext("webgl") || canvas.getContext("2d");
          if (ctx) {
            // Reduce quality settings for better performance
            canvas.style.imageRendering = "optimizeSpeed";
          }
        }
      });

      // Reduce the number of floating objects
      if (typeof THREE !== "undefined") {
        // Add a flag to indicate performance mode
        document.body.classList.add("low-performance-mode");
      }
    }
  }

  // Run performance optimization
  optimizePerformance();

  // ========== BACK TO TOP BUTTON LOGIC ==========
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    // Fungsi untuk menampilkan atau menyembunyikan tombol
    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove("hidden");
        backToTopButton.classList.add("flex");
      } else {
        backToTopButton.classList.add("hidden");
        backToTopButton.classList.remove("flex");
      }
    };

    // Fungsi untuk scroll ke atas
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("scroll", debounce(handleScroll, 50));
    backToTopButton.addEventListener("click", scrollToTop);
  }
});
