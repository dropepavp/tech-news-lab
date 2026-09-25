/**
 * Tech News & Lab - Core Application Logic (100% Local & Offline)
 * Subgrupo 19 - Politécnico Grancolombiano
 * Integrates: Dynamic rendering from JSON, LocalStorage persistence, Favorites,
 * Mini-CRUD, Search & Filters, Real-time Validation, Custom Toasts, and Local Assets.
 */

// Default seed data with 100% local assets
const DEFAULT_NEWS = [
    {
        id: 1,
        cat: "Cloud & DevOps",
        title: "Migración de microservicios: Cómo optimizar respuestas sin morir en el intento",
        desc: "Exploramos cómo un equipo de desarrollo redujo en un 40% el uso de memoria cambiando tablas estáticas por arquitecturas reactivas.",
        author: "Ing. Sofía Martínez",
        date: "24 Sep 2026",
        readTime: "5 min",
        image: "img/microservices-architecture.svg",
        featured: true,
        content: "La transición desde monolitos hacia microservicios desacoplados introduce desafíos críticos en concurrencia y latencia de red. En este caso de estudio del laboratorio, evaluamos cómo la incorporación de patrones de comunicación asíncrona mediante WebSockets y enrutamiento con API Gateway redujo el tiempo de respuesta en un 40% y optimizó el uso de memoria en un 50% en clústeres Kubernetes de alta demanda."
    },
    {
        id: 2,
        cat: "Inteligencia Artificial",
        title: "Modelos de Razonamiento y LLMs Autónomos en Producción",
        desc: "Patrones modernos para orquestación de agentes con validación semántica y caché inteligente.",
        author: "Dr. Carlos Valenzuela",
        date: "22 Sep 2026",
        readTime: "7 min",
        image: "img/ai-apis.svg",
        featured: true,
        content: "La integración de modelos de lenguaje en pipelines empresariales ha dejado de ser un experimento para convertirse en infraestructura crítica. Los nuevos esquemas de agentes autónomos combinan llamadas a herramientas externas (Tool Calling), memoria vectorial distribuida y capas de sanitización de prompts. Analizamos cómo arquitecturar sistemas tolerantes a fallos donde la latencia se amortiza mediante streaming SSE y compresión de embeddings en memoria."
    },
    {
        id: 3,
        cat: "Ciberseguridad",
        title: "Zero Trust en Infraestructuras Híbridas y Edge Computing",
        desc: "Estrategias de autenticación continua y segmentación dinámica ante amenazas avanzadas.",
        author: "MSc. Andrea Rivas",
        date: "20 Sep 2026",
        readTime: "6 min",
        image: "img/cybersecurity-zerotrust.svg",
        featured: true,
        content: "El perímetro tradicional de seguridad ha desaparecido. El modelo Zero Trust («nunca confíes, siempre verifica») exige validación criptográfica en cada microservicio y canal de datos. Revisamos la implementación de mTLS universal, tokens efímeros JWT con rotación asimétrica y detección de anomalías en tiempo real con algoritmos de grafos sobre nodos Kubernetes distribuidos."
    },
    {
        id: 4,
        cat: "Cloud & DevOps",
        title: "Kubernetes Multi-Región y Serverless con WebAssembly",
        desc: "El futuro de los microservicios ultraligeros con arranque en milisegundos y portabilidad universal.",
        author: "Lic. Alejandro Mendoza",
        date: "18 Sep 2026",
        readTime: "4 min",
        image: "img/cloud-wasm.svg",
        featured: false,
        content: "WebAssembly (WASM) está transformando el cómputo en la nube al ofrecer contenedores binarios con tiempos de arranque menores a 5 milisegundos y un aislamiento de memoria seguro por diseño. En entornos multi-cloud, permite desplegar funciones de cómputo perimetral en cientos de ubicaciones geográficas reduciendo costos de transferencia y optimizando la entrega de contenido a escala global."
    },
    {
        id: 5,
        cat: "Experiencias Tech",
        title: "Gemelos Digitales y Turismo de Realidad Aumentada",
        desc: "Cómo las ciudades inteligentes están digitalizando monumentos históricos para experiencias inmersivas.",
        author: "Arq. Valentina Gómez",
        date: "15 Sep 2026",
        readTime: "5 min",
        image: "img/digital-twins.svg",
        featured: false,
        content: "La convergencia de fotogrametría de alta fidelidad, escaneo LiDAR y motores gráficos en tiempo real en la web (WebGPU) ha permitido reconstruir digitalmente sitios arqueológicos y centros urbanos. Los usuarios pueden recorrer réplicas interactivas en 3D con guías impulsadas por audio espacial e IA conversacional multilingüe."
    },
    {
        id: 6,
        cat: "Desarrollo Web",
        title: "CSS Cascade Layers y Nuevas APIs de Animación en el Navegador",
        desc: "Técnicas avanzadas para sistemas de diseño modulares, View Transitions y performance de interfaz.",
        author: "Ing. Julián Castro",
        date: "12 Sep 2026",
        readTime: "4 min",
        image: "img/css-animations.svg",
        featured: false,
        content: "La evolución de CSS nativo está reemplazando bibliotecas de utilidades complejas. Con @layer, @container queries y la API de View Transitions, los desarrolladores pueden crear transiciones de página fluidas sin frameworks pesados, garantizando accesibilidad y un puntaje óptimo en Core Web Vitals."
    }
];

const STORAGE_KEY = 'tech_news_data_v3';
const FAVS_KEY = 'tech_news_favs';

// ==========================================================================
// DATA ACCESS LAYER (LOCALSTORAGE & JSON SYNC)
// ==========================================================================
async function initNewsData() {
    let localData = localStorage.getItem(STORAGE_KEY);
    if (!localData) {
        try {
            const response = await fetch('noticias.json');
            if (response.ok) {
                const fetchedData = await response.json();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedData));
                return fetchedData;
            }
        } catch (e) {
            console.warn('Carga local inmediata desde DEFAULT_NEWS:', e);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NEWS));
        return DEFAULT_NEWS;
    }
    return JSON.parse(localData);
}

function getStoredNews() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : DEFAULT_NEWS;
    return data.map(item => {
        if (!item.image || item.image.startsWith('http')) {
            if (item.cat === 'Desarrollo Web') item.image = 'img/angular-signals.svg';
            else if (item.cat === 'Inteligencia Artificial') item.image = 'img/ai-apis.svg';
            else if (item.cat === 'Ciberseguridad') item.image = 'img/cybersecurity-zerotrust.svg';
            else if (item.cat === 'Cloud & DevOps') item.image = 'img/cloud-wasm.svg';
            else if (item.cat === 'Experiencias Tech') item.image = 'img/digital-twins.svg';
            else item.image = 'img/default-news.svg';
        }
        return item;
    });
}

function saveNewsData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getFavorites() {
    const favs = localStorage.getItem(FAVS_KEY);
    return favs ? JSON.parse(favs) : [];
}

function saveFavorites(favs) {
    localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
    updateFavoritesCounter();
}

function isFavorite(id) {
    const favs = getFavorites();
    return favs.includes(Number(id));
}

function toggleFavorite(id) {
    id = Number(id);
    let favs = getFavorites();
    const index = favs.indexOf(id);
    let added = false;
    if (index === -1) {
        favs.push(id);
        added = true;
        showToast('★ Noticia añadida a tus Favoritos', 'fav');
    } else {
        favs.splice(index, 1);
        showToast('Noticia eliminada de Favoritos', 'info');
    }
    saveFavorites(favs);
    return added;
}

function updateFavoritesCounter() {
    const favs = getFavorites();
    const counters = document.querySelectorAll('.fav-count-badge');
    counters.forEach(c => {
        c.textContent = favs.length;
    });
}

// ==========================================================================
// TOAST NOTIFICATIONS & UTILITIES
// ==========================================================================
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'fav') icon = '⭐';
    if (type === 'success') icon = '✅';
    if (type === 'danger') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// ==========================================================================
// CARD RENDERER COMPONENT (100% LOCAL IMAGES)
// ==========================================================================
function createNewsCardHTML(item) {
    const isFav = isFavorite(item.id);
    const imageSrc = item.image || 'img/default-news.svg';
    return `
        <article class="card-item" data-id="${item.id}" data-category="${item.cat}">
            <div class="card-image-wrap">
                <img src="${imageSrc}" alt="${item.title}" class="card-img" loading="lazy" onerror="this.onerror=null; this.src='img/default-news.svg';">
                <span class="card-badge">${item.cat}</span>
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span>📅 ${item.date || 'Reciente'}</span>
                    <span>•</span>
                    <span>⏱️ ${item.readTime || '4 min'}</span>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.desc}</p>
                <div class="card-footer">
                    <a href="detalle.html?id=${item.id}" class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;">
                        Leer Noticia →
                    </a>
                    <button class="btn btn-fav-card ${isFav ? 'is-fav' : ''}" 
                            title="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
                            onclick="handleCardFavClick(event, ${item.id})">
                        ${isFav ? '★' : '☆'}
                    </button>
                </div>
            </div>
        </article>
    `;
}

function handleCardFavClick(event, id) {
    event.preventDefault();
    event.stopPropagation();
    const isNowFav = toggleFavorite(id);
    const btn = event.currentTarget;
    if (isNowFav) {
        btn.classList.add('is-fav');
        btn.textContent = '★';
        btn.title = 'Quitar de favoritos';
    } else {
        btn.classList.remove('is-fav');
        btn.textContent = '☆';
        btn.title = 'Agregar a favoritos';
    }

    // If currently on favorites page, re-render
    if (document.getElementById('favs-grid')) {
        renderFavoritesPage();
    }
}

// ==========================================================================
// PAGE INITIALIZERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
    await initNewsData();
    updateFavoritesCounter();
    initMobileNav();
    initNewsletter();

    // Check current page
    if (document.getElementById('home-featured-grid')) {
        renderHomePage();
    } else if (document.getElementById('catalog-grid')) {
        initCatalogPage();
    } else if (document.getElementById('article-detail-section')) {
        renderDetailPage();
    } else if (document.getElementById('favs-grid')) {
        renderFavoritesPage();
    } else if (document.getElementById('admin-news-table')) {
        initAdminPage();
    } else if (document.getElementById('contact-form')) {
        initContactPage();
    }
});

// Mobile Nav Toggle
function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
}

// Newsletter
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (input && input.value) {
                showToast(`¡Gracias! Te has suscrito con ${input.value}`, 'success');
                input.value = '';
            }
        });
    }
}

// ==========================================================================
// 1. HOME PAGE
// ==========================================================================
function renderHomePage() {
    const news = getStoredNews();
    const container = document.getElementById('home-featured-grid');
    if (!container) return;

    // Show 3 featured or recent
    const featured = news.slice(0, 3);
    container.innerHTML = featured.map(item => createNewsCardHTML(item)).join('');

    // Update dynamic stats if present
    const totalStat = document.getElementById('stat-total-articles');
    if (totalStat) totalStat.textContent = news.length;
}

// ==========================================================================
// 2. CATALOG PAGE (SEARCH, FILTER & SORT)
// ==========================================================================
function initCatalogPage() {
    const news = getStoredNews();
    const grid = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('catalog-search');
    const categoryPills = document.querySelectorAll('.pill-btn');
    const sortSelect = document.getElementById('catalog-sort');
    const countLabel = document.getElementById('catalog-results-count');

    let currentCategory = 'all';
    let searchQuery = '';
    let sortOrder = 'latest';

    function filterAndRender() {
        let filtered = [...news];

        // Category filter
        if (currentCategory !== 'all') {
            filtered = filtered.filter(item => item.cat.toLowerCase() === currentCategory.toLowerCase());
        }

        // Search query filter
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.desc.toLowerCase().includes(query) ||
                item.cat.toLowerCase().includes(query) ||
                (item.author && item.author.toLowerCase().includes(query))
            );
        }

        // Sort order
        if (sortOrder === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            filtered.sort((a, b) => b.id - a.id);
        }

        // Update count
        if (countLabel) {
            countLabel.textContent = `Mostrando ${filtered.length} de ${news.length} publicaciones`;
        }

        // Render cards
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-icon">🔍</div>
                    <h3 class="empty-title">No se encontraron noticias</h3>
                    <p class="empty-desc">Intenta buscar con otros términos o selecciona una categoría diferente.</p>
                    <button class="btn btn-primary" onclick="resetFilters()">Restablecer filtros</button>
                </div>
            `;
        } else {
            grid.innerHTML = filtered.map(item => createNewsCardHTML(item)).join('');
        }
    }

    // Category click
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.getAttribute('data-cat') || 'all';
            filterAndRender();
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterAndRender();
        });
    }

    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortOrder = e.target.value;
            filterAndRender();
        });
    }

    window.resetFilters = () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        currentCategory = 'all';
        categoryPills.forEach(p => {
            if (p.getAttribute('data-cat') === 'all') p.classList.add('active');
            else p.classList.remove('active');
        });
        filterAndRender();
    };

    filterAndRender();
}

// ==========================================================================
// 3. DETAIL PAGE
// ==========================================================================
function renderDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));
    const news = getStoredNews();
    const article = news.find(n => n.id === id) || news[0];

    if (!article) return;

    // Elements
    const titleEl = document.getElementById('det-title');
    const catEl = document.getElementById('det-cat');
    const authorEl = document.getElementById('det-author');
    const dateEl = document.getElementById('det-date');
    const readTimeEl = document.getElementById('det-readtime');
    const imgEl = document.getElementById('det-img');
    const contentEl = document.getElementById('det-content');
    const breadcrumbTitle = document.getElementById('det-breadcrumb-title');
    const favBtn = document.getElementById('det-fav-btn');

    if (titleEl) titleEl.textContent = article.title;
    if (catEl) catEl.textContent = article.cat;
    if (authorEl) authorEl.textContent = article.author || 'Equipo Editorial Tech';
    if (dateEl) dateEl.textContent = article.date || 'Publicado recientemente';
    if (readTimeEl) readTimeEl.textContent = article.readTime || '5 min lectura';
    if (imgEl) {
        imgEl.src = article.image || 'img/default-news.svg';
        imgEl.alt = article.title;
        imgEl.onerror = function() { this.onerror = null; this.src = 'img/default-news.svg'; };
    }
    if (contentEl) {
        const imageSrc = article.image || 'img/default-news.svg';
        contentEl.innerHTML = `
            <p style="font-size: 1.15rem; font-weight: 500; color: var(--text-main); line-height: 1.7; margin-bottom: 22px;">
                ${article.desc}
            </p>
            <p style="margin-bottom: 20px;">${article.content || article.desc}</p>
            
            <!-- FIGURA E ILUSTRACIÓN TÉCNICA INTERNA -->
            <figure class="article-inner-figure">
                <img src="${imageSrc}" alt="Esquema técnico de ${article.title}" onerror="this.onerror=null; this.src='img/default-news.svg';">
                <figcaption class="article-inner-caption">
                    <span>📊</span>
                    <span>Figura 1.1: Esquema de arquitectura y componentes para ${article.cat} &bull; Tech &amp; Lab 2026</span>
                </figcaption>
            </figure>

            <div class="article-highlight-box">
                <h4 style="margin-bottom: 8px; color: var(--brand-navy); font-size: 15px;">Aspectos Clave del Laboratorio:</h4>
                <ul style="padding-left: 20px; font-size: 13.5px; color: var(--text-muted); line-height: 1.6;">
                    <li>Implementación 100% nativa y modular en Front-End (HTML5, CSS3, JavaScript ES6+).</li>
                    <li>Consumo asíncrono desde archivo JSON local estructurado sin dependencias externas.</li>
                    <li>Persistencia de estado en LocalStorage para gestión personalizada de favoritos.</li>
                </ul>
            </div>
            <p style="margin-top: 18px; color: var(--text-muted); font-size: 14.5px;">
                Para profundizar en estos conceptos y consultar el código fuente de los ejemplos prácticos desarrollados en el laboratorio, puedes ponerte en contacto con el autor del artículo o escribir a nuestro canal institucional.
            </p>
        `;
    }
    if (breadcrumbTitle) breadcrumbTitle.textContent = article.title.length > 30 ? article.title.substring(0, 30) + '...' : article.title;

    // Update favorite button state
    function updateDetailFavBtn() {
        if (!favBtn) return;
        const isFav = isFavorite(article.id);
        if (isFav) {
            favBtn.innerHTML = '★ Guardado en Favoritos';
            favBtn.className = 'btn btn-primary';
            favBtn.style.background = 'var(--accent-fav)';
        } else {
            favBtn.innerHTML = '☆ Agregar a Favoritos';
            favBtn.className = 'btn btn-outline';
            favBtn.style.background = 'transparent';
            favBtn.style.color = 'var(--text-main)';
            favBtn.style.borderColor = 'var(--border-color)';
        }
    }

    if (favBtn) {
        updateDetailFavBtn();
        favBtn.addEventListener('click', () => {
            toggleFavorite(article.id);
            updateDetailFavBtn();
        });
    }

    // Share button
    const shareBtn = document.getElementById('det-share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                showToast('Enlace copiado al portapapeles', 'success');
            } else {
                showToast('Enlace listo para compartir', 'info');
            }
        });
    }

    // Related news sidebar
    const relatedContainer = document.getElementById('related-news-list');
    if (relatedContainer) {
        const related = news.filter(n => n.id !== article.id).slice(0, 3);
        relatedContainer.innerHTML = related.map(item => `
            <a href="detalle.html?id=${item.id}" style="display: flex; gap: 12px; margin-bottom: 16px; align-items: center;">
                <img src="${item.image || 'img/default-news.svg'}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;" alt="" onerror="this.onerror=null; this.src='img/default-news.svg';">
                <div>
                    <span style="font-size: 11px; font-weight: 700; color: var(--brand-cyan);">${item.cat}</span>
                    <h5 style="font-size: 13px; line-height: 1.3; margin-top: 2px;">${item.title}</h5>
                </div>
            </a>
        `).join('');
    }
}

// ==========================================================================
// 4. FAVORITES PAGE
// ==========================================================================
function renderFavoritesPage() {
    const favs = getFavorites();
    const news = getStoredNews();
    const grid = document.getElementById('favs-grid');
    const clearBtn = document.getElementById('clear-all-favs-btn');
    const countLabel = document.getElementById('favs-count-badge');

    if (countLabel) countLabel.textContent = `${favs.length} guardadas`;

    const favoriteArticles = news.filter(n => favs.includes(n.id));

    if (favoriteArticles.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">⭐</div>
                <h3 class="empty-title">Aún no tienes noticias favoritas</h3>
                <p class="empty-desc">Explora el catálogo de noticias y haz clic en la estrella para guardar las publicaciones que más te interesen.</p>
                <a href="catalogo.html" class="btn btn-primary">Ir al Catálogo de Noticias</a>
            </div>
        `;
        if (clearBtn) clearBtn.style.display = 'none';
    } else {
        grid.innerHTML = favoriteArticles.map(item => createNewsCardHTML(item)).join('');
        if (clearBtn) {
            clearBtn.style.display = 'inline-flex';
            clearBtn.onclick = () => {
                if (confirm('¿Estás seguro de que deseas vaciar todas tus noticias favoritas?')) {
                    saveFavorites([]);
                    showToast('Se han eliminado todos los favoritos', 'info');
                    renderFavoritesPage();
                }
            };
        }
    }
}

// ==========================================================================
// 5. MINI CRUD / GESTIÓN PAGE
// ==========================================================================
function initAdminPage() {
    const tableBody = document.getElementById('admin-news-table-body');
    const form = document.getElementById('create-news-form');
    const resetDefaultsBtn = document.getElementById('reset-defaults-btn');
    const catSelect = document.getElementById('news-cat');
    const imgSelect = document.getElementById('news-image-select');

    // Live preview elements
    const prevTitle = document.getElementById('preview-title');
    const prevDesc = document.getElementById('preview-desc');
    const prevAuthor = document.getElementById('preview-author');
    const prevReadtime = document.getElementById('preview-readtime');
    const prevBadge = document.getElementById('preview-badge');
    const prevImg = document.getElementById('preview-img');

    const titleInput = document.getElementById('news-title');
    const descInput = document.getElementById('news-desc');
    const authorInput = document.getElementById('news-author');
    const readtimeInput = document.getElementById('news-readtime');

    function updateLivePreview() {
        if (prevTitle && titleInput) {
            prevTitle.textContent = titleInput.value.trim() || 'Título de la noticia en desarrollo...';
        }
        if (prevDesc && descInput) {
            prevDesc.textContent = descInput.value.trim() || 'Aquí se verá el resumen conciso que redactes en el formulario.';
        }
        if (prevAuthor && authorInput) {
            prevAuthor.textContent = 'Por: ' + (authorInput.value.trim() || 'Subgrupo 19');
        }
        if (prevReadtime && readtimeInput) {
            prevReadtime.textContent = '⏱️ ' + (readtimeInput.value.trim() || '4 min');
        }
        if (prevBadge && catSelect) {
            prevBadge.textContent = catSelect.value || 'CATEGORÍA';
        }
        if (prevImg && imgSelect) {
            prevImg.src = imgSelect.value || 'img/default-news.svg';
        }
    }

    if (titleInput) titleInput.addEventListener('input', updateLivePreview);
    if (descInput) descInput.addEventListener('input', updateLivePreview);
    if (authorInput) authorInput.addEventListener('input', updateLivePreview);
    if (readtimeInput) readtimeInput.addEventListener('input', updateLivePreview);
    if (imgSelect) imgSelect.addEventListener('change', updateLivePreview);

    // Auto-select local image based on chosen category
    if (catSelect && imgSelect) {
        catSelect.addEventListener('change', () => {
            const cat = catSelect.value;
            if (cat === 'Desarrollo Web') imgSelect.value = 'img/web-development.svg';
            else if (cat === 'Inteligencia Artificial') imgSelect.value = 'img/ai-apis.svg';
            else if (cat === 'Ciberseguridad') imgSelect.value = 'img/cybersecurity-zerotrust.svg';
            else if (cat === 'Cloud & DevOps') imgSelect.value = 'img/cloud-wasm.svg';
            else if (cat === 'Experiencias Tech') imgSelect.value = 'img/digital-twins.svg';
            else imgSelect.value = 'img/default-news.svg';
            updateLivePreview();
        });
    }

    function renderTable() {
        const news = getStoredNews();
        if (tableBody) {
            if (news.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 24px; color: var(--text-muted);">No hay noticias registradas.</td></tr>`;
                return;
            }
            tableBody.innerHTML = news.map(item => `
                <tr>
                    <td>
                        <img src="${item.image || 'img/default-news.svg'}" alt="" class="table-thumb" onerror="this.onerror=null; this.src='img/default-news.svg';">
                    </td>
                    <td>
                        <strong style="display: block; font-size: 14px;">${item.title}</strong>
                        <span style="font-size: 12px; color: var(--text-muted);">${item.author || 'Anónimo'} • ${item.date || 'Reciente'}</span>
                    </td>
                    <td>
                        <span class="card-badge" style="position: static; display: inline-block;">${item.cat}</span>
                    </td>
                    <td>
                        <a href="detalle.html?id=${item.id}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;">Ver</a>
                    </td>
                    <td>
                        <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" onclick="deleteArticle(${item.id})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    window.deleteArticle = (id) => {
        if (confirm('¿Deseas eliminar esta noticia permanentemente?')) {
            let news = getStoredNews();
            news = news.filter(n => n.id !== Number(id));
            saveNewsData(news);

            // Also remove from favs if present
            let favs = getFavorites();
            favs = favs.filter(favId => favId !== Number(id));
            saveFavorites(favs);

            showToast('Noticia eliminada con éxito', 'danger');
            renderTable();
        }
    };

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('news-title').value.trim();
            const cat = document.getElementById('news-cat').value;
            const author = document.getElementById('news-author').value.trim() || 'Subgrupo 19';
            const readTime = document.getElementById('news-readtime').value.trim() || '5 min';
            const imageSelect = document.getElementById('news-image-select');
            const image = (imageSelect ? imageSelect.value : '') || 'img/default-news.svg';
            const desc = document.getElementById('news-desc').value.trim();
            const content = document.getElementById('news-content').value.trim() || desc;

            if (!title || !cat || !desc) {
                showToast('Por favor completa los campos requeridos', 'danger');
                return;
            }

            const news = getStoredNews();
            const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;

            const now = new Date();
            const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

            const newArticle = {
                id: newId,
                title,
                cat,
                author,
                date: dateStr,
                readTime,
                image,
                desc,
                content,
                featured: false
            };

            news.unshift(newArticle);
            saveNewsData(news);

            showToast('¡Nueva noticia publicada con éxito!', 'success');
            form.reset();
            renderTable();
        });
    }

    if (resetDefaultsBtn) {
        resetDefaultsBtn.addEventListener('click', () => {
            if (confirm('¿Restablecer las noticias a los datos por defecto locales?')) {
                saveNewsData(DEFAULT_NEWS);
                showToast('Datos restaurados correctamente', 'info');
                renderTable();
            }
        });
    }

    renderTable();
}

// ==========================================================================
// 6. CONTACT PAGE WITH REAL-TIME VALIDATION & FAQ
// ==========================================================================
function initContactPage() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const charCounter = document.getElementById('message-char-count');
    const successBox = document.getElementById('contact-success-alert');

    // Real-time character count
    if (messageInput && charCounter) {
        messageInput.addEventListener('input', () => {
            charCounter.textContent = `${messageInput.value.length} / 500 caracteres`;
        });
    }

    // Validation helper
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkField(input, condition) {
        if (condition) {
            input.classList.remove('is-invalid');
            return true;
        } else {
            input.classList.add('is-invalid');
            return false;
        }
    }

    if (nameInput) {
        nameInput.addEventListener('input', () => checkField(nameInput, nameInput.value.trim().length >= 3));
    }
    if (emailInput) {
        emailInput.addEventListener('input', () => checkField(emailInput, validateEmail(emailInput.value.trim())));
    }
    if (messageInput) {
        messageInput.addEventListener('input', () => checkField(messageInput, messageInput.value.trim().length >= 10));
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNameValid = checkField(nameInput, nameInput.value.trim().length >= 3);
            const isEmailValid = checkField(emailInput, validateEmail(emailInput.value.trim()));
            const isMessageValid = checkField(messageInput, messageInput.value.trim().length >= 10);

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                showToast('Por favor corrige los errores en el formulario', 'danger');
                return;
            }

            // Simulate form submission locally
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando mensaje...';
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensaje';
                }

                form.reset();
                if (charCounter) charCounter.textContent = '0 / 500 caracteres';

                if (successBox) {
                    successBox.style.display = 'block';
                    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                showToast('¡Mensaje enviado con éxito! Nos comunicaremos pronto.', 'success');
            }, 800);
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                faqItems.forEach(i => i.classList.remove('open'));
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });
}