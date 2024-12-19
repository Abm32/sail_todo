import { Ship, Anchor, Compass, Map, Skull } from 'lucide-react';

export function BackgroundDecorations() {
  return (
    <>
      {/* Fixed position decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top left decorations */}
        <div className="absolute top-10 left-10 transform -rotate-12">
          <Ship className="w-24 h-24 text-white/5" />
        </div>
        
        {/* Top right decorations */}
        <div className="absolute top-20 right-20 transform rotate-45">
          <Compass className="w-32 h-32 text-white/5" />
        </div>
        
        {/* Bottom left decorations */}
        <div className="absolute bottom-10 left-20 transform rotate-12">
          <Map className="w-28 h-28 text-white/5" />
        </div>
        
        {/* Bottom right decorations */}
        <div className="absolute bottom-20 right-10 transform -rotate-12">
          <Anchor className="w-20 h-20 text-white/5" />
        </div>
        
        {/* Center decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Skull className="w-96 h-96 text-white/[0.02]" />
        </div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 left-1/3 animate-float">
          <Ship className="w-16 h-16 text-white/5" />
        </div>
        <div className="absolute top-2/3 right-1/4 animate-float-delayed">
          <Compass className="w-12 h-12 text-white/5" />
        </div>
      </div>
    </>
  );
}