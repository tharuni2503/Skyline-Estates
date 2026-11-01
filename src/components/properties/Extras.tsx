export default function Extras({location}:{location:string}){
 const area=location.split(",")[0];
 return <>
  <h2 className="mt-10 font-serif text-2xl">Floor plan</h2>
  <svg viewBox="0 0 400 240" role="img" aria-label="Indicative floor plan" className="mt-3 w-full max-w-lg border border-line bg-white"><g fill="none" stroke="#111" strokeWidth="2"><rect x="10" y="10" width="380" height="220"/><path d="M200 10V130M10 130H390M290 130V230"/></g><g fill="#6B7280" fontSize="12"><text x="70" y="75">Living</text><text x="270" y="75">Bedroom</text><text x="80" y="185">Kitchen</text><text x="195" y="185">Dining</text><text x="310" y="185">Bath</text></g></svg>
  <p className="mt-1 text-xs text-slate">Indicative layout. Final plans are shared by the agent.</p>
  <h2 className="mt-10 font-serif text-2xl">Location</h2>
  <div className="mt-3 flex aspect-video items-center justify-center bg-line text-sm text-slate">Map placeholder for {area}</div>
  <h3 className="mt-6 font-serif text-xl">Nearby</h3>
  <ul className="mt-2 grid gap-2 text-sm sm:grid-cols-2">{["International school, 1.5 km","Multi-speciality hospital, 3 km","Metro or shuttle stop, 2 km","Shopping mall, 4 km"].map(x=><li key={x} className="border-b border-line py-2">{x}</li>)}</ul>
  <h2 className="mt-10 font-serif text-2xl">Your agent</h2>
  <p className="mt-2">Lakshmi Prasad, Senior Advisor, {area}</p><a href="tel:+914000000000" className="mt-2 inline-block text-sm underline">Contact agent</a></>;}
