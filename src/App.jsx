import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  List, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Ticket, 
  RefreshCw, 
  PlusCircle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Download, 
  CalendarPlus, 
  X, 
  Music, 
  Sparkles, 
  DollarSign, 
  Share2, 
  Radio, 
  SlidersHorizontal,
  Info
} from 'lucide-react';

// Subgenre color mapping with distinct neon accents
const SUBGENRES = {
  'Deep House': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', hex: '#3b82f6', dot: 'bg-blue-500' },
  'Tech House': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', hex: '#a855f7', dot: 'bg-purple-500' },
  'Afro House': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', hex: '#f59e0b', dot: 'bg-amber-500' },
  'Melodic House': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', hex: '#10b981', dot: 'bg-emerald-500' },
  'Acid House': { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/30', hex: '#84cc16', dot: 'bg-lime-500' },
  'Disco House': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30', hex: '#ec4899', dot: 'bg-pink-500' },
  'Minimal / Micro': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', hex: '#06b6d4', dot: 'bg-cyan-500' }
};

// Target Venues
const VENUES = [
  { name: 'Brooklyn Mirage', borough: 'Brooklyn', area: 'East Williamsburg' },
  { name: 'Nowadays', borough: 'Queens', area: 'Ridgewood' },
  { name: 'Superior Ingredients', borough: 'Brooklyn', area: 'Williamsburg' },
  { name: 'Knockdown Center', borough: 'Queens', area: 'Maspeth' },
  { name: 'Good Room', borough: 'Brooklyn', area: 'Greenpoint' },
  { name: 'Silo', borough: 'Brooklyn', area: 'E. Williamsburg' },
  { name: 'H0l0', borough: 'Queens', area: 'Ridgewood' },
  { name: 'House of Yes', borough: 'Brooklyn', area: 'Bushwick' },
  { name: 'Basement', borough: 'Queens', area: 'Maspeth' },
  { name: 'Paragon', borough: 'Brooklyn', area: 'Bushwick' }
];

// Seed Events (NYC 2026/2027 House Music Schedule)
const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: 'Nonstop Liquid Grooves: Kerri Chandler Extended Set',
    venue: 'Nowadays',
    borough: 'Queens',
    subgenre: 'Deep House',
    date: '2026-10-24', // YYYY-MM-DD
    startTime: '22:00',
    endTime: '06:00',
    advancePrice: 25,
    doorPrice: 35,
    lineup: ['Kerri Chandler (8-Hr Set)', 'Galcher Lustwerk', 'Soul Summit DJs'],
    description: 'An immersive 8-hour Journey through authentic Jersey & Chicago deep house soul on Nowadays Custom Analog Sound System.',
    ticketUrl: 'https://ra.co',
    ageLimit: '21+',
    featured: true
  },
  {
    id: 'evt-2',
    title: 'Teksupport Presents: Keinemusik NYC Showcase',
    venue: 'Brooklyn Mirage',
    borough: 'Brooklyn',
    subgenre: 'Afro House',
    date: '2026-10-30',
    startTime: '21:00',
    endTime: '05:00',
    advancePrice: 65,
    doorPrice: 85,
    lineup: ['&ME', 'Rampa', 'Adam Port', 'Desiree'],
    description: 'The Kloud returns to Brooklyn for an epic visual and sonic experience under the massive LED screen.',
    ticketUrl: 'https://dice.fm',
    ageLimit: '21+',
    featured: true
  },
  {
    id: 'evt-3',
    title: 'Resolute: Acid & Dub Explorations',
    venue: 'H0l0',
    borough: 'Queens',
    subgenre: 'Acid House',
    date: '2026-10-31',
    startTime: '23:00',
    endTime: '07:00',
    advancePrice: 20,
    doorPrice: 30,
    lineup: ['Tin Man (Live)', 'Josh Wink', 'O.BEE & Tomas Station'],
    description: 'Raw, hypnotic 303 basslines and subterranean grooves down in the sub-level sound sanctuary.',
    ticketUrl: 'https://ra.co',
    ageLimit: '21+'
  },
  {
    id: 'evt-4',
    title: 'The Roof Sundowner: Anjunadeep Open Air',
    venue: 'Superior Ingredients',
    borough: 'Brooklyn',
    subgenre: 'Melodic House',
    date: '2026-11-01',
    startTime: '15:00',
    endTime: '23:00',
    advancePrice: 40,
    doorPrice: 50,
    lineup: ['Luttrell', 'Yotto', 'Eli & Fur', 'Marsh'],
    description: 'Golden hour melodic vibes with stunning Manhattan skyline views through the retractable glass roof.',
    ticketUrl: 'https://dice.fm',
    ageLimit: '21+',
    featured: true
  },
  {
    id: 'evt-5',
    title: 'FIXED: Floorplan (Robert Hood & Lyric Hood)',
    venue: 'Good Room',
    borough: 'Brooklyn',
    subgenre: 'Tech House',
    date: '2026-11-06',
    startTime: '22:00',
    endTime: '04:00',
    advancePrice: 25,
    doorPrice: 30,
    lineup: ['Floorplan', 'JD Samson', 'J.D.H.'],
    description: 'High-energy gospel-infused techno and tech house heat from Detroit royalty in the main room.',
    ticketUrl: 'https://ra.co',
    ageLimit: '21+'
  },
  {
    id: 'evt-6',
    title: 'Resonance: Palms Trax & Hunee All Night',
    venue: 'Knockdown Center',
    borough: 'Queens',
    subgenre: 'Disco House',
    date: '2026-11-07',
    startTime: '21:00',
    endTime: '04:00',
    advancePrice: 35,
    doorPrice: 45,
    lineup: ['Palms Trax', 'Hunee', 'CCP (Live)'],
    description: 'Euphoric disco cuts, rare Italo gems, and uplifting house classics across 100,000 sq ft of industrial space.',
    ticketUrl: 'https://ra.co',
    ageLimit: '21+'
  },
  {
    id: 'evt-7',
    title: 'BOUND: Wrecked x Studio 54 Revival',
    venue: 'Basement',
    borough: 'Queens',
    subgenre: 'Minimal / Micro',
    date: '2026-11-13',
    startTime: '23:00',
    endTime: '06:00',
    advancePrice: 30,
    doorPrice: 40,
    lineup: ['Traxx', 'Ron Morelli', 'Ryan Smith'],
    description: 'Strictly underground soundscapes, deep micro grooves, and zero phone policy on the dance floor.',
    ticketUrl: 'https://ra.co',
    ageLimit: '21+'
  },
  {
    id: 'evt-8',
    title: 'House of Love: Disco & House Carnival',
    venue: 'House of Yes',
    borough: 'Brooklyn',
    subgenre: 'Disco House',
    date: '2026-11-14',
    startTime: '22:00',
    endTime: '04:00',
    advancePrice: 25,
    doorPrice: 35,
    lineup: ['Eli Escobar', 'DJ Holographic', 'Sammy Jo'],
    description: 'Circus performers, aerialists, glitter stations, and non-stop euphoric house grooves all night long.',
    ticketUrl: 'https://eventbrite.com',
    ageLimit: '21+'
  },
  {
    id: 'evt-9',
    title: 'Sub-Zero: Denis Sulta & Honey Dijon',
    venue: 'Silo',
    borough: 'Brooklyn',
    subgenre: 'Tech House',
    date: '2026-11-20',
    startTime: '22:00',
    endTime: '05:00',
    advancePrice: 35,
    doorPrice: 45,
    lineup: ['Honey Dijon', 'Denis Sulta', 'Kiva'],
    description: 'Immersive sound projection mapping and heavy jackin tech house inside East Williamsburg’s converted silo.',
    ticketUrl: 'https://dice.fm',
    ageLimit: '21+',
    featured: true
  },
  {
    id: 'evt-10',
    title: 'Out of Mind: Micro Grooves & Dubs',
    venue: 'Paragon',
    borough: 'Brooklyn',
    subgenre: 'Minimal / Micro',
    date: '2026-11-21',
    startTime: '22:00',
    endTime: '05:00',
    advancePrice: 20,
    doorPrice: 25,
    lineup: ['Praslea', 'Raresh', 'Sheik'],
    description: 'Two floors of custom acoustic design, featuring Romanian micro-house and hypnotic deep rhythms.',
    ticketUrl: 'https://ra.co',
    ageLimit: '21+'
  },
  {
    id: 'evt-11',
    title: 'Mister Sunday: Outdoor Winter Dome Opener',
    venue: 'Nowadays',
    borough: 'Queens',
    subgenre: 'Deep House',
    date: '2026-11-22',
    startTime: '15:00',
    endTime: '21:00',
    advancePrice: 20,
    doorPrice: 25,
    lineup: ['Eamon Harkin', 'Justin Carter'],
    description: 'All-ages daytime party under the heated dome with comfort food, warm mulled cider, and deep grooves.',
    ticketUrl: 'https://ra.co',
    ageLimit: 'All Ages'
  },
  {
    id: 'evt-12',
    title: 'Circoloco NYC Winter Sessions',
    venue: 'Knockdown Center',
    borough: 'Queens',
    subgenre: 'Tech House',
    date: '2026-12-05',
    startTime: '20:00',
    endTime: '06:00',
    advancePrice: 70,
    doorPrice: 90,
    lineup: ['Seth Troxler', 'Blond:ish', 'Luciano', 'Maceo Plex'],
    description: 'Ibiza’s iconic crazy clown party brings its trademark red glow and high-octane house lineup to NYC.',
    ticketUrl: 'https://dice.fm',
    ageLimit: '21+',
    featured: true
  }
];

export default function App() {
  // Navigation & State
  const [currentView, setCurrentView] = useState('calendar'); // 'calendar' | 'list'
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState('Monday, Oct 19, 2026 at 04:00 AM');
  const [syncMessage, setSyncMessage] = useState('');

  // Calendar State (Defaulting to October 2026 as per setup)
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 9, 1)); // Oct 2026

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubgenre, setSelectedSubgenre] = useState('All');
  const [selectedBorough, setSelectedBorough] = useState('All');
  const [selectedVenue, setSelectedVenue] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);

  // New Event Form State
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    venue: 'Brooklyn Mirage',
    subgenre: 'Deep House',
    date: '2026-11-15',
    startTime: '22:00',
    endTime: '04:00',
    advancePrice: '25',
    doorPrice: '35',
    lineup: '',
    ticketUrl: '',
    description: ''
  });

  // Simulated Sync Engine Function
  const handleManualSync = () => {
    setIsSyncing(true);
    setSyncMessage('Connecting to venue API gateways (Resident Advisor, Dice.fm, Eventbrite)...');
    
    setTimeout(() => {
      setSyncMessage('Parsing house event updates for 10 NYC Venues...');
    }, 1000);

    setTimeout(() => {
      // Simulate adding 1 fresh event on auto sync
      const freshEvent = {
        id: `evt-auto-${Date.now()}`,
        title: 'Secret Loft Sessions: Warehouse Deep House',
        venue: 'Silo',
        borough: 'Brooklyn',
        subgenre: 'Deep House',
        date: new Date().toISOString().split('T')[0],
        startTime: '23:00',
        endTime: '06:00',
        advancePrice: 20,
        doorPrice: 30,
        lineup: ['Surprise Guest (Defected Records)', 'Local Underground Residents'],
        description: 'Newly added via automated Monday ingest pipeline.',
        ticketUrl: 'https://ra.co',
        ageLimit: '21+'
      };

      setEvents(prev => [freshEvent, ...prev]);
      const now = new Date();
      setLastSyncDate(`${now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })} at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      setIsSyncing(false);
      setSyncMessage('Sync complete! 1 new event ingested and 12 venues verified.');
      setTimeout(() => setSyncMessage(''), 4000);
    }, 2500);
  };

  // Filtered Events logic
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchesSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            evt.lineup.some(artist => artist.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            evt.venue.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedSubgenre === 'All' || evt.subgenre === selectedSubgenre;
      const matchesBorough = selectedBorough === 'All' || evt.borough === selectedBorough;
      const matchesVenue = selectedVenue === 'All' || evt.venue === selectedVenue;
      const matchesPrice = evt.advancePrice <= maxPrice;

      return matchesSearch && matchesGenre && matchesBorough && matchesVenue && matchesPrice;
    });
  }, [events, searchTerm, selectedSubgenre, selectedBorough, selectedVenue, maxPrice]);

  // Calendar calculations
  const calendarDays = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Padding previous month
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        dateStr: `${year}-${String(month).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`,
        dayNum: prevMonthDays - i,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const formattedMonth = String(month + 1).padStart(2, '0');
      const formattedDay = String(i).padStart(2, '0');
      days.push({
        dateStr: `${year}-${formattedMonth}-${formattedDay}`,
        dayNum: i,
        isCurrentMonth: true
      });
    }

    // Remaining slots to round up grid (42 grid slots = 6 rows)
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const formattedNextMonth = String(month + 2).padStart(2, '0');
      const formattedDay = String(i).padStart(2, '0');
      days.push({
        dateStr: `${year}-${formattedNextMonth}-${formattedDay}`,
        dayNum: i,
        isCurrentMonth: false
      });
    }

    return days;
  }, [currentMonthDate]);

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  // Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedVenueObj = VENUES.find(v => v.name === formData.venue);
    const newEvt = {
      id: `user-${Date.now()}`,
      title: formData.title,
      venue: formData.venue,
      borough: selectedVenueObj ? selectedVenueObj.borough : 'Brooklyn',
      subgenre: formData.subgenre,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      advancePrice: Number(formData.advancePrice) || 0,
      doorPrice: Number(formData.doorPrice) || 0,
      lineup: formData.lineup.split(',').map(s => s.trim()).filter(Boolean),
      description: formData.description || 'Promoter submitted NYC House music event.',
      ticketUrl: formData.ticketUrl || 'https://ra.co',
      ageLimit: '21+'
    };

    setEvents(prev => [newEvt, ...prev]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitOpen(false);
      setFormData({
        title: '',
        venue: 'Brooklyn Mirage',
        subgenre: 'Deep House',
        date: '2026-11-15',
        startTime: '22:00',
        endTime: '04:00',
        advancePrice: '25',
        doorPrice: '35',
        lineup: '',
        ticketUrl: '',
        description: ''
      });
    }, 1500);
  };

  // Calendar Exports
  const generateGoogleCalUrl = (evt) => {
    const startIso = evt.date.replace(/-/g, '') + 'T' + evt.startTime.replace(':', '') + '00Z';
    const endIso = evt.date.replace(/-/g, '') + 'T' + evt.endTime.replace(':', '') + '00Z';
    const details = encodeURIComponent(`${evt.description}\n\nLineup: ${evt.lineup.join(', ')}\nTickets: ${evt.ticketUrl}`);
    const location = encodeURIComponent(`${evt.venue}, NYC`);
    const title = encodeURIComponent(evt.title);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  const downloadIcsFile = (evt) => {
    const startIso = evt.date.replace(/-/g, '') + 'T' + evt.startTime.replace(':', '') + '00';
    const endIso = evt.date.replace(/-/g, '') + 'T' + evt.endTime.replace(':', '') + '00';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NYC House Music Hub//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${evt.title}`,
      `DESCRIPTION:${evt.description} \\nLineup: ${evt.lineup.join(', ')}`,
      `LOCATION:${evt.venue}, NYC`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${evt.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-fuchsia-500 selection:text-white flex flex-col">
      {/* BACKGROUND NEON GLOW DECORATIONS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px]" />
      </div>

      {/* TOP HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Radio className="h-6 w-6 text-fuchsia-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-fuchsia-400 bg-clip-text text-transparent uppercase">
                  NYC HOUSE HUB
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30">
                  2026 LIVE INGEST
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Weekly auto-synced calendar for underground house in NYC
              </p>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* View Switcher */}
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center">
              <button
                onClick={() => setCurrentView('calendar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentView === 'calendar'
                    ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden md:inline">Calendar</span>
              </button>
              <button
                onClick={() => setCurrentView('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentView === 'list'
                    ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline">List View</span>
              </button>
            </div>

            {/* Sync Status Button */}
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition text-xs font-medium relative group"
              title="Auto-updates every Monday. Click to force trigger sync."
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden lg:inline">Auto-Sync</span>
            </button>

            {/* Event Submission Modal Trigger */}
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold text-xs transition shadow-lg shadow-fuchsia-600/30 hover:shadow-fuchsia-500/50"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Event</span>
            </button>
          </div>
        </div>

        {/* SYNC NOTIFICATION BANNER */}
        <div className="bg-slate-900/90 border-t border-slate-800/60 px-4 py-1.5 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                <strong className="text-slate-200">Ingest Engine:</strong> Active | 10 NYC Venues Monitored
              </span>
              <span className="hidden md:inline text-slate-600">|</span>
              <span className="hidden md:inline text-slate-400">
                Last Auto-Sync: <span className="text-slate-300">{lastSyncDate}</span>
              </span>
            </div>
            {syncMessage ? (
              <span className="text-cyan-400 font-mono font-medium animate-pulse">{syncMessage}</span>
            ) : (
              <span className="text-slate-500 text-[10px] hidden sm:inline">Next scheduled sync: Monday 4:00 AM</span>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 z-10 flex flex-col gap-6">

        {/* FILTER & SEARCH CONTROL BAR */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800/80 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Box */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search DJ, artist, or event name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 transition"
              />
            </div>

            {/* Subgenre Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedSubgenre}
                onChange={(e) => setSelectedSubgenre(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500 transition"
              >
                <option value="All">All Subgenres</option>
                {Object.keys(SUBGENRES).map(sg => (
                  <option key={sg} value={sg}>{sg}</option>
                ))}
              </select>
            </div>

            {/* Borough / Venue Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500 transition"
              >
                <option value="All">All NYC Venues ({VENUES.length})</option>
                {VENUES.map(v => (
                  <option key={v.name} value={v.name}>{v.name} ({v.borough})</option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="md:col-span-2 flex flex-col justify-center px-1">
              <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                <span>Max Advance:</span>
                <span className="font-bold text-fuchsia-400">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-fuchsia-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Subgenre Color Quick Filters */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/50">
            <span className="text-[11px] font-semibold text-slate-400 mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Quick Filter:
            </span>
            <button
              onClick={() => setSelectedSubgenre('All')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                selectedSubgenre === 'All'
                  ? 'bg-slate-100 text-slate-950 font-bold'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Genres
            </button>
            {Object.entries(SUBGENRES).map(([genre, config]) => (
              <button
                key={genre}
                onClick={() => setSelectedSubgenre(genre)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition flex items-center gap-1.5 border ${
                  selectedSubgenre === genre
                    ? `${config.bg} ${config.text} ${config.border} ring-1 ring-fuchsia-500`
                    : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* VIEW 1: MONTHLY CALENDAR VIEW */}
        {currentView === 'calendar' && (
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-2xl p-4 sm:p-6 space-y-4">
            
            {/* Calendar Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-fuchsia-400" />
                  {currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {filteredEvents.length} events found
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentMonthDate(new Date(2026, 9, 1))}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  Oct 2026
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 py-1">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <div key={day} className="py-1">{day}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarDays.map((dayObj, index) => {
                const dayEvents = filteredEvents.filter(e => e.date === dayObj.dateStr);

                return (
                  <div
                    key={index}
                    className={`min-h-[90sm:110px] p-1.5 sm:p-2 rounded-xl border flex flex-col justify-between transition-all ${
                      dayObj.isCurrentMonth
                        ? 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                        : 'bg-slate-950/20 border-slate-900/50 text-slate-600 opacity-40'
                    }`}
                  >
                    {/* Day Number */}
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs font-mono font-bold ${dayObj.isCurrentMonth ? 'text-slate-300' : 'text-slate-600'}`}>
                        {dayObj.dayNum}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-fuchsia-500/20 text-fuchsia-400">
                          {dayEvents.length}
                        </span>
                      )}
                    </div>

                    {/* Events inside calendar cell */}
                    <div className="space-y-1 overflow-hidden flex-1">
                      {dayEvents.slice(0, 2).map((evt) => {
                        const styleConfig = SUBGENRES[evt.subgenre] || SUBGENRES['Deep House'];
                        return (
                          <div
                            key={evt.id}
                            onClick={() => setSelectedEvent(evt)}
                            className={`p-1 rounded-md border text-[10px] cursor-pointer transition transform hover:-translate-y-0.5 hover:shadow-lg ${styleConfig.bg} ${styleConfig.border} ${styleConfig.text} truncate font-medium`}
                          >
                            <div className="font-bold truncate">{evt.title}</div>
                            <div className="text-[9px] opacity-80 truncate">{evt.venue}</div>
                          </div>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div 
                          onClick={() => {
                            // Quick switch to list view for this date
                            setSearchTerm(dayObj.dateStr);
                            setCurrentView('list');
                          }}
                          className="text-[9px] text-center text-slate-400 font-semibold hover:text-fuchsia-400 cursor-pointer pt-0.5"
                        >
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: FILTERABLE LIST VIEW */}
        {currentView === 'list' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <List className="w-5 h-5 text-fuchsia-400" />
                Upcoming House Events ({filteredEvents.length})
              </h2>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-fuchsia-400 hover:underline"
                >
                  Clear search term
                </button>
              )}
            </div>

            {filteredEvents.length === 0 ? (
              <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-12 text-center space-y-3">
                <Music className="w-10 h-10 text-slate-600 mx-auto animate-bounce" />
                <h3 className="text-base font-semibold text-slate-300">No house music events matched your filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search terms, increasing the maximum price slider, or selecting 'All Subgenres'.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSubgenre('All');
                    setSelectedVenue('All');
                    setMaxPrice(100);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((evt) => {
                  const subgenreConfig = SUBGENRES[evt.subgenre] || SUBGENRES['Deep House'];
                  return (
                    <div
                      key={evt.id}
                      className="bg-slate-900/80 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 p-5 flex flex-col justify-between space-y-4 shadow-xl transition-all duration-200 hover:-translate-y-1 relative group"
                    >
                      {evt.featured && (
                        <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Featured
                        </div>
                      )}

                      <div className="space-y-2">
                        {/* Subgenre Badge */}
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${subgenreConfig.bg} ${subgenreConfig.text} ${subgenreConfig.border}`}>
                            {evt.subgenre}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            ${evt.advancePrice} adv
                          </span>
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={() => setSelectedEvent(evt)}
                          className="text-base font-bold text-white group-hover:text-fuchsia-400 transition cursor-pointer line-clamp-2"
                        >
                          {evt.title}
                        </h3>

                        {/* Lineup summary */}
                        <p className="text-xs text-slate-400 line-clamp-2">
                          <strong className="text-slate-300">Lineup:</strong> {evt.lineup.join(', ')}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                          <span className="truncate">{evt.venue} ({evt.borough})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>
                            {new Date(evt.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })} • {evt.startTime} - {evt.endTime}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setSelectedEvent(evt)}
                          className="flex-1 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition text-center"
                        >
                          View Details
                        </button>
                        <a
                          href={evt.ticketUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-semibold transition flex items-center gap-1 shadow-md"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>Tickets</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Subgenre Header Badge */}
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${SUBGENRES[selectedEvent.subgenre]?.bg} ${SUBGENRES[selectedEvent.subgenre]?.text} ${SUBGENRES[selectedEvent.subgenre]?.border}`}>
                {selectedEvent.subgenre}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                {selectedEvent.ageLimit || '21+'}
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-xl font-black text-white mb-2">{selectedEvent.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedEvent.description}</p>
            </div>

            {/* Key Event Metadata */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-fuchsia-400" />
                <span>
                  <strong className="text-white">{selectedEvent.venue}</strong> — {selectedEvent.borough}, NYC
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>
                  {new Date(selectedEvent.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} ({selectedEvent.startTime} – {selectedEvent.endTime})
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>
                  Advance: <strong className="text-emerald-400">${selectedEvent.advancePrice}</strong> | Door: <strong className="text-slate-200">${selectedEvent.doorPrice}</strong>
                </span>
              </div>
            </div>

            {/* Lineup Roster */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Confirmed DJ Lineup</h4>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.lineup.map((artist, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
                    {artist}
                  </span>
                ))}
              </div>
            </div>

            {/* MAP PREVIEW SIMULATION */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Venue Location: NYC Metro Area</span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedEvent.venue + ' NYC')}`}
                target="_blank"
                rel="noreferrer"
                className="text-fuchsia-400 hover:underline font-semibold flex items-center gap-1 text-[11px]"
              >
                Open Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Calendar Export & Ticket Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={generateGoogleCalUrl(selectedEvent)}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-blue-400" />
                  <span>Google Calendar</span>
                </a>
                <button
                  onClick={() => downloadIcsFile(selectedEvent)}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export .ICS File</span>
                </button>
              </div>

              <a
                href={selectedEvent.ticketUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs transition text-center shadow-lg shadow-fuchsia-600/30 flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Get Tickets Now</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* PROMOTER SUBMISSION MODAL */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsSubmitOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-fuchsia-400" />
                Submit House Event
              </h2>
              <p className="text-xs text-slate-400">
                Submitted events are ingested into the weekly Monday automation queue.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-sm font-bold text-emerald-400">Event Ingested Successfully!</h3>
                <p className="text-xs text-slate-300">Your event has been added to the NYC House calendar.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Event Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Resolute: Acid & Deep Grooves"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Venue</label>
                    <select
                      value={formData.venue}
                      onChange={e => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                    >
                      {VENUES.map(v => (
                        <option key={v.name} value={v.name}>{v.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Subgenre</label>
                    <select
                      value={formData.subgenre}
                      onChange={e => setFormData({ ...formData, subgenre: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                    >
                      {Object.keys(SUBGENRES).map(sg => (
                        <option key={sg} value={sg}>{sg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Date</label>
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Doors Open</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">End Time</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Advance Ticket ($)</label>
                    <input
                      type="number"
                      value={formData.advancePrice}
                      onChange={e => setFormData({ ...formData, advancePrice: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Door Ticket ($)</label>
                    <input
                      type="number"
                      value={formData.doorPrice}
                      onChange={e => setFormData({ ...formData, doorPrice: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Lineup (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="Kerri Chandler, Honey Dijon, DJ Holographic"
                    value={formData.lineup}
                    onChange={e => setFormData({ ...formData, lineup: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Ticket Link (RA / Dice)</label>
                  <input
                    type="url"
                    placeholder="https://ra.co/events/..."
                    value={formData.ticketUrl}
                    onChange={e => setFormData({ ...formData, ticketUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Event Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short description of the event, sound system, or night vibe..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-fuchsia-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs transition shadow-lg shadow-fuchsia-600/30"
                >
                  Submit Event for Weekly Ingest
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-fuchsia-400" />
            <span className="font-bold text-slate-400">NYC House Music Events Hub</span>
            <span>— Updated Weekly</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            Monitored Venues: Brooklyn Mirage, Nowadays, Superior Ingredients, Knockdown Center, Good Room, Silo, H0l0, House of Yes, Basement, Paragon.
          </div>
        </div>
      </footer>
    </div>
  );
}
