"use client";

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-black overflow-hidden pointer-events-none">
      {/* 
        ========================================================================
        HOW TO USE YOUR 3D SPLINE ANIMATION:
        ========================================================================
        
        1. Go to https://spline.design/ and create/export your 3D scene.
        2. Click "Export" -> "Viewer" and get your URL (e.g. https://prod.spline.design/your-unique-id/scene.splinecode)
        3. Install the spline react package:
           Run: npm install @splinetool/react-spline
        4. Import it at the top of this file:
           import Spline from '@splinetool/react-spline';
        5. Replace the subtle fallback divs below with:
           <Spline scene="https://prod.spline.design/your-unique-id/scene.splinecode" />
           
        Example implementation:
        return (
          <div className="fixed inset-0 w-full h-full -z-50 bg-black overflow-hidden pointer-events-none">
             <Spline scene="https://prod.spline.design/your-id/scene.splinecode" />
          </div>
        );
      */}
      
      {/* Subtle fallback animated gradients to simulate a glassy 3D environment while waiting for Spline */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[var(--color-teal-accent)]/10 blur-[150px] rounded-full mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-[pulse_12s_ease-in-out_infinite]" />
    </div>
  );
}
