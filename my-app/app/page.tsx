import SvgMapViewer from './components/SvgMapViewer';
import A2InteractiveMap from './components/A2InteractiveMap';

export default function Portfolio() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const projects = [
    { 
      id: 'a1', 
      title: 'A1 - Diagram', 
      color: 'bg-blue-50', 
      desc: 'Visualizing complex technical architectures and campus systems.', 
      imgSrc: `${basePath}/A1.svg`,
      scale: 0.5 // <--- Adjust this (1.0 = 100%, 0.8 = 80%, etc.); not used for A1 (full-bleed SVG)
    },
    { 
      id: 'a2', 
      title: 'A2 - Script', 
      color: 'bg-emerald-50', 
      desc: 'Custom automation tools and Google Sheets mobile integration.', 
      imgSrc: `${basePath}/A2.png`,
      scale: 1.0
    },
    { 
      id: 'a3', 
      title: 'A3 - Systems Thinking', 
      color: 'bg-purple-50', 
      desc: 'Interactive Tech Systems Cluster node map exploration.', 
      imgSrc: `${basePath}/compiler-visual.png`,
      scale: 1.0
    },
    { 
      id: 'a4', 
      title: 'A4 - Intervention', 
      color: 'bg-orange-50', 
      desc: 'Strategic campus technology audits and hardware troubleshooting.', 
      imgSrc: `${basePath}/A4.png`,
      scale: 0.85
    }
  ];

  return (
    <div className="bg-white selection:bg-black selection:text-white">
      {/* STICKY HOTBAR */}
      <nav className="fixed top-0 z-50 w-full bg-black/35 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex space-x-6">
            {projects.map((p) => (
              <a key={p.id} href={`#${p.id}`} className="text-xs font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                {p.id}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION — full viewport, inverted palette vs. rest of page */}
        <section className="min-h-[100dvh] flex flex-col justify-center items-center bg-black text-white text-center px-4 pt-16">
          <span className="text-sm font-mono mb-4 text-white/60 uppercase tracking-widest italic border-b border-white/25">Digital Portfolio</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-12 text-white">
            ARCH 408
          </h1>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center text-left">
             <div>
                <p className="text-xs font-bold uppercase text-white/50">Collaborator 01</p>
                <p className="text-2xl font-medium text-white">Danny Nguyen</p>
             </div>
             <div className="hidden md:block w-px h-16 bg-white/20" />
             <div>
                <p className="text-xs font-bold uppercase text-white/50">Collaborator 02</p>
                <p className="text-2xl font-medium text-white">Patrick Afuba</p>
             </div>
          </div>
        </section>

        {/* PROJECT SECTIONS */}
        {projects.map((project) => {
          // A1: artwork is a single full-width SVG; title/copy live in the file — no card UI
          if (project.id === 'a1') {
            return (
              <section
                key="a1"
                id="a1"
                className="relative w-full scroll-mt-20 border-b border-gray-100 bg-white"
              >
                {/* Full-bleed SVG: artwork includes titles; this layer sits behind any future overlay content */}
                <div
                  className="w-full min-h-0 bg-top bg-no-repeat [background-size:100%_auto] aspect-[1872/5184]"
                  style={{ backgroundImage: `url('${basePath}/A1.svg')` }}
                  role="img"
                  aria-label="A1"
                />
              </section>
            );
          }

          return (
            <section key={project.id} id={project.id} className="min-h-screen py-32 px-6 border-b border-gray-50 flex justify-center">
              <div className="max-w-6xl w-full flex flex-col gap-12">
                
                {/* Text Content */}
                <div className="space-y-4 max-w-3xl">
                  <h2 className="text-6xl font-black tracking-tight leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-xl text-gray-500 leading-relaxed font-light">
                    {project.desc}
                  </p>
                </div>

                {/* Visual Element with Scale Control */}
                <div className="flex justify-center w-full">
                  <div 
                    className={`relative ${project.color} rounded-3xl overflow-hidden border border-gray-100 shadow-2xl transition-all duration-500`}
                    style={{ 
                      width: `${(project.scale || 1) * 100}%`, // Controls the horizontal scale
                    }}
                  >
                    {project.id === 'a3' ? (
                      <div className="h-[700px] w-full">
                        <SvgMapViewer />
                      </div>
                    ) : project.id === 'a2' ? (
                      <div className="w-full">
                        <A2InteractiveMap />
                      </div>
                    ) : (
                      <div className="w-full">
                        <img 
                          src={project.imgSrc} 
                          alt={project.title} 
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </main>

      <footer className="py-20 text-center border-t border-gray-100 bg-slate-50">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
          UCalgary School of Architecture, Planning and Landscape &copy; 2026
        </p>
      </footer>
    </div>
  );
}