// Main script for the professional CV/Portfolio website

document.addEventListener("DOMContentLoaded", () => {
  // Initialize DOM elements
  const header = document.getElementById("main-header");
  const themeSettingsPanel = document.getElementById("theme-settings");
  const openBtn = document.getElementById("open-theme-settings");
  const closeBtn = document.getElementById("close-theme-settings");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const colorOptions = document.getElementById("color-options");
  
  // Utility functions
  const debounce = (fn, wait = 12) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  };

  // Header scroll effect
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("glass-effect", "shadow-lg");
      } else {
        header.classList.remove("glass-effect", "shadow-lg");
      }
    };
    window.addEventListener("scroll", debounce(onScroll, 15));
  }

  // Vanta.js Network Effect for Hero Section
  let vantaEffect = null;
  const homeSection = document.getElementById("home");

  if (homeSection && typeof VANTA !== "undefined") {
    const getVantaOptions = (isLightMode = false) => {
      if (isLightMode) {
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

    const isLightMode = document.body.classList.contains("light");
    vantaEffect = VANTA.NET(getVantaOptions(isLightMode));

    const updateVantaEffect = (isLight) => {
      if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = VANTA.NET(getVantaOptions(isLight));
      }
    };

    window.addEventListener(
      "resize",
      debounce(() => {
        // Vanta.js automatically handles resize
      }, 250)
    );
  }

  // Theme panel toggle functionality
  function toggleThemePanel(show) {
    if (show) {
      themeSettingsPanel.classList.remove("translate-x-full");
      themeSettingsPanel.removeAttribute("inert");
      themeSettingsPanel.setAttribute("aria-hidden", "false");
    } else {
      themeSettingsPanel.classList.add("translate-x-full");
      themeSettingsPanel.setAttribute("inert", "");
      themeSettingsPanel.setAttribute("aria-hidden", "true");
    }
  }

  if (openBtn) openBtn.addEventListener("click", () => toggleThemePanel(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleThemePanel(false));

  // Color theme options
  const colors = [
    { name: "violet", hex: "#8b5cf6", rgb: "139, 92, 246" },
    { name: "sky", hex: "#0ea5e9", rgb: "14, 165, 233" },
    { name: "emerald", hex: "#10b981", rgb: "16, 185, 129" },
    { name: "rose", hex: "#f43f5e", rgb: "244, 63, 94" },
    { name: "amber", hex: "#f59e0b", rgb: "245, 158, 11" },
  ];

  colors.forEach((color) => {
    const btn = document.createElement("button");
    btn.className =
      "h-10 w-10 rounded-full border-2 border-slate-700 transition hover:border-white";
    btn.style.backgroundColor = color.hex;
    btn.setAttribute("aria-label", `Select ${color.name} theme`);
    btn.type = "button";
    btn.addEventListener("click", () => {
      document.documentElement.style.setProperty("--accent-color", color.hex);
      document.documentElement.style.setProperty("--accent-rgb", color.rgb);
    });
    if (colorOptions) colorOptions.appendChild(btn);
  });

  // Initialize Typed.js
  if (typeof Typed !== "undefined" && document.getElementById("typed-text")) {
    try {
      new Typed("#typed-text", {
        strings: [
          "Web Developer.",
          "UI/UX Designer.",
          "Java Enthusiast.",
          "Data Engineer.",
          "AI Explorer.",
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1700,
        loop: true,
        smartBackspace: true,
      });
    } catch (e) {
      console.warn("Typed.js init failed", e);
    }
  }

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined" && AOS && AOS.init) {
    AOS.init({
      duration: 800,
      once: false,
      offset: 120,
      easing: "ease-out-cubic",
      delay: 50,
      threshold: 0.3,
      mirror: true,
      disable: false,
    });
  }

  // Update copyright year
  document.getElementById("copyright-year").textContent =
    new Date().getFullYear();

  // Mobile menu functionality
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded =
        mobileMenuButton.getAttribute("aria-expanded") === "true";
      mobileMenuButton.setAttribute("aria-expanded", String(!isExpanded));
      mobileMenu.classList.toggle("hidden");
    });
  }

  document.querySelectorAll("#mobile-menu a, #main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu) mobileMenu.classList.add("hidden");
      if (mobileMenuButton)
        mobileMenuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      mobileMenu &&
      mobileMenuButton &&
      !mobileMenu.contains(e.target) &&
      e.target !== mobileMenuButton
    ) {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Theme toggle functionality
  const themeToggleBtn = document.getElementById("theme-toggle");
  const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle");

  const sunIcons = [
    document.getElementById("theme-icon-sun"),
    document.getElementById("mobile-theme-icon-sun"),
  ];
  const moonIcons = [
    document.getElementById("theme-icon-moon"),
    document.getElementById("mobile-theme-icon-moon"),
  ];
  const mobileThemeText = document.getElementById("mobile-theme-text");

  const applyTheme = (theme) => {
    if (theme === "light") {
      document.body.classList.add("light");
      sunIcons.forEach((icon) => icon.classList.remove("hidden"));
      moonIcons.forEach((icon) => icon.classList.add("hidden"));
      if (mobileThemeText) mobileThemeText.textContent = "Switch to Dark";
      localStorage.setItem("theme", "light");

      if (vantaEffect && typeof VANTA !== "undefined") {
        vantaEffect.setOptions({
          color: 0x7a869c, // light slate color
          backgroundColor: 0xf0f9ff, // light background color
        });
      }
    } else {
      document.body.classList.remove("light");
      sunIcons.forEach((icon) => icon.classList.add("hidden"));
      moonIcons.forEach((icon) => icon.classList.remove("hidden"));
      if (mobileThemeText) mobileThemeText.textContent = "Switch to Light";
      localStorage.setItem("theme", "dark");

      if (vantaEffect && typeof VANTA !== "undefined") {
        vantaEffect.setOptions({
          color: 0x4ade80, // neon green color
          backgroundColor: 0x0f172a, // dark background color
        });
      }
    }
  };

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);
  if (mobileThemeToggleBtn)
    mobileThemeToggleBtn.addEventListener("click", () => {
      toggleTheme();
      if (mobileMenu) mobileMenu.classList.add("hidden");
      if (mobileMenuButton)
        mobileMenuButton.setAttribute("aria-expanded", "false");
    });

  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersLight) {
    applyTheme("light");
  } else {
    applyTheme("dark");
  }

  // Modal functionality
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalTech = document.getElementById("modal-tech");
  const modalLiveLink = document.getElementById("modal-live-link");
  const modalCodeLink = document.getElementById("modal-code-link");
  const modalCloseBtn = document.querySelector(".close");

  const projects = [
    {
      title: "E-commerce Website",
      image: "/images/project1-400.jpg",
      description:
        "A responsive online store built with React and Node.js. Features include product catalog, shopping cart, user authentication, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "#",
      codeLink: "#",
    },
    {
      title: "Analytics Dashboard",
      image: "/images/project2-400.jpg",
      description:
        "Interactive dashboard with real-time data visualization. Built with Vue.js and D3.js for comprehensive analytics and reporting.",
      tech: ["Vue.js", "D3.js", "Firebase", "Chart.js"],
      liveLink: "#",
      codeLink: "#",
    },
    {
      title: "Mobile App UI",
      image: "/images/project3-400.jpg",
      description:
        "Clean and intuitive mobile application interface design. Created with Figma, focusing on user experience and modern design principles.",
      tech: ["Figma", "UI/UX", "Prototyping", "Design System"],
      liveLink: "#",
      codeLink: "#",
    },
  ];

  function openModal(projectIndex) {
    const project = projects[projectIndex];
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;

    modalTech.innerHTML = "";
    project.tech.forEach((tech) => {
      const span = document.createElement("span");
      span.className =
        "text-xs font-medium bg-slate-700 text-slate-300 px-2 py-1 rounded-full";
      span.textContent = tech;
      modalTech.appendChild(span);
    });

    modalLiveLink.href = project.liveLink;
    modalCodeLink.href = project.codeLink;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  modalCloseBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  const viewProjectLinks = document.querySelectorAll('.group a[href^="#"]');
  viewProjectLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(index);
    });
  });

  // Scroll animation controller
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax-element");

    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    if (header) {
      // Add/remove glass effect class based on scroll position but maintain visibility
      if (window.scrollY > 50) {
        header.classList.add("glass-effect", "shadow-lg");
      } else {
        header.classList.remove("glass-effect", "shadow-lg");
      }
    }
  });

  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");

          const animationType = entry.target.dataset.animation || "fadeInUp";
          entry.target.classList.add(animationType);

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Progress bar functionality
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
    function createFloatingElements() {
      const heroSection = document.getElementById("home");
      if (!heroSection) return;

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

      heroSection.insertBefore(canvasContainer, heroSection.firstChild);

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

      const floatingObjects = [];
      const colors = [
        new THREE.Color(0x8b5cf6), // violet
        new THREE.Color(0x0ea5e9), // sky
        new THREE.Color(0x10b981), // emerald
        new THREE.Color(0xf43f5e), // rose
        new THREE.Color(0xf59e0b), // amber
      ];

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
          const centerX = (rect.left + rect.right) / 2;
          const centerY = (rect.top + rect.bottom) / 2;
          const containerRect = servicesContainer.getBoundingClientRect();

          serviceObject.position.x = (centerX - containerRect.left - containerRect.width / 2) / (containerRect.width / 4);
          serviceObject.position.y = (centerY - containerRect.top - containerRect.height / 2) / (containerRect.height / 4);
          serviceObject.position.z = -2; // Place behind the content

          // Add subtle rotation and movement
          serviceObject.userData = {
            rotationSpeedX: (Math.random() - 0.5) * 0.02,
            rotationSpeedY: (Math.random() - 0.5) * 0.02,
            rotationSpeedZ: (Math.random() - 0.5) * 0.02,
            originalPosition: { ...serviceObject.position },
            hover: false,
          };

          scene.add(serviceObject);
          serviceIcons.push(serviceObject);
        }
      });

      // Position camera
      camera.position.z = 5;

      // Mouse move interaction
      let mouseX = 0;
      let mouseY = 0;

      document.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      });

      // Animation loop for services 3D elements
      function animateServices() {
        requestAnimationFrame(animateServices);

        // Update service icons
        serviceIcons.forEach((icon) => {
          // Rotate continuously
          icon.rotation.x += icon.userData.rotationSpeedX;
          icon.rotation.y += icon.userData.rotationSpeedY;
          icon.rotation.z += icon.userData.rotationSpeedZ;

          // Add subtle movement based on mouse position
          icon.position.x += mouseX * 0.001;
          icon.position.y += mouseY * 0.001;

          // Add subtle pulsing effect
          const pulse = Math.sin(Date.now() * 0.002) * 0.05;
          icon.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
        });

        renderer.render(scene, camera);
      }

      animateServices();

      // Handle window resize for services 3D elements
      window.addEventListener("resize", () => {
        camera.aspect = servicesContainer.clientWidth / servicesContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          servicesContainer.clientWidth,
          servicesContainer.clientHeight
        );
      });
    }

    // Initialize services 3D elements when DOM is loaded
    createServices3DElements();
  }

  // 3D Interactive Elements in the Portfolio Section
  if (typeof THREE !== "undefined") {
    // Create 3D interactive elements in the portfolio section
    function createPortfolio3DElements() {
      const portfolioSections = document.querySelectorAll("#portfolio .group");
      portfolioSections.forEach((portfolioItem, index) => {
        // Create a container for the 3D canvas in each portfolio item
        const portfolioContainer = document.createElement("div");
        portfolioContainer.className = "portfolio-3d-container";
        portfolioContainer.style.position = "absolute";
        portfolioContainer.style.top = "0";
        portfolioContainer.style.left = "0";
        portfolioContainer.style.width = "100%";
        portfolioContainer.style.height = "100%";
        portfolioContainer.style.pointerEvents = "none";
        portfolioContainer.style.zIndex = "0";
        portfolioContainer.style.overflow = "hidden";
        portfolioContainer.style.borderRadius = "0.5rem";

        // Insert the container at the beginning of the portfolio item
        portfolioItem.insertBefore(portfolioContainer, portfolioItem.firstChild);

        // Initialize Three.js scene for portfolio
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          portfolioContainer.clientWidth / portfolioContainer.clientHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        renderer.setSize(
          portfolioContainer.clientWidth,
          portfolioContainer.clientHeight
        );
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        portfolioContainer.appendChild(renderer.domElement);

        // Create interactive portfolio elements as 3D objects
        const portfolioIcons = [];
        const colors = [
          new THREE.Color(0x8b5cf6), // violet
          new THREE.Color(0x0ea5e9), // sky
          new THREE.Color(0x10b981), // emerald
          new THREE.Color(0xf43f5e), // rose
          new THREE.Color(0xf59e0b), // amber
        ];

        // Create 3D objects for each portfolio item
        for (let i = 0; i < 5; i++) {
          const geometry = new THREE.DodecahedronGeometry(0.3, 0);
          const material = new THREE.MeshBasicMaterial({
            color: colors[i % colors.length],
            transparent: true,
            opacity: 0.4,
            wireframe: false,
          });
          const portfolioObject = new THREE.Mesh(geometry, material);

          // Position randomly within the portfolio item
          portfolioObject.position.x = (Math.random() - 0.5) * 2;
          portfolioObject.position.y = (Math.random() - 0.5) * 1.5;
          portfolioObject.position.z = -1; // Place behind the content

          // Add subtle rotation and movement
          portfolioObject.userData = {
            rotationSpeedX: (Math.random() - 0.5) * 0.02,
            rotationSpeedY: (Math.random() - 0.5) * 0.02,
            rotationSpeedZ: (Math.random() - 0.5) * 0.02,
            originalPosition: { ...portfolioObject.position },
            hover: false,
          };

          scene.add(portfolioObject);
          portfolioIcons.push(portfolioObject);
        }

        // Position camera
        camera.position.z = 3;

        // Mouse move interaction
        let mouseX = 0;
        let mouseY = 0;

        portfolioItem.addEventListener("mousemove", (event) => {
          const rect = portfolioItem.getBoundingClientRect();
          mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        });

        // Animation loop for portfolio 3D elements
        function animatePortfolio() {
          requestAnimationFrame(animatePortfolio);

          // Update portfolio icons
          portfolioIcons.forEach((icon) => {
            // Rotate continuously
            icon.rotation.x += icon.userData.rotationSpeedX;
            icon.rotation.y += icon.userData.rotationSpeedY;
            icon.rotation.z += icon.userData.rotationSpeedZ;

            // Add subtle movement based on mouse position
            icon.position.x += mouseX * 0.002;
            icon.position.y += mouseY * 0.002;

            // Add subtle pulsing effect
            const pulse = Math.sin(Date.now() * 0.003 + index) * 0.03;
            icon.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
          });

          renderer.render(scene, camera);
        }

        animatePortfolio();

        // Handle window resize for portfolio 3D elements
        window.addEventListener("resize", () => {
          camera.aspect = portfolioContainer.clientWidth / portfolioContainer.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(
            portfolioContainer.clientWidth,
            portfolioContainer.clientHeight
          );
        });
      });
    }

    // Initialize portfolio 3D elements when DOM is loaded
    createPortfolio3DElements();
  }

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

      // Create interactive contact elements as 3D objects
      const contactIcons = [];
      const colors = [
        new THREE.Color(0x8b5cf6), // violet
        new THREE.Color(0x0ea5e9), // sky
        new THREE.Color(0x10b981), // emerald
        new THREE.Color(0xf43f5e), // rose
        new THREE.Color(0xf59e0b), // amber
      ];

      // Create 3D objects for contact section
      for (let i = 0; i < 12; i++) {
        const geometry = new THREE.IcosahedronGeometry(0.35, 0);
        const material = new THREE.MeshBasicMaterial({
          color: colors[i % colors.length],
          transparent: true,
          opacity: 0.5,
          wireframe: false,
        });
        const contactObject = new THREE.Mesh(geometry, material);

        // Position randomly within the contact section
        contactObject.position.x = (Math.random() - 0.5) * 4;
        contactObject.position.y = (Math.random() - 0.5) * 3;
        contactObject.position.z = -1.5; // Place behind the content

        // Add subtle rotation and movement
        contactObject.userData = {
          rotationSpeedX: (Math.random() - 0.5) * 0.015,
          rotationSpeedY: (Math.random() - 0.5) * 0.015,
          rotationSpeedZ: (Math.random() - 0.5) * 0.015,
          originalPosition: { ...contactObject.position },
          hover: false,
        };

        scene.add(contactObject);
        contactIcons.push(contactObject);
      }

      // Position camera
      camera.position.z = 4;

      // Mouse move interaction
      let mouseX = 0;
      let mouseY = 0;

      document.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      });

      // Animation loop for contact 3D elements
      function animateContact() {
        requestAnimationFrame(animateContact);

        // Update contact icons
        contactIcons.forEach((icon) => {
          // Rotate continuously
          icon.rotation.x += icon.userData.rotationSpeedX;
          icon.rotation.y += icon.userData.rotationSpeedY;
          icon.rotation.z += icon.userData.rotationSpeedZ;

          // Add subtle movement based on mouse position
          icon.position.x += mouseX * 0.0015;
          icon.position.y += mouseY * 0.0015;

          // Add subtle pulsing effect
          const pulse = Math.sin(Date.now() * 0.0025) * 0.04;
          icon.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
        });

        renderer.render(scene, camera);
      }

      animateContact();

      // Handle window resize for contact 3D elements
      window.addEventListener("resize", () => {
        camera.aspect = contactContainer.clientWidth / contactContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          contactContainer.clientWidth,
          contactContainer.clientHeight
        );
      });
    }

    // Initialize contact 3D elements when DOM is loaded
    createContact3DElements();
  }

  // Back to top button functionality
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove("hidden");
      } else {
        backToTopButton.classList.add("hidden");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});