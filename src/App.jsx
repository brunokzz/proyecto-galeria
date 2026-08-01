import { useState, useEffect } from 'react';
import './App.css';

/*
 * PLACEHOLDERS A REEMPLAZAR CUANDO HAYA DATOS REALES:
 * - ARTIST_NAME, ARTIST_BIO, ARTIST_EMAIL, ARTIST_PHONE
 * - El array ARTWORKS: título, técnica, año, dimensiones.
 *
 * FOTOS — cómo cargarlas sin tocar código:
 * Las imágenes van dentro de la carpeta `public/` del proyecto, así se
 * sirven directo por su nombre de archivo, sin import ni build extra:
 *
 *   public/
 *     hero/     -> foto grande de portada       (HERO_IMAGE)
 *     artista/  -> retrato de la artista         (ARTIST_PHOTO)
 *     obras/    -> una foto por cada pintura     (campo "imagen" de ARTWORKS)
 *
 * Para sumar una obra nueva: copiar la foto a public/obras/, y agregar un
 * objeto al array ARTWORKS de abajo con imagen: '/obras/nombre-del-archivo.jpg'.
 * Si un objeto no tiene "imagen" todavía, se muestra el color de relleno
 * (var(--canvas-N)) en su lugar, así nada se rompe mientras van cargando.
 *
 * El botón "Ingresar" del menú es solo visual por ahora: no tiene lógica
 * de login/registro conectada todavía, tal como se pidió.
 */

const ARTIST_NAME = 'NOMBRE APELLIDO';
const ARTIST_EMAIL = 'contacto@nombreapellido.com';
const ARTIST_PHONE = '+54 9 11 0000 0000';

// Dejar en null hasta tener la foto real en public/hero/ o public/artista/
const HERO_IMAGE = null; // ej: '/hero/portada.jpg'
const ARTIST_PHOTO = null; // ej: '/artista/retrato.jpg'

const ARTIST_BIO = `Pinta desde hace más de quince años, principalmente óleo y
acuarela, buscando siempre la luz de las cosas cotidianas: una mesa después
del almuerzo, una ventana a media tarde, el color exacto de una tormenta que
todavía no llegó. Cada obra nace de una escena real, vista y vivida antes de
ser pintada.`;

const ARTWORKS = [
  // "imagen" en null = todavía muestra el color de relleno.
  // Para activar la foto: imagen: '/obras/sobremesa.jpg' (el archivo que
  // hayas copiado a public/obras/).
  { id: 1, titulo: 'Sobremesa', tecnica: 'Óleo sobre lienzo', anio: 2024, medidas: '80 × 100 cm', color: 'var(--canvas-1)', tam: 'grande', imagen: "./obras/OBRA1.jpeg" },
  { id: 2, titulo: 'Marea baja', tecnica: 'Acuarela sobre papel', anio: 2023, medidas: '40 × 55 cm', color: 'var(--canvas-2)', tam: 'chica', imagen: "./obras/OBRA2.jpeg" },
  { id: 3, titulo: 'Interior con silla azul', tecnica: 'Óleo sobre lienzo', anio: 2022, medidas: '60 × 90 cm', color: 'var(--canvas-3)', tam: 'mediana', imagen: "./obras/OBRA3.jpeg" },
  { id: 4, titulo: 'Jardín en agosto', tecnica: 'Técnica mixta sobre tabla', anio: 2024, medidas: '50 × 50 cm', color: 'var(--canvas-4)', tam: 'chica', imagen: "./obras/OBRA4.jpeg" },
  { id: 5, titulo: 'Retrato de mi madre', tecnica: 'Óleo sobre lienzo', anio: 2021, medidas: '70 × 90 cm', color: 'var(--canvas-5)', tam: 'mediana', imagen: "./obras/OBRA5.jpeg" },
  { id: 6, titulo: 'Después de la lluvia', tecnica: 'Acuarela sobre papel', anio: 2023, medidas: '35 × 45 cm', color: 'var(--canvas-6)', tam: 'chica', imagen: "./obras/OBRA6.jpeg" },
  { id: 7, titulo: 'Naturaleza muerta, limones', tecnica: 'Óleo sobre lienzo', anio: 2020, medidas: '45 × 60 cm', color: 'var(--canvas-2)', tam: 'chica', imagen: "./obras/OBRA7.jpeg" },
  { id: 8, titulo: 'La costa, atardecer', tecnica: 'Óleo sobre lienzo', anio: 2024, medidas: '90 × 120 cm', color: 'var(--canvas-5)', tam: 'grande', imagen: "./obras/OBRA8.jpeg" },
];

const NAV_LINKS = [
  { href: '#obras', label: 'Obras' },
  { href: '#artista', label: 'Sobre la artista' },
  { href: '#contacto', label: 'Contacto' },
];

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conScroll, setConScroll] = useState(false);

  useEffect(() => {
    const alScrollear = () => setConScroll(window.scrollY > 12);
    window.addEventListener('scroll', alScrollear);
    return () => window.removeEventListener('scroll', alScrollear);
  }, []);

  return (
    <div className="pagina">
      <header className={`nav ${conScroll ? 'nav--conFondo' : ''}`}>
        <div className="nav__contenido">
          <a href="#inicio" className="nav__marca">N·A</a>

          <nav className="nav__enlaces nav__enlaces--desktop" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>

          <div className="nav__acciones">
            <button type="button" className="boton boton--fantasma" disabled title="Próximamente">
              Ingresar
            </button>
            <button
              type="button"
              className="nav__hamburguesa"
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuAbierto}
              onClick={() => setMenuAbierto((abierto) => !abierto)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {menuAbierto && (
          <nav className="nav__enlaces nav__enlaces--movil" aria-label="Navegación móvil">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuAbierto(false)}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero__lienzo" aria-hidden="true">
            <img className="hero__imagen" src={"./obras/OBRA0.jpeg"} alt="" />
          </div>
          <div className="hero__texto">
            <p className="eyebrow">Sala 1 — Obra reciente</p>
            <h1>Pinturas que empiezan siendo una tarde cualquiera.</h1>
            <p className="hero__bajada">
              Óleos y acuarelas de {ARTIST_NAME}. Una colección en crecimiento,
              pintada de a poco, escena por escena.
            </p>
            <a href="#obras" className="boton boton--solido">Ver las obras</a>
          </div>
        </section>

        <section id="obras" className="galeria">
          <div className="seccion__encabezado">
            <p className="eyebrow">Colección</p>
            <h2>Obras</h2>
          </div>

          <div className="galeria__muro">
            {ARTWORKS.map((obra, indice) => (
              <figure
                key={obra.id}
                className={`obra obra--${obra.tam}`}
                style={{ '--rotacion': `${(indice % 2 === 0 ? 1 : -1) * (0.6 + (indice % 3))}deg` }}
              >
                <div className="obra__marco">
                  <div className="obra__lienzo" style={obra.imagen ? undefined : { background: obra.color }}>
                    {obra.imagen && (
                      <img src={obra.imagen} alt={obra.titulo} loading="lazy" />
                    )}
                  </div>
                </div>
                <figcaption className="obra__placa">
                  <span className="obra__numero">N.º {String(indice + 1).padStart(2, '0')}</span>
                  <span className="obra__titulo">{obra.titulo}</span>
                  <span className="obra__detalle">{obra.tecnica}, {obra.anio}</span>
                  <span className="obra__detalle">{obra.medidas}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="artista" className="artista">
          <div className="artista__retrato" aria-hidden="true">
            {ARTIST_PHOTO && <img src={ARTIST_PHOTO} alt="" />}
          </div>
          <div className="artista__texto">
            <p className="eyebrow">Sobre la artista</p>
            <h2>{ARTIST_NAME}</h2>
            {ARTIST_BIO.split('\n\n').map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>
        </section>

        <section id="contacto" className="contacto">
          <div className="seccion__encabezado seccion__encabezado--claro">
            <p className="eyebrow">Contacto</p>
            <h2>¿Te interesa alguna obra?</h2>
            <p className="contacto__bajada">
              Escribí directamente para consultar disponibilidad, precio o
              posibilidad de encargo.
            </p>
          </div>
          <div className="contacto__datos">
            <a href={`mailto:${ARTIST_EMAIL}`}>{ARTIST_EMAIL}</a>
            <a href={`tel:${ARTIST_PHONE.replace(/\s/g, '')}`}>{ARTIST_PHONE}</a>
          </div>
        </section>
      </main>

      <footer className="pie">
        <p>© {new Date().getFullYear()} {ARTIST_NAME}. Todas las obras reservadas.</p>
      </footer>
    </div>
  );
}

export default App;