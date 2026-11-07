import React from 'react';
import { DoctorLetterhead } from '../types/prescription';

interface LetterheadHeaderProps {
  letterhead: DoctorLetterhead;
  className?: string;
}

export const LetterheadHeader: React.FC<LetterheadHeaderProps> = ({
  letterhead,
  className = ''
}) => {
  return (
    <div className={`w-full pb-4 ${className}`}>
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        
        {/* Left Column (English Doctor Information) */}
        <div className="w-[38%] text-left select-none">
          <h1 className="text-lg sm:text-2xl font-black tracking-tight text-[#b2822a] font-serif leading-none mb-1">
            {letterhead.doctorName || 'Dr Muhammad Fayyaz'}
          </h1>
          
          <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 tracking-tight leading-tight uppercase font-sans">
            <div>M.B.B.S, FCPS UROLOGY</div>
            <div>(SIUT KARACHI) CHPE (LUMS)</div>
            <div className="text-[#966b1a] font-black mt-0.5">PEADS UROLOGIST & ADULT UROLOGIST</div>
            <div className="text-[#966b1a] font-black">PENILE IMPLANT SPECIALIST • ROBOTIC SURGEON</div>
          </div>

          <div className="mt-1.5 space-y-0.5 text-[9px] sm:text-[10px] text-slate-700 font-medium leading-tight">
            <div>Member of American Urological Association</div>
            <div>Member of European Association of Urology</div>
            <div>Member of Society Internationale Urology</div>
            <div>Member of Singapore Urological Association</div>
          </div>
        </div>

        {/* Center Column (SIUT Badge + Huwa Al-Shafi + Medical Shield Crest) */}
        <div className="w-[24%] flex items-center justify-center gap-1.5 sm:gap-2.5 pt-1 shrink-0">
          
          {/* SIUT PAKISTAN Badge */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f39200] flex flex-col items-center justify-center shadow-xs text-white border-2 border-white ring-1 ring-orange-400">
              <span className="font-black text-xs sm:text-sm tracking-tighter leading-none">
                SIUT
              </span>
              <span className="text-[6px] sm:text-[7px] font-bold tracking-widest uppercase leading-none mt-0.5">
                PAKISTAN
              </span>
            </div>
          </div>

          {/* ہو الشافی (Huwa Al-Shafi) Golden Oval Calligraphy */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-amber-500/70 bg-gradient-to-b from-amber-50 to-amber-100/70 flex items-center justify-center text-[#966b1a] shadow-xs">
              <div className="text-center leading-none">
                <span className="text-xs sm:text-sm font-bold font-serif" style={{ fontFamily: 'Georgia, serif' }}>
                  ہو الشافی
                </span>
              </div>
            </div>
          </div>

          {/* Medical Crest / Coat of Arms */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 sm:w-11 sm:h-11 relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                {/* Royal Shield with Caduceus and Ribbons */}
                <path d="M50 8 C68 8 85 18 85 45 C85 75 50 94 50 94 C50 94 15 75 15 45 C15 18 32 8 50 8 Z" fill="#1b5e20" stroke="#b2822a" strokeWidth="3" />
                <path d="M50 14 C65 14 78 22 78 45 C78 68 50 85 50 85 C50 85 22 68 22 45 C22 22 35 14 50 14 Z" fill="#b71c1c" />
                {/* Staff of Asclepius */}
                <line x1="50" y1="20" x2="50" y2="78" stroke="#fbc02d" strokeWidth="4" strokeLinecap="round" />
                <circle cx="50" cy="18" r="4.5" fill="#fbc02d" />
                {/* Golden Serpent */}
                <path d="M42 30 Q58 35 50 45 Q42 55 58 65" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                {/* Laurel Leaves / Decorative Wings */}
                <path d="M12 30 Q22 22 22 40 Q22 55 10 52" fill="#2e7d32" opacity="0.8" />
                <path d="M88 30 Q78 22 78 40 Q78 55 90 52" fill="#2e7d32" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column (Urdu Calligraphy & Qualifications) */}
        <div className="w-[38%] text-right select-none dir-rtl" style={{ direction: 'rtl' }}>
          <h1 className="text-xl sm:text-3xl font-black text-[#b2822a] leading-tight mb-1" style={{ fontFamily: 'Noto Nastaliq Urdu, Jameel Noori Nastaleeq, serif' }}>
            {letterhead.doctorNameUrdu || 'ڈاکٹر محمد فیاض'}
          </h1>
          
          <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 leading-snug">
            <div>ایم بی بی ایس، ایف سی پی ایس یورولوجی</div>
            <div>(ایس آئی یو ٹی کراچی) سی ایچ پی ای (ایل یو ایم ایس)</div>
            <div className="text-[#966b1a] font-extrabold mt-0.5">پیڈز یورولوجسٹ اینڈ ایڈلٹ یورولوجسٹ</div>
            <div className="text-[#966b1a] font-extrabold">پینائل امپلانٹ سپیشلسٹ / روبوٹک سرجن</div>
          </div>

          <div className="mt-1.5 space-y-0.5 text-[9px] sm:text-[10px] text-slate-700 font-medium leading-tight">
            <div>ممبر آف امریکن یورولوجیکل ایسوسی ایشن</div>
            <div>ممبر آف سوسائٹی انٹرنیشنل یورولوجی</div>
            <div>ممبر آف یورپین ایسوسی ایشن آف یورولوجی</div>
            <div>ممبر آف سنگاپور یورولوجیکل ایسوسی ایشن</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LetterheadFooter: React.FC<{ letterhead: DoctorLetterhead; className?: string }> = ({
  letterhead,
  className = ''
}) => {
  return (
    <div className={`w-full pt-4 mt-auto border-t border-slate-300 select-none ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left: For Appointment */}
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900">For Appointment:</span>
            <span className="text-sm sm:text-base font-black text-slate-900 font-mono tracking-tight">
              {letterhead.appointmentPhone || '0310-4721333'}
            </span>
          </div>
        </div>

        {/* Right: Social Media Handles */}
        <div className="flex flex-col sm:items-end text-[10px] sm:text-[11px] text-slate-700 space-y-0.5 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">f</span>
            <span>facebook: <strong className="text-slate-900">{letterhead.facebook || 'Dr Fayyaz urologist'}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-[9px]">ig</span>
            <span>Instagram: <strong className="text-slate-900">{letterhead.instagram || 'dr_ muhammad.fayyaz'}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-red-600 text-white flex items-center justify-center font-bold text-[9px]">▶</span>
            <span>YouTube: <strong className="text-slate-900">{letterhead.youtube || 'Dr Fayyaz Urologist'}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
