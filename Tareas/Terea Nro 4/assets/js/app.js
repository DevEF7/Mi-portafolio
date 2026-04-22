const SITE_AUTHOR='Elmer Franz';
const API_BASE      = 'https://jsonplaceholder.typicode.com';
const POKE_API      = 'https://pokeapi.co/api/v2';
const WEATHER_API   = 'https://restcountries.com/v3.1';

let currentFilter  = 'all';  
let pokemonPage    = 0;
let projectsData   = []; 


const greet = (name) => `¡Hola desde el portafolio de ${name}! 🚀`;
console.log(greet(SITE_AUTHOR));

const formatPrice = (amount) => `$${Number(amount).toLocaleString('es-BO')}`;


const devProfile = {
    name:       'Elmer Franz',
    role:       'Desarrollador Web',
    location:   'La Paz, Bolivia',
    skills:     ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
};



const { name, role, skills } = devProfile;     
const [mainSkill, ...otherSkills] = skills; 

console.log(`${name} – ${role}`);
console.log('Skill principal:', mainSkill);       
console.log('Otras skills:', otherSkills); 

const frontEnd=['HTML', 'CSS', 'JavaScript'];
const backEnd=['Node.js', 'Express', 'MongoDB'];
const allTechs=[...frontEnd, ...backEnd];
console.log('Tecnologías utilizadas:', allTechs);

const updatedProfile = { ...devProfile, available: true };
console.log('Perfil actualizado:', updatedProfile);



class Project {
    #id;
    constructor({id,title, description, techs,emoji,category}) {
        this.#id=id;
        this.title=title;
        this.description=description;
        this.techs=techs;
        this.emoji=emoji;
        this.category=category;
    }
    get id(){
        return this.#id;
    }
    toHTML() {
    const badges = this.techs
      .map(t => `<span class="tech-badge">${t}</span>`)
      .join('');

    return `
      <article class="project-card" data-id="${this.#id}" data-category="${this.category}">
        <div class="project-img" aria-hidden="true">${this.emoji}</div>
        <div class="project-info">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
          <footer class="project-tags">${badges}</footer>
        </div>
      </article>`;
  }
}

const localProjects = [
  new Project({
    id: 1, category: 'frontend', emoji: '♟',
    title: 'Programa de Resolver Cubo de Rubik (Java)',
    description: 'Desarrollo de un programa para resolver el cubo de Rubik utilizando Java. Implementación de algoritmos de búsqueda y optimización para encontrar la solución más eficiente.',
    techs: ['Java', 'Algoritmos de Búsqueda', 'NetBeans'],
  }),
  new Project({
    id: 2, category: 'frontend', emoji: '📱',
    title: 'Aplicación Móvil de Calculadora (Flutter)',
    description: 'Desarrollo de una aplicación móvil de calculadora utilizando Flutter. La aplicación incluye funciones básicas de cálculo, así como un diseño intuitivo y moderno con soporte para modo oscuro.',
    techs: ['Flutter', 'Dark Mode'],
  }),
  new Project({
    id: 3, category: 'fullstack', emoji: '📜',
    title: 'Sistema de Gestión de Tareas (Node.js, React)',
    description: 'Desarrollo de una aplicación web para la gestión de tareas utilizando Node.js y React. La aplicación permite a los usuarios crear, editar y eliminar tareas, así como organizar las tareas en diferentes categorías y establecer recordatorios.',
    techs: ['Node.js', 'React'],
  }),
  new Project({
    id: 4, category: 'backend', emoji: '🤵',
    title: 'Pagina Web estatica de sastreria',
    description: 'Desarrollo de una página web estática para una sastrería utilizando html. La página incluye secciones para mostrar servicios y formulario de contacto.',
    techs: ['HTML', 'CSS', 'JavaScript'],
  }),
  new Project({
    id: 5, category: 'fullstack', emoji: '💻',
    title: 'Sistema de Autenticación y Autorización (JWT)',
    description: 'Implementación de un sistema de autenticación y autorización utilizando JWT.',
    techs: ['JWT', 'Node.js'],
  }),
];

console.log(localProjects);

const filterProjects = (category) => 
    category === 'all' 
    ? localProjects 
    : localProjects.filter(p => p.category === category);


const getTitles = () => localProjects.map(p => p.title);

const countByProjects = localProjects.reduce((acc,p)=>{
    acc[p.category]=(acc[p.category]||0)+1;
    return acc;
},{});

const findProject=(id)=> localProjects.find(p=>p.id===id);

console.log('Titulos',getTitles());
console.log('Por Categoria',countByProjects);

const projectsGrid   = document.querySelector('.projects-grid');
const filterButtons  = document.querySelectorAll('.filter-btn');
const themeToggle    = document.getElementById('theme-toggle');
const pokeSection    = document.getElementById('poke-section');
const pokeGrid       = document.getElementById('poke-grid');
const pokeBtnNext    = document.getElementById('poke-next');
const countryInput   = document.getElementById('country-search');
const countryResult  = document.getElementById('country-result');
const contactForm    = document.querySelector('#contacto form');
const toastEl        = document.getElementById('toast');



function renderProjects(category = 'all') {
  if (!projectsGrid) return;

  const filtered = filterProjects(category);

 
  projectsGrid.innerHTML = filtered
    .map(p => p.toHTML())
    .join('');


  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

 
  const counter = document.getElementById('project-count');
  if (counter) counter.textContent = `${filtered.length} proyectos`;
}

renderProjects('all');

filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    currentFilter = e.currentTarget.dataset.filter;
    renderProjects(currentFilter);
  });
});


if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    
    themeToggle.setAttribute('aria-label', isDark ? 'Modo claro' : 'Modo oscuro');
    themeToggle.textContent = isDark ? '☀️' : '🌙';

    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();                               // preventDefault
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

function initTheme() {
  const saved = localStorage.getItem('theme');     
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
}
initTheme();


function saveFormDraft(data) {
  localStorage.setItem('form-draft', JSON.stringify(data)); 
}

function loadFormDraft() {
  const raw = localStorage.getItem('form-draft');
  return raw ? JSON.parse(raw) : null;               
}


function saveFormDraft(data) {
  localStorage.setItem('form-draft', JSON.stringify(data)); 
}



function validateEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (valid) resolve({ ok: true, email });
              else reject(new Error(`Email inválido: ${email}`));
        }, 500);
    });
}


validateEmail('elmer_nina@ejemplo.com')
    .then(({ email }) => console.log(`✅ Email válido: ${email}`))
    .catch(err => console.error('❌', err.message));

async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} – ${res.statusText}`);
    return await res.json();        
}

 async function fetchProjects() {
    const loader= document.getElementById('project-loader');
    if(loader) loader.classList.remove('hidden');
    try {
        const posts = await fetchJSON(`${API_BASE}/posts?_limit=5`);
        console.log(posts);
        const extra=posts.map(({id,title,boby})=> new Project({
            id: id+100,
            category: 'api',
            emoji: '🔗',
            title: title.slice(0,40)+'...',
            description: boby(0,80) +'...',
            techs: ['API', 'Fetch', 'Async/Await']
        }));
        projectsData=[...localProjects,...extra];
        showToast('Proyectos cargados desde API');
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        showToast('Error al cargar proyectos', 'error');        
    } finally{
        if(loader) loader.classList.add('hidden');
    }
 }
 
 
 async function fetchPokemons(offset = 0) {
  if (!pokeGrid) return;

  pokeGrid.innerHTML = '<p class="loading-text">Cargando Pokémon...</p>';

  try {
    
    const data = await fetchJSON(`${POKE_API}/pokemon?limit=6&offset=${offset}`);

    
    const details = await Promise.all(
      data.results.map(p => fetchJSON(p.url))    
    );

    pokeGrid.innerHTML = details.map(({ name, id, sprites, types }) => {
      const type = types[0].type.name;
      const img  = sprites.other['official-artwork'].front_default
                || sprites.front_default;
      return `
        <div class="poke-card poke--${type}">
          <img src="${img}" alt="${name}" loading="lazy" />
          <p class="poke-name">${name}</p>
          <span class="poke-type">${type}</span>
        </div>`;
    }).join('');

  } catch (err) {
    pokeGrid.innerHTML = `<p class="error-text">Error: ${err.message}</p>`;
  }
}

if (pokeBtnNext) {
  pokeBtnNext.addEventListener('click', () => {
    pokemonPage += 6;
    fetchPokemons(pokemonPage);
  });
}

async function fetchCountry(query) {
  if (!countryResult || !query.trim()) return;
  countryResult.innerHTML = '<p class="loading-text">Buscando...</p>';

  try {
    const [country] = await fetchJSON(
      `${WEATHER_API}/name/${encodeURIComponent(query)}?fields=name,capital,population,flags,languages,region`
    );

    const {
      name: { common },
      capital: [capital] = ['N/A'],
      population,
      flags: { svg: flag },
      region,
    } = country;

    countryResult.innerHTML = `
      <div class="country-card">
        <img src="${flag}" alt="Bandera de ${common}" class="country-flag" />
        <div class="country-info">
          <h4>${common}</h4>
          <p>🏛 Capital: <strong>${capital}</strong></p>
          <p>🌍 Región: <strong>${region}</strong></p>
          <p>👥 Población: <strong>${population.toLocaleString()}</strong></p>
        </div>
      </div>`;

  } catch (err) {
    countryResult.innerHTML = `<p class="error-text">País no encontrado.</p>`;
  }
}

let searchTimer;
if (countryInput) {
  countryInput.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => fetchCountry(e.target.value), 600);
  });
}

async function loadDashboardData() {
  const statsEl = document.getElementById('hero-stats');
  if (!statsEl) return;

  try {

    const [posts, users, todos] = await Promise.all([
      fetchJSON(`${API_BASE}/posts?_limit=1`),   
      fetchJSON(`${API_BASE}/users?_limit=1`),    
      fetchJSON(`${API_BASE}/todos?_limit=1`),   
    ]);


    const stats = [
      { label: 'Proyectos',  value: '10+' },
      { label: 'Tecnologías', value: `${allTechs.length}` },
      { label: 'APIs usadas', value: '5+' },
    ];

    statsEl.innerHTML = stats
      .map(({ label, value }) => `
        <div class="stat-item">
          <strong>${value}</strong>
          <span>${label}</span>
        </div>`)
      .join('');

    console.log('Dashboard cargado:', { posts, users, todos });

  } catch (err) {
    console.warn('Error cargando stats:', err.message);
  }
}

function showToast(msg, type = 'success') {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.className = `toast toast--${type} toast--show`;

  // Remover clase después de 3s con setTimeout (Event Loop)
  setTimeout(() => {
    toastEl.classList.remove('toast--show');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    if (pokeSection) fetchPokemons(0);

} );
